import z from "zod";

export const categoryZodSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    value: z.string().trim().min(1, "Value is required"),
    subtitle: z.string().trim().min(1, "Subtitle is required"),
    image: z.string().trim().min(1, "Image is required"),
}).strict();

export const categoryPartialZodSchema = categoryZodSchema.partial().strict();

export type CreateCategoryPayload = z.infer<typeof categoryZodSchema>;
export type UpdateCategoryPayload = z.infer<typeof categoryPartialZodSchema>