import { packageZodSchema } from "@module/packages/utils/schema";
import z from "zod";


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
    description: z.string().min(10, 'Description must be at least 10 characters').trim(),
    includes: listOfStringsSchema,
    excludes: listOfStringsSchema,
    categories: z.array(z.string().min(1, 'Invalid category').trim()),
    
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

export type DayDetailsType= z.infer<typeof dayDetailsZodSchema>;
export type TourFormType = z.infer<typeof tourZodSchema>;
export type CreateTourFormType = z.infer<typeof createTourSchema>;


export const defaultTourFormValues: CreateTourFormType = {
    packages: [],
    tour: {
        name: '',
        tagLine: '',
        description: '',
        includes: [],
        excludes: [],
        categories: [],
        dayPlans: [],
        isActive: true,
        images: [],
        thumbnailImage: '',
        youtubeVideoUrl: null,
    },
}