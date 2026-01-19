import { createAdmin, generateAdminToken, getAdminByEmail, verifyAdminPassword } from "./admin.service";
import { AdminChangePasswordPayload, AdminLoginPayload, AdminRegisterPayload } from "./admin.schema";

import { ADMIN_AUTH } from "./admin.utils";
import { asyncWrapper } from "@/api/utils/asyncWrapper";
import { CustomError, successResponse } from "@/api/utils/response";
import { getCookiesConfig } from "@/api/utils/getCookiesConfig";
import { logger } from "@/api/utils/logger";


export const adminLoginController = asyncWrapper(async (req, res) => {
    const { email, password } = req.body as AdminLoginPayload;

    const admin = await getAdminByEmail(email);

    const isPasswordValid = await verifyAdminPassword(admin, password);
    if (!isPasswordValid) {
        throw new CustomError(400, "Invalid credential")
    }

    const token = generateAdminToken({ 
        sub: admin._id,
        email: admin.email,
        phone: admin.phone
    });

    if (admin.activeSessions.length >= 2) {
        admin.activeSessions.shift();
    }
    
    admin.activeSessions.push({
        token: token,
        createdAt: new Date(),
        deviceInfo: req.headers['user-agent'] || 'Unknown'
    });

    await admin.save();

    res.cookie(ADMIN_AUTH.COOKIE_NAME, token, {
        ...getCookiesConfig(),
        maxAge: ADMIN_AUTH.COOKIE_AGE,
    });

    logger.info("check", res.getHeader("Set-Cookie"));

    successResponse(res, {
        status: 200,
        message: 'Admin login successfully',
        data: null
    });
});


export const adminProfileController = asyncWrapper(async (req, res) => {
    const auth = req.auth!;
    const admin = (await getAdminByEmail(auth.email)).toObject();

    successResponse(res, {
        status: 200,
        message: 'Admin profile fetched successfully',
        data: admin
    });
});


export const adminLogoutController = asyncWrapper(async (req, res) => {
    const auth = req.auth!;
    const token = req.cookies[ADMIN_AUTH.COOKIE_NAME];

    const admin = await getAdminByEmail(auth.email);

    admin.activeSessions = admin.activeSessions.filter(
        session => session.token !== token
    );

    await admin.save();

    res.clearCookie(ADMIN_AUTH.COOKIE_NAME,  {
       ...getCookiesConfig()
    });

    successResponse(res, {
        status: 200,
        message: 'Admin logged out successfully',
        data: null
    });
});


export const adminRegisterController = asyncWrapper(async (req, res) => {
    const { name, email, password, phone } = req.body as AdminRegisterPayload;

    const payload: AdminRegisterPayload = {
        name,
        email,
        password,
        phone
    }

    const admin = await createAdmin(payload);
    
    const token = generateAdminToken({ 
        sub: admin._id,
        email: admin.email,
        phone: admin.phone
    });

    if (admin.activeSessions.length >= 2) {
        admin.activeSessions.shift();
    }
    
    admin.activeSessions.push({
        token: token,
        createdAt: new Date(),
        deviceInfo: req.headers['user-agent'] || 'Unknown'
    });

    await admin.save();

    res.cookie(ADMIN_AUTH.COOKIE_NAME, token, {
       ...getCookiesConfig(),
        maxAge: ADMIN_AUTH.COOKIE_AGE,
    });

    successResponse(res, {
        status: 201,
        message: 'Admin registered successfully',
        data: null
    });
});


export const adminChangePasswordController = asyncWrapper(async (req, res) => {
    const auth = req.auth!;
    const { oldPassword, newPassword } = req.body as AdminChangePasswordPayload;

    const admin = await getAdminByEmail(auth.email);

    const isPasswordValid = await verifyAdminPassword(admin, oldPassword);
    if (!isPasswordValid) {
        throw new CustomError(400, "Invalid password")
    }

    admin.password = newPassword;
    const token = req.cookies[ADMIN_AUTH.COOKIE_NAME];

    admin.activeSessions = admin.activeSessions.filter(
        session => session.token !== token
    );

    await admin.save();

    res.clearCookie(ADMIN_AUTH.COOKIE_NAME,  {
        ...getCookiesConfig(),
    });

    successResponse(res, {
        status: 200,
        message: 'Admin password changed successfully',
        data: null
    });
});