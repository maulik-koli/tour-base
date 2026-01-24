import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import {
    GetTourReviewListParams,
    GetTourReviewListResponse,
    GetTourReviewsParams,
    GetTourReviewsResponse,
    CreateReviewPayload,
    CreateReviewResponse,
    UpdateReviewPayload,
    UpdateReviewResponse,
    DeleteReviewPayload,
    DeleteReviewResponse,
} from "./types";


export const getTourReviewList = async (
    params?: GetTourReviewListParams
): Promise<ApiResponse<GetTourReviewListResponse>> => {
    const res = await api.get("/review/tours", { params });
    return res.data;
};


export const getTourReviews = async (
    params: GetTourReviewsParams
): Promise<ApiResponse<GetTourReviewsResponse>> => {
    const res = await api.get(`/review/tours/${params.tourId}`);
    return res.data;
};


export const createReview = async (
    payload: CreateReviewPayload
): Promise<ApiResponse<CreateReviewResponse>> => {
    const res = await api.post(`/review/tours/${payload.tourId}`, payload.data);
    return res.data;
};


export const updateReview = async (
    payload: UpdateReviewPayload
): Promise<ApiResponse<UpdateReviewResponse>> => {
    const res = await api.put(`/review/${payload.reviewId}`, payload.data);
    return res.data;
};


export const deleteReview = async (
    payload: DeleteReviewPayload
): Promise<ApiResponse<DeleteReviewResponse>> => {
    const res = await api.delete(`/review/${payload.reviewId}`);
    return res.data;
};
