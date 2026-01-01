import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ quiet: true });

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'staging']),
    PORT: z.coerce.number().default(3005),
    CLIENT_URL: z.url(),
    ADMIN_URL: z.url(),
    MONGO_URI: z.string(),
    JWT_ADMIN_SECRET: z.string().min(64),
    CLOUDINARY_CLOUD_NAME: z.string().min(1),
    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
    CASHFREE_API_KEY: z.string().min(1),
    CASHFREE_API_SECRET: z.string().min(1),
    CASHFREE_API_VERSION: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error('Invalid environment variables:', JSON.stringify(z.treeifyError(parsedEnv.error), null, 2));
    process.exit(1);
}

export const env = parsedEnv.data;