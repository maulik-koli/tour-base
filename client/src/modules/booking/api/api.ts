import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { CreateBookingPayload, CreateBookingResponse } from "./types";


export const createBooking = async (payload: CreateBookingPayload): Promise<ApiResponse<CreateBookingResponse>> => {
    const response = await api.post('/booking', payload);
    return response.data;
}