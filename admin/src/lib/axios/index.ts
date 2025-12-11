import { ApiError } from '@/types/api';
import axios, { type AxiosInstance } from 'axios';

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const api: AxiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
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
          status: err.response?.data?.code,
          message: err.response?.data?.message || 'Something went wrong',
        } satisfies ApiError
      }
      throw { status: 500, message: 'Something went wrong' } satisfies ApiError
    }
}