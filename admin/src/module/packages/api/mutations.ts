import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { addPackage, deletePackage, updatePackage } from "./api";

import { 
    CreatePackagePayload,
    CreatePackageResponse,
    DeletePackagePayload,
    UpdatePackagePayload,
    UpdatePackageResponse
} from "./types";
import { ApiResponse, ApiError } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useAddPackage = (
    options?: UseMutationOptions<
        ApiResponse<CreatePackageResponse>,
        ApiError,
        CreatePackagePayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.addPackage],
        mutationFn: (payload) => safeAxios(() => addPackage(payload)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getTours] });
        },
        ...options,
    });
}


export const useUpdatePackage = (
    options?: UseMutationOptions<
        ApiResponse<UpdatePackageResponse>,
        ApiError,
        UpdatePackagePayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updatePackage],
        mutationFn: (payload) => safeAxios(() => updatePackage(payload)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getTours] });
        },
        ...options,
    });
}


export const useDeletePackage = (
    options?: UseMutationOptions<
        ApiResponse<void>,
        ApiError,
        DeletePackagePayload
    >
) => {
    const queryClient = useQueryClient();

     return useMutation({
        mutationKey: [MUTATION_REGISTRY.deletePackage],
        mutationFn: (payload) => safeAxios(() => deletePackage(payload)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getTours] });
        },
        ...options,
    });
}
