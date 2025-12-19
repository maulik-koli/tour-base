import { ApiError, ApiResponse } from "@/types/api";
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { GetTourResponse, GetToursParams } from "./types";
import { safeAxios } from "@/lib/axios";
import { getTours } from "./apis";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useGetTours = (
    params?: GetToursParams,
    options?: UseQueryOptions<
        ApiResponse<GetTourResponse>,
        ApiError,
        ApiResponse<GetTourResponse>
    >,
): UseQueryResult<ApiResponse<GetTourResponse>, ApiError> => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getTours, params],
        queryFn: () => safeAxios(() => getTours(params)),
        staleTime: 1000 * 60,
        retry: false,
        ...options,
    });
};