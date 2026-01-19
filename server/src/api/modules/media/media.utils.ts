import z from "zod";

// constants
export const Image_FORMATE = ['jpg', 'jpeg', 'png', 'webp'] as const;
const UPLOAD_CONFIGS_TYPES = [
    "tours", "tour-thumbnails", "tour-slider", "categories", "activities", "activity-thumbnails", "default"
] as const;

export type UploadConfigsType = typeof UPLOAD_CONFIGS_TYPES[number];


export const UPLOAD_CONFIG: Record<UploadConfigsType, { folder: string; maxSize: number }> = {
    'tours': { folder: 'tours', maxSize: 3 * 1024 * 1024 }, // 3 MB
    'tour-thumbnails': { folder: 'tours/thumbnails', maxSize: 3 * 1024 * 1024 }, // 3 MB
    'tour-slider': { folder: 'tours/slider', maxSize: 3 * 1024 * 1024 }, // 3 MB
    'categories': { folder: 'categories', maxSize: 3 * 1024 * 1024 }, // 3 MB
    'activities': { folder: 'activities', maxSize: 3 * 1024 * 1024 }, // 3 MB
    'activity-thumbnails': { folder: 'activities/thumbnails', maxSize: 3 * 1024 * 1024 }, // 3 MB
    'default': { folder: 'uploads', maxSize: 2 * 1024 * 1024 } // 2 MB
};


// zod schema
export const mediaZodSchema = z.object({
        mediaType: z.enum(UPLOAD_CONFIGS_TYPES, "Invalid upload type"),
        fileFormat: z.enum(Image_FORMATE, "Invalid file format"),
        fileSize: z.number(),
    }
).superRefine((data, ctx) => {
    const config = UPLOAD_CONFIG[data.mediaType];

    if (data.fileSize > config.maxSize) {
        ctx.addIssue({
            code: "custom",
            message: `File size exceeds limit. Max allowed is ${config.maxSize / (1024 * 1024)} MB.`,
            path: ["fileSize"],
        });
    }
});

export type MediaTypeSchema = z.infer<typeof mediaZodSchema>;