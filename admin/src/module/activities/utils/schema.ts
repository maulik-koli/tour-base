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
    title: z.string().min(3).trim(),
    subtitle: z.string().min(5).trim(),
    description: htmlContentSchema(10, 'Description'),
    city: z.string().min(2).trim(),
    pricePerPerson: z.number().min(0),
    thumbnailImage: z.string().min(1).trim(),
    images: z.array(z.string().min(1).trim()),
    extraNote: htmlContentSchema(10, 'Extra note'),
    isActive: z.boolean(),
});

export type ActivityPayload = z.infer<typeof activityZodSchema>;

export const defaultActivityFormValues: ActivityPayload = {
    title: '',
    subtitle: '',
    description: '',
    city: '',
    pricePerPerson: 0,
    thumbnailImage: '',
    images: [],
    extraNote: '',
    isActive: true,
};
