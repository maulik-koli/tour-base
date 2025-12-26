import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { getFeaturedTours, getTour, getTours } from "./api";

import { GetToursResponse, GetToursParams, GetTourResponse, GetTourParam, GetFeatureToursResponse } from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useGetTours = (
    params?: GetToursParams,
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


export const useGetTour = (
    params: GetTourParam,
    enabled: boolean = true,
    options?: UseQueryOptions<
        ApiResponse<GetTourResponse>,
        ApiError,
        ApiResponse<GetTourResponse>
    >,
): UseQueryResult<ApiResponse<GetTourResponse>, ApiError> => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getTours, params],
        queryFn: () => safeAxios(() => getTour(params)),
        retry: false,
        enabled: enabled,
        ...options,
    });
};


export const useGetFeaturedTours = (
    options?: UseQueryOptions<
        ApiResponse<GetFeatureToursResponse>,
        ApiError,
        ApiResponse<GetFeatureToursResponse>
    >,
): UseQueryResult<ApiResponse<GetFeatureToursResponse>, ApiError> => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getFeaturedTours],
        queryFn: () => safeAxios(() => getFeaturedTours()),
        retry: false,
        ...options,
    });
}