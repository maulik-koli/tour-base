import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { getTourReviewList, getTourReviews } from "./api";

import {
    GetTourReviewListParams,
    GetTourReviewListResponse,
    GetTourReviewsParams,
    GetTourReviewsResponse,
} from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useGetTourReviewList = (
    params?: GetTourReviewListParams,
    options?: UseQueryOptions<
        ApiResponse<GetTourReviewListResponse>,
        ApiError,
        ApiResponse<GetTourReviewListResponse>
    >
): UseQueryResult<ApiResponse<GetTourReviewListResponse>, ApiError> => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getTourReviewList, params],
        queryFn: () => safeAxios(() => getTourReviewList(params)),
        retry: false,
        ...options,
    });
};


export const useGetTourReviews = (
    params: GetTourReviewsParams,
    options?: UseQueryOptions<
        ApiResponse<GetTourReviewsResponse>,
        ApiError,
        ApiResponse<GetTourReviewsResponse>
    >
): UseQueryResult<ApiResponse<GetTourReviewsResponse>, ApiError> => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getTourReviews, params],
        queryFn: () => safeAxios(() => getTourReviews(params)),
        retry: false,
        ...options,
    });
};
