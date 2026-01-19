import z from "zod";
import { htmlContentSchema } from "@/lib/zod/commonSchemas";

export const activitySchema = z.object({
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

export type ActivityPayload = z.infer<typeof activitySchema>;

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
