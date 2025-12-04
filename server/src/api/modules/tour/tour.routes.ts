import express from "express";
import { createTourController, deleteTourController, getAdminToursListController, getTourController, updateTourController } from "./tour.controller";
import { createTourSchema, tourListAdminQueriesZodSchema, tourZodSchema } from "./tour.schema";
import { validateQuery, validateRequest } from "@/api/middlewares/validate.middlewate";
import { authMiddleware } from "@/api/middlewares/auth.middleware";

const router = express.Router();

router.post(
    "/", 
    validateRequest(createTourSchema), 
    authMiddleware, 
    createTourController
);

router.get(
    "/list", 
    validateQuery(tourListAdminQueriesZodSchema), 
    authMiddleware, 
    getAdminToursListController
);

router.put(
    "/:slug", 
    validateRequest(tourZodSchema), 
    authMiddleware, 
    updateTourController
);

router.delete(
    "/:slug", 
    authMiddleware, 
    deleteTourController
);


// public routes
router.get("/:slug", getTourController);


export default router;