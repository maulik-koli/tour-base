import mongoose, { Types } from "mongoose";
import Package, { TourPackageFields, TourPackageLean } from "./packages.model";
import Tour from "../tour/tour.model";
import { PackagePayload } from "./packages.schema";
import { CustomError } from "@/api/utils/response";
import { log } from "@/api/utils/log";

type AddPackageTourType = {
    tourId: Types.ObjectId;
    numberOfDays: number;
}

const validatePackages = function(packages: PackagePayload[], tourDays: number) {
    const invalidPackages = packages
        .filter(pckg => {
            const invalidByDays = pckg.days > tourDays;
            
            const hotelsNightCount = pckg.hotels.reduce((total, hotel) => total + hotel.nightNo, 0);
            let invalidByNights = hotelsNightCount !== pckg.nights;

            log.info('in the add packages', { invalidByDays, invalidByNights })
            return invalidByDays || invalidByNights;
        })
        .map(pckg => pckg.name);

    log.info('Invalid Packages:', invalidPackages);

    if (invalidPackages.length > 0) {
        throw new CustomError(
            400, 
            `Number of days or nights are mismatch. Please check number of days plan with package days or number of total hotels nights with package nights.`
        );
    }
}


export const addPakagesToTour = async (
    tour: AddPackageTourType, 
    packages: PackagePayload[],
    session?: mongoose.ClientSession
) => {
    validatePackages(packages, tour.numberOfDays);

    const packagesData = packages.map(pckg => ({
        ...pckg,
        tourId: tour.tourId,
    }));

    await Package.insertMany(packagesData, { session });
};


export const getPackagesByTourId = async (tourId: Types.ObjectId) => {
    const packages = await Package.find({ tourId }).lean();
    return packages;
}


export const createPackage = async (packagePayload: PackagePayload, tour: AddPackageTourType) => {
    validatePackages([packagePayload], tour.numberOfDays);

    const newPackage = new Package({ ...packagePayload, tourId: tour.tourId });
    const savedPackage = await newPackage.save();
    
    return savedPackage.toObject();
};


export const updatePackage = async (packageId: string, packagePayload: PackagePayload) => {
    const existingPackage = await Package.findById(packageId)
        .select("tourId")
        .lean();

    if (!existingPackage) {
        throw new CustomError(404, "Package not found");
    }

    const tour = await Tour.findById(existingPackage.tourId)
        .select("dayPlans")
        .lean();

    if (!tour) {
        throw new CustomError(404, "Parent tour not found");
    }

    validatePackages([packagePayload], tour.dayPlans.length);

    const updatedPackage = await Package.findByIdAndUpdate(
        packageId,
        { $set: packagePayload },
        { new: true }
    ).lean();

    return updatedPackage;
}


export const deletePackagesByTourId = async (tourId: Types.ObjectId, session: mongoose.ClientSession) => {
    await Package.deleteMany({ tourId }, { session });
}


export const deletePackageById = async (packageId: string) => {
    const id = new mongoose.Types.ObjectId(packageId);
    await Package.findByIdAndDelete(id);
}


export const findPackage = async ({
    query, select, unSelect
}: { query: Partial<TourPackageLean>, select?: TourPackageFields[], unSelect?: TourPackageFields[] }) => {
    
    const selectFields = select ? select.join(' ') : '';
    const unSelectField = unSelect ? unSelect.map(f => `-${f}`).join(' ') : '';

    const pck = await Package.findOne(query)
        .select(selectFields + ' ' + unSelectField)
        .lean();

    if(!pck) {
        throw new CustomError(404, 'Package not found');
    }

    return pck;
}