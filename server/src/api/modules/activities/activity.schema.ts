import z from "zod";
import { isHtmlContentEmpty } from "./activity.utils";


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


export const activityZodSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').trim(),
    subtitle: z.string().min(5, 'Subtitle must be at least 5 characters').trim(),
    description: htmlContentSchema(10, 'Description'),
    city: z.string().min(2, 'City must be at least 2 characters').trim(),
    pricePerPerson: z.number().min(0, 'Price must be a positive number'),
    thumbnailImage: z.string().min(1, 'Invalid thumbnail image path').trim(),
    images: z.array(z.string().min(1, 'Invalid image path').trim()),
    extraNote: htmlContentSchema(10, 'Extra note'),
    isActive: z.boolean(),
});


export type ActivityPayload = z.infer<typeof activityZodSchema>;
