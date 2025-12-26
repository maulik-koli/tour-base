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
        isFeatured: boolean;
        createdAt: string;
        updatedAt: string;
    };
    packages: PackageResponse[];
}

export interface UpdateTourPayload { 
    slug: string;
    data: TourFormType
};

export interface UpdateTourResponse extends TourFormType {
    _id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
};

export type TourUserListType = {
    _id: string,
    name: string,
    slug: string,
    tagLine: string,
    thumbnailImage: string,
    createdAt: string,
    updatedAt: string,
    minPrice: number,
    maxPrice: number,
    minDays: number,
    maxDays: number,
    packagesCount: number,
}

export type GetFeatureToursResponse = TourUserListType[];

export interface DeleteTourPalyload {
    slug: string;
}

export type DeleteTourResponse = null;


export interface ToggleFeaturedTourPayload {
    slug: string;
    data: {
        isFeatured: boolean;
    }
}

export type ToggleFeaturedTourResponse = null