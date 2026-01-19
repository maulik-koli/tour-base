import z from "zod";
import { htmlContentSchema } from "@/api/core/validation/html.schema";

export const activityZodSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').trim(),
    subtitle: z.string().min(5, 'Subtitle must be at least 5 characters').trim(),
    description: htmlContentSchema(10, 'Description'),
    city: z.string().min(2, 'City must be at least 2 characters').trim(),
    pricePerPerson: z.number().min(0, 'Price must be a positive number'),
    thumbnailImage: z.string().min(1, 'Invalid thumbnail image path').trim(),
    images: z.array(z.string().min(1, 'Invalid image path').trim()),
    extraNote: htmlContentSchema(10, 'Extra note').optional(),
    isActive: z.boolean(),
});


export const activityListQueriesZodSchema = z.object({
    search: z.string().trim().optional().transform(s => s === '' ? undefined : s),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20),
});


export type ActivityPayload = z.infer<typeof activityZodSchema>;
export type ActivityListQueries = z.infer<typeof activityListQueriesZodSchema>;