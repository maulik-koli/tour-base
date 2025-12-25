import z from "zod";

export const categoryZodSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    value: z.string().trim().min(1, "Value is required"),
    subtitle: z.string().trim().min(1, "Subtitle is required"),
    image: z.string().trim().min(1, "Image is required"),
}).strict();

export type CategoryPayload = z.infer<typeof categoryZodSchema>;