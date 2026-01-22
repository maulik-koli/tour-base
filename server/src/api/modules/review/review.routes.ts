import express from "express";
import { 
    createReviewController, 
    deleteReviewController, 
    getReviewsByTourController, 
    updateReviewController,
    getTousWithReviewCountsCotroller
} from "./review.controller";
import { reviewZodSchema, tourListWithReviewsParamsZodSchema } from "./review.schema";
import { validateQuery, validateRequest } from "@/api/middlewares/validate.middlewate";
import { authMiddleware } from "@/api/middlewares/auth.middleware";

const router = express.Router();

router.post(
    "/:tourId",
    authMiddleware,
    validateRequest(reviewZodSchema),
    createReviewController
);

router.get(
    "/tours",
    authMiddleware,
    validateQuery(tourListWithReviewsParamsZodSchema),
    getTousWithReviewCountsCotroller
);


router.get(
    "/:tourId",
    authMiddleware,
    getReviewsByTourController
);

router.put(
    "/:reviewId",
    authMiddleware,
    validateRequest(reviewZodSchema),
    updateReviewController
);

router.delete(
    "/:reviewId",
    authMiddleware,
    deleteReviewController
);

export default router;
