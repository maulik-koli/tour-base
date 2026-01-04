import { ApiError } from "@/types/api";
import axios, { AxiosInstance } from "axios";

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const api: AxiosInstance = axios.create({
    baseURL: SERVER_BASE_URL,
    withCredentials: true,
});

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