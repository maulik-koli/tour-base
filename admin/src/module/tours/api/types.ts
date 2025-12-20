import { CreateTourFormType } from "../utils/schema";
import { PaginationType } from "@/types/api";

export type CreateToutPayload = CreateTourFormType

export interface CreateTourResponse extends CreateTourFormType {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export type TourListType = {
    _id: string,
    name: string,
    slug: string,
    thumbnailImage: string,
    createdAt: string,
    updatedAt: string,
    daysCount: number,
    packagesCount: number,
    minPrice: number,
    maxPrice: number
}

export interface GetToursParams {
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
}

export interface GetTourResponse {
    pagination: PaginationType;
    tours: TourListType[];
}