import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { CreateBookingPayload, CreateBookingResponse, CustomerBookingPayload, CustomerBookingResponse, GetBookingDataParams, GetBookingDataResponse } from "./types";


export const createBooking = async (payload: CreateBookingPayload): Promise<ApiResponse<CreateBookingResponse>> => {
    const response = await api.post('/booking', payload);
    return response.data;
}


export const customerBooking = async (payload: CustomerBookingPayload): Promise<ApiResponse<CustomerBookingResponse>> => {
    const response = await api.patch(`/booking/${payload.bookingId}/details`, payload.customer);
    return response.data;
}


export const getBookingData = async (params: GetBookingDataParams): Promise<ApiResponse<GetBookingDataResponse>> => {
    const response = await api.get(`/booking/${params.bookingId}`, { 
        params: params.view
    });
    return response.data;
}