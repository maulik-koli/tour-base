import mongoose, { Types } from "mongoose";
import Package from "./packages.model";
import Tour from "../tour/tour.model";

import { PackagePayload, PackagePriceSolt } from "./packages.schema";
import { CustomError } from "@/api/utils/response";
import { log } from "@/api/utils/log";

type AddPackageTourType = {
    tourId: Types.ObjectId;
    numberOfDays: number;
}

const MIN_PERSONS = 2;
const MAX_PERSONS = 12;


class PackageAdminService {
    public async addPackagesToTour (
        tour: AddPackageTourType, 
        packages: PackagePayload[],
        session?: mongoose.ClientSession
    ) {
        this.validatePackages(packages, tour.numberOfDays);

        const packagesData = packages.map(pckg => ({
            ...pckg,
            tourId: tour.tourId,
        }));

        await Package.insertMany(packagesData, { session });
    }

    public deletePackagesByTourId = async (tourId: Types.ObjectId, session: mongoose.ClientSession) => {
        await Package.deleteMany({ tourId }, { session });
    }

    public async createPackage(packagePayload: PackagePayload, tour: AddPackageTourType) {
        this.validatePackages([packagePayload], tour.numberOfDays);

        const newPackage = new Package({ ...packagePayload, tourId: tour.tourId });
        const savedPackage = await newPackage.save();
        
        return savedPackage.toObject();
    };

    public async updatePackage(packageId: string, packagePayload: PackagePayload) {
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

        this.validatePackages([packagePayload], tour.dayPlans.length);

        const updatedPackage = await Package.findByIdAndUpdate(
            packageId,
            { $set: packagePayload },
            { new: true }
        ).lean();

        return updatedPackage;
    }

    public async deletePackageById(packageId: string) {
        const id = new mongoose.Types.ObjectId(packageId);
        await Package.findByIdAndDelete(id);
    }

    private validatePackages(packages: PackagePayload[], tourDays: number) {
        const invalidPackages = packages
            .filter(pckg => {
                const invalidByDays = pckg.days > tourDays;
                
                const hotelsNightCount = pckg.hotels.reduce((total, hotel) => total + hotel.nightNo, 0);
                let invalidByNights = hotelsNightCount !== pckg.nights;

                log.info('in the add packages', { invalidByDays, invalidByNights })
                return invalidByDays || invalidByNights;
            })
            .map(pckg => pckg.name);
        
        if (invalidPackages.length > 0) {
            throw new CustomError(
                400, 
                `Number of days or nights are mismatch. Please check number of days plan with package days or number of total hotels nights with package nights.`
            );
        }
        
        const isPriceSlotValid = packages.every(pkg =>
            this.validatePriceSlot(pkg.priceSlots)
        );

        if (!isPriceSlotValid) {
            throw new CustomError(
                400,
                'Price slots are invalid. Please ensure: 1) Person count is between 2-12, 2) No duplicate person values, 3) Prices decrease as person count increases (e.g., price for 2 persons > price for 7 persons).'
            );
        }
    }

    private validatePriceSlot(priceSlots: PackagePriceSolt[]) {
        const maxEntries = MAX_PERSONS - MIN_PERSONS + 1; // 11 entries (2 to 12 inclusive)
        
        log.info('validate price slot', { 
            priceSlotsLength: priceSlots.length, 
            maxEntries 
        });
        
        // check max entries
        if (priceSlots.length > maxEntries) return false;
        
        // empty is valid
        if (priceSlots.length === 0) return true;
        
        // check all person values are within range [MIN_PERSONS, MAX_PERSONS]
        const invalidPersons = priceSlots.filter(
            slot => slot.persons < MIN_PERSONS || slot.persons > MAX_PERSONS
        );

        if (invalidPersons.length > 0) {
            log.info('validate price slot - invalid persons found', { invalidPersons });
            return false;
        }
        
        // extract persons and check for duplicates
        const persons = priceSlots.map(slot => slot.persons);
        const uniquePersons = new Set(persons);
        if (uniquePersons.size !== persons.length) {
            log.info('validate price slot - duplicate persons found');
            return false;
        }
        
        // sort by persons ascending
        const sorted = [...priceSlots].sort((a, b) => a.persons - b.persons);
        
        log.info('validate price slot - sorted', { 
            sorted: sorted.map(s => ({ persons: s.persons, price: s.price }))
        });
        
        // check that prices decrease as persons increase
        for (let i = 1; i < sorted.length; i++) {
            if (sorted[i].price >= sorted[i - 1].price) {
                return false;
            }
        }
        
        return true;
    }
}

const packageAdminService = new PackageAdminService();



class PackageService {
    public async getPackagesByTourId(tourId: Types.ObjectId) {
        const packages = await Package.find({ tourId }).lean();
        return packages;
    }
}

const packageService = new PackageService();


export { packageAdminService, packageService };