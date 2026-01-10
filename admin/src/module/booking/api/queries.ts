import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { getBookingDetails, getBookingList } from "./api";

import { GetBookingDetailsParams, GetBookingDetailsResponse, GetBookingListParams, GetBookingListResponse } from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useGetBookingList = (
    params?: GetBookingListParams,
    options?: UseQueryOptions<
        ApiResponse<GetBookingListResponse>,
        ApiError,
        ApiResponse<GetBookingListResponse>
    >,
): UseQueryResult<ApiResponse<GetBookingListResponse>, ApiError> => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getBookingList, params],
        queryFn: () => safeAxios(() => getBookingList(params)),
        retry: false,
        ...options,
    });
};


export const useGetBookingDetails = (
    params: GetBookingDetailsParams,
    options?: UseQueryOptions<
        ApiResponse<GetBookingDetailsResponse>,
        ApiError,
        ApiResponse<GetBookingDetailsResponse>
    >,
): UseQueryResult<ApiResponse<GetBookingDetailsResponse>, ApiError> => {
    
    return useQuery({
        queryKey: [QUERY_REGISTRY.getBookingDetails, params],
        queryFn: () => safeAxios(() => getBookingDetails(params)),
        retry: false,
        ...options,
    });
};
