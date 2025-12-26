import { CreateTourPayload, SetFeaturedTourPayload, TourListAdminQueries, TourListQueries, TourPayload } from "./tour.schema";
import { 
    createTour, deleteTour, findTour, getAdminToursList, getFeaturedTours, getTourBySlug, getToursList, toggleFeaturedTour, updateTour
} from "./tour.service";
import { getPackagesByTourId } from "../packages/packages.service";

import { asyncWrapper } from "@/api/utils/apiHelper";
import { successResponse } from "@/api/utils/response";
import { log } from "@/api/utils/log";


export const createTourController = asyncWrapper(async (req, res) => {
    const payload = req.body as CreateTourPayload;

    await createTour(payload);

    successResponse(res, {
        message: "Tour created successfully",
        status: 201,
        data: null,
    })
});


export const getTourAdminController = asyncWrapper(async (req, res) => {
    const slug = req.params.slug;

    const tour = await getTourBySlug(slug);
    const packages = await getPackagesByTourId(tour._id);

    successResponse(res, {
        message: "Tour fetched successfully",
        status: 200,
        data: { tour, packages },
    });
});


export const updateTourController = asyncWrapper(async (req, res) => {
    const slug = req.params.slug;
    const payload = req.body as TourPayload;

    const tour = await updateTour(slug, payload);

    successResponse(res, {
        message: "Tour updated successfully",
        status: 200,
        data: tour,
    });
});


export const deleteTourController = asyncWrapper(async (req, res) => {
    const slug = req.params.slug;

    await deleteTour(slug);

    successResponse(res, {
        message: "Tour deleted successfully",
        status: 200,
        data: null,
    });
});


export const getAdminToursListController = asyncWrapper(async (req, res) => {
    const query = req.localsQuery as TourListAdminQueries;

    const { pagination, tours } = await getAdminToursList(query);

    successResponse(res, {
        message: "Admin tours list fetched successfully",
        status: 200,
        data: { pagination, tours },
    });
});


export const getToursListController = asyncWrapper(async (req, res) => {
    const query = req.localsQuery as TourListQueries;
    log.info("Public tour list query", query);

    const { pagination, tours } = await getToursList(query);

    successResponse(res, {
        message: "Admin tours list fetched successfully",
        status: 200,
        data: { pagination, tours },
    });
});


export const getTourController = asyncWrapper(async (req, res) => {
    const slug = req.params.slug;

    const tour = await findTour(slug);
    const packages = await getPackagesByTourId(tour._id);

    successResponse(res, {
        message: "Tour fetched successfully",
        status: 200,
        data: { tour, packages },
    });
});


export const toggleFeaturedTourController = asyncWrapper(async (req, res) => {
    const slug = req.params.slug;
    const { isFeatured } = req.body as SetFeaturedTourPayload;

    await toggleFeaturedTour(slug, isFeatured);

    successResponse(res, {
        message: "Tour featured status updated successfully",
        status: 200,
        data: null,
    });
});


export const getFeaturedToursController = asyncWrapper(async (req, res) => {
    const tours = await getFeaturedTours();

    successResponse(res, {
        message: "Featured tours fetched successfully",
        status: 200,
        data: tours,
    });
});