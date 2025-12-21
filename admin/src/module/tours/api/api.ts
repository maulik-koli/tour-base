import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { CreateTourResponse, CreateToutPayload, GetToursResponse, GetToursParams, GetTourParam, GetTourResponse, UpdateTourParam, UpdateTourPayload, UpdateTourResponse } from "./types";


export const createTour = async (payload: CreateToutPayload): Promise<ApiResponse<CreateTourResponse>> => {
    const res = await api.post("/tour", payload);
    return res.data;
}

export const getTours = async (params?: GetToursParams): Promise<ApiResponse<GetToursResponse>> => {
    const res = await api.get("/tour/list", { params });
    return res.data;
}

export const getTour = async (param: GetTourParam): Promise<ApiResponse<GetTourResponse>> => {
    const res = await api.get(`/tour/admin/${param.slug}`);
    return res.data;
}

export const updateTour = async (
    param: UpdateTourParam, payload: UpdateTourPayload
): Promise<ApiResponse<UpdateTourResponse>> => {
    const res = await api.put(`/tour/${param.slug}`, payload);
    return res.data;
}