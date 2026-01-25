// OTP Configuration
export const OTP_CONFIG = {
    LENGTH: 6,
    EXPIRY_TIME: 5 * 60 * 1000, // 5 minutes
    MAX_RESEND_COUNT: 3,
    SESSION_EXPIRY_TIME: 15 * 60 * 1000, // 15 minutes
} as const;


export const generateOtp = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
