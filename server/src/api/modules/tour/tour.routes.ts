import express from "express";
import { createTourController, getTourController, updateTourController } from "./tour.controller";
import { validateRequest } from "@/api/middlewares/validate.middlewate";
import { tourSchema } from "./tour.schema";
import { authMiddleware } from "@/api/middlewares/auth.middleware";

const router = express.Router();

router.post("/", validateRequest(tourSchema), authMiddleware, createTourController);
router.put("/:slug", validateRequest(tourSchema), authMiddleware, updateTourController);

router.get("/:slug", getTourController);


export default router;