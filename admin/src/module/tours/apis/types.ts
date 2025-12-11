import { MediaUploadPayloadType } from "@/lib/mediaUpload"

export type MediaUploadPayload = MediaUploadPayloadType

export interface MediaSignatureResponse {
    timestamp: number,
    signature: string,
    cloud_name: string,
    api_key: string,
    folder: string,
}


export interface CloudinaryUploadPayload {
    data: MediaSignatureResponse;
    file: File;
}

export interface CloudinaryUploadResponse {
    public_id: string;
    original_filename: string;
    url: string;
}