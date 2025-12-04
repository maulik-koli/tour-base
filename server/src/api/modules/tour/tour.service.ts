import mongoose from "mongoose";
import Tour, { TourFields, TourLean } from "./tour.model";
import { CreateTourPayload, TourListAdminQueries, TourPayload } from "./tour.schema";
import { addPakagesToTour, deletePackagesByTourId } from "../packages/packages.service";

import { CustomError } from "@/api/utils/response";
import { ADMIN_SORT_FIELD_MAP, slugify } from "./tour.utils";


export const getTourBySlug = async (slug: string, select?: TourFields[]) => {
    const tour = await Tour.findOne({ slug })
        .select(select?.join(' ') || '')
        .lean();

    if(!tour) {
        throw new CustomError(404, 'Tour not found');
    }
    return tour;
};


export const createTour = async (payload: CreateTourPayload) => {
    const { tour: tourPayload, packages: packagePayload } = payload;

    const slug = slugify(tourPayload.name);
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const existingTour = await Tour.exists({ slug }).session(session);
    
        if(existingTour) {
            throw new CustomError(409, "Tour with this name already exists");
        }
    
        const tour = new Tour({ ...tourPayload, slug });
        const newTour = await tour.save({ session });
    
        await addPakagesToTour(
            { tourId: newTour._id, numberOfDays: newTour.dayPlans.length },
            packagePayload,
            session
        );

        await session.commitTransaction();
        session.endSession();

        return newTour.toObject();
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}


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


export const getAdminToursList = async (query: TourListAdminQueries) => {
    const { page, limit, search, sort } = query;

    const skip = (page - 1) * limit;
    
    const filter: any = {};

    if (search) {
        filter.name = { $regex: search, $options: "i" };
    }

    const sortOption = sort ? ADMIN_SORT_FIELD_MAP[sort] : { updatedAt: -1 };

    const tours = await Tour.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .select("name slug thumbnailImage updatedAt");

    const total = await Tour.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return {
        tours,
        pagination: {
            total,
            page,
            totalPages,
            isPrevPage: page > 1,
            isNextPage: page < totalPages,
        }
    };
};


export const deleteTourBySlug = async (slug: string) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const tour = await Tour.findOneAndDelete({ slug }, { session });
    
        if(!tour) {
            throw new CustomError(404, 'Tour not found');
        }
        
        await deletePackagesByTourId(tour._id, session);

        await session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}