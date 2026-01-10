import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { deleteBooking } from "./api";

import { DeleteBookingPayload, DeleteBookingResponse } from "./types";
import { ApiResponse, ApiError } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useDeleteBooking = (
    options?: UseMutationOptions<
        ApiResponse<DeleteBookingResponse>,
        ApiError,
        DeleteBookingPayload
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_REGISTRY.deleteBooking],
        mutationFn: (payload) => safeAxios(() => deleteBooking(payload)),
        onMutate: async (payload) => {
            await queryClient.cancelQueries({ 
                queryKey: [QUERY_REGISTRY.getBookingDetails, { bookingId: payload.bookingId }]
            });
        },
        onSuccess: (_, payload) => {
            queryClient.removeQueries({ 
                queryKey: [QUERY_REGISTRY.getBookingList, { bookingId: payload.bookingId }] 
            });

            queryClient.invalidateQueries({ queryKey: [QUERY_REGISTRY.getBookingList] });
        },
        ...options,
    });
}