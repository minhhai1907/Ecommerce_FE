import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { REACT_APP_LIMIT, REVIEW_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  reviewsByProduct: {},
  totalReviewsByProduct: {},
  currentPageByProduct: [],
  reviewsById: {},
};

const slice = createSlice({
  name: "review",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getReviewsSuccess(state, action) {
      state.isLoading = false;
      state.error = "";
      const { productId, results, totalResults, page } = action.payload;

      results.forEach((review) => (state.reviewsById[review._id] = review));
      state.reviewsByProduct[productId] = results
        .map((review) => review._id)
        .reverse();
      state.totalReviewsByProduct[productId] = totalResults;
      state.currentPageByProduct[productId] = page;
    },

    createReviewSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    sendReviewReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { reviewId, reactions } = action.payload;

      state.reviewsById[reviewId].totalRatings = reactions.totalRatings;
      state.reviewsById[reviewId].rateAverage = reactions.rateAverage;
    },
  },
});

export default slice.reducer;

export const {
  startLoading,
  hasError,
  getReviewsSuccess,
  createReviewSuccess,
  sendReviewReactionSuccess,
} = slice.actions;

export const getReviews =
  ({ productId, page = 1, limit = REVIEW_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const params = {
        page: page,
        limit: limit,
      };

      const response = await apiService.get(`/review/products/${productId}`, {
        params,
      });
      console.log("getreview",response.data)
      if (response) {
        dispatch(
          getReviewsSuccess({
            ...response.data.data,
            productId,
            page,
          })
        );
      }
    } catch (error) {
      dispatch(hasError(error.message));
      toast.error(error.message);
    }
  };

export const createReview =
  ({ productId, comments }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await apiService.post(`/review/me/create/${productId}`, {
        comments,
      });
      console.log("response",response.data)
      dispatch(createReviewSuccess(response.data.data));
      dispatch(getReviews({ productId }));
    } catch (error) {
      dispatch(hasError(error.message));
      toast.error(error.message);
    }
  };

export const sendReviewReaction =
  ({ reviewId, rate }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await apiService.post(`/reaction`, {
        refPaths: "Reviews",
        targetId: reviewId,
        rate,
      });
      dispatch(
        sendReviewReactionSuccess({
          reviewId,
          reactions: response.data,
        })
      );
    } catch (error) {
      dispatch(hasError(error.message));
      toast.error(error.message);
    }
  };
