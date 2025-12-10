import express from 'express';
import { getSignatureController } from './media.controller';
import { signatureLimiter } from './media.service';
import { validateRequest } from '@/api/middlewares/validate.middlewate';
import { mediaZodSchema } from './media.utils';

const router = express.Router();

router.post(
    '/signature', 
    signatureLimiter, 
    validateRequest(mediaZodSchema), 
    getSignatureController
)

export default router;