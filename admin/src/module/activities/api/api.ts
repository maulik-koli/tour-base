import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { 
    CreateActivityResponse,
    CreateActivityPayload,
    GetActivitiesResponse,
    GetActivitiesParams,
    GetActivityParam,
    GetActivityResponse,
    UpdateActivityPayload,
    UpdateActivityResponse,
    DeleteActivityResponse,
    DeleteActivityPayload
} from "./types";


export const createActivity = async (payload: CreateActivityPayload): Promise<ApiResponse<CreateActivityResponse>> => {
    const res = await api.post("/activity", payload);
    return res.data;
}

export const getActivities = async (params?: GetActivitiesParams): Promise<ApiResponse<GetActivitiesResponse>> => {
    const res = await api.get("/activity", { params });
    return res.data;
}

export const getActivity = async (param: GetActivityParam): Promise<ApiResponse<GetActivityResponse>> => {
    const res = await api.get(`/activity/${param.slug}`);
    return res.data;
}

export const updateActivity = async (payload: UpdateActivityPayload): Promise<ApiResponse<UpdateActivityResponse>> => {
    const res = await api.put(`/activity/${payload.slug}`, payload.data);
    return res.data;
}

export const deleteActivity = async (payload: DeleteActivityPayload): Promise<ApiResponse<DeleteActivityResponse>> => {
    const res = await api.delete(`/activity/${payload.slug}`);
    return res.data;
}
