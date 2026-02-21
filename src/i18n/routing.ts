import { defineRouting } from "next-intl/routing";

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
