import Tour from "./tour.model";
import { slugify } from "./tour.utils";

import { TourPayload } from "./tour.schema";
import { CustomError } from "@/api/utils/response";


export const validateTourData = (tourPayload: TourPayload) => {
    const days = tourPayload.dayPlans.map(day => day.dayNumber);

    const isValidOrder = days.every((day, i) =>
        i === 0 || day === days[i - 1] + 1
    );

    if(!isValidOrder) {
        throw new CustomError(400, 'Day plans must be in consecutive order');
    }

    const daySet = new Set(days);

    const invalidPackagesDaysplans = tourPayload.packages
        .filter(pckg => !pckg.dayNumbers.every(day => daySet.has(day)))
        .map(pckg => pckg.name);

    if (invalidPackagesDaysplans.length > 0) {
        throw new CustomError(
            400, 
            `Invalid day plan in the following packages: ${invalidPackagesDaysplans.join(', ')}`
        );
    }

    const invalidPackagesDuration = tourPayload.packages
        .filter(pckg => pckg.days > pckg.dayNumbers.length)
        .map(pckg => pckg.name);

    if (invalidPackagesDuration.length > 0) {
        throw new CustomError(
            400, 
            `Number of days and day plans mismatch in the following packages: ${invalidPackagesDuration.join(', ')}`
        );
    }

    const invalidHotelDayNumbers = tourPayload.packages
        .flatMap(pckg =>
            pckg.hotels
                .filter(hotel => !daySet.has(hotel.dayNumber))
                .map(hotel => `${hotel.hotelName} in package "${pckg.name}"`)
        );

    if (invalidHotelDayNumbers.length > 0) {
        throw new CustomError(
            400,
            `Invalid hotel dayNumber(s) found: ${invalidHotelDayNumbers.join(', ')}`
        );
    }
}


export const createTour = async (tourPayload: TourPayload) => {
    try {
        const slug = slugify(tourPayload.name)
        const tour = new Tour({ ...tourPayload, slug });
        await tour.save();
    }
    catch (error: any) {
        if(error.name == 'MongoServerError' && error.code == 11000) {
            throw new CustomError(409, "Same name tour already exists");
        }
        throw error;
    }
}

export const getTourBySlug = async (slug: string) => {
    const tour = await Tour.findOne({ slug }).lean();

    if(!tour) {
        throw new CustomError(404, 'Tour not found');
    }
    return tour;
};


export const updateTourBySlug = async (slug: string, tourPayload: TourPayload) => {
    const tour = await Tour.findOneAndUpdate(
        { slug },
        { $set: tourPayload },
        { new: true }
    ).lean();

    if(!tour) {
        throw new CustomError(404, 'Tour not found');
    }
    return tour;
};