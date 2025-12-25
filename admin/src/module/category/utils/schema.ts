import z from "zod";

export const categorySchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    value: z.string().trim().min(1, "Value is required"),
    subtitle: z.string().trim().min(1, "Subtitle is required"),
    image: z.string().trim().min(1, "Image is required"),
}).strict();

export const categoryPartialSchema = categorySchema.partial().strict();

export type CreateCategoryFormType = z.infer<typeof categorySchema>;
export type UpdateCategoryFormType = z.infer<typeof categoryPartialSchema>


export const defaultCategoryValues: CreateCategoryFormType = {
    name: '',
    value: '',
    subtitle: '',
    image: '',
};