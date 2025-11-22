import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']),
    PORT: z.coerce.number().default(3005),
    CLIENT_DOMAIN_URL: z.url(),
    MONGO_URI: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error('Invalid environment variables:', JSON.stringify(z.treeifyError(parsedEnv.error), null, 2));
    process.exit(1);
}

export const env = parsedEnv.data;