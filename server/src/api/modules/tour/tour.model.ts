import { Document, model, Schema, Types } from "mongoose";
import { Hotels, HotelType, slugify } from "./tour.utils";

export interface IDayDetail {
    dayNumber: number;
    title: string;
    subtitle: string | null;
    description: string | null; // might also html string
}

interface DayDetailsDocument extends IDayDetail, Document {
    _id: Types.ObjectId;
}

export interface IHotelPlan {
    dayNumber: number;
    city: string;
    hotelName: string;
    nights: number;
    type: HotelType;
}

interface HotelPlanDocument extends IHotelPlan, Document {
    _id: Types.ObjectId;
}

export interface ITourPackage {
    name: string;
    days: number;
    nights: number;
    pricePerPerson: number;
    startCity: string;
    endCity: string;

    dayNumbers: number[]; // refresh by package no of based days and no of nights

    // // package-specific overrides (optional)
    // // for now, not using this
    // customDayDetails?: IDayDetail[];

    hotels: IHotelPlan[];
}

interface TourPackageDocument extends ITourPackage, Document {
    _id: Types.ObjectId;
}

export interface ITour {
    name: string;
    slug: string;
    description: string; // html string of whole tour
    includes: string[];
    excludes: string[];
    dayPlans: IDayDetail[]; // all day plans
    packages: ITourPackage[];
    isActive: boolean;

    images: string[];
    thumbnailImage: string;
    youtubeVideoUrl?: string;
}

export interface TourDocument extends ITour, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface TourLean extends ITour {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}


const dayDetailsSchema = new Schema<DayDetailsDocument>({
    dayNumber: { type: Number, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: null },
    description: { type: String, default: null },
}, { 
    _id: false, 
    versionKey: false 
});

const hotelPlanSchema = new Schema<HotelPlanDocument>({
    dayNumber: { type: Number, required: true },
    city: { type: String, required: true },
    hotelName: { type: String, required: true },
    nights: { type: Number, required: true },
    type: { type: String, enum: Hotels, required: true },
}, { 
    _id: false, 
    versionKey: false 
});

const tourPackagesSchema = new Schema<TourPackageDocument>({
    name: { type: String, required: true },
    days: { type: Number, required: true },
    nights: { type: Number, required: true },
    pricePerPerson: { type: Number, required: true },
    startCity: { type: String, required: true },
    endCity: { type: String, required: true },
    dayNumbers: { type: [Number], required: true },
    hotels: { type: [hotelPlanSchema], required: true },
}, { 
    _id: false, 
    versionKey: false 
});

const tourSchema = new Schema<TourDocument>({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    includes: { type: [String], required: true },
    excludes: { type: [String], required: true },
    dayPlans: { type: [dayDetailsSchema], required: true },
    packages: { type: [tourPackagesSchema], required: true },
    isActive: { type: Boolean, required: true },

    images: { type: [String], required: true },
    thumbnailImage: { type: String, required: true },
    youtubeVideoUrl: { type: String, default: null },
}, {
    timestamps: true,
    versionKey: false
})


tourSchema.pre("save", function (this) {
    if (this.isModified("name")) {
        this.slug = slugify(this.name);
    }
});


tourSchema.pre("findOneAndUpdate", function (this) {
    const update = this.getUpdate()
    if (!update || Array.isArray(update)) return;

    const name = update.name ?? update.$set?.name;
    if (!name) return;

    const newSlug = slugify(name);
    if (update.$set) {
        update.$set.slug = newSlug;
    } else {
        update.slug = newSlug;
    }

    this.setUpdate(update);
})


tourSchema.index({ slug: 1 });

const Tour = model<TourDocument>("Tour", tourSchema);

export default Tour;