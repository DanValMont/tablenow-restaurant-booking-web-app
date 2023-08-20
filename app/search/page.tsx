import { Cuisine, Location, PRICE, PrismaClient, Review } from "@prisma/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

export const metadata = {
  title: "Search | tablenow",
  description: "Search results",
};

export interface RestaurantCardTypeByCity {
  id: number;
  name: string;
  main_image: string;
  reviews: Review[];
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
}

interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

const prisma = new PrismaClient();

const findRestaurantsByCity = (
  searchParms: SearchParams
): Promise<RestaurantCardTypeByCity[]> => {
  const where: any = {};

  if (searchParms.city) {
    const location = {
      name: {
        equals: searchParms.city.toLowerCase(),
      },
    };

    where.location = location;
  }

  if (searchParms.cuisine) {
    const cuisine = {
      name: {
        equals: searchParms.cuisine.toLowerCase(),
      },
    };

    where.cuisine = cuisine;
  }

  if (searchParms.price) {
    const price = {
      equals: searchParms.price,
    };

    where.price = price;
  }
  const select = {
    id: true,
    name: true,
    main_image: true,
    reviews: true,
    slug: true,
    price: true,
    location: true,
    cuisine: true,
  };

  return prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchLocations = async () => {
  const locations = await prisma.location.findMany();
  return locations.map((location) => JSON.parse(JSON.stringify(location)));
};

const fetchCuisine = async () => {
  const cuisines = await prisma.cuisine.findMany();
  return cuisines.map((cuisine) => JSON.parse(JSON.stringify(cuisine)));
};

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const restaurants = await findRestaurantsByCity(searchParams);
  const location = await fetchLocations();
  const cuisine = await fetchCuisine();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto md:w-2/3 w-full justify-between flex-col md:flex-row items-start">
        <SearchSideBar
          locations={location}
          cuisines={cuisine}
          searchParams={searchParams}
        />
        <div className="md:w-5/6 w-full">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <p>Sorry, we found no restaurants in this area </p>
          )}
        </div>
      </div>
    </>
  );
}
