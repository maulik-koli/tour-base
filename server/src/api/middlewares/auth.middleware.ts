import { getAdminByEmail, verifyAdminToken } from "../modules/admin/admin.service";
import { ADMIN_AUTH, AdminAuth } from "../modules/admin/admin.utils";

import { asyncWrapper } from "../utils/apiHelper";
import { CustomError } from "../utils/response";
import { log } from "../utils/log";


export const authMiddleware = asyncWrapper(async (req, res, next) => {
    const token = req.cookies[ADMIN_AUTH.COOKIE_NAME];

    log.info('checking in middleware', token);

    if (!token) {
        throw new CustomError(401, "Admin token is required");
    }

    const decode = verifyAdminToken(token);
    if (!decode) {
        throw new CustomError(401, "Invalid admin token");
    }

    const admin = await getAdminByEmail(decode.email);

    if (admin.token !== token) {
        throw new CustomError(401, "Unauthorized access");
    }

    const auth: AdminAuth = {
        adminId: decode.sub,
        email: decode.email,
        phone: decode.phone,
    };
    
    req.auth = auth
    next();
})