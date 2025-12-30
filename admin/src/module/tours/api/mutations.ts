import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { createTour, deleteTour, toggleFeaturedTour, updateTour } from "./api";

import { CreateTourResponse, CreateToutPayload, DeleteTourPalyload, DeleteTourResponse, ToggleFeaturedTourPayload, ToggleFeaturedTourResponse, UpdateTourPayload, UpdateTourResponse } from "./types";
import { ApiResponse, ApiError } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useCreateTour = (
    options?: UseMutationOptions<
        ApiResponse<CreateTourResponse>,
        ApiError,
        CreateToutPayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createTour],
        mutationFn: (payload) => safeAxios(() => createTour(payload)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getTours] });
        },
        ...options,
    });
}


export const useUpdateTour = (
    options?: UseMutationOptions<
        ApiResponse<UpdateTourResponse>,
        ApiError,
        UpdateTourPayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateTour],
        mutationFn: (payload) => safeAxios(() => updateTour(payload)),
        onMutate: async (payload) => {
            await queryClient.cancelQueries({ 
                queryKey: [QUERY_REGISTRY.getTours, { slug: payload.slug }]
            });
        },
        onSuccess: (_, payload) => {
            queryClient.removeQueries({ 
                queryKey: [QUERY_REGISTRY.getTours, { slug: payload.slug }] 
            });

            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getTours] });
        },
        ...options,
    });
}

export const useDeleteTour = (
    options?: UseMutationOptions<
        ApiResponse<DeleteTourResponse>,
        ApiError,
        DeleteTourPalyload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.deleteTour],
        mutationFn: (payload) => safeAxios(() => deleteTour(payload)),
        onMutate: async (payload) => {
            await queryClient.cancelQueries({ 
                queryKey: [QUERY_REGISTRY.getTours, { slug: payload.slug }]
            });
        },
        onSuccess: (_, payload) => {
            queryClient.removeQueries({ 
                queryKey: [QUERY_REGISTRY.getTours, { slug: payload.slug }] 
            });

            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getTours] });
        },
        ...options,
    });
}

export const useToggleFeaturedTour = (
    options?: UseMutationOptions<
        ApiResponse<ToggleFeaturedTourResponse>,
        ApiError,
        ToggleFeaturedTourPayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.toggleFeaturedTour],
        mutationFn: (payload) => safeAxios(() => toggleFeaturedTour(payload)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getTour] });
        },
        ...options,
    });
}