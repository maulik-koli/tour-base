import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { createReview, updateReview, deleteReview } from "./api";

import {
    CreateReviewPayload,
    CreateReviewResponse,
    UpdateReviewPayload,
    UpdateReviewResponse,
    DeleteReviewPayload,
    DeleteReviewResponse,
} from "./types";
import { ApiResponse, ApiError } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useCreateReview = (
    options?: UseMutationOptions<
        ApiResponse<CreateReviewResponse>,
        ApiError,
        CreateReviewPayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createReview],
        mutationFn: (payload) => safeAxios(() => createReview(payload)),
        onSuccess: (_, payload) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_REGISTRY.getTourReviews, { tourId: payload.tourId }],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_REGISTRY.getTourReviewList],
            });
        },
        ...options,
    });
};


export const useUpdateReview = (
    tourId: string,
    options?: UseMutationOptions<
        ApiResponse<UpdateReviewResponse>,
        ApiError,
        UpdateReviewPayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateReview],
        mutationFn: (payload) => safeAxios(() => updateReview(payload)),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_REGISTRY.getTourReviews, { tourId }],
            });
        },
        ...options,
    });
};


export const useDeleteReview = (
    tourId: string,
    options?: UseMutationOptions<
        ApiResponse<DeleteReviewResponse>,
        ApiError,
        DeleteReviewPayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.deleteReview],
        mutationFn: (payload) => safeAxios(() => deleteReview(payload)),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_REGISTRY.getTourReviews, { tourId }],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_REGISTRY.getTourReviewList],
            });
        },
        ...options,
    });
};
