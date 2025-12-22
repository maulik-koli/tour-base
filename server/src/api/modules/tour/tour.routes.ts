import express from "express";
import { 
    createTourController, deleteTourController, getAdminToursListController, getFeaturedToursController, getTourAdminController, getTourController, getToursListController, setFeaturedTourController, updateTourController
} from "./tour.controller";
import { createTourSchema, setFeaturedTourZodSchema, tourListAdminQueriesZodSchema, tourListQueriesZodSchema, tourZodSchema } from "./tour.schema";
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

router.patch(
    "/featured/:slug", 
    authMiddleware, 
    validateRequest(setFeaturedTourZodSchema),
    setFeaturedTourController
)

// public routes
router.get(
    "/", 
    validateQuery(tourListQueriesZodSchema),
    getToursListController
);

router.get(
    "/featured", 
    getFeaturedToursController
);

router.get(
    "/:slug", 
    getTourController
);


export default router;