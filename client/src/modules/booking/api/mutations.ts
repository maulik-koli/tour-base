import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { createBooking } from "./api";

import { CreateBookingPayload, CreateBookingResponse } from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { MUTATION_REGISTRY } from "@/constants/apiRegistery";


export const useCreateBooking = (
    options?: UseMutationOptions<
        ApiResponse<CreateBookingResponse>,
        ApiError,
        CreateBookingPayload
    >
) => {
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createBooking],
        mutationFn: (payload) => safeAxios(() => createBooking(payload)),
        ...options,
    });
}