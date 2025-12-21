import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { createTour, updateTour } from "./api";

import { CreateTourResponse, CreateToutPayload, UpdateTourParam, UpdateTourPayload, UpdateTourResponse } from "./types";
import { ApiResponse, ApiError } from "@/types/api";
import { MUTATION_REGISTRY } from "@/constants/apiRegistery";


export const useCreateTour = (
    options?: UseMutationOptions<
        ApiResponse<CreateTourResponse>,
        ApiError,
        CreateToutPayload
    >
) => {
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createTour],
        mutationFn: (payload) => safeAxios(() => createTour(payload)),
        ...options,
    });
}


export const useUpdateTour = (
    param: UpdateTourParam,
    options?: UseMutationOptions<
        ApiResponse<UpdateTourResponse>,
        ApiError,
        UpdateTourPayload
    >
) => {
    // const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.updateTour],
        mutationFn: (payload) => safeAxios(() => updateTour(param, payload)),
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getTours] });
        },
        ...options,
    });
}