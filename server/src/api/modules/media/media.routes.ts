import express from 'express';
import { getSignatureController } from './media.controller';
import { mediaZodSchema } from './media.utils';
import { validateRequest } from '@/api/middlewares/validate.middlewate';
import { authMiddleware } from '@/api/middlewares/auth.middleware';

const router = express.Router();

router.post(
    '/signature', 
    authMiddleware,
    validateRequest(mediaZodSchema), 
    getSignatureController
)

export default router;