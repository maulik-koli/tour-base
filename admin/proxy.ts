import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME } from "@/constants/apiRegistery";

export function proxy(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    const token = req.cookies.get(COOKIE_NAME)?.value;

    console.log("Proxy middleware:", { pathname, token });

    if (!token && pathname === "/") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token && pathname === "/login") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/:path*"],
};
