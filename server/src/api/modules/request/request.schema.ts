import { z } from "zod";
import { resquestEnum } from "./request.model";
import { phoneNumberSchema } from "@/api/core/validation/customer.schema";


export const generateOtpZodSchema = z.object({
    phone: phoneNumberSchema,
    travelDate: z.coerce.date(),
    requestType: z.enum(resquestEnum),
});


export const verifyOtpZodSchema = z.object({
    sessionId: z.string()
        .trim()
        .refine((val) => val.startsWith('grs_') && val.length === 22, {
            message: 'Invalid session ID format',
        }),
    otp: z.string()
        .trim()
        .refine((val) => /^\d{6}$/.test(val), {
            message: 'OTP must be exactly 6 digits',
        }),
});


export const adminRequestListQueriesZodSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(25),
});


export type GenerateOtpPayload = z.infer<typeof generateOtpZodSchema>;
export type VerifyOtpPayload = z.infer<typeof verifyOtpZodSchema>;
export type AdminRequestListQueries = z.infer<typeof adminRequestListQueriesZodSchema>;
