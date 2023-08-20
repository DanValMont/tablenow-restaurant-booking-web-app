import { findAvailableTables } from "@/services/restaurant/findAvailableTables";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { times } from "../../../../../data";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);

  if (
    !searchParams.has("day") ||
    !searchParams.has("time") ||
    !searchParams.has("partySize")
  ) {
    return NextResponse.json(
      { errorMessage: "Invalid data provided" },
      { status: 400 }
    );
  }

  const searchTimes = times.find(
    (t) => t.time === searchParams.get("time")
  )?.searchTimes;

  if (!searchTimes) {
    return NextResponse.json(
      { errorMessage: "Invalid data provided" },
      { status: 400 }
    );
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: params.slug,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    return NextResponse.json(
      { errorMessage: "Invalid data provided" },
      { status: 400 }
    );
  }

  const searchTimesWithTables = await findAvailableTables(
    searchTimes,
    searchParams.get("day")!,
    searchParams.get("time")!,
    restaurant!
  );

  if (!searchTimesWithTables) {
    return NextResponse.json(
      { errorMessage: "Invalid data provided" },
      { status: 400 }
    );
  }

  const availabilities = searchTimesWithTables
    .map((t) => {
      const sumSeats = t.tables.reduce((sum, table) => {
        return sum + table.seats;
      }, 0);
      return {
        time: t.time,
        available: sumSeats >= parseInt(searchParams.get("partySize")!),
      };
    })
    .filter((availability) => {
      const timeIsAfterOpeningHour =
        new Date(`${searchParams.get("day")}T${availability.time}`) >=
        new Date(`${searchParams.get("day")}T${restaurant.open_time}`);

      const timeIsBeforeClosingHour =
        new Date(`${searchParams.get("day")}T${availability.time}`) <=
        new Date(`${searchParams.get("day")}T${restaurant.close_time}`);

      return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
    });

  return NextResponse.json(availabilities);
}