import z from "zod";

export const categorySchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    value: z.string().trim().min(1, "Value is required"),
    subtitle: z.string().trim().min(1, "Subtitle is required"),
    image: z.string().trim().min(1, "Image is required"),
}).strict();

export type CategoryFormType = z.infer<typeof categorySchema>;



export const defaultCategoryValues: CategoryFormType = {
    name: '',
    value: '',
    subtitle: '',
    image: '',
}