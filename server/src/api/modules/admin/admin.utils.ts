
export type AdminTokenPayload = {
    sub: string;
    email: string;
    phone: string;
}

export type AdminAuth = {
    adminId: string;
    email: string;
    phone: string;
}

export const ADMIN_AUTH = {
    JWT_TOKEN_EXPIRY: '7d',
    COOKIE_AGE: 7 * 24 * 60 * 60 * 1000,
    COOKIE_NAME: '__secure-atkn',
} as const