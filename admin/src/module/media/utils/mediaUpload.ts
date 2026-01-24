import { z } from "zod";

const mb3 = 3 * 1024 * 1024 // 3 MB
const mb2 = 2 * 1024 * 1024 // 2 MB

// export const Image_FORMATE = ['jpg', 'jpeg', 'png', 'webp'] as const;
const UPLOAD_CONFIGS_TYPES = [
    "tours", "tour-thumbnails", "tour-slider", "categories", "activities", "activity-thumbnails", "reviews", "default"
] as const;

export type UploadConfigsType = typeof UPLOAD_CONFIGS_TYPES[number];


export const UPLOAD_CONFIG: Record<UploadConfigsType, number> = {
    'tours': mb3,
    'tour-thumbnails': mb3,
    'tour-slider': mb3,
    'categories': mb3,
    'activities': mb3,
    'activity-thumbnails': mb3,
    'reviews': mb2,
    'default': mb2,
};


export const mediaZodSchema = z.object({
    mediaType: z.enum(UPLOAD_CONFIGS_TYPES, "Invalid upload type"),
    fileFormat: z.string(),
    fileSize: z.number(),
})

export type MediaUploadPayloadType = z.infer<typeof mediaZodSchema>;