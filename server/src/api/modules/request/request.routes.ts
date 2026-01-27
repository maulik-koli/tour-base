import express from "express";
import { authMiddleware } from "@/api/middlewares/auth.middleware";
import { validateQuery, validateRequest } from "@/api/middlewares/validate.middlewate";
import { adminRequestListQueriesZodSchema, generateOtpZodSchema, verifyOtpZodSchema } from "./request.schema";
import { 
    adminCloseRequestController, 
    adminDeleteRequestController, 
    adminGetRequestsListController,
    generateOtpController,
    getSessionController,
    verifyOtpController
} from "./request.controller";

const router = express.Router();


// ==================== Admin Routes ====================

router.get(
    "/admin/list",
    authMiddleware,
    validateQuery(adminRequestListQueriesZodSchema),
    adminGetRequestsListController
);

router.delete(
    "/admin/:requestId",
    authMiddleware,
    adminDeleteRequestController
);

router.patch(
    "/admin/:requestId/close",
    authMiddleware,
    adminCloseRequestController
);


// ==================== User Routes ====================

router.post(
    "/otp-generate",
    validateRequest(generateOtpZodSchema),
    generateOtpController
);

router.get(
    "/session/:sessionId",
    getSessionController
);

router.post(
    "/otp-verify",
    validateRequest(verifyOtpZodSchema),
    verifyOtpController
);

export default router;
