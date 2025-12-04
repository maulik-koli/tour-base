import { CreateTourPayload, TourListAdminQueries, TourPayload } from "./tour.schema";
import { createTour, deleteTourBySlug, getAdminToursList, getTourBySlug, updateTourBySlug } from "./tour.service";
import { addPakagesToTour, getPackagesByTourId } from "../packages/packages.service";

import { asyncWrapper } from "@/api/utils/apiHelper";
import { successResponse } from "@/api/utils/response";


export const createTourController = asyncWrapper(async (req, res) => {
    const payload = req.body as CreateTourPayload;

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
    const packages = await getPackagesByTourId(tour._id);

    successResponse(res, {
        message: "Tour fetched successfully",
        status: 200,
        data: { tour, packages },
    });
});


export const updateTourController = asyncWrapper(async (req, res) => {
    const { slug } = req.params;
    const payload = req.body as TourPayload;

    const tour = await updateTourBySlug(slug, payload);

    successResponse(res, {
        message: "Tour updated successfully",
        status: 200,
        data: tour,
    });
});


export const getAdminToursListController = asyncWrapper(async (req, res) => {
    const query = res.locals.query as TourListAdminQueries;
    const { pagination, tours } = await getAdminToursList(query);

    successResponse(res, {
        message: "Admin tours list fetched successfully",
        status: 200,
        data: { pagination, tours },
    });
});


export const deleteTourController = asyncWrapper(async (req, res) => {
    const { slug } = req.params;
    await deleteTourBySlug(slug);

    successResponse(res, {
        message: "Tour deleted successfully",
        status: 200,
        data: null,
    });
});