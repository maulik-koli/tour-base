import api from "@/lib/api/axios";
import { GetProfileResponse, LoginPayload, LoginResponse, LogoutResponse } from "./types";
import { ApiResponse } from "@/types/api";

export const login = async (payload: LoginPayload): Promise<ApiResponse<LoginResponse>> => {
    const res = await api.post("/admin/login", payload);
    return res.data;
}

export const logout = async (): Promise<ApiResponse<LogoutResponse>> => {
    const res = await api.post("/admin/logout");
    return res.data;
}

export const getProfile = async (): Promise<ApiResponse<GetProfileResponse>> => {
    const res = await api.get("/admin/profile");
    return res.data;
}