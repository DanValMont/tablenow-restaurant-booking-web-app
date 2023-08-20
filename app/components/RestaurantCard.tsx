import Link from "next/link";
import { RestaurantCardType } from "../page";
import Price from "./Price";
import Stars from "./Stars";

interface Props {
  restaurant: RestaurantCardType;
}

export default function RestaurantCard({ restaurant }: Props) {
  const today = new Date().toISOString().split("T")[0];

  const bookedToday = restaurant.bookings.filter(
    (booking) => booking.created_at.toISOString().split("T")[0] === today
  );

  return (
    <div
      className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer"
      key={restaurant.id}
    >
      <Link href={`restaurant/${restaurant.slug}`}>
        <img src={restaurant.main_image} alt={restaurant.name} className="w-full h-36" />
        <div className="p-1">
          <h3 className="text-black font-bold text-2xl mb-2">
            {restaurant.name}
          </h3>
          <div className="flex items-start">
            <Stars reviews={restaurant.reviews} />
            <p className="ml-2">
              {restaurant.reviews.length} review
              {restaurant.reviews.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className="mr-3">{restaurant.cuisine.name}</p>
            <Price price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">{`Booked ${bookedToday.length} times today`}</p>
        </div>
      </Link>
    </div>
  );
}
