import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { CreateTourResponse, CreateToutPayload, GetTourResponse, GetToursParams } from "./types";


export const createTour = async (payload: CreateToutPayload): Promise<ApiResponse<CreateTourResponse>> => {
    const res = await api.post("/tour", payload);
    return res.data;
}

export const getTours = async (params?: GetToursParams): Promise<ApiResponse<GetTourResponse>> => {
    const res = await api.get("/tour/list", { params });
    return res.data;
}