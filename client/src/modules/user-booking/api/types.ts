import { GenerateOtpFormType } from "../utils/schema";

export enum UserRequest {
    GET_DETAILS = 'GET_DETAILS',
    CANCEL_BOOKING = 'CANCEL_BOOKING',
}

export type UserRequestType = keyof typeof UserRequest;

export const resquestEnum = Object.values(UserRequest);


export interface GetRequestSessionParams {
    sessionId: string;
}

export interface GetRequestSessionResponse {
    sessionId: string;
    requestType: UserRequestType;
    isVerified: boolean;
}

export interface GenerateOtpPayload extends GenerateOtpFormType {
    requestType: UserRequestType;
}

export interface GenerateOtpResponse {
    sessionId: string;
    resendCount: number;
    expiresAt: string;
}


export interface VerifyOtpPayload {
    sessionId: string;
    otp: string;
}

export interface VerifyOtpResponse {
    sessionId: string;
    requestType: UserRequestType;
    isVerified: boolean;
}