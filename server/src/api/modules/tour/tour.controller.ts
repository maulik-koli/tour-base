import { CreateTourPayload, SetFeaturedTourPayload, TourListAdminQueries, TourListQueries, TourPayload } from "./tour.schema";
import { findTour, tourAdminService, tourService } from "./tour.service";

import { asyncWrapper } from "@/api/utils/asyncWrapper";
import { successResponse } from "@/api/utils/response";
import { log } from "@/api/utils/log";
import { packageService } from "../packages/packages.service";


class TourAdminController {
    public createTour = asyncWrapper(async (req, res) => {
        const payload = req.body as CreateTourPayload;

        await tourAdminService.handleCreateTour(payload);

        successResponse(res, {
            message: "Tour created successfully",
            status: 201,
            data: null,
        });
    });

    public getToursList = asyncWrapper(async (req, res) => {
        const query = req.localsQuery as TourListAdminQueries;

        const { pagination, tours } = await tourAdminService.handleToursList(query);

        successResponse(res, {
            message: "Admin tours list fetched successfully",
            status: 200,
            data: { pagination, tours },
        });
    });

    public getTour = asyncWrapper(async (req, res) => {
        const slug = req.params.slug;

        const tour = await findTour({ slug });
        const packages = await packageService.getPackagesByTourId(tour._id);

        successResponse(res, {
            message: "Tour fetched successfully",
            status: 200,
            data: { tour, packages },
        });
    });

    public updateTour = asyncWrapper(async (req, res) => {
        const slug = req.params.slug;
        const payload = req.body as TourPayload;

        const tour = await tourAdminService.updateTour(slug, payload);

        successResponse(res, {
            message: "Tour updated successfully",
            status: 200,
            data: tour,
        });
    });

    public deleteTour = asyncWrapper(async (req, res) => {
        const slug = req.params.slug;

        await tourAdminService.deleteTour(slug);

        successResponse(res, {
            message: "Tour deleted successfully",
            status: 200,
            data: null,
        });
    });

    public toggleFeaturedTour = asyncWrapper(async (req, res) => {
        const slug = req.params.slug;
        const { isFeatured } = req.body as SetFeaturedTourPayload;

        await tourAdminService.toggleFeaturedTour(slug, isFeatured);

        successResponse(res, {
            message: "Tour featured status updated successfully",
            status: 200,
            data: null,
        });
    });
}

const tourAdminController = new TourAdminController();



class TourController {
    public getToursList = asyncWrapper(async (req, res) => {
        const query = req.localsQuery as TourListQueries;
        log.info("Public tour list query", query);

        const { pagination, tours } = await tourService.getToursList(query);

        successResponse(res, {
            message: "Tours list fetched successfully",
            status: 200,
            data: { pagination, tours },
        });
    });

    public getTour = asyncWrapper(async (req, res) => {
        const slug = req.params.slug;

        const tour = await findTour({ 
            slug, 
            isActive: true
        });
        const packages = await packageService.getPackagesByTourId(tour._id);

        successResponse(res, {
            message: "Tour fetched successfully",
            status: 200,
            data: { tour, packages },
        });
    });

    public getFeaturedTours = asyncWrapper(async (req, res) => {
        const tours = await tourService.getFeaturedTours();

        successResponse(res, {
            message: "Featured tours fetched successfully",
            status: 200,
            data: tours,
        });
    });
}

const tourController = new TourController();



export { tourAdminController, tourController };