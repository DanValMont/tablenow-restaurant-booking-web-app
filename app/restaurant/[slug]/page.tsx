import { PrismaClient, Review } from "@prisma/client";
import { Metadata } from "next";

import { notFound } from "next/navigation";
import Description from "./components/Description";
import Images from "./components/Images";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  return {
    title: `${params.slug} | tablenow`,
    description: `${restaurant.description}`,
  };
}

const prisma = new PrismaClient();

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  reviews: Review[];
  slug: string;
  open_time: string;
  close_time: string;
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      reviews: true,
      slug: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <>
      <div className="bg-white w-full xl:w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating />
        <Description description={restaurant.description} />
        <div className="w-full mt-6 text-reg xl:hidden">
          <ReservationCard
            openTime={restaurant.open_time}
            closeTime={restaurant.close_time}
            slug={restaurant.slug}
          />
        </div>
        <Images images={restaurant.images}/>
        <Reviews slug={restaurant.slug} id={restaurant.id} />
      </div>
      <div className="hidden xl:flex xl:w-[27%] xl:relative xl:text-reg">
        <ReservationCard
          openTime={restaurant.open_time}
          closeTime={restaurant.close_time}
          slug={restaurant.slug}
        />
      </div>
    </>
  );
}
