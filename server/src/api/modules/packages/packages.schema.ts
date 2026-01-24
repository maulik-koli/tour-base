import { z } from "zod";
import { PackageCategoryValues } from "./packge.utils";

const hotelZodSchema = z.object({
    hotelName: z.string().min(2, 'Hotel name must be at least 2 characters').trim(),
    city: z.string().min(2, 'City must be at least 2 characters').trim(),
    nightNo: z.number().int().min(1, 'Night number must be positve and at least 1'),
});

const priceSlotZodSchema = z.object({
    persons: z.number().int().min(2, 'Persons must be positive and at least 2').max(12, 'Persons must be at most 12'),
    price: z.number().int().min(1, 'Price must be positive and greater than zero'),
});


export const packageZodSchema = z.object({
    name: z.string().min(3, 'Package name must be at least 3 characters').trim(),
    days: z.number().int().min(1, 'Day must be positive and at least 1'),
    nights: z.number().int().nonnegative('Night must be positive or zero'),

    pricePerPerson: z.number().int().min(1, 'Price per person must be positive and greater than zero'),
    childrenPrice: z.number().int().min(0, 'Children price must be positive or zero'),
    priceSlots: z.array(priceSlotZodSchema).max(11, 'At most 11 price slots are allowed'),
    category: z.enum(PackageCategoryValues, 'Invalid package category'),

    startCity: z.string().min(2, 'Start city must be at least 2 characters').trim(),
    endCity: z.string().min(2, 'End city must be at least 2 characters').trim(),
    hotels: z.array(hotelZodSchema),
});

export type PackagePriceSolt = z.infer<typeof priceSlotZodSchema>;
export type PackagePayload = z.infer<typeof packageZodSchema>;