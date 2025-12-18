import express from "express";
import { 
    createTourController, deleteTourController, getAdminToursListController, getTourAdminController, getTourController, getToursListController, updateTourController
} from "./tour.controller";
import { createTourSchema, tourListAdminQueriesZodSchema, tourListQueriesZodSchema, tourZodSchema } from "./tour.schema";
import { validateQuery, validateRequest } from "@/api/middlewares/validate.middlewate";
import { authMiddleware } from "@/api/middlewares/auth.middleware";

const router = express.Router();

router.post(
    "/", 
    authMiddleware, 
    validateRequest(createTourSchema), 
    createTourController
);

router.get(
    "/list", 
    authMiddleware, 
    validateQuery(tourListAdminQueriesZodSchema), 
    getAdminToursListController
);

router.put(
    "/:slug", 
    authMiddleware, 
    validateRequest(tourZodSchema), 
    updateTourController
);

router.delete(
    "/:slug", 
    authMiddleware, 
    deleteTourController
);


router.get(
    "/admin/:slug", 
    authMiddleware, 
    getTourAdminController
);

// public routes
router.get(
    "/", 
    validateQuery(tourListQueriesZodSchema),
    getToursListController
);


router.get(
    "/:slug", 
    getTourController
)



export default router;