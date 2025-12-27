import { PaginationType } from "@/types/api";

export type TourListType = {
    _id: string,
    name: string
    slug: string,
    tagLine: string,
    thumbnailImage: string,
    minPrice: number,
    maxPrice: number
    minDays: number,
    maxDays: number,
    packageCount: number,
    createdAt: string,
    updatedAt: string,
}

export interface GetToursParams {
    maxPrice?: number;
    duration?: string;
    sort?: string;
    category?: string;
    search?: string;
}

export interface GetToursResponse {
    pagination: PaginationType,
    tours: TourListType[]
}

export interface GetTourDetailParam {
    slug: string;
}

type TourDayPlan = {
    title: string;
    subtitle: string;
    description: string;
};

export type Tour = {
    _id: string;
    name: string;
    tagLine: string;
    description: string;
    includes: string[];
    excludes: string[];
    categories: string[];
    slug: string;
    dayPlans: TourDayPlan[];
    isActive: boolean;
    images: string[];
    galleryImages: string[];
    thumbnailImage: string;
    youtubeVideoUrl: string | null;
    createdAt: string;
    updatedAt: string;
};

type PackageHotel = {
    hotelName: string;
    city: string;
    nightNo: number;
};

export type TourPackage = {
    _id: string;
    tourId: string;
    name: string;
    days: number;
    nights: number;
    pricePerPerson: number;
    childrenPrice: number;
    starHierarchy: number;
    startCity: string;
    endCity: string;
    hotels: PackageHotel[];
    createdAt: string;
    updatedAt: string;
};

export interface GetTourDetailResponse {
    tour: Tour;
    packages: TourPackage[];
}

export type FeatureToursResponse = TourListType[];