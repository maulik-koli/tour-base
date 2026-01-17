import express from "express";
import { 
    createActivityController, 
    deleteActivityController, 
    getActivitiesListController, 
    getActivityController, 
    updateActivityController 
} from "./activity.controller";
import { activityZodSchema } from "./activity.schema";
import { validateRequest } from "@/api/middlewares/validate.middlewate";
import { authMiddleware } from "@/api/middlewares/auth.middleware";

const router = express.Router();


// Admin routes
router.post(
    "/",
    authMiddleware,
    validateRequest(activityZodSchema),
    createActivityController
);

router.get(
    "/list",
    authMiddleware,
    getActivitiesListController
);

router.get(
    "/:slug",
    authMiddleware,
    getActivityController
);

router.put(
    "/:slug",
    authMiddleware,
    validateRequest(activityZodSchema),
    updateActivityController
);

router.delete(
    "/:slug",
    authMiddleware,
    deleteActivityController
);


export default router;
