"use client";

import React, { createContext, useState } from "react";

interface Review {
  rating: number;
}

interface State {
  reviewLoading: boolean;
  reviewData: Review[] | null;
  reviewError: string | null;
}

interface ReviewState extends State {
  setReviewState: React.Dispatch<React.SetStateAction<State>>;
}

export const ReviewsContext = createContext<ReviewState>({
  reviewLoading: false,
  reviewData: null,
  reviewError: null,

  setReviewState: () => {},
});

export default function ReviewContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reviewState, setReviewState] = useState<State>({
    reviewLoading: true,
    reviewData: null,
    reviewError: null,
  });

  return (
    <ReviewsContext.Provider value={{ ...reviewState, setReviewState }}>
      {children}
    </ReviewsContext.Provider>
  );
}
