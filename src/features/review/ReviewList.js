import { Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { REVIEW_PER_PAGE } from "../../app/config";
import LoadingScreen from "../../components/LoadingScreen";
import ReviewCard from "./ReviewCard";
import { getReviews } from "./reviewSlice";

function ReviewList({ productId }) {
  const {
    reviewsByProduct,
    reviewsById,
    totalReviews,
    isLoading,
    currentPage,
  } = useSelector(
    (state) => ({
      reviewsByProduct: state?.review?.reviewsByProduct[productId],
      totalReviews: state?.review?.totalReviewsByProduct[productId],
      currentPage: state?.review?.currentPageByProduct[productId] || 1,
      reviewsById: state?.review?.reviewsById,
      isLoading: state?.review?.isLoading,
    }),
    shallowEqual
  );

  const totalPages = Math.ceil(totalReviews / REVIEW_PER_PAGE);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) dispatch(getReviews({ productId }));
  }, [productId, dispatch]);

  let renderReviews;
  if (reviewsByProduct) {
    const reviews = reviewsByProduct?.map((reviewId) => reviewsById[reviewId]);
    renderReviews = (
      <Stack spacing={1.5}>
        {reviews?.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderReviews = <LoadingScreen />;
  }

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
          {totalReviews > 1
            ? `${totalReviews} reviews`
            : totalReviews === 1
            ? `${totalReviews} review`
            : "No review"}
        </Typography>

        {totalReviews > REVIEW_PER_PAGE && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => dispatch(getReviews({ productId, page }))}
          />
        )}
      </Stack>
      {renderReviews}
    </Stack>
  );
}

export default ReviewList;
