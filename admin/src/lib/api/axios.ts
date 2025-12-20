import { ApiError } from "@/types/api";
import axios, { AxiosInstance } from "axios";
import { logger } from "../utils";

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
let isRedirecting = false;

const api: AxiosInstance = axios.create({
    baseURL: SERVER_BASE_URL,
    withCredentials: true,
});


api.interceptors.request.use(
    (config) => {
        if (isRedirecting) {
            // return Promise.reject(new axios.Cancel('Request cancelled due to redirect'));
            return Promise.reject(new Error('Redirecting...'));
        }
        return config;
    }
);


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(error.response?.status === 401 && !isRedirecting) {
            isRedirecting = true;

            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;



export const safeAxios = async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
        return await fn()
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (!err.response) {
                throw {
                    status: 500,
                    message: "Unable to reach server",
                } satisfies ApiError;
            }
            
            throw {
                status: err.response?.data?.status,
                message: err.response?.data?.message || 'Something went wrong',
            } satisfies ApiError
        }
        throw { 
            status: 500, 
            message: 'Something went wrong' 
        } satisfies ApiError
    }
}