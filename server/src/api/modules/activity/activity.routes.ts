import express from "express";
import { 
    createActivityController, 
    deleteActivityController, 
    getActivitiesListAdminController, 
    getActivitiesListController, 
    getActivityAdminController, 
    getActivityController, 
    updateActivityController 
} from "./activity.controller";
import { activityListQueriesZodSchema, activityZodSchema } from "./activity.schema";
import { validateQuery, validateRequest } from "@/api/middlewares/validate.middlewate";
import { authMiddleware } from "@/api/middlewares/auth.middleware";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    validateRequest(activityZodSchema),
    createActivityController
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

router.get(
    "/admin/list",
    authMiddleware,
    validateQuery(activityListQueriesZodSchema),
    getActivitiesListAdminController
);

router.get(
    "/admin/:slug",
    authMiddleware,
    getActivityAdminController
);

// public api
router.get(
    "/",
    validateQuery(activityListQueriesZodSchema),
    getActivitiesListController
);

router.get(
    "/:slug",
    getActivityController
);


export default router;