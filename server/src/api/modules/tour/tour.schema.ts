import z from "zod";
import { Hotels } from "./tour.utils";


const listOfStringsSchema = z.array(
    z.string()
    .min(2, 'Each item must be at least 2 characters')
    .trim()
).min(1, 'List must have at least 1 item');

const dayDetailsSchema = z.object({
    dayNumber: z.number(),
    title: z.string().min(3, 'Title must be at least 3 characters').trim(),
    subtitle: z.string().nullable(),
    description: z.string().nullable(),
});

const hotelSchema = z.object({
    dayNumber: z.number(),
    city: z.string().min(2, 'City must be at least 2 characters').trim(),
    hotelName: z.string().min(2, 'Hotel name must be at least 2 characters').trim(),
    nights: z.number(),
    type: z.enum(Hotels),
});

const tourPackagesSchema = z.object({
    name: z.string().min(3, 'Package name must be at least 3 characters').trim(),
    days: z.number(),
    nights: z.number(),
    pricePerPerson: z.number(),
    startCity: z.string().min(2, 'Start city must be at least 2 characters').trim(),
    endCity: z.string().min(2, 'End city must be at least 2 characters').trim(),
    dayNumbers: z.array(z.number()),
    hotels: z.array(hotelSchema),
});

export const tourSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').trim(),
    description: z.string().min(10, 'Description must be at least 10 characters').trim(),
    includes: listOfStringsSchema,
    excludes: listOfStringsSchema,

    dayPlans: z.array(dayDetailsSchema),
    packages: z.array(tourPackagesSchema),
    isActive: z.boolean(),

    images: z.array(z.string().min(1, 'Invalid image path').trim()),
    thumbnailImage: z.string().min(1, 'Invalid thumbnail image path').trim(),
    youtubeVideoUrl: z.url('Invalid YouTube video URL').nullable(),
});

export type TourPayload = z.infer<typeof tourSchema>;