import axios from "axios";
import api from "@/lib/axios";
import { 
    CloudinaryUploadPayload,
    CloudinaryUploadResponse, CreateTourResponse, CreateToutPayload, GetTourResponse, GetToursParams, MediaSignatureResponse, MediaUploadPayload
} from "./types";
import { ApiResponse } from "@/types/api";
import { logger } from "@/lib/utils";


export const createTour = async (payload: CreateToutPayload): Promise<ApiResponse<CreateTourResponse>> => {
    const res = await api.post("/tour", payload);
    return res.data;
}

export const getTours = async (params?: GetToursParams): Promise<ApiResponse<GetTourResponse>> => {
    const res = await api.get("/tour/list", { params });
    return res.data;
}


export const createSignature = async (payload: MediaUploadPayload): Promise<ApiResponse<MediaSignatureResponse>> => {
    const res = await api.post("/media/signature", payload);
    return res.data;
}


export const uploadToCloudinary = async (payload: CloudinaryUploadPayload): Promise<CloudinaryUploadResponse> => {
    const formData = new FormData();

    formData.append('file', payload.file);
    formData.append('api_key', payload.data.api_key);
    formData.append('timestamp', payload.data.timestamp.toString());
    formData.append('signature', payload.data.signature);
    formData.append('folder', payload.data.folder);

    const URL = `https://api.cloudinary.com/v1_1/${payload.data.cloud_name}/image/upload`;

    const res = await axios.post(URL, formData);
    logger('Cloudinary upload response:', res.data);
    return {
        public_id: res.data.public_id,
        original_filename: res.data.original_filename,
        url: res.data.secure_url,
    };
}