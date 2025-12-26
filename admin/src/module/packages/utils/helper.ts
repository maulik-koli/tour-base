import { PackageResponse } from "../api/types";
import { PackageFormType } from "./schema";

export interface PackageFieldType extends PackageResponse {
    id: string;
}

export const preparePackagePayload = (data: PackageFieldType): PackageFormType => {
    return {
        days: data.days,
        endCity: data.endCity,
        hotels: data.hotels,
        name: data.name,
        nights: data.nights,
        pricePerPerson: data.pricePerPerson,
        startCity: data.startCity,
        starHierarchy: data.starHierarchy,
        childrenPrice: data.childrenPrice,
    }
}