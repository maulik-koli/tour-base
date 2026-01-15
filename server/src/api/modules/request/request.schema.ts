import { z } from "zod";
import { resquestEnum } from "./request.model";

const phoneNumberSchema = z.string()
    .trim()
    .refine((val) => /^\d{10}$/.test(val), {
        message: 'Phone number must be exactly 10 digits',
    });


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


export type GenerateOtpPayload = z.infer<typeof generateOtpZodSchema>;
export type VerifyOtpPayload = z.infer<typeof verifyOtpZodSchema>;
