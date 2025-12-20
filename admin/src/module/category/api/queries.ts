import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { getCategoryOptions } from "./api";

import { GetCategoryOptionsResponse } from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useGetCategoryOptions = (
    options?: UseQueryOptions<
        ApiResponse<GetCategoryOptionsResponse>,
        ApiError,
        ApiResponse<GetCategoryOptionsResponse>
    >,
): UseQueryResult<ApiResponse<GetCategoryOptionsResponse>, ApiError> => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getCategoryOptions],
        queryFn: () => safeAxios(() => getCategoryOptions()),
        staleTime: 1000 * 60,
        retry: false,
        ...options,
    });
};