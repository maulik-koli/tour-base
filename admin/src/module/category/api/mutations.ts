import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { createCategory, deleteCategory, updateCategory } from "./api";

import { 
    CreateCategoryPayload,
    CreateCategoryResponse,
    DeleteCategoryPayload,
    DeleteCategoryResponse,
    UpdateCategoryPayload,
    UpdateCategoryResponse,
} from "./types";
import { ApiResponse, ApiError } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useCreateCategory = (
    options?: UseMutationOptions<
        ApiResponse<CreateCategoryResponse>,
        ApiError,
        CreateCategoryPayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createCategory],
        mutationFn: (payload) => safeAxios(() => createCategory(payload)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getCategories] });
        },
        ...options,
    });
}


export const useUpdateCategory = (
    options?: UseMutationOptions<
        ApiResponse<UpdateCategoryResponse>,
        ApiError,
        UpdateCategoryPayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateCategory],
        mutationFn: (payload) => safeAxios(() => updateCategory(payload)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getCategories] });
        },
        ...options,
    });
}


export const useDeleteCategory = (
    options?: UseMutationOptions<
        ApiResponse<DeleteCategoryResponse>,
        ApiError,
        DeleteCategoryPayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.deleteCategory],
        mutationFn: (payload) => safeAxios(() => deleteCategory(payload)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getCategories] });
        },
        ...options,
    });
}