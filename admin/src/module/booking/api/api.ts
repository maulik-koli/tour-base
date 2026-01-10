import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { DeleteBookingPayload, DeleteBookingResponse, GetBookingDetailsParams, GetBookingDetailsResponse, GetBookingListParams, GetBookingListResponse } from "./types";


export const getBookingList = async (params?: GetBookingListParams) : Promise<ApiResponse<GetBookingListResponse>> => {
    const res = await api.get("/booking/admin/list", { params });
    return res.data;
}

export const getBookingDetails = async (params: GetBookingDetailsParams) : Promise<ApiResponse<GetBookingDetailsResponse>> => {
    const res = await api.get(`/booking/admin/${params.bookingId}`);
    return res.data;
}

export const deleteBooking = async (payload: DeleteBookingPayload) : Promise<ApiResponse<DeleteBookingResponse>> => {
    const res = await api.delete(`/booking/admin/${payload.bookingId}`);
    return res.data;
}