import { z } from "zod";
import { Types } from "mongoose";
import { bookingStatusEnum, paymentOptionsEnum } from "./booking.model";
import { phoneNumberSchema } from "@/api/core/validation/customer.schema";

const mongoIdSchema = (field: string) => z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
        message:  `Invalid ${field} ID`,
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
    phone2: phoneNumberSchema,

    dateOfTravel: z.coerce.date(),
    members: z.array(z.object({
        fullName: z.string().min(3, 'Full name must be at least 3 characters').trim(),
        age: z.number().int().min(0, 'Age must be at least 0').max(120, 'Age must be at most 120'),
        gender: z.enum(["M", "F"]),
    })).min(1, 'At least one member is required')
       .max(12, 'At most 12 members are allowed'),
});


export const bookingPaymentZodSchema = z.object({
    paymentOption: z.enum(paymentOptionsEnum)
});

export const bookingStatusZodSchema = z.object({
    view: z.string().optional(),
});

export const adminBookingListZodSchema = z.object({
    search: z.string().trim().optional().transform(s => s === '' ? undefined : s),
    status: z.enum([...bookingStatusEnum, "NONE"]).default("NONE"),

    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20),
});


export type CreateBookingPayload = z.infer<typeof createBookingZodSchema>;
export type CustomerDetailsPayload = z.infer<typeof customerDetailsZodSchema>;
export type BookingPaymentPayload = z.infer<typeof bookingPaymentZodSchema>;
export type BookingStatusPayload = z.infer<typeof bookingStatusZodSchema>;
export type AdminBookingListQueries = z.infer<typeof adminBookingListZodSchema>;