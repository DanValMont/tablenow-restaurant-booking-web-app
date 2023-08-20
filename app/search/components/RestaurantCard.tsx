import Price from "@/app/components/Price";
import Stars from "@/app/components/Stars";
import Link from "next/link";
import { RestaurantCardTypeByCity } from "../page";

interface Props {
  restaurant: RestaurantCardTypeByCity;
}

export default function RestaurantCard({ restaurant }: Props) {
  const overallOpinion = () => {
    const avgRating =
      restaurant.reviews.reduce((sum, review) => sum + review.rating, 0) /
      restaurant.reviews.length;

    if (avgRating >= 4) {
      return "Awesome";
    }

    if (avgRating >= 3) {
      return "Good";
    }

    if (avgRating >= 0) {
      return "Average";
    }

    if (!avgRating) {
      return "Not rated yet";
    }
  };

  return (
    <div className="border-b flex flex-col md:flex-row pb-5 ml-4 mr-4 md:mr-0 mt-4 md:mt-0">
      <img
        src={restaurant.main_image}
        alt={restaurant.name}
        className="md:w-44 md:h-36 w-full  rounded"
      />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars reviews={restaurant.reviews} />
          </div>
          <p className="ml-2 text-sm">{overallOpinion()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}
