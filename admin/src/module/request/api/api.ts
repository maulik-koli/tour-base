import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { 
    GetRequestListParams, 
    GetRequestListResponse, 
    CloseRequestPayload, 
    CloseRequestResponse,
    DeleteRequestPayload,
    DeleteRequestResponse
} from "./types";


export const getRequestList = async (params?: GetRequestListParams): Promise<ApiResponse<GetRequestListResponse>> => {
    const res = await api.get("/request/admin/list", { params });
    return res.data;
}

export const closeRequest = async (payload: CloseRequestPayload): Promise<ApiResponse<CloseRequestResponse>> => {
    const res = await api.patch(`/request/admin/${payload.requestId}/close`);
    return res.data;
}

export const deleteRequest = async (payload: DeleteRequestPayload): Promise<ApiResponse<DeleteRequestResponse>> => {
    const res = await api.delete(`/request/admin/${payload.requestId}`);
    return res.data;
}
