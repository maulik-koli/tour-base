import { z } from 'zod';

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
    childrenPrice: z.number().int().min(0, 'Children price must be positive or zero'),
    starHierarchy: z.number()
        .int()
        .min(1, 'Star number must be at least 1')
        .max(5, 'Star number must be at most 5'),

    startCity: z.string().min(2, 'Start city must be at least 2 characters').trim(),
    endCity: z.string().min(2, 'End city must be at least 2 characters').trim(),
    hotels: z.array(hotelZodSchema),
});

export type HotelFormType = z.infer<typeof hotelZodSchema>;
export type PackageFormType = z.infer<typeof packageZodSchema>;


export const DEFAULT_PACKAGE : PackageFormType = {
    name: "",
    days: 0,
    nights: 0,
    startCity: "",
    endCity: "",
    pricePerPerson: 0,
    childrenPrice: 0,
    starHierarchy: 1,
    hotels: [],
}


export const DEFAULT_HOTEL: HotelFormType = {
    city: "",
    hotelName: "",
    nightNo: 1,
}