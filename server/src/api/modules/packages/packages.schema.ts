import { z } from "zod";

const hotelZodSchema = z.object({
    hotelName: z.string().min(2, 'Hotel name must be at least 2 characters').trim(),
    city: z.string().min(2, 'City must be at least 2 characters').trim(),
    nightNo: z.number(),
    dayNo: z.number(),
});

export const packageZodSchema = z.object({
    name: z.string().min(3, 'Package name must be at least 3 characters').trim(),
    days: z.number(),
    nights: z.number(),

    pricePerPerson: z.number(),
    starHierarchy: z.number(),

    startCity: z.string().min(2, 'Start city must be at least 2 characters').trim(),
    endCity: z.string().min(2, 'End city must be at least 2 characters').trim(),
    hotels: z.array(hotelZodSchema),
});

export type PackagePayload = z.infer<typeof packageZodSchema>;