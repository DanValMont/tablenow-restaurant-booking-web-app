import { PrismaClient } from "@prisma/client";
import { Metadata } from "next";
import Menu from "../components/Menu";
import RestaurantNavBar from "../components/RestaurantNavBar";

const prisma = new PrismaClient();

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: params.slug,
    },
    select: {
      description: true,
    },
  });

  if (!restaurant) {
    return {
      title: "Restaurant not found",
      description: "",
    };
  }

  return {
    title: `${params.slug} | tablenow`,
    description: `${restaurant.description}`,
  };
}

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (!restaurant) {
    throw new Error();
  }
  return restaurant.items;
};

export default async function RestaurantMenu({
  params,
}: {
  params: { slug: string };
}) {
  const menu = await fetchRestaurantMenu(params.slug);
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar slug={params.slug} />
        <Menu menu={menu} />
      </div>
    </>
  );
}
