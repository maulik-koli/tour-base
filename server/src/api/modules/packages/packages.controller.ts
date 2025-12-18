import { createPackage, deletePackageById, getPackagesByTourId, updatePackage } from "./packages.service";
import { getTourBySlug } from "../tour/tour.service";
import { PackagePayload } from "./packages.schema";
import { asyncWrapper } from "@/api/utils/apiHelper";


export const getPackagesOfTourController = asyncWrapper(async (req, res) => {
    const slug = req.params.slug;

    const tour = await getTourBySlug(slug,  ["slug"]);
    const packages = await getPackagesByTourId(tour._id);

    return res.status(200).json({
        status: 200,
        message: "Packages fetched successfully",
        data: packages,
    });
});


export const createPackageController = asyncWrapper(async (req, res) => {
    const slug = req.params.slug;
    const payload = req.body as PackagePayload;

    const tour = await getTourBySlug(slug,  ["slug", "dayPlans"]);

    const newPackage = await createPackage(payload, {
        tourId: tour._id, numberOfDays: tour.dayPlans.length
    });

    return res.status(201).json({
        status: 201,
        message: "Package added successfully",
        data: newPackage,
    });
});


export const updatePackageController = asyncWrapper(async (req, res) => {
    const packageId = req.params.packageId;
    const payload = req.body as PackagePayload;

    const updatedPackage = await updatePackage(packageId, payload);

    return res.status(200).json({
        status: 200,
        message: "Package updated successfully",
        data: updatedPackage,
    });
});


export const removePackageFromTourController = asyncWrapper(async (req, res) => {
    const packageId = req.params.packageId;

    const deletedPackage = await deletePackageById(packageId);

    return res.status(200).json({
        status: 200,
        message: "Package deleted successfully",
        data: deletedPackage,
    });
});