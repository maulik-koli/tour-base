import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { createTour } from "./apis";

import { CreateTourResponse, CreateToutPayload } from "./types";
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