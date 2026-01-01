import { CookieOptions } from "express";
import { env } from "../config/env"
import { log } from "./log";

type SameSiteType = boolean | "lax" | "strict" | "none" | undefined
const DOMAIN = ".eklavyatourism.com";


export const getCookiesConfig = (): CookieOptions => {
    const environment = env.NODE_ENV || "development";

    const configs: Record<string, CookieOptions> = {
        development: {
            httpOnly: true,
            secure: true,
            sameSite: 'none' as SameSiteType,
        },
        staging: {
            httpOnly: true,
            secure: true,
            sameSite: 'lax' as SameSiteType,
            domain: DOMAIN,
        },
        production: {
            httpOnly: true,
            secure: true,
            sameSite: 'lax' as SameSiteType,
            domain: DOMAIN,
        }
    };

    log.info(`Cookie Configs for ${environment}:`, configs[environment]);

    return configs[environment];
}