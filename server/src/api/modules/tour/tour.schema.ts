import z from "zod";
import { packageZodSchema } from "../packages/packages.schema";
import { ADMIN_SORT_VALUE, DURATION_VALUE, isHtmlContentEmpty, SORT_VALUE } from "./tour.utils";
import { log } from "@/api/utils/log";


const htmlContentSchema = (minLength: number, fieldName: string = 'Content') => {
    return z.string()
        .refine((html) => !isHtmlContentEmpty(html), {
            message: `${fieldName} cannot be empty`,
        })
        .refine((html) => {
            const textContent = html
                .replace(/<[^>]*>/g, '')
                .replace(/&nbsp;/gi, ' ')
                .replace(/&#?[a-z0-9]+;/gi, ' ')
                .trim();
            return textContent.length >= minLength;
        }, {
            message: `${fieldName} must contain at least ${minLength} characters of actual text`,
        });
};


const listOfStringsSchema = z.array(
    z.string()
    .min(2, 'Each item must be at least 2 characters')
    .trim()
).min(1, 'List must have at least 1 item');


const dayDetailsZodSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').trim(),
    subtitle: z.string().nullable(),
    description: z.string().min(10, 'Description must be at least 10 characters').trim(),
});


export const tourZodSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').trim(),
    tagLine: z.string().min(5, 'Tag line must be at least 5 characters').trim(),
    description: htmlContentSchema(10, 'Description'),
    includes: listOfStringsSchema,
    excludes: listOfStringsSchema,
    categories: z.array(z.string().min(1, 'Invalid category ID')),
    
    dayPlans: z.array(dayDetailsZodSchema),
    isActive: z.boolean(),

    images: z.array(z.string().min(1, 'Invalid image path').trim()),
    galleryImages: z.array(z.string().min(1, 'Invalid image path').trim()),
    thumbnailImage: z.string().min(1, 'Invalid thumbnail image path').trim(),
    youtubeVideoUrl: z.url('Invalid YouTube video URL').nullable(),
});


export const createTourSchema = z.object({
    tour: tourZodSchema,
    packages: z.array(packageZodSchema).min(1, 'At least one package is required'),
});


export const tourListAdminQueriesZodSchema = z.object({
    search: z.string().trim().optional().transform(s => s === '' ? undefined : s),
    sort: z.enum(ADMIN_SORT_VALUE).default("updatedAt_desc"),

    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(15),
});


export const tourListQueriesZodSchema = z.object({
    search: z.string().trim().optional().transform(s => s === '' ? undefined : s),
    sort: z.enum(SORT_VALUE).default("name_asc"),
    maxPrice: z.coerce.number().min(0).optional(),
    duration: z.enum(DURATION_VALUE).default("none"),
    category: z.string().trim().optional().transform(c => c === '' ? undefined : c),

    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(15),
});

export const setFeaturedTourZodSchema = z.object({
    isFeatured: z.boolean(),
});


export type TourPayload = z.infer<typeof tourZodSchema>;
export type CreateTourPayload = z.infer<typeof createTourSchema>;
export type TourListAdminQueries = z.infer<typeof tourListAdminQueriesZodSchema>;
export type TourListQueries = z.infer<typeof tourListQueriesZodSchema>;
export type SetFeaturedTourPayload = z.infer<typeof setFeaturedTourZodSchema>;