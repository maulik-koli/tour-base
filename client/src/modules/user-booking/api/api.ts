import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { 
    GenerateOtpPayload, 
    GenerateOtpResponse, 
    GetRequestSessionParams, 
    GetRequestSessionResponse, 
    VerifyOtpPayload, 
    VerifyOtpResponse 
} from "./types";


export const getRequestSession = async (param: GetRequestSessionParams): Promise<ApiResponse<GetRequestSessionResponse>> => {
    const res = await api.get(`/request/session/${param.sessionId}`);
    return res.data;
}

export const generateOtp = async (payload: GenerateOtpPayload): Promise<ApiResponse<GenerateOtpResponse>> => {
    const res = await api.post('/request/otp-generate', payload);
    return res.data;
}

export const verifyOtp = async (payload: VerifyOtpPayload): Promise<ApiResponse<VerifyOtpResponse>> => {
    const res = await api.post('/request/otp-verify', payload);
    return res.data;
}