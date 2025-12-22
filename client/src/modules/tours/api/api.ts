import api from "@/lib/api/axios";
import { GetTourDetailParam, GetTourDetailResponse, GetToursParams, GetToursResponse } from "./types";
import { ApiResponse } from "@/types/api"


export const getTours = async (params: GetToursParams): Promise<ApiResponse<GetToursResponse>> => {
    const response = await api.get('/tour', { params });
    return response.data;
}


export const getTour = async (params: GetTourDetailParam): Promise<ApiResponse<GetTourDetailResponse>> => {
    const response = await api.get(`/tour/${params.slug}`);
    return response.data;
}