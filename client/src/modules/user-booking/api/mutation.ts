import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { generateOtp } from "./api";

import { GenerateOtpPayload, GenerateOtpResponse } from "./types";
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
