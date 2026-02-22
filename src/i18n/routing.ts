import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

/**
 * Routing configuration for next-intl.
 * - Arabic (ar) is the default locale
 * - English (en) is the secondary locale
 * - All routes are prefixed with the locale segment
 */
export const routing = defineRouting({
    locales: ["ar", "en"],
    defaultLocale: "ar",
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
