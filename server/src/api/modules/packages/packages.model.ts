import { model, Schema, Types } from "mongoose";


export interface IHotelPlan {
    hotelName: string;
    city: string;
    nightNo: number;
    dayNo: number;
}

interface HotelPlanDocument extends IHotelPlan, Document {
    _id: Types.ObjectId;
}

export interface ITourPackage {
    tourId: Types.ObjectId;
    name: string;
    days: number;
    nights: number;

    pricePerPerson: number;
    starHierarchy: number; // hierarchy of the package value
    
    startCity: string;
    endCity: string;
    hotels: IHotelPlan[];
}

interface TourPackageDocument extends ITourPackage, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

interface TourPackageLean extends ITourPackage {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}


const hotelSchema = new Schema<HotelPlanDocument>({
    hotelName: { type: String, required: true },
    city: { type: String, required: true },
    nightNo: { type: Number, required: true },
    dayNo: { type: Number, required: true },
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
    starHierarchy: { type: Number, required: true },

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