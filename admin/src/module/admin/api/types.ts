import { AdminLoginPayload } from "../utils/schema";

export type LoginPayload = AdminLoginPayload;

export type LoginResponse = null;

export interface GetProfileResponse {
    _id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
}

export type LogoutResponse = null;