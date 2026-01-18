import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { createActivity, deleteActivity, updateActivity } from "./api";

import { CreateActivityResponse, CreateActivityPayload, DeleteActivityPayload, DeleteActivityResponse, UpdateActivityPayload, UpdateActivityResponse } from "./types";
import { ApiResponse, ApiError } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useCreateActivity = (
    options?: UseMutationOptions<
        ApiResponse<CreateActivityResponse>,
        ApiError,
        CreateActivityPayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createActivity],
        mutationFn: (payload) => safeAxios(() => createActivity(payload)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getActivities] });
        },
        ...options,
    });
}


export const useUpdateActivity = (
    options?: UseMutationOptions<
        ApiResponse<UpdateActivityResponse>,
        ApiError,
        UpdateActivityPayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateActivity],
        mutationFn: (payload) => safeAxios(() => updateActivity(payload)),
        onMutate: async (payload) => {
            await queryClient.cancelQueries({ 
                queryKey: [QUERY_REGISTRY.getActivities, { slug: payload.slug }]
            });
        },
        onSuccess: (_, payload) => {
            queryClient.removeQueries({ 
                queryKey: [QUERY_REGISTRY.getActivities, { slug: payload.slug }] 
            });

            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getActivities] });
        },
        ...options,
    });
}

export const useDeleteActivity = (
    options?: UseMutationOptions<
        ApiResponse<DeleteActivityResponse>,
        ApiError,
        DeleteActivityPayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.deleteActivity],
        mutationFn: (payload) => safeAxios(() => deleteActivity(payload)),
        onMutate: async (payload) => {
            await queryClient.cancelQueries({ 
                queryKey: [QUERY_REGISTRY.getActivities, { slug: payload.slug }]
            });
        },
        onSuccess: (_, payload) => {
            queryClient.removeQueries({ 
                queryKey: [QUERY_REGISTRY.getActivities, { slug: payload.slug }] 
            });

            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getActivities] });
        },
        ...options,
    });
}
