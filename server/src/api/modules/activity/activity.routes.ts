import express from "express";
import { activityAdminController, activityController } from "./activity.controller";
import { activityListQueriesZodSchema, activityZodSchema } from "./activity.schema";
import { validateQuery, validateRequest } from "@/api/middlewares/validate.middlewate";
import { authMiddleware } from "@/api/middlewares/auth.middleware";

const activityAdminRouter = express.Router();
const activityRouter = express.Router();


activityAdminRouter.post(
    "/",
    authMiddleware,
    validateRequest(activityZodSchema),
    activityAdminController.createActivity
);

activityAdminRouter.get(
    "/",
    authMiddleware,
    validateQuery(activityListQueriesZodSchema),
    activityAdminController.getActivitiesList
);

activityAdminRouter.get(
    "/:slug",
    authMiddleware,
    activityAdminController.getActivity
);

activityAdminRouter.put(
    "/:slug",
    authMiddleware,
    validateRequest(activityZodSchema),
    activityAdminController.updateActivity
);

activityAdminRouter.delete(
    "/:slug",
    authMiddleware,
    activityAdminController.deleteActivity
);

// public api
activityRouter.get(
    "/",
    validateQuery(activityListQueriesZodSchema),
    activityController.getActivitiesList
);

activityRouter.get(
    "/:slug",
    activityController.getActivity
);


export { activityAdminRouter, activityRouter };