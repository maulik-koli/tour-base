import { model, Schema } from "mongoose";
import { Types } from "mongoose";

const bookingStatusEnum = ["DRAFT", "DETAILS_FILLED", "PAID_PARTIAL", "PAID_FULL"] as const;
const paymentStatusEnum = ["ACTIVE", "PAID", "EXPIRED", "CANCELLED"] as const;
export const paymentOptionsEnum = ["PARTIAL", "FULL"] as const;

type BokkingStatus = typeof bookingStatusEnum[number];
type PaymentStatus = typeof paymentStatusEnum[number];
type PaymentOption = typeof paymentOptionsEnum[number];

type CustomerMemberDetails = {
    fullName: string;
    age: number;
    gender: "M" | "F";
}

interface CustomerMemberDetailsDocument extends CustomerMemberDetails, Document {}

type CustomerDetailsType = {
    fullName: string;
    phone1: string;
    phone2?: string;
    dateOfTravel: Date;
    members: CustomerMemberDetails[];
}

interface CustomerDetailsDocument extends CustomerDetailsType, Document {}

type TourDetailsType = {
    tourName: string;
    includes: string[];
    excludes: string[];
}

type PackageDetailsType = {
    packageName: string;
    days: number;
    nights: number;

    pricePerPerson: number;
    childrenPrice: number;
    startCity: string;
    endCity: string;
}

type PaymentType = {
    paymentOption: PaymentOption;
    paymentAmount: number;

    paymentStatus: PaymentStatus;
    cf_order_id?: string;
    order_created_at?: Date;
    payment_session_id?: string;
}

interface PaymentDocument extends PaymentType, Document {}


interface IBooking {
    tourId: Types.ObjectId
    packageId: Types.ObjectId
    bookingStatus: BokkingStatus
    expiresAt: Date

    customerDetails?: CustomerDetailsType
    tourDetails?: TourDetailsType
    packageDetails?: PackageDetailsType

    totalAmount?: number;
    paymentDetails?: PaymentType
}

export interface BookingDocument extends IBooking, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface BookingLean extends IBooking {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export type BookingFields = keyof BookingLean;


const customerMemberDetailsSchema = new Schema<CustomerMemberDetailsDocument>({
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ["M", "F"] },
}, {
    versionKey: false,
    _id: false,
});


const customerDetailsSchema = new Schema<CustomerDetailsDocument>({
    fullName: { type: String, required: true },
    phone1: { type: String, required: true },
    phone2: { type: String, required: false },
    dateOfTravel: { type: Date, required: true },
    members: { type: [customerMemberDetailsSchema], required: true },
}, {
    versionKey: false,
    _id: false,
});


const paymentDetailsSchema = new Schema<PaymentDocument>({
    paymentOption: { type: String, required: true, enum: paymentOptionsEnum },
    paymentAmount: { type: Number, required: true },

    paymentStatus: { type: String, required: true, enum: paymentStatusEnum },
    cf_order_id: { type: String, required: false },
    order_created_at: { type: Date, required: false },
    payment_session_id: { type: String, required: false },
}, {
    versionKey: false,
    _id: false,
});


const bookingSchema = new Schema<BookingDocument>({
    tourId: { type: Schema.Types.ObjectId, required: true, ref: 'Tour' },
    packageId: { type: Schema.Types.ObjectId, required: true, ref: 'Package' },

    bookingStatus: { type: String, required: true, enum: bookingStatusEnum },
    expiresAt: { type: Date, required: true },

    customerDetails: { type: customerDetailsSchema, required: false },

    tourDetails: { 
        required: false,
        type: {
            tourName: { type: String, required: true },
            includes: { type: [String], default: [] },
            excludes: { type: [String], default: [] },
        },
    },

    packageDetails: { 
        required: false,
        type: {
            packageName: { type: String, required: true },
            days: { type: Number, required: true },
            nights: { type: Number, required: true },

            pricePerPerson: { type: Number, required: true },
            childrenPrice: { type: Number, required: true },
            startCity: { type: String, required: true },
            endCity: { type: String, required: true },
        },
    },

    totalAmount: { type: Number, required: false },
    paymentDetails: { type: paymentDetailsSchema, required: false  },
}, {
    timestamps: true,
    versionKey: false,
});


bookingSchema.index({ expiresAt: 1, bookingStatus: 1 });

const Booking = model<BookingDocument>("Booking", bookingSchema);

export default Booking;