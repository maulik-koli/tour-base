import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { getRequestList } from "./api";

import { GetRequestListParams, GetRequestListResponse } from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useGetRequestList = (
    params?: GetRequestListParams,
    options?: UseQueryOptions<
        ApiResponse<GetRequestListResponse>,
        ApiError,
        ApiResponse<GetRequestListResponse>
    >,
): UseQueryResult<ApiResponse<GetRequestListResponse>, ApiError> => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getRequestList, params],
        queryFn: () => safeAxios(() => getRequestList(params)),
        retry: false,
        ...options,
    });
};
