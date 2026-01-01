import { CookieOptions } from "express";
import { env } from "../config/env"
import { log } from "./log";

type SameSiteType = boolean | "lax" | "strict" | "none" | undefined


export const getCookiesConfig = (): CookieOptions => {
    const environment = env.NODE_ENV || "development";

    const configs: Record<string, CookieOptions> = {
        development: {
            httpOnly: true,
            secure: false,
            sameSite: 'lax' as SameSiteType,
        },
        staging: {
            httpOnly: true,
            secure: true,
            sameSite: 'none' as SameSiteType,
            // sameSite: 'none' as SameSiteType,
            domain: undefined,
        },
        production: {
            httpOnly: true,
            secure: true,
            sameSite: 'none' as SameSiteType,
            domain: undefined,
        }
    };

    log.info(`Cookie Configs for ${environment}:`, configs[environment]);

    return configs[environment];
}