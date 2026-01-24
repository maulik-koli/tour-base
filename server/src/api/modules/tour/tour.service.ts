import mongoose from "mongoose";
import Tour, { TourFields, TourLean } from "./tour.model";
import { CreateTourPayload, TourListAdminQueries, TourListQueries, TourPayload } from "./tour.schema";
import { addPakagesToTour, deletePackagesByTourId } from "../packages/packages.service";

import { CustomError } from "@/api/utils/response";
import { ADMIN_SORT_FIELD_MAP, DURATION_MAP, SORT_FIELD_MAP } from "./tour.utils";
import { PaginationType } from "@/api/core/types/common.type";
import { slugify } from "@/api/core/helper/data.helper";
import { TourListWithReviewsParams } from "../review/review.schema";


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


export const findTour = async (query: Partial<TourLean>, select?: TourFields[]) => {
    const tour = await Tour.findOne(query)
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

    // SEARCH: Only applies name + pagination, ignores all other filters
    if (search) {
        tourMatch.name = { $regex: search, $options: "i" };
        return await applySearchFilter(query, tourMatch);
    }

    if (category) {
        tourMatch.categories = { $in: [category] };
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
                        // If no conditions, include all packages; otherwise apply AND logic
                        cond: packageFilterConditions.length > 0 
                            ? { $and: packageFilterConditions }
                            : true,
                    },
                },
            },
        },
        // Only return tours that have at least one matching package
        {
            $match: {
                "matchedPackages.0": { $exists: true },
            },
        },
        {
            $addFields: {
                minPrice: { $min: "$matchedPackages.pricePerPerson" },
                maxPrice: { $max: "$matchedPackages.pricePerPerson" },
                minDays: { $min: "$matchedPackages.days" },
                maxDays: { $max: "$matchedPackages.days" },
                packageCount: { $size: "$matchedPackages" },
            },
        },
        {
            $facet: {
                metadata: [{ $count: "total" }],
                data: [
                    { $sort: SORT_FIELD_MAP[sort] },
                    { $skip: skip },
                    { $limit: limit },
                    {
                        $project: {
                            name: 1,
                            slug: 1,
                            tagLine: 1,
                            thumbnailImage: 1,
                            minPrice: 1,
                            maxPrice: 1,
                            minDays: 1,
                            maxDays: 1,
                            packageCount: 1,
                            createdAt: 1,
                            updatedAt: 1,
                        },
                    },
                ],
            },
        },
    ];

    const result = await Tour.aggregate(pipeline, {
        collation: { locale: 'en', strength: 2 }
    });

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


const applySearchFilter = async function(query: TourListQueries, tourMatch: any) {
    const { page, limit, sort } = query;

    const skip = (page - 1) * limit;

    const pipeline = [
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
                minPrice: { $min: "$packages.pricePerPerson" },
                maxPrice: { $max: "$packages.pricePerPerson" },
                minDays: { $min: "$packages.days" },
                maxDays: { $max: "$packages.days" },
                packageCount: { $size: "$packages" },
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
                            minPrice: 1,
                            maxPrice: 1,
                            minDays: 1,
                            maxDays: 1,
                            packageCount: 1,
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

        return {
            tours,
            pagination: {
                page,
                limit,
                totalItems: total,
                totalPages,
                isNextPage: page < totalPages,
                isPrevPage: page > 1,
            },
        };
}


export const toggleFeaturedTour = async (slug: string, isFeatured: boolean) => {
    const updateFields: any = { isFeatured };

    if (isFeatured) {
        const count = await Tour.countDocuments({ isFeatured: true });
        if (count >= 6) {
            throw new CustomError(400, "Cannot feature more than 6 tours");
        }
        updateFields.isActive = true;
    }

    const tour = await Tour.findOneAndUpdate(
        { slug },
        { $set: updateFields },
        { new: true }
    ).lean();

    if (!tour) {
        throw new CustomError(404, "Tour not found");
    }
}


export const getFeaturedTours = async () => {
    const tours = await Tour.aggregate([
        { $match: { isFeatured: true, isActive: true } },
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
                minPrice: { $min: "$packages.pricePerPerson" },
                maxPrice: { $max: "$packages.pricePerPerson" },
                minDays: { $min: "$packages.days" },
                maxDays: { $max: "$packages.days" },
                packageCount: { $size: "$packages" },
            },
        },
        {
            $project: {
                name: 1,
                slug: 1,
                tagLine: 1,
                thumbnailImage: 1,
                minPrice: 1,
                maxPrice: 1,
                minDays: 1,
                maxDays: 1,
                packageCount: 1,
                createdAt: 1,
                updatedAt: 1,
            }
        }
    ]);

    return tours;
}


export const getAllToursWithReviewCount = async (params: TourListWithReviewsParams) => {
    const { page, limit, search } = params;

    const skip = (page - 1) * limit;

    const matchStage: any = {};
    
    if (search) {
        matchStage.name = { $regex: search, $options: "i" };
    }
    
    const result = await Tour.aggregate([
        ...(Object.keys(matchStage).length > 0 ? [{ $match: matchStage }] : []),
        {
            $lookup: {
                from: "reviews",
                let: { tourId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$tourId", "$$tourId"] }
                        }
                    },
                    { $count: "count" }
                ],
                as: "reviews"
            }
        },
        {
            $addFields: {
                reviewCount: {
                    $ifNull: [{ $arrayElemAt: ['$reviews.count', 0] }, 0]
                }
            }
        },
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
                            reviewCount: 1
                        }
                    }
                ]
            }
        }
    ]);

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