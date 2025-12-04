import { Request } from "express";
import { AdminAuth } from "@/api/modules/admin/admin.utils";


declare module "express-serve-static-core" {
    interface Request {
        auth?: AdminAuth;
    }
}