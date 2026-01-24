import { Types } from "mongoose";
import Review from "./review.model";
import { ReviewPayload } from "./review.schema";

import { CustomError } from "@/api/utils/response";
import { findTour } from "../tour/tour.service";


export const createReview = async (tourId: string, payload: ReviewPayload) => {
    const id = new Types.ObjectId(tourId);

    const review = await Review.create({
        tourId: id,
        reviewerName: payload.reviewerName,
        rating: payload.rating,
        comment: payload.comment,
        imageUrl: payload.imageUrl || null,
    });

    return review.toObject();
};


export const updateReview = async (reviewId: string, payload: ReviewPayload) => {
    const id = new Types.ObjectId(reviewId);

    const review = await Review.findByIdAndUpdate(
        id,
        { 
            $set: {
                reviewerName: payload.reviewerName,
                rating: payload.rating,
                comment: payload.comment,
                imageUrl: payload.imageUrl || null,
            }
        },
        { new: true }
    ).lean();

    if (!review) {
        throw new CustomError(404, 'Review not found');
    }

    return review;
};


export const deleteReview = async (reviewId: string) => {
    const id = new Types.ObjectId(reviewId);
    const review = await Review.findByIdAndDelete(id).lean();

    if (!review) {
        throw new CustomError(404, 'Review not found');
    }
};


export const getReviewsByTourId = async (tourId: string) => {
    const id = new Types.ObjectId(tourId);

    const tour = await findTour({ _id: id }, ['name', 'thumbnailImage', 'slug']);

    if (!tour) {
        throw new CustomError(404, 'Tour not found');
    }

    const reviews = await Review.find({ tourId: id })
        .sort({ createdAt: -1 })
        .lean();

    return { tour, reviews };
};
