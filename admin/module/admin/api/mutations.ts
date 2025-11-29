import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { login } from "./apis";

import { LoginPayload, LoginResponse } from "./types";
import { ApiResponse, ApiError } from "@/types/api";
import { MUSTAION_REGISTRY } from "@/constants/apiRegistery";
import { safeAxios } from "@/lib/axios";


export const useAdminLogin = (
    options?: UseMutationOptions<
        ApiResponse<LoginResponse>,
        ApiError,
        LoginPayload
    >
) => {
    
    return useMutation({
        mutationKey: [MUSTAION_REGISTRY.loing],
        mutationFn: (payload) => safeAxios(() => login(payload)),
        ...options,
    });
};