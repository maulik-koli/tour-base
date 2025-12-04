import mongoose, { Types } from "mongoose";
import Package from "./packages.model";
import { PackagePayload } from "./packages.schema";
import { CustomError } from "@/api/utils/response";
import { log } from "@/api/utils/log";

type AddPackageTourType = {
    tourId: Types.ObjectId;
    numberOfDays: number;
}


export const addPakagesToTour = async (
    tour: AddPackageTourType, 
    packages: PackagePayload[],
    session?: mongoose.ClientSession
) => {

    const invalidPackages = packages
        .filter(pckg => pckg.days > tour.numberOfDays)
        .map(pckg => pckg.name);

    if (invalidPackages.length > 0) {
        throw new CustomError(
            400, 
            `Number of days and tour days mismatch in the following packages: ${invalidPackages.join(', ')}`
        );
    }

    const packagesData = packages.map(pckg => ({
        ...pckg,
        tourId: tour.tourId,
    }));

    await Package.insertMany(packagesData, { session });
};


export const createPackage = async (tourId: Types.ObjectId, packagePayload: PackagePayload) => {
    const newPackage = new Package({ ...packagePayload, tourId });
    const savedPackage = await newPackage.save();
    return savedPackage.toObject();
};


export const updatePackage = async (packageId: string, packagePayload: PackagePayload) => {
    const id = new mongoose.Types.ObjectId(packageId);

    const updatedPackage = await Package.findByIdAndUpdate(
        id,
        { $set: packagePayload },
        { new: true }
    ).lean();

    if (!updatedPackage) {
        throw new CustomError(404, 'Package not found');
    }

    return updatedPackage;
}


export const getPackagesByTourId = async (tourId: Types.ObjectId) => {
    const packages = await Package.find({ tourId }).lean();
    return packages;
}


export const deletePackagesByTourId = async (tourId: Types.ObjectId, session: mongoose.ClientSession) => {
    await Package.deleteMany({ tourId }, { session });
}


export const deletePackageById = async (packageId: string) => {
    const id = new mongoose.Types.ObjectId(packageId);
    await Package.findByIdAndDelete(id);
}