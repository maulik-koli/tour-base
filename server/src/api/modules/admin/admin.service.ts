import jwt from "jsonwebtoken";
import Admin, { AdminDocument } from "./admin.model"
import { env } from "@/api/config/env";
import { AdminRegisterPayload } from "./admin.schema";

import { ADMIN_AUTH, AdminTokenPayload } from "./admin.utils";
import { CustomError } from "@/api/utils/response";
import { log } from "@/api/utils/log";

const JWT_KEY = env.JWT_ADMIN_SECRET


export const getAdminByEmail = async (email: string): Promise<AdminDocument> => {
    const admin = await Admin.findOne({ email });
    if (!admin) {
        throw new CustomError(404, 'Admin not found');
    }
    return admin;
}

export const verifyAdminPassword = async (admin: AdminDocument, password: string): Promise<boolean> => {
    const isMatch = await admin.comparePassword(password);
    return isMatch;
}


export const generateAdminToken = (payload: object): string => {
    try{
        const token = jwt.sign(
            payload,
            JWT_KEY,
            { expiresIn: ADMIN_AUTH.JWT_TOKEN_EXPIRY }
        );
        return token;
    }
    catch(error){
        log.error('JWT Generation Error:', error);
        throw new CustomError(500, 'Could not generate token');
    }
}

export const verifyAdminToken = (token: string): jwt.JwtPayload & AdminTokenPayload => {
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        return decoded as jwt.JwtPayload & AdminTokenPayload;
    } catch (error) {
        throw new CustomError(401, 'Invalid admin token');
    }
}

export const createAdmin = async (admin: AdminRegisterPayload): Promise<AdminDocument> => {
    const existingAdmin = await Admin.exists({})
    if (existingAdmin) {
        throw new CustomError(409, 'Admin already exists');
    }

    const newAdmin = new Admin(admin);
    await newAdmin.save();
    return newAdmin;
}