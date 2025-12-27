import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { getProfile } from "./apis";

import { GetProfileResponse } from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useGetProfile = (
    options?: UseQueryOptions<
        ApiResponse<GetProfileResponse>,
        ApiError,
        ApiResponse<GetProfileResponse>
    >,
): UseQueryResult<ApiResponse<GetProfileResponse>, ApiError> => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getCategoryOptions],
        queryFn: () => safeAxios(() => getProfile()),
        retry: false,
        ...options,
    });
};