import { z } from "zod";

// export const Image_FORMATE = ['jpg', 'jpeg', 'png', 'webp'] as const;
const UPLOAD_CONFIGS_TYPES = ["tours", "tour-thumbnails", "tour-slider", "categories", "activities", "activity-thumbnails", "default"] as const;

export type UploadConfigsType = typeof UPLOAD_CONFIGS_TYPES[number];


export const UPLOAD_CONFIG: Record<UploadConfigsType, number> = {
    'tours': 3 * 1024 * 1024 , // 3 MB
    'tour-thumbnails': 3 * 1024 * 1024 , // 3 MB
    'tour-slider': 3 * 1024 * 1024 , // 3 MB
    'categories': 3 * 1024 * 1024 , // 3 MB
    'activities': 3 * 1024 * 1024 , // 3 MB
    'activity-thumbnails': 3 * 1024 * 1024 , // 3 MB
    'default': 2 * 1024 * 1024  // 2 MB
};


export const mediaZodSchema = z.object({
    mediaType: z.enum(UPLOAD_CONFIGS_TYPES, "Invalid upload type"),
    fileFormat: z.string(),
    fileSize: z.number(),
})

export type MediaUploadPayloadType = z.infer<typeof mediaZodSchema>;