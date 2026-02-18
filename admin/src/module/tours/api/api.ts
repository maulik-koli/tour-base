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

const BASE_URL = '/admin/tour';


export const createTour = async (payload: CreateToutPayload): Promise<ApiResponse<CreateTourResponse>> => {
    const res = await api.post(BASE_URL, payload);
    return res.data;
}

export const getTours = async (params?: GetToursParams): Promise<ApiResponse<GetToursResponse>> => {
    const res = await api.get(`${BASE_URL}/list`, { params });
    return res.data;
}

export const getTour = async (param: GetTourParam): Promise<ApiResponse<GetTourResponse>> => {
    const res = await api.get(`${BASE_URL}/${param.slug}`);
    return res.data;
}

export const updateTour = async (payload: UpdateTourPayload): Promise<ApiResponse<UpdateTourResponse>> => {
    const res = await api.put(`${BASE_URL}/${payload.slug}`, payload.data);
    return res.data;
}

export const getFeaturedTours = async (): Promise<ApiResponse<GetFeatureToursResponse>> => {
    const res = await api.get(`${BASE_URL}/featured`);
    return res.data;
}

export const deleteTour = async (payload: DeleteTourPalyload): Promise<ApiResponse<DeleteTourResponse>> => {
    const res = await api.delete(`${BASE_URL}/${payload.slug}`);
    return res.data;
}

export const toggleFeaturedTour = async (
    payload: ToggleFeaturedTourPayload
): Promise<ApiResponse<ToggleFeaturedTourResponse>> => {
    const res = await api.patch(`${BASE_URL}/featured/${payload.slug}`, payload.data);
    return res.data;
}