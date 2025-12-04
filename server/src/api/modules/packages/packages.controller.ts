import { createPackage, deletePackageById, getPackagesByTourId, updatePackage } from "./packages.service";
import { getTourBySlug } from "../tour/tour.service";
import { PackagePayload } from "./packages.schema";
import { asyncWrapper } from "@/api/utils/apiHelper";
import { log } from "@/api/utils/log";


export const getPackagesOfTourController = asyncWrapper(async (req, res) => {
    const { slug } = req.params;

    const tour = await getTourBySlug(slug,  ["slug"]);
    const packages = await getPackagesByTourId(tour._id);

    return res.status(200).json({
        status: 200,
        message: "Packages fetched successfully",
        data: packages,
    });
});


export const addPackageController = asyncWrapper(async (req, res) => {
    const { slug } = req.params;
    const payload = req.body as PackagePayload;

    const tour = await getTourBySlug(slug,  ["slug"]);
    const newPackage = await createPackage(tour._id, payload);

    return res.status(201).json({
        status: 201,
        message: "Package added successfully",
        data: newPackage,
    });
});


export const updatePackageController = asyncWrapper(async (req, res) => {
    const { packageId } = req.params;
    const payload = req.body as PackagePayload;

    const updatedPackage = await updatePackage(packageId, payload);

    return res.status(200).json({
        status: 200,
        message: "Package updated successfully",
        data: updatedPackage,
    });
});


export const removePackageFromTourController = asyncWrapper(async (req, res) => {
    const { packageId } = req.params;

    const deletedPackage = await deletePackageById(packageId);

    return res.status(200).json({
        status: 200,
        message: "Package deleted successfully",
        data: deletedPackage,
    });
});