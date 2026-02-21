/**
 * WhatsApp URL generator utility.
 * Generates pre-filled WhatsApp Click-to-Chat URLs
 * for the LYORE ABAYA store number.
 */

import type { Product } from "@/data/products";

/**
 * Convenience wrapper — accepts a `Product` object and locale,
 * extracts the locale-appropriate name/currency, and generates
 * the WhatsApp Click-to-Chat URL.
 *
 * This is the primary integration point for product components.
 */
export function generateWhatsAppUrlFromProduct(
    product: Product,
    locale: "ar" | "en",
    options?: { size?: string; color?: string },
): string {
    return generateWhatsAppUrl({
        productName: product.name[locale],
        price: product.price,
        currency: product.currency[locale],
        locale,
        size: options?.size,
        color: options?.color,
    });
}

/** Store WhatsApp number (no + prefix, no spaces per WhatsApp API) */
const WHATSAPP_NUMBER = "971502507859";

/** Props for the WhatsApp URL generator */
type GenerateWhatsAppUrlProps = {
    /** Product name in the user's current language */
    productName: string;
    /** Numeric price (no currency symbol) */
    price: number;
    /** Currency display label (e.g., "د.إ" or "AED") */
    currency: string;
    /** Current locale — determines message language */
    locale: "ar" | "en";
    /** Optional selected size */
    size?: string;
    /** Optional selected color name */
    color?: string;
};

/**
 * Generates a WhatsApp Click-to-Chat URL with a pre-filled
 * order message in the user's active language.
 *
 * @returns Formatted URL string: `https://wa.me/971502507859?text=...`
 */
export function generateWhatsAppUrl({
    productName,
    price,
    currency,
    locale,
    size,
    color,
}: GenerateWhatsAppUrlProps): string {
    const message =
        locale === "ar"
            ? buildArabicMessage(productName, price, currency, size, color)
            : buildEnglishMessage(productName, price, currency, size, color);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds the Arabic pre-filled WhatsApp message.
 */
function buildArabicMessage(
    productName: string,
    price: number,
    currency: string,
    size?: string,
    color?: string,
): string {
    let message = `✨ مرحباً، أرغب بطلب:\n\n`;
    message += `📌 المنتج: ${productName}\n`;
    message += `💰 السعر: ${price} ${currency}\n`;

    if (size) {
        message += `📏 المقاس: ${size}\n`;
    }
    if (color) {
        message += `🎨 اللون: ${color}\n`;
    }

    message += `\nشكراً لكم 🤍`;
    return message;
}

/**
 * Builds the English pre-filled WhatsApp message.
 */
function buildEnglishMessage(
    productName: string,
    price: number,
    currency: string,
    size?: string,
    color?: string,
): string {
    let message = `✨ Hello, I'd like to order:\n\n`;
    message += `📌 Product: ${productName}\n`;
    message += `💰 Price: ${price} ${currency}\n`;

    if (size) {
        message += `📏 Size: ${size}\n`;
    }
    if (color) {
        message += `🎨 Color: ${color}\n`;
    }

    message += `\nThank you 🤍`;
    return message;
}
