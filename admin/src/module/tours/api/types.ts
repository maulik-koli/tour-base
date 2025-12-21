import { CreateTourFormType, TourFormType } from "@module/tours/utils/schema";
import { PackageResponse } from "@module/packages/api/types";
import { PaginationType } from "@/types/api";

export type CreateToutPayload = CreateTourFormType

export type CreateTourResponse = null

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

export interface GetToursResponse {
    pagination: PaginationType;
    tours: TourListType[];
}



interface TourParam {
    slug: string;
}

export type GetTourParam = TourParam;

export interface GetTourResponse {
    tour: TourFormType & {
        _id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
    };
    packages: PackageResponse[];
}

export type UpdateTourParam = TourParam;

export type UpdateTourPayload = TourFormType;

export interface UpdateTourResponse extends TourFormType {
    _id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
};