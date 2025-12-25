import { CategoryFormType } from "../utils/schema";

export interface CategoryType extends CategoryFormType {
    _id: string;
    order: number;
    createdAt: string;
    updatedAt: string;
}

export type GetCategoriesResponse = CategoryType[];

export type GetCategoryOptionsResponse = {
    _id: string;
    name: string;
    value: string;
}[];

export type CreateCategoryPayload = CategoryFormType;

export type CreateCategoryResponse = null;

export interface UpdateCategoryPayload {
    _id: string;
    data: CategoryFormType;
}

export type UpdateCategoryResponse = CategoryType;

export type DeleteCategoryPayload = {
    _id: string;
}

export type DeleteCategoryResponse = null;