import z from "zod";
import { packageZodSchema } from "../packages/packages.schema";
import { ADMIN_SORT_MAP } from "./tour.utils";


const listOfStringsSchema = z.array(
    z.string()
    .min(2, 'Each item must be at least 2 characters')
    .trim()
).min(1, 'List must have at least 1 item');


const dayDetailsZodSchema = z.object({
    dayNumber: z.number(),
    title: z.string().min(3, 'Title must be at least 3 characters').trim(),
    subtitle: z.string().nullable(),
    description: z.string().nullable(),
});


export const tourZodSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').trim(),
    description: z.string().min(10, 'Description must be at least 10 characters').trim(),
    includes: listOfStringsSchema,
    excludes: listOfStringsSchema,

    dayPlans: z.array(dayDetailsZodSchema),
    isActive: z.boolean(),

    images: z.array(z.string().min(1, 'Invalid image path').trim()),
    thumbnailImage: z.string().min(1, 'Invalid thumbnail image path').trim(),
    youtubeVideoUrl: z.url('Invalid YouTube video URL').nullable(),
});


export const createTourSchema = z.object({
    tour: tourZodSchema,
    packages: z.array(packageZodSchema).min(1, 'At least one package is required'),
});


export const tourListAdminQueriesZodSchema = z.object({
    page: z.string()
        .default("1")
        .transform((val) => Number(val)),
    limit: z.string()
        .default("18")
        .transform((val) => Number(val)),

    search: z.string().optional(),
    sort: z.enum(ADMIN_SORT_MAP).optional(),
});


export type TourPayload = z.infer<typeof tourZodSchema>;
export type CreateTourPayload = z.infer<typeof createTourSchema>;
export type TourListAdminQueries = z.infer<typeof tourListAdminQueriesZodSchema>;