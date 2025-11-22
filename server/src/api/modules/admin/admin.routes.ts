import express from 'express';
import { adminChangePasswordController, adminLoginController, adminLogoutController, adminProfileController, adminRegisterController } from './admin.controller';
import { validateRequest } from '@/api/middlewares/validate.middlewate';
import { adminChangePasswordSchema, adminLoginSchema, adminRegisterSchema } from './admin.schema';
import { authMiddleware } from '@/api/middlewares/auth.middleware';

const router = express.Router();

router.post('/login', validateRequest(adminLoginSchema), adminLoginController);

router.get('/profile', authMiddleware, adminProfileController);
router.post('/logout', authMiddleware, adminLogoutController);
router.post('/change-password', validateRequest(adminChangePasswordSchema), authMiddleware, adminChangePasswordController);

router.post('/register', validateRequest(adminRegisterSchema), adminRegisterController);

export default router;