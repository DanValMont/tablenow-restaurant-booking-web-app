import { PrismaClient } from "@prisma/client";
import Header from "./components/Header";

const prisma = new PrismaClient();

export default async function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: params.slug,
    },
    select: {
      main_image: true,
    },
  });
  return (
    <main>
      <Header name={params.slug} image={restaurant?.main_image!} />
      <div className="flex flex-col md:flex-row m-auto w-full md:w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </main>
  );
}
