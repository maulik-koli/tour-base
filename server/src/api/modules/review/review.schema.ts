import { z } from "zod";

export const reviewZodSchema = z.object({
    reviewerName: z.string()
        .min(2, 'Reviewer name must be at least 2 characters')
        .trim(),
    rating: z.number()
        .int('Rating must be an integer')
        .min(1, 'Rating must be at least 1')
        .max(5, 'Rating must be at most 5'),
    comment: z.string()
        .min(10, 'Comment must be at least 10 characters')
        .trim(),
    imageUrl: z.string()
        .trim()
        .nullable()
        .optional(),
});

export const tourListWithReviewsParamsZodSchema = z.object({
    search: z.string().trim().optional().transform(s => s === '' ? undefined : s),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(25),
});

export type ReviewPayload = z.infer<typeof reviewZodSchema>;
export type TourListWithReviewsParams = z.infer<typeof tourListWithReviewsParamsZodSchema>;