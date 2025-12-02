import { createTour, getTourBySlug, updateTourBySlug, validateTourData } from "./tour.service";
import { TourPayload } from "./tour.schema";

import { asyncWrapper } from "@/api/utils/apiHelper";
import { successResponse } from "@/api/utils/response";


export const createTourController = asyncWrapper(async (req, res) => {
    const payload = req.body as TourPayload;

    validateTourData(payload);

    await createTour(payload);

    successResponse(res, {
        message: "Tour created successfully",
        status: 201,
        data: null,
    })
});


export const getTourController = asyncWrapper(async (req, res) => {
    const { slug } = req.params;

    const tour = await getTourBySlug(slug);

    successResponse(res, {
        message: "Tour fetched successfully",
        status: 200,
        data: tour,
    });
});


export const updateTourController = asyncWrapper(async (req, res) => {
    const { slug } = req.params;
    const payload = req.body as TourPayload;

    validateTourData(payload);
    const tour = await updateTourBySlug(slug, payload);

    successResponse(res, {
        message: "Tour updated successfully",
        status: 200,
        data: tour,
    });
});


const getToursListController = asyncWrapper(async (req, res) => {});

const deleteTourController = asyncWrapper(async (req, res) => {});