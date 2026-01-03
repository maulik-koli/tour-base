import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { createBooking, customerBooking } from "./api";

import { CreateBookingPayload, CreateBookingResponse, CustomerBookingPayload, CustomerBookingResponse } from "./types";
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


export const useCustomerBooking = (
    options?: UseMutationOptions<
        ApiResponse<CustomerBookingResponse>,
        ApiError,
        CustomerBookingPayload
    >
) => {
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.customerBooking],
        mutationFn: (payload) => safeAxios(() => customerBooking(payload)),
        ...options,
    });
}