import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { getFeaturedTours, getTour, getTours } from "./api";

import { GetToursResponse, GetToursParams, GetTourDetailResponse, GetTourDetailParam, FeatureToursResponse } from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useGetTours = (
    params: GetToursParams,
    options?: UseQueryOptions<
        ApiResponse<GetToursResponse>,
        ApiError,
        ApiResponse<GetToursResponse>
    >,
): UseQueryResult<ApiResponse<GetToursResponse>, ApiError> => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getTours, params],
        queryFn: () => safeAxios(() => getTours(params)),
        retry: false,
        ...options,
    });
};


export const useGetTourDetail = (
    params: GetTourDetailParam,
    options?: UseQueryOptions<
        ApiResponse<GetTourDetailResponse>,
        ApiError,
        ApiResponse<GetTourDetailResponse>
    >,
): UseQueryResult<ApiResponse<GetTourDetailResponse>, ApiError> => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getTour, params],
        queryFn: () => safeAxios(() => getTour(params)),
        retry: false,
        ...options,
    });
};


export const useGetFeaturedTours = (
    options?: UseQueryOptions<
        ApiResponse<FeatureToursResponse>,
        ApiError,
        ApiResponse<FeatureToursResponse>
    >,
): UseQueryResult<ApiResponse<FeatureToursResponse>, ApiError> => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getFeaturedTours],
        queryFn: () => safeAxios(() => getFeaturedTours()),
        retry: false,
        ...options,
    });
};