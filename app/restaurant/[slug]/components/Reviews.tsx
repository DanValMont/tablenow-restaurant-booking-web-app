"use client";

import { AuthenticationContext } from "@/context/AuthContext";
import { ReviewsContext } from "@/context/ReviewContext";
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { IsBookedContext } from "@/context/BookedContext";

export default function Reviews({ slug, id }: { slug: string; id: number }) {
  const { data } = useContext(AuthenticationContext);
  const { setReviewState, reviewLoading } = useContext(ReviewsContext);
  const { booked, setBookedState } = useContext(IsBookedContext);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!data) {
        throw new Error();
      } else {
        await axios.post(`/api/restaurant/${slug}/reviews`, {
          first_name: data.firstName,
          last_name: data.lastName,
          text: comment,
          rating,
          restaurant_id: id,
          user_id: data.id,
        });
        
        setComment("");
        setRating(0);

        setLoading(false);
        fetchReviews();
      }
    } catch (err: any) {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setReviewState({
      reviewLoading: true,
      reviewData: null,
      reviewError: null,
    });

    setBookedState({ booked: false });
    try {
      const res1 = await axios.get(`/api/restaurant/${slug}/reviews`);

      const res2 = await axios.get(
        `/api/restaurant/${slug}/booking/${data?.email}/user`
      );

      setReviews(res1.data.reviews);

      setBookedState({ booked: res2.data.bookings.length > 0 ? true : false });
      setReviewState({
        reviewLoading: false,
        reviewData: res1.data.reviews.map(
          (review: { rating: number }) => review.rating
        ),
        reviewError: null,
      });
    } catch (error: any) {
      setReviewState({
        reviewLoading: false,
        reviewData: null,
        reviewError: error.response.data.errorMessage,
      });
    }
  };
  useEffect(() => {
    fetchReviews();
  }, [data]);

  return (
    <div>
      {data && booked ? (
        <form onSubmit={submitHandler} className="w-full max-w-[70%]">
          <List>
            <ListItem>
              <Typography
                variant="h2"
                sx={{ fontSize: "2rem" }}
              >{`Leave your review, ${data.firstName}`}</Typography>
            </ListItem>
            <ListItem>
              <TextField
                multiline
                variant="outlined"
                fullWidth
                name="review"
                label="Enter comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <Rating
                sx={{ color: "#dc2625" }}
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
              />
            </ListItem>
            <ListItem>
              <Button
                sx={{
                  backgroundColor: "#dc2625",
                  "&:hover": { backgroundColor: "#dc2625" },
                }}
                type="submit"
                fullWidth
                variant="contained"
                // color="primary"
              >
                Submit
              </Button>

              {(reviewLoading || loading) && (
                <CircularProgress></CircularProgress>
              )}
            </ListItem>
          </List>
        </form>
      ) : null}
      {reviewLoading || loading ? (
        <CircularProgress></CircularProgress>
      ) : (
        <>
          <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
            {`What ${reviews.length} ${
              reviews.length === 1 ? "person is" : "people are"
            } saying`}
          </h1>
          <div>
            {reviews.length === 0 && <ListItem>No reviews yet</ListItem>}
            {reviews.map((review, id) => (
              <ReviewCard review={review} key={id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
