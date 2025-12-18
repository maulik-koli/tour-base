import express from "express";
import { 
    createPackageController, getPackagesOfTourController, removePackageFromTourController, updatePackageController
} from "./packages.controller";
import { authMiddleware } from "@/api/middlewares/auth.middleware";
import { validateRequest } from "@/api/middlewares/validate.middlewate";
import { packageZodSchema } from "./packages.schema";

const router = express.Router();

router.get(
    '/:slug', 
    authMiddleware,
    getPackagesOfTourController
);

router.post(
    "/:slug", 
    authMiddleware, 
    validateRequest(packageZodSchema), 
    createPackageController
);

router.put(
    "/:packageId", 
    authMiddleware, 
    validateRequest(packageZodSchema), 
    updatePackageController
);

router.delete(
    "/:packageId", 
    authMiddleware, 
    removePackageFromTourController
);

export default router;