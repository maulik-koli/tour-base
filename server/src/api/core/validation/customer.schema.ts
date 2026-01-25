import z from "zod";

export const phoneNumberSchema = z.string()
    .trim()
    .refine((val) => /^\d{10}$/.test(val), {
        message: 'Phone number must be exactly 10 digits',
    });
