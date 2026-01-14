import express from "express";
import { authMiddleware } from "@/api/middlewares/auth.middleware";
import { 
    adminCloseRequestController, 
    adminDeleteRequestController, 
    adminGetRequestsListController 
} from "./request.controller";

const router = express.Router();

router.get(
    "/admin/list",
    authMiddleware,
    adminGetRequestsListController
);

router.delete(
    "/admin/:requestId",
    authMiddleware,
    adminDeleteRequestController
);

router.patch(
    "/admin/:requestId/close",
    authMiddleware,
    adminCloseRequestController
);

export default router;
