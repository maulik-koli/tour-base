import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { getRequestSession } from "./api";

import { GetRequestSessionParams, GetRequestSessionResponse } from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useRequestSession = (
    params: GetRequestSessionParams,
    options?: UseQueryOptions<
        ApiResponse<GetRequestSessionResponse>,
        ApiError,
        ApiResponse<GetRequestSessionResponse>
    >,
): UseQueryResult<ApiResponse<GetRequestSessionResponse>, ApiError> => {

    return useQuery({
        queryKey: [QUERY_REGISTRY.getRequestSession, params],
        queryFn: () => safeAxios(() => getRequestSession(params)),
        enabled: !!params.sessionId,
        retry: false,
        ...options,
    });
};
