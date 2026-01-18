import { ActivityPayload } from "@module/activities/utils/schema";
import { PaginationType } from "@/types/api";

export type CreateActivityPayload = ActivityPayload

export type CreateActivityResponse = null

export type ActivityListType = {
    _id: string,
    title: string,
    slug: string,
    thumbnailImage: string,
    createdAt: string,
    updatedAt: string,
    pricePerPerson: number
}

export interface GetActivitiesParams {
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
}

export interface GetActivitiesResponse {
    pagination: PaginationType;
    activities: ActivityListType[];
}

interface ActivityParam {
    slug: string;
}

export type GetActivityParam = ActivityParam;

export interface GetActivityResponse {
    activity: ActivityPayload & {
        _id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
    };
}

export interface UpdateActivityPayload { 
    slug: string;
    data: ActivityPayload
};

export interface UpdateActivityResponse extends ActivityPayload {
    _id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
};

export interface DeleteActivityPayload {
    slug: string;
}

export type DeleteActivityResponse = null;
