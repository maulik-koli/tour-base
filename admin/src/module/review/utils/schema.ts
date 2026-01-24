import { z } from "zod";

export const reviewFormSchema = z.object({
    reviewerName: z
        .string()
        .min(2, "Reviewer name must be at least 2 characters")
        .trim(),
    rating: z
        .number()
        .int("Rating must be a whole number")
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5"),
    comment: z
        .string()
        .min(10, "Comment must be at least 10 characters")
        .trim(),
    imageUrl: z.string().url("Invalid image URL").nullable().optional(),
});

export type ReviewFormType = z.infer<typeof reviewFormSchema>;

export const defaultReviewFormValues: ReviewFormType = {
    reviewerName: "",
    rating: 5,
    comment: "",
    imageUrl: null,
};
