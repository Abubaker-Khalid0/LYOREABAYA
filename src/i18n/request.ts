import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * Request configuration for next-intl.
 * Loads the translation messages for the requested locale.
 */
export default getRequestConfig(async ({ requestLocale }) => {
    // Ensure the incoming locale is valid
    let locale = await requestLocale;
    if (!locale || !routing.locales.includes(locale as "ar" | "en")) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});
