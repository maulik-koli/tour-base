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

const BASE_URL = '/admin/activity';


export const createActivity = async (payload: CreateActivityPayload): Promise<ApiResponse<CreateActivityResponse>> => {
    const res = await api.post(BASE_URL, payload);
    return res.data;
}

export const getActivities = async (params?: GetActivitiesParams): Promise<ApiResponse<GetActivitiesResponse>> => {
    const res = await api.get(BASE_URL, { params });
    return res.data;
}

export const getActivity = async (param: GetActivityParam): Promise<ApiResponse<GetActivityResponse>> => {
    const res = await api.get(`${BASE_URL}/${param.slug}`);
    return res.data;
}

export const updateActivity = async (payload: UpdateActivityPayload): Promise<ApiResponse<UpdateActivityResponse>> => {
    const res = await api.put(`${BASE_URL}/${payload.slug}`, payload.data);
    return res.data;
}

export const deleteActivity = async (payload: DeleteActivityPayload): Promise<ApiResponse<DeleteActivityResponse>> => {
    const res = await api.delete(`${BASE_URL}/${payload.slug}`);
    return res.data;
}
