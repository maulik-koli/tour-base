import express from "express";
import { addPackageController, getPackagesOfTourController, removePackageFromTourController, updatePackageController } from "./packages.controller";
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
    validateRequest(packageZodSchema), 
    authMiddleware, 
    addPackageController
);

router.put(
    "/:packageId", 
    validateRequest(packageZodSchema), 
    authMiddleware, 
    updatePackageController
);

router.delete(
    "/:packageId", 
    authMiddleware, 
    removePackageFromTourController
);

export default router;