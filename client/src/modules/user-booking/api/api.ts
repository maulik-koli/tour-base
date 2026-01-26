import api from "@/lib/api/axios";
import { GenerateOtpPayload, GenerateOtpResponse, GetRequestSessionParams, GetRequestSessionResponse } from "./types";
import { ApiResponse } from "@/types/api";

export const getRequestSession = async (param: GetRequestSessionParams): Promise<ApiResponse<GetRequestSessionResponse>> => {
    const res = await api.get(`/request/session/${param.sessionId}`);
    return res.data;
}

export const generateOtp = async (payload: GenerateOtpPayload): Promise<ApiResponse<GenerateOtpResponse>> => {
    const res = await api.post('/request/otp-generate', payload);
    return res.data;
}