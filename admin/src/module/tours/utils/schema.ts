import z from "zod";

const hotelZodSchema = z.object({
    hotelName: z.string().min(2, 'Hotel name must be at least 2 characters').trim(),
    city: z.string().min(2, 'City must be at least 2 characters').trim(),
    nightNo: z.number().int().min(1, 'Night number must be positve and at least 1'),
});


export const packageZodSchema = z.object({
    name: z.string().min(3, 'Package name must be at least 3 characters').trim(),
    days: z.number().int().min(1, 'Day must be positive and at least 1'),
    nights: z.number().int().nonnegative('Night must be positive or zero'),

    pricePerPerson: z.number().int().min(1, 'Price per person must be positive and greater than zero'),
    starHierarchy: z.number()
        .int()
        .min(1, 'Star number must be at least 1')
        .max(5, 'Star number must be at most 5'),

    startCity: z.string().min(2, 'Start city must be at least 2 characters').trim(),
    endCity: z.string().min(2, 'End city must be at least 2 characters').trim(),
    hotels: z.array(hotelZodSchema),
});


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
export type HotelFormType = z.infer<typeof hotelZodSchema>;

export type TourFormType = z.infer<typeof tourZodSchema>;
export type PackageFormType = z.infer<typeof packageZodSchema>;
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