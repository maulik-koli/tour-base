import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { generateOtp, verifyOtp } from "./api";

import { GenerateOtpPayload, GenerateOtpResponse, VerifyOtpPayload, VerifyOtpResponse } from "./types";
import { ApiError, ApiResponse } from "@/types/api";
import { MUTATION_REGISTRY } from "@/constants/apiRegistery";


export const useGenerateOtp = (
    options?: UseMutationOptions<
        ApiResponse<GenerateOtpResponse>,
        ApiError,
        GenerateOtpPayload
    >
) => {
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.generateOtp],
        mutationFn: (payload) => safeAxios(() => generateOtp(payload)),
        ...options,
    });
}


export const useVerifyOtp = (
    options?: UseMutationOptions<
        ApiResponse<VerifyOtpResponse>,
        ApiError,
        VerifyOtpPayload
    >
) => {
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.verifyOtp],
        mutationFn: (payload) => safeAxios(() => verifyOtp(payload)),
        ...options,
    });
}
