import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { getCategories, getCategoryOptions } from "./api";

import { GetCategoriesResponse, GetCategoryOptionsResponse } from "./types";
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
        retry: false,
        ...options,
    });
};


export const useGetCategories = (
    options?: UseQueryOptions<
        ApiResponse<GetCategoriesResponse>,
        ApiError,
        ApiResponse<GetCategoriesResponse>
    >,
): UseQueryResult<ApiResponse<GetCategoriesResponse>, ApiError> => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getCategories],
        queryFn: () => safeAxios(() => getCategories()),
        retry: false,
        ...options,
    });
};