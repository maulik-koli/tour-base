
export type GetCategoryOptionsResponse = {
    _id: string;
    name: string;
    value: string;
}[];

export interface CategoryType {
    _id: string;
    name: string;
    value: string;
    subtitle: string;
    image: string;
    order: number;
    createdAt: string;
    updatedAt: string;
}

export type GetCategoriesResponse = CategoryType[];