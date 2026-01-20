import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { GetActivitiesParams, GetActivitiesResponse, GetActivityDetailsParams, GetActivityDetailsResponse } from "./types";


export const getActivities = async (params: GetActivitiesParams): Promise<ApiResponse<GetActivitiesResponse>> => {
    const response = await api.get('/activity', { params });
    return response.data;
}

export const getActivityDetails = async (params: GetActivityDetailsParams): Promise<ApiResponse<GetActivityDetailsResponse>> => {
    const response = await api.get(`/activity/${params.slug}`);
    return response.data;
}