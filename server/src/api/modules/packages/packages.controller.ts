import { packageAdminService, packageService } from "./packages.service";
import { findTour } from "../tour/tour.service";
import { PackagePayload } from "./packages.schema";
import { asyncWrapper } from "@/api/utils/asyncWrapper";


class PackageAdminController {
    public getPackagesOfTour = asyncWrapper(async (req, res) => {
        const slug = req.params.slug;

        const tour = await findTour(
            { slug },  ["slug"]
        );
        const packages = await packageService.getPackagesByTourId(tour._id);

        return res.status(200).json({
            status: 200,
            message: "Packages fetched successfully",
            data: packages,
        });
    });

    public createPackage = asyncWrapper(async (req, res) => {
        const slug = req.params.slug;
        const payload = req.body as PackagePayload;

        const tour = await findTour(
            { slug },
            ["slug", "dayPlans"]
        );

        const newPackage = await packageAdminService.createPackage(payload, {
            tourId: tour._id, numberOfDays: tour.dayPlans.length
        });

        return res.status(201).json({
            status: 201,
            message: "Package added successfully",
            data: newPackage,
        });
    });

    public updatePackage = asyncWrapper(async (req, res) => {
        const packageId = req.params.packageId;
        const payload = req.body as PackagePayload;

        const updatedPackage = await packageAdminService.updatePackage(
            packageId,
            payload
        );

        return res.status(200).json({
            status: 200,
            message: "Package updated successfully",
            data: updatedPackage,
        });
    });

    public removePackageFromTour = asyncWrapper(async (req, res) => {
        const packageId = req.params.packageId;

        const deletedPackage = await packageAdminService.deletePackageById(packageId);

        return res.status(200).json({
            status: 200,
            message: "Package deleted successfully",
            data: deletedPackage,
        });
    });
}

export const packageAdminController = new PackageAdminController();