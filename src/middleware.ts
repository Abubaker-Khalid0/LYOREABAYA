import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

/**
 * Locale middleware — handles locale detection and redirects.
 * Navigating to `/` redirects to `/ar/` (default locale).
 */
export default createMiddleware(routing);

export const config = {
    // Match all pathnames except internal Next.js paths and static files
    matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
