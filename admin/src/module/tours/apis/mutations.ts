import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { createSignature, createTour, uploadToCloudinary } from "./apis";

import { CloudinaryUploadPayload, CloudinaryUploadResponse, CreateTourResponse, CreateToutPayload, MediaSignatureResponse, MediaUploadPayload } from "./types";
import { ApiResponse, ApiError } from "@/types/api";
import { MUSTAION_REGISTRY } from "@/constants/apiRegistery";
import { safeAxios } from "@/lib/axios";


export const useCreateTour = (
    options?: UseMutationOptions<
        ApiResponse<CreateTourResponse>,
        ApiError,
        CreateToutPayload
    >
) => {
    return useMutation({
        mutationKey: [MUSTAION_REGISTRY.createTour],
        mutationFn: (payload) => safeAxios(() => createTour(payload)),
        ...options,
    });
}


export const useCreateSignature = (
    options?: UseMutationOptions<
        ApiResponse<MediaSignatureResponse>,
        ApiError,
        MediaUploadPayload
    >
) => {
    
    return useMutation({
        mutationKey: [MUSTAION_REGISTRY.createSignature],
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
        mutationKey: [MUSTAION_REGISTRY.uploadToCloudinary],
        mutationFn: (payload) => uploadToCloudinary(payload),
        ...options,
    });
};