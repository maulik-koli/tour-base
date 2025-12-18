import express from "express";  
import { createCategoryController, deleteCategoryController, getCategoriesController, getCategoryOptionsController, toggleCategoryController, updateCategoryController } from "./category.controller";
import { categoryPartialZodSchema, categoryZodSchema } from "./category.schema";

import { authMiddleware } from "@/api/middlewares/auth.middleware";
import { validateRequest } from "@/api/middlewares/validate.middlewate";


const router = express.Router();

router.post(
    '/', 
    authMiddleware, 
    validateRequest(categoryZodSchema), 
    createCategoryController
);

router.patch(
    '/:categoryId/toggle', 
    authMiddleware, 
    toggleCategoryController
);

router.get(
    '/', 
    authMiddleware, 
    getCategoriesController
);

router.get(
    '/options', 
    authMiddleware, 
    getCategoryOptionsController
);

router.patch(
    '/:categoryId', 
    authMiddleware, 
    validateRequest(categoryPartialZodSchema), 
    updateCategoryController
);

router.delete(
    '/:categoryId', 
    authMiddleware, 
    deleteCategoryController
);

export default router;