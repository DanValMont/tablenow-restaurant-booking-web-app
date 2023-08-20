import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import {
  Booking,
  Cuisine,
  Location,
  PRICE,
  PrismaClient,
  Review,
} from "@prisma/client";

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  reviews: Review[];
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
  bookings: Booking[];
}

const prisma = new PrismaClient();

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      reviews: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true,
      bookings: true,
    },
  });
  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();
  return (
    <main>
      <Header />
      <div className="py-3 lg:px-36 mt-10 flex flex-wrap justify-evenly ">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
