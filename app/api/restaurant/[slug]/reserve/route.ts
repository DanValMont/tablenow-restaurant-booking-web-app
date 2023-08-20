import { times } from "@/data";
import { findAvailableTables } from "@/services/restaurant/findAvailableTables";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);

  const {
    bookerEmail,
    bookerPhone,
    bookerFirstName,
    bookerLastName,
    bookerOccasion,
    bookerRequest,
  } = await request.json(); // like req.body

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: params.slug,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
      id: true,
    },
  });

  if (!restaurant) {
    return NextResponse.json(
      { errorMessage: "Restaurant not found" },
      { status: 400 }
    );
  }

  if (
    new Date(`${searchParams.get("day")}T${searchParams.get("time")}`) <
      new Date(`${searchParams.get("day")}T${restaurant.open_time}`) ||
    new Date(`${searchParams.get("day")}T${searchParams.get("time")}`) >
      new Date(`${searchParams.get("day")}T${restaurant.close_time}`)
  ) {
    return NextResponse.json(
      { errorMessage: "Restaurant is not open at that time" },
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

  const searchTimeWithTables = searchTimesWithTables.find((t) => {
    return (
      t.date.toISOString() ===
      new Date(
        `${searchParams.get("day")}T${searchParams.get("time")}`
      ).toISOString()
    );
  });

  if (!searchTimeWithTables) {
    return NextResponse.json(
      { errorMessage: "No availability, cannot book" },
      { status: 400 }
    );
  }

  const tablesCount: {
    2: number[];
    4: number[];
  } = {
    2: [],
    4: [],
  };

  searchTimeWithTables.tables.forEach((table) => {
    if (table.seats === 2) {
      tablesCount[2].push(table.id);
    } else {
      tablesCount[4].push(table.id);
    }
  });

  const tablesToBooks: number[] = [];

  let seatsRemaining = parseInt(searchParams.get("partySize")!);

  while (seatsRemaining > 0) {
    if (seatsRemaining >= 3) {
      if (tablesCount[4].length) {
        tablesToBooks.push(tablesCount[4][0]);
        tablesCount[4].shift();
        seatsRemaining = seatsRemaining - 4;
      } else {
        tablesToBooks.push(tablesCount[2][0]);
        tablesCount[2].shift();
        seatsRemaining = seatsRemaining - 2;
      }
    } else {
      if (tablesCount[2].length) {
        tablesToBooks.push(tablesCount[2][0]);
        tablesCount[2].shift();
        seatsRemaining = seatsRemaining - 2;
      } else {
        tablesToBooks.push(tablesCount[4][0]);
        tablesCount[4].shift();
        seatsRemaining = seatsRemaining - 4;
      }
    }
  }

  const booking = await prisma.booking.create({
    data: {
      number_of_people: parseInt(searchParams.get("partySize")!),
      booking_time: new Date(
        `${searchParams.get("day")}T${searchParams.get("time")}`
      ),
      booker_email: bookerEmail,
      booker_phone: bookerPhone,
      booker_first_name: bookerFirstName,
      booker_last_name: bookerLastName,
      booker_occasion: bookerOccasion,
      booker_request: bookerRequest,
      restaurant_id: restaurant.id,
    },
  });

  const bookingsOnTablesData = tablesToBooks.map((table_id) => {
    return {
      table_id,
      booking_id: booking.id,
    };
  });

  await prisma.bookingsOnTables.createMany({
    data: bookingsOnTablesData,
  });

  return NextResponse.json(booking);
}
