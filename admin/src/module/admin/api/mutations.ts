import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { safeAxios } from "@/lib/api/axios";
import { login, logout } from "./apis";

import { LoginPayload, LoginResponse, LogoutResponse } from "./types";
import { ApiResponse, ApiError } from "@/types/api";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/apiRegistery";


export const useAdminLogin = (
    options?: UseMutationOptions<
        ApiResponse<LoginResponse>,
        ApiError,
        LoginPayload
    >
) => {
    
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.login],
        mutationFn: (payload) => safeAxios(() => login(payload)),
        ...options,
    });
};


export const useAdminLogout = (
    options?: UseMutationOptions<
        ApiResponse<LogoutResponse>,
        ApiError,
        void
    >
) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.logout],
        mutationFn: () => safeAxios(() => logout()),
        onMutate: async (payload) => {
                await queryClient.cancelQueries({ 
                queryKey: [
                    QUERY_REGISTRY.getProfile,
                    QUERY_REGISTRY.getCategories,
                    QUERY_REGISTRY.getFeaturedTours
                ]
            });
        },
        onSuccess: (_, payload) => {
            queryClient.removeQueries({ 
                queryKey: [
                    QUERY_REGISTRY.getProfile,
                    QUERY_REGISTRY.getCategories,
                    QUERY_REGISTRY.getFeaturedTours
                ]
            });
        },
        ...options,
    });
};