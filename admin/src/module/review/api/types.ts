import { PaginationType } from "@/types/api";
import { ReviewFormType } from "../utils/schema";

export interface TourReviewListItem {
    _id: string;
    name: string;
    slug: string;
    reviewCount: number;
}

export interface GetTourReviewListParams {
    search?: string;
    page?: number;
    limit?: number;
}

export type TourReviewFilterFields = keyof GetTourReviewListParams;

export interface GetTourReviewListResponse {
    tours: TourReviewListItem[];
    pagination: PaginationType;
}


export interface ReviewItem extends ReviewFormType {
    _id: string;
    tourId: string;
    createdAt: string;
    updatedAt: string;
}

export interface TourReviewDetail {
    _id: string;
    name: string;
    slug: string;
    thumbnailImage: string;
}

export interface GetTourReviewsParams {
    tourId: string;
}

export interface GetTourReviewsResponse {
    tour: TourReviewDetail;
    reviews: ReviewItem[];
}


// Create Review Types
export interface CreateReviewPayload {
    tourId: string;
    data: ReviewFormType;
}

export type CreateReviewResponse = null;


// Update Review Types
export interface UpdateReviewPayload {
    reviewId: string;
    data: ReviewFormType;
}

export type UpdateReviewResponse = ReviewItem;


// Delete Review Types
export interface DeleteReviewPayload {
    reviewId: string;
}

export type DeleteReviewResponse = null;
