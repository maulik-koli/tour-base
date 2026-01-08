import exporess from "express";
import { testController } from "./whatsapp.controller";

const router = exporess.Router();

router.post('/test', testController);

export default router;