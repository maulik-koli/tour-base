import rateLimit from 'express-rate-limit';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '@/api/config/env';
import { IApiError } from '@/api/utils/response';

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
});

// 10 signatures/IP per 15min
export const signatureLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { 
        status: 429,
        message: 'Too many signature requests',
    } satisfies IApiError
});


export const generateSignature = (params: Record<string, unknown>) => {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signatureParams = { 
        timestamp, 
        folder: params.folder,
    }

    const signature = cloudinary.utils.api_sign_request(
        signatureParams,
        env.CLOUDINARY_API_SECRET
    );

    return { signature, ...signatureParams };
}