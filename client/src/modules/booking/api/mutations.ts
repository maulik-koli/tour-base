import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { bookingPayment, createBooking, customerBooking } from "./api";

import { BookingPaymentPayload, BookingPaymentResponse, CreateBookingPayload, CreateBookingResponse, CustomerBookingPayload, CustomerBookingResponse } from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/apiRegistery";


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
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.customerBooking],
        mutationFn: (payload) => safeAxios(() => customerBooking(payload)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getBookingData] });
        },
        ...options,
    });
}


export const useBookingPayment = (
    options?: UseMutationOptions<
        ApiResponse<BookingPaymentResponse>,
        ApiError,
        BookingPaymentPayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.customerBooking],
        mutationFn: (payload) => safeAxios(() => bookingPayment(payload)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getBookingData] });
        },
        ...options,
    });
}