import express from "express";
import { packageAdminController } from "./packages.controller";
import { authMiddleware } from "@/api/middlewares/auth.middleware";
import { validateRequest } from "@/api/middlewares/validate.middlewate";
import { packageZodSchema } from "./packages.schema";

const adminPackageRouter = express.Router();

adminPackageRouter.get(
    '/:slug', 
    authMiddleware,
    packageAdminController.getPackagesOfTour
);

adminPackageRouter.post(
    "/:slug", 
    authMiddleware, 
    validateRequest(packageZodSchema), 
    packageAdminController.createPackage
);

adminPackageRouter.put(
    "/:packageId", 
    authMiddleware, 
    validateRequest(packageZodSchema), 
    packageAdminController.updatePackage
);

adminPackageRouter.delete(
    "/:packageId", 
    authMiddleware, 
    packageAdminController.removePackageFromTour
);

export { adminPackageRouter };