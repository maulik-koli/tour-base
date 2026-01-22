import { getAllToursWithReviewCount } from "../tour/tour.service";
import { ReviewPayload, TourListWithReviewsParams } from "./review.schema";
import { createReview, deleteReview, getReviewsByTourId, updateReview } from "./review.service";

import { asyncWrapper } from "@/api/utils/asyncWrapper";
import { successResponse } from "@/api/utils/response";


export const createReviewController = asyncWrapper(async (req, res) => {
    const tourId = req.params.tourId;
    const payload = req.body as ReviewPayload;

    const review = await createReview(tourId, payload);

    successResponse(res, {
        message: "Review created successfully",
        status: 201,
        data: review,
    });
});


export const updateReviewController = asyncWrapper(async (req, res) => {
    const reviewId =req.params.reviewId;
    const payload = req.body as ReviewPayload;

    const review = await updateReview(reviewId, payload);

    successResponse(res, {
        message: "Review updated successfully",
        status: 200,
        data: review,
    });
});


export const deleteReviewController = asyncWrapper(async (req, res) => {
    const reviewId = req.params.reviewId;

    await deleteReview(reviewId);

    successResponse(res, {
        message: "Review deleted successfully",
        status: 200,
        data: null,
    });
});


export const getReviewsByTourController = asyncWrapper(async (req, res) => {
    const tourId = req.params.tourId;

    const reviews = await getReviewsByTourId(tourId);

    successResponse(res, {
        message: "Reviews fetched successfully",
        status: 200,
        data: reviews,
    });
});


export const getTousWithReviewCountsCotroller = asyncWrapper(async (req, res) => {
    const params = req.localsQuery as TourListWithReviewsParams;
    const tours = await getAllToursWithReviewCount();
    
    successResponse(res, {
        message: "Reviews fetched successfully",
        status: 200,
        data: tours,
    });
});