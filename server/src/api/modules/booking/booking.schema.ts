import { z } from "zod";
import { Types } from "mongoose";
import { paymentOptionsEnum } from "./booking.model";

const mongoIdSchema = (field: string) => z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
        message:  `Invalid ${field} ID`,
    });

const phoneNumberSchema = z.string()
    .trim()
    .refine((val) => /^\d{10}$/.test(val), {
        message: 'Phone number must be exactly 10 digits',
    });


export const createBookingZodSchema = z.object({
    tourId: mongoIdSchema("tour"),
    packageId: mongoIdSchema("package"),
});


export const customerDetailsZodSchema = z.object({
    fullName: z.string()
        .min(3, 'Full name must be at least 3 characters')
        .trim(),
    phone1: phoneNumberSchema,
    phone2: phoneNumberSchema.optional(),

    dateOfTravel: z.coerce.date(),
    members: z.array(z.object({
        fullName: z.string().min(3, 'Full name must be at least 3 characters').trim(),
        age: z.number().int().min(0, 'Age must be at least 0').max(120, 'Age must be at most 120'),
        gender: z.enum(["M", "F"]),
    })).min(1, 'At least one member is required'),
});


export const bookingPaymentZodSchema = z.object({
    paymentOption: z.enum(paymentOptionsEnum)
});


export type CreateBookingPayload = z.infer<typeof createBookingZodSchema>;
export type CustomerDetailsPayload = z.infer<typeof customerDetailsZodSchema>;
export type BookingPaymentPayload = z.infer<typeof bookingPaymentZodSchema>;