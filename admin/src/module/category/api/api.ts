import api from "@/lib/api/axios";
import { GetCategoryOptionsResponse } from "./types";
import { ApiResponse } from "@/types/api";


export const getCategoryOptions = async (): Promise<ApiResponse<GetCategoryOptionsResponse>> => {
    const response = await api.get('/category/options');
    return response.data;
}