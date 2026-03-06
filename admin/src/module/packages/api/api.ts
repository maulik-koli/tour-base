import api from "@/lib/api/axios";
import { ApiResponse } from "@/types/api";
import { 
    CreatePackagePayload,
    CreatePackageResponse,
    DeletePackagePayload,
    UpdatePackagePayload,
    UpdatePackageResponse
} from "./types";

const BASE_URL = '/admin/packages';

export const addPackage = async (
    payload: CreatePackagePayload
): Promise<ApiResponse<CreatePackageResponse>> => {
    const res = await api.post(`${BASE_URL}/${payload.slug}`, payload.payload);
    return res.data;
}

export const updatePackage = async (
    payload: UpdatePackagePayload
): Promise<ApiResponse<UpdatePackageResponse>> => {
    const res = await api.put(`${BASE_URL}/${payload._id}`, payload.payload);
    return res.data;
}

export const deletePackage = async (
    payload: DeletePackagePayload
): Promise<ApiResponse<void>> => {
    const res = await api.delete(`${BASE_URL}/${payload._id}`);
    return res.data;
}