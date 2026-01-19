import { generateSignature } from "./media.service";
import { env } from "@/api/config/env";

import { MediaTypeSchema, UPLOAD_CONFIG } from "./media.utils";
import { asyncWrapper } from "@/api/utils/asyncWrapper";
import { successResponse } from "@/api/utils/response";
import { log } from "@/api/utils/log";


export const getSignatureController = asyncWrapper(async (req, res) => {
    const { mediaType } = req.body as MediaTypeSchema;

    const config = UPLOAD_CONFIG[mediaType];

    const signature = generateSignature({
        folder: config.folder,
    });

    log.info('signature', signature);

    const response = {
        timestamp: signature.timestamp,
        signature: signature.signature,
        cloud_name: env.CLOUDINARY_CLOUD_NAME,
        api_key: env.CLOUDINARY_API_KEY,
        folder: signature.folder,
    }

    successResponse(res, {
        message: 'Cloudinary signature generated successfully',
        status: 200,
        data: {...response}
    })
});