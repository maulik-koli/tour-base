import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { getBookingData } from "./api";

import { GetBookingDataParams, GetBookingDataResponse } from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useBookingData = (
    params: GetBookingDataParams,
    options?: Omit<UseQueryOptions<
        ApiResponse<GetBookingDataResponse>,
        ApiError,
        ApiResponse<GetBookingDataResponse>
    >, 'queryKey' | 'queryFn'>,
): UseQueryResult<ApiResponse<GetBookingDataResponse>, ApiError> => {
    const isEnabled = !!params.bookingId && params.bookingId.trim() !== "";

    return useQuery({
        queryKey: [QUERY_REGISTRY.getBookingData, params],
        queryFn: () => safeAxios(() => getBookingData(params)),
        retry: false,
        enabled: isEnabled,
        staleTime: 0,
        gcTime: 0,
        ...options,
    });
};