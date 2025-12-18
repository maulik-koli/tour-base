import mongoose from "mongoose";
import Tour, { TourFields } from "./tour.model";
import { CreateTourPayload, TourListAdminQueries, TourListQueries, TourPayload } from "./tour.schema";
import { addPakagesToTour, deletePackagesByTourId } from "../packages/packages.service";

import { CustomError } from "@/api/utils/response";
import { ADMIN_SORT_FIELD_MAP, DURATION_MAP, slugify, SORT_FIELD_MAP } from "./tour.utils";
import { PaginationType } from "@/api/types/common";


export const createTour = async (payload: CreateTourPayload) => {
    const { tour: tourPayload, packages: packagePayload } = payload;
    
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const slug = slugify(tourPayload.name);

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


export const findTour = async (slug: string) => {
    const tour = await Tour.findOne({ slug, isActive: true }).lean();

    if(!tour) {
        throw new CustomError(404, 'Tour not found');
    }
    return tour;
}


export const getTourBySlug = async (slug: string, select?: TourFields[]) => {
    const tour = await Tour.findOne({ slug })
        .select(select?.join(' ') || '')
        .lean();

    if(!tour) {
        throw new CustomError(404, 'Tour not found');
    }
    return tour;
};


export const updateTour = async (slug: string, tourPayload: TourPayload) => {
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


export const deleteTour = async (slug: string) => {
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


export const getAdminToursList = async (query: TourListAdminQueries) => {
    const { page, limit, search, sort } = query;

    const skip = (page - 1) * limit;
    
    const filter: any = {};

    if (search) {
        filter.name = { $regex: search, $options: "i" };
    }

    const sortOption = ADMIN_SORT_FIELD_MAP[sort];

    const tours = await Tour.aggregate([
        { $match: filter },
        {
            $lookup: {
                from: "packages",
                localField: "_id",
                foreignField: "tourId",
                as: "packages"
            }
        },
        {
            $addFields: {
                daysCount: { $size: "$dayPlans" },
                packagesCount: { $size: "$packages" },
                minPrice: { $min: "$packages.pricePerPerson" },
                maxPrice: { $max: "$packages.pricePerPerson" },
            }
        },
        {
            $project: {
                name: 1,
                slug: 1,
                thumbnailImage: 1,
                createdAt: 1,
                updatedAt: 1,
                daysCount: 1,
                minPrice: 1,
                maxPrice: 1,
                packagesCount: 1,
            }
        },
        { $sort: sortOption },
        { $skip: skip },
        { $limit: limit },
    ])

    const total = await Tour.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const pagination: PaginationType = {
        page,
        limit,
        totalPages,
        totalItems: total,
        isNextPage: page < totalPages,
        isPrevPage: page > 1,
    }

    return { tours, pagination };
};


export const getToursList = async (query: TourListQueries) => {
    const { page, limit, search, sort, maxPrice, duration, category } = query;

    const skip = (page - 1) * limit;

    const tourMatch: any = {
        isActive: true,
    };

    if (search) {
        tourMatch.name = { $regex: search, $options: "i" };
    }

    if (category) {
        tourMatch.categories = new mongoose.Types.ObjectId(category);
    }


    const packageFilterConditions: any[] = [];

    if (maxPrice) {
        packageFilterConditions.push({ 
            $lte: ["$$pkg.pricePerPerson", maxPrice] 
        });
    }

    if (duration) {
        const durationRange = DURATION_MAP[duration];
        
        if (durationRange.$gte !== undefined) {
            packageFilterConditions.push({ 
                $gte: ["$$pkg.days", durationRange.$gte] 
            });
        }
        
        if (durationRange.$lte !== undefined) {
            packageFilterConditions.push({ 
                $lte: ["$$pkg.days", durationRange.$lte] 
            });
        }
    }

    const pipeline: any[] = [
        { $match: tourMatch },
        {
            $lookup: {
                from: "packages",
                localField: "_id",
                foreignField: "tourId",
                as: "packages",
            },
        },
        {
            $addFields: {
                matchedPackages: {
                    $filter: {
                        input: "$packages",
                        as: "pkg",
                        cond: packageFilterConditions.length > 0 
                            ? { $and: packageFilterConditions }
                            : true,
                    },
                },
            },
        },
        {
            $match: {
                "matchedPackages.0": { $exists: true },
            },
        },
        {
            $addFields: {
                minPackagePrice: { $min: "$matchedPackages.pricePerPerson" },
                maxPackagePrice: { $max: "$matchedPackages.pricePerPerson" },
                minPackageDays: { $min: "$matchedPackages.days" },
                maxPackageDays: { $max: "$matchedPackages.days" },
            },
        },
        { $sort: SORT_FIELD_MAP[sort] },
        {
            $facet: {
                metadata: [{ $count: "total" }],
                data: [
                    { $skip: skip },
                    { $limit: limit },
                    {
                        $project: {
                            name: 1,
                            slug: 1,
                            tagLine: 1,
                            thumbnailImage: 1,
                            minPackagePrice: 1,
                            maxPackagePrice: 1,
                            minPackageDays: 1,
                            maxPackageDays: 1,
                            createdAt: 1,
                            updatedAt: 1,
                        },
                    },
                ],
            },
        },
    ];

   const result = await Tour.aggregate(pipeline);

    const tours = result[0]?.data || [];
    const total = result[0]?.metadata[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    const pagination: PaginationType = {
        page,
        limit,
        totalItems: total,
        totalPages,
        isNextPage: page < totalPages,
        isPrevPage: page > 1,
    };

    return { tours, pagination };
}