import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { slug: string; email: string } }
) {
  const isRestaurantBookedByUser = await prisma.restaurant.findUnique({
    where: {
      slug: params.slug,
    },
    select: {
      bookings: {
        where: {
          booker_email: params.email,
        },
      },
    },
  });

  return NextResponse.json(isRestaurantBookedByUser);
}
