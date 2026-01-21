import { model, Schema, Types } from "mongoose";
import { PackageCategoryType, PackageCategoryValues } from "./packge.utils";

export interface IHotelPlan {
    hotelName: string;
    city: string;
    nightNo: number;
}

interface HotelPlanDocument extends IHotelPlan, Document {
    _id: Types.ObjectId;
}

export interface IPricingSlot {
    persons: number;
    price: number;
}

interface PricingSlotDocument extends IPricingSlot, Document {
    _id: Types.ObjectId;
}

export interface ITourPackage {
    tourId: Types.ObjectId;
    name: string;
    days: number;
    nights: number;

    pricePerPerson: number;
    childrenPrice: number;
    priceSlots: IPricingSlot[];
    category: PackageCategoryType;
    
    startCity: string;
    endCity: string;
    hotels: IHotelPlan[];
}

interface TourPackageDocument extends ITourPackage, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface TourPackageLean extends ITourPackage {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export type TourPackageFields = keyof TourPackageLean;


const hotelSchema = new Schema<HotelPlanDocument>({
    hotelName: { type: String, required: true },
    city: { type: String, required: true },
    nightNo: { type: Number, required: true },
}, {
    versionKey: false,
    _id: false,
});


const priceSlotSchema = new Schema<PricingSlotDocument>({
    persons: { type: Number, required: true },
    price: { type: Number, required: true },
}, {
    versionKey: false,
    _id: false,
});


const packageSchema = new Schema<TourPackageDocument>({
    tourId: { type: Schema.Types.ObjectId, required: true, ref: 'Tour' },
    name: { type: String, required: true },
    days: { type: Number, required: true },
    nights: { type: Number, required: true },

    pricePerPerson: { type: Number, required: true },
    childrenPrice: { type: Number, required: true },
    priceSlots: { type: [priceSlotSchema], default: [] },
    category: { type: String, enum: PackageCategoryValues, required: false }, // temporary not required

    startCity: { type: String, required: true },
    endCity: { type: String, required: true },
    hotels: { type: [hotelSchema], required: true },
}, {
    versionKey: false,
    timestamps: true,
});

packageSchema.index({ tourId: 1 });

const Package = model<TourPackageDocument>('Package', packageSchema);

export default Package;