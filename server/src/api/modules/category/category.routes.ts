import express from "express";  
import { createCategoryController, deleteCategoryController, getCategoriesController, getCategoryOptionsController, updateCategoryController } from "./category.controller";
import { categoryZodSchema } from "./category.schema";

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
    '/:categoryId', 
    authMiddleware, 
    validateRequest(categoryZodSchema), 
    updateCategoryController
);

router.delete(
    '/:categoryId', 
    authMiddleware, 
    deleteCategoryController
);

// public api
router.get(
    '/', 
    getCategoriesController
);

router.get(
    '/options',
    getCategoryOptionsController
);


export default router;