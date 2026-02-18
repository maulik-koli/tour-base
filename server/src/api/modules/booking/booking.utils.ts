import { ObjectId } from "mongoose";
import { BookingStatus } from "./booking.model";

export const BOOKING_AUTH = {
    EXPIRE_TIME: 30 * 60 * 1000, // 30 minutes
    COOKIE_NAME: '__secure-bkn',
} as const


export interface BookingTourPackage {
    _id: string;
    bookingStatus: BookingStatus;
    isExpired: boolean;
    bookingId: ObjectId;
    tour: {
        _id: ObjectId;
        tourName: string;
        thumbnailImage: string;
        includes: string[];
        excludes: string[];
    };
    package: {
        _id: ObjectId;
        packageName: string;
        days: number;
        nights: number;
        pricePerPerson: number;
        childrenPrice: number;
        startCity: string;
        endCity: string;
        priceSlots: Array<{ persons: number; price: number }>;
    };
}