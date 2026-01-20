import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { getActivities, getActivityDetails } from "./api";

import { GetActivitiesParams, GetActivitiesResponse, GetActivityDetailsParams, GetActivityDetailsResponse } from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useGetActivities = (
    params: GetActivitiesParams,
    options?: UseQueryOptions<
        ApiResponse<GetActivitiesResponse>,
        ApiError,
        ApiResponse<GetActivitiesResponse>
    >,
): UseQueryResult<ApiResponse<GetActivitiesResponse>, ApiError> => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getActivities, params],
        queryFn: () => safeAxios(() => getActivities(params)),
        retry: false,
        ...options,
    });
};


export const useGetActivityDetails = (
    params: GetActivityDetailsParams,
    options?: UseQueryOptions<
        ApiResponse<GetActivityDetailsResponse>,
        ApiError,
        ApiResponse<GetActivityDetailsResponse>
    >,
): UseQueryResult<ApiResponse<GetActivityDetailsResponse>, ApiError> => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getActivityDetails, params],
        queryFn: () => safeAxios(() => getActivityDetails(params)),
        retry: false,
        ...options,
    });
};
