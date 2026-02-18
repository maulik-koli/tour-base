import { model, Schema } from "mongoose";
import { Types } from "mongoose";

export const bookingStatusEnum = ["DRAFT", "DETAILS_FILLED", "PAID_PARTIAL", "PAID_FULL", "FAILED"] as const;
export const orderStatusEnum = ["ACTIVE", "PAID", "EXPIRED", "CANCELLED"] as const;
export const paymentOptionsEnum = ["PARTIAL", "FULL"] as const;

export type BookingStatus = typeof bookingStatusEnum[number];
export type OrderStatus = typeof orderStatusEnum[number];
export type PaymentOption = typeof paymentOptionsEnum[number];

type CustomerMemberDetails = {
    fullName: string;
    age: number;
    gender: "M" | "F";
}

interface CustomerMemberDetailsDocument extends CustomerMemberDetails, Document {}

type CustomerDetailsType = {
    fullName: string;
    phone1: string;
    phone2: string;
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
    
    order_status: OrderStatus;
    order_amount: number;
    cf_order_id: string;
    order_created_at: string;
    payment_session_id: string;
}

interface PaymentDocument extends PaymentType, Document {}

type TemporaryPaymentRecord = {
    upiUrl: string;
    paymentOption: PaymentOption;
    generatedAt: Date;
}

interface TemporaryPaymentRecordDocument extends TemporaryPaymentRecord, Document {}


interface IBooking {
    tourId: Types.ObjectId
    packageId: Types.ObjectId
    bookingStatus: BookingStatus
    expiresAt: Date
    accessToken: string | null

    customerDetails?: CustomerDetailsType
    tourDetails?: TourDetailsType
    packageDetails?: PackageDetailsType

    totalAmount?: number;
    paymentDetails?: PaymentType
    temporaryPaymentRecord?: TemporaryPaymentRecord
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
    phone2: { type: String, required: true },
    dateOfTravel: { type: Date, required: true },
    members: { type: [customerMemberDetailsSchema], required: true },
}, {
    versionKey: false,
    _id: false,
});


const paymentDetailsSchema = new Schema<PaymentDocument>({
    paymentOption: { type: String, required: true, enum: paymentOptionsEnum },
    
    order_status: { type: String, required: true, enum: orderStatusEnum },
    order_amount: { type: Number, required: true },
    cf_order_id: { type: String, required: true },
    order_created_at: { type: String, required: true },
    payment_session_id: { type: String, required: true },
}, {
    versionKey: false,
    _id: false,
});

const temporaryPaymentRecordSchema = new Schema<TemporaryPaymentRecordDocument>({
    upiUrl: { type: String, required: true },
    paymentOption: { type: String, required: true, enum: paymentOptionsEnum },
    generatedAt: { type: Date, required: true },
}, {
    versionKey: false,
    _id: false,
});


const bookingSchema = new Schema<BookingDocument>({
    tourId: { type: Schema.Types.ObjectId, required: true, ref: 'Tour' },
    packageId: { type: Schema.Types.ObjectId, required: true, ref: 'Package' },

    bookingStatus: { type: String, required: true, enum: bookingStatusEnum },
    expiresAt: { type: Date, required: true },
    accessToken: { type: String, required: true },

    customerDetails: { type: customerDetailsSchema, required: false },

    tourDetails: { 
        required: false,
        type: {
            tourName: { type: String, required: true },
            thumbnailImage: { type: String, required: true },
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

    temporaryPaymentRecord: { type: temporaryPaymentRecordSchema, required: false },
    totalAmount: { type: Number, required: false },
    paymentDetails: { type: paymentDetailsSchema, required: false  },
}, {
    timestamps: true,
    versionKey: false,
});


bookingSchema.index({ expiresAt: 1, bookingStatus: 1 });

const Booking = model<BookingDocument>("Booking", bookingSchema);

export default Booking;