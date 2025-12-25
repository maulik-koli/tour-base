import api from "@/lib/api/axios";
import { 
    CreateCategoryPayload, 
    CreateCategoryResponse, 
    DeleteCategoryPayload, 
    DeleteCategoryResponse, 
    GetCategoriesResponse,
    GetCategoryOptionsResponse,
    UpdateCategoryPayload,
    UpdateCategoryResponse 
} from "./types";
import { ApiResponse } from "@/types/api";


export const getCategoryOptions = async (): Promise<ApiResponse<GetCategoryOptionsResponse>> => {
    const response = await api.get('/category/options');
    return response.data;
}

export const getCategories = async (): Promise<ApiResponse<GetCategoriesResponse>> => {
    const response = await api.get('/category');
    return response.data;
}

export const createCategory = async (payload: CreateCategoryPayload): Promise<ApiResponse<CreateCategoryResponse>> => {
    const response = await api.post('/category', payload);
    return response.data;
}

export const updateCategory = async (payload: UpdateCategoryPayload): Promise<ApiResponse<UpdateCategoryResponse>> => {
    const response = await api.patch(`/category/${payload._id}`, payload.data);
    return response.data;
}

export const deleteCategory = async (params: DeleteCategoryPayload): Promise<ApiResponse<DeleteCategoryResponse>> => {
    const response = await api.delete(`/category/${params._id}`);
    return response.data;
}