import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: params.slug,
    },
    select: {
      reviews: true,
    },
  });

  return NextResponse.json(restaurant);
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { first_name, last_name, text, rating, restaurant_id, user_id } =
    await request.json(); // like req.body

  const reviewId = await prisma.restaurant.findUnique({
    where: {
      slug: params.slug,
    },
    select: {
      reviews: {
        where: {
          user_id: {
            equals: user_id,
          },
          restaurant_id: {
            equals: restaurant_id,
          },
        },
        select: {
          id: true,
        },
      },
    },
  });

  if (reviewId?.reviews.length !== 0) {
    const reviewUpdate = await prisma.review.update({
      where: {
        id: reviewId?.reviews[0].id,
      },
      data: {
        text: text,
        rating: Number(rating),
      },
    });

    return NextResponse.json(reviewUpdate);
  } else {
    const reviewCreate = await prisma.review.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        text: text,
        rating: Number(rating),
        restaurant_id: restaurant_id,
        user_id: user_id,
      },
    });
    return NextResponse.json(reviewCreate);
  }
}
