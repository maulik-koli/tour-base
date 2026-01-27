import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { closeRequest, deleteRequest } from "./api";

import { 
    CloseRequestPayload, 
    CloseRequestResponse, 
    DeleteRequestPayload, 
    DeleteRequestResponse 
} from "./types";
import { ApiResponse, ApiError } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useCloseRequest = (
    options?: UseMutationOptions<
        ApiResponse<CloseRequestResponse>,
        ApiError,
        CloseRequestPayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.closeRequest],
        mutationFn: (payload) => safeAxios(() => closeRequest(payload)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getRequestList] });
        },
        ...options,
    });
};


export const useDeleteRequest = (
    options?: UseMutationOptions<
        ApiResponse<DeleteRequestResponse>,
        ApiError,
        DeleteRequestPayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.deleteRequest],
        mutationFn: (payload) => safeAxios(() => deleteRequest(payload)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getRequestList] });
        },
        ...options,
    });
};
