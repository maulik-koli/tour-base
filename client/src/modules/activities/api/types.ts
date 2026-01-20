import { PaginationType } from "@/types/api";

export interface GetActivitiesParams {
    search?: string;
    page?: number;
    limit?: number;
}

export type ActivityFilterField = keyof GetActivitiesParams;

export type ActivityListType = {
    _id: string,
    title: string,
    slug: string,
    subtitle: string,
    city: string,
    pricePerPerson: number,
    thumbnailImage: string,
    isActive: boolean,
    updatedAt: string,
}

export interface GetActivitiesResponse {
    activities: ActivityListType[];
    pagination: PaginationType;
}

export interface GetActivityDetailsParams {
    slug: string;
}

export interface GetActivityDetailsResponse {
    _id: string,
    title: string,
    slug: string,
    subtitle: string,
    description: string,
    city: string,
    pricePerPerson: number,
    thumbnailImage: string,
    images: string[],
    extraNote: string,
    isActive: boolean,
    createdAt: string,
    updatedAt: string
}