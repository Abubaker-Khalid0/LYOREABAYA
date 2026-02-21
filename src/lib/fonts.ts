import { Playfair_Display, Inter, Noto_Naskh_Arabic, Tajawal } from "next/font/google";

/**
 * English heading font — Playfair Display
 * Used on EN locale pages for headings and display text.
 */
export const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-heading-en",
    display: "swap",
    fallback: ["serif"],
});

/**
 * English body font — Inter
 * Used on EN locale pages for body text and UI elements.
 */
export const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-body-en",
    display: "swap",
    fallback: ["sans-serif"],
});

/**
 * Arabic heading font — Noto Naskh Arabic
 * Used on AR locale pages for headings and display text.
 */
export const notoNaskhArabic = Noto_Naskh_Arabic({
    subsets: ["arabic"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-heading-ar",
    display: "swap",
    fallback: ["serif"],
});

/**
 * Arabic body font — Tajawal
 * Used on AR locale pages for body text and UI elements.
 */
export const tajawal = Tajawal({
    subsets: ["arabic"],
    weight: ["400", "500", "700"],
    variable: "--font-body-ar",
    display: "swap",
    fallback: ["sans-serif"],
});

/**
 * Returns the font class names for the given locale.
 * AR → Noto Naskh Arabic (heading) + Tajawal (body)
 * EN → Playfair Display (heading) + Inter (body)
 */
export function getFontClasses(locale: string): string {
    if (locale === "ar") {
        return `${notoNaskhArabic.variable} ${tajawal.variable}`;
    }
    return `${playfairDisplay.variable} ${inter.variable}`;
}
