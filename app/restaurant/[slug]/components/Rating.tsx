"use client";

import { ReviewsContext } from "@/context/ReviewContext";
import { CircularProgress } from "@mui/material";

import { useContext, useEffect } from "react";
import Stars from "./Stars";

export default function Rating() {
  const { reviewLoading, reviewData } = useContext(ReviewsContext);

  let ratings = reviewData!;

  useEffect(() => {}, [reviewData, reviewLoading]);

  return (
    <div className="flex items-end">
      {reviewLoading ? (
        <CircularProgress></CircularProgress>
      ) : (
        <>
          <div className="ratings mt-2 flex items-center">
            <Stars ratings={ratings} />
            <p className="text-reg ml-3">
              {ratings.length === 0
                ? 0
                : (
                    ratings.reduce((sum, rating) => sum + Number(rating), 0) /
                    ratings.length
                  ).toFixed(1)}
            </p>
          </div>
          <div>
            <p className="text-reg ml-4">
              {ratings.length} Review{ratings.length === 1 ? "" : "s"}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
