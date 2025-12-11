import api from "@/lib/axios";
import { LoginPayload, LoginResponse } from "./types";
import { ApiResponse } from "@/types/api";

export const login = async (payload: LoginPayload): Promise<ApiResponse<LoginResponse>> => {
    const res = await api.post("/admin/login", payload);
    return res.data;
}