import express from "express";
import { tourAdminController, tourController } from "./tour.controller";
import { createTourSchema, setFeaturedTourZodSchema, tourListAdminQueriesZodSchema, tourListQueriesZodSchema, tourZodSchema } from "./tour.schema";
import { validateQuery, validateRequest } from "@/api/middlewares/validate.middlewate";
import { authMiddleware } from "@/api/middlewares/auth.middleware";

const tourRouter = express.Router();
const adminTourRouter = express.Router();

adminTourRouter.post(
    "/", 
    authMiddleware,
    validateRequest(createTourSchema), 
    tourAdminController.createTour
);

adminTourRouter.put(
    "/:slug", 
    authMiddleware, 
    validateRequest(tourZodSchema),
    tourAdminController.updateTour
);

adminTourRouter.delete(
    "/:slug", 
    authMiddleware,
    tourAdminController.deleteTour
);

adminTourRouter.patch(
    "/featured/:slug", 
    authMiddleware, 
    validateRequest(setFeaturedTourZodSchema),
    tourAdminController.toggleFeaturedTour
)

adminTourRouter.get(
    "/list", 
    authMiddleware, 
    validateQuery(tourListAdminQueriesZodSchema), 
    tourAdminController.getToursList
);

adminTourRouter.get(
    "/featured", 
    authMiddleware,
    tourController.getFeaturedTours
);

adminTourRouter.get(
    "/:slug", 
    authMiddleware, 
    tourAdminController.getTour
);



// public routes
tourRouter.get(
    "/", 
    validateQuery(tourListQueriesZodSchema),
    tourController.getToursList
);

tourRouter.get(
    "/featured", 
    tourController.getFeaturedTours
);

tourRouter.get(
    "/:slug", 
    tourAdminController.getTour
);

export { tourRouter, adminTourRouter };