import { model, Schema, Types } from "mongoose";

export const resquestEnum = ["GET_DETAILS", "CANCEL_BOOKING"] as const;
export type RequestType = typeof resquestEnum[number];

interface IOtpData {
    otp: string;
    expiresAt: Date;
    resendCount: number;
    sessionId: string;
    sessionCreatedAt: Date;
    isVerified: boolean;
}

interface IOtpDataDocument extends IOtpData, Document {}

interface IBookingData {
    bookingId: string;
    customerName: string;
    bookedAt: Date;
    totalAmount: number;
    isFullPaid: boolean;
}

interface IRequest {
    requestType: RequestType;
    isOpen: boolean;
    phone: string;
    travelDate: Date;
    otpData: IOtpData;
    bookingData?: IBookingData;
}

interface RequestDocument extends IRequest, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const otpDataSchema = new Schema<IOtpDataDocument>({
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    resendCount: { type: Number, default: 0 },
    sessionId: { type: String, required: true },
    sessionCreatedAt: { type: Date, required: true },
    isVerified: { type: Boolean, default: false },
}, {
    versionKey: false,
    _id: false,
});

const requestSchema = new Schema<RequestDocument>({
    requestType: { type: String, required: true, enum: resquestEnum },
    isOpen: { type: Boolean, default: true },
    phone: { type: String, required: true },
    travelDate: { type: Date, required: true },
    otpData: { type: otpDataSchema, required: true },
    bookingData: {
        bookingId: { type: String, required: false },
        customerName: { type: String, required: false },
        bookedAt: { type: Date, required: false },
        totalAmount: { type: Number, required: false },
        isFullPaid: { type: Boolean, required: false },
    },
}, {
    timestamps: true,
    versionKey: false,
});

requestSchema.index({ phone: 1, travelDate: 1 });

const RequestModel = model<RequestDocument>("Request", requestSchema);

export default RequestModel;