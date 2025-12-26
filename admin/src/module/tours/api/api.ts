import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { 
    CreateTourResponse,
    CreateToutPayload,
    GetToursResponse,
    GetToursParams,
    GetTourParam,
    GetTourResponse,
    UpdateTourPayload,
    UpdateTourResponse,
    GetFeatureToursResponse,
    DeleteTourResponse,
    DeleteTourPalyload,
    ToggleFeaturedTourPayload,
    ToggleFeaturedTourResponse
} from "./types";


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

export const updateTour = async (payload: UpdateTourPayload): Promise<ApiResponse<UpdateTourResponse>> => {
    const res = await api.put(`/tour/${payload.slug}`, payload.data);
    return res.data;
}

export const getFeaturedTours = async (): Promise<ApiResponse<GetFeatureToursResponse>> => {
    const res = await api.get("/tour/featured");
    return res.data;
}

export const deleteTour = async (payload: DeleteTourPalyload): Promise<ApiResponse<DeleteTourResponse>> => {
    const res = await api.delete(`/tour/${payload.slug}`);
    return res.data;
}

export const toggleFeaturedTour = async (
    payload: ToggleFeaturedTourPayload
): Promise<ApiResponse<ToggleFeaturedTourResponse>> => {
    const res = await api.patch(`/tour/featured/${payload.slug}`, payload.data);
    return res.data;
}