import { getAdminByEmail, verifyAdminToken } from "../modules/admin/admin.service";
import { ADMIN_AUTH, AdminAuth } from "../modules/admin/admin.utils";

import { asyncWrapper } from "../utils/apiHelper";
import { CustomError } from "../utils/response";


export const authMiddleware = asyncWrapper(async (req, res, next) => {
    const token = req.cookies[ADMIN_AUTH.COOKIE_NAME];

    if (!token) {
        throw new CustomError(401, "Admin token is required");
    }

    const decode = verifyAdminToken(token);
    if (!decode) {
        throw new CustomError(401, "Invalid admin token");
    }

    const admin = await getAdminByEmail(decode.email);

    if (!admin) {
        throw new CustomError(401, "Unauthorized access");
    }

    const sessionExists = admin.activeSessions.some(
        session => session.token === token
    );

    if (!sessionExists) {
      throw new CustomError(401, "Session expired or logged in from another device");
    }

    const auth: AdminAuth = {
        adminId: decode.sub,
        email: decode.email,
        phone: decode.phone,
    };
    
    req.auth = auth
    next();
})