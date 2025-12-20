import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { createSignature, uploadToCloudinary } from "./api";

import { ApiError, ApiResponse } from "@/types/api";
import { 
    CloudinaryUploadPayload, CloudinaryUploadResponse, MediaSignatureResponse, MediaUploadPayload
} from "./types";
import { MUTATION_REGISTRY } from "@/constants/apiRegistery";


export const useCreateSignature = (
    options?: UseMutationOptions<
        ApiResponse<MediaSignatureResponse>,
        ApiError,
        MediaUploadPayload
    >
) => {
    
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.createSignature],
        mutationFn: (payload) => safeAxios(() => createSignature(payload)),
        ...options,
    });
};


export const useUploadToCloudinary = (
    options?: UseMutationOptions<
        CloudinaryUploadResponse,
        ApiError,
        CloudinaryUploadPayload
    >
) => {
    
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.uploadToCloudinary],
        mutationFn: (payload) => uploadToCloudinary(payload),
        ...options,
    });
};