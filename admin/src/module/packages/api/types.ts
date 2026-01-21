import { PackageFormType } from "../utils/schema";

export enum PackageCategory {
    BUDGET = 'BUDGET',
    DELUXE = 'DELUXE',
    PREMIUM = 'PREMIUM',
    DIAMOND = 'DIAMOND',
}

export type PackageCategoryType = keyof typeof PackageCategory;
export const PackageCategoryValues = Object.values(PackageCategory);

export interface PackageResponse extends PackageFormType {
    _id: string;
    tourId: string;
    createdAt: string;
    updatedAt: string;
}


export type CreatePackagePayload = {
    slug: string;
    payload: PackageFormType
};

export type CreatePackageResponse = PackageResponse;

export type UpdatePackagePayload = {
    _id: string;
    payload: PackageFormType
};

export type UpdatePackageResponse = PackageResponse;

export interface DeletePackagePayload {
    _id: string;
}