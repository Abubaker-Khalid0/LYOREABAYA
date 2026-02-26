"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
    generateGenericInquiryUrl,
    generateInquiryUrl,
    openWhatsApp,
} from "@/lib/whatsapp";
import { useState } from "react";
import { WhatsAppFallbackModal } from "@/components/sections/WhatsAppFallbackModal";

interface WhatsAppFABProps {
    /** Optional: product name for product-specific pre-filled message */
    productName?: string;
}

/**
 * WhatsApp Floating Action Button (T024, T025, T026)
 * Fixed to bottom-end (bottom-right LTR / bottom-left RTL).
 * On product detail pages, sends a product-specific inquiry message.
 * On all other pages, sends a generic store inquiry.
 */
export function WhatsAppFAB({ productName }: WhatsAppFABProps) {
    const t = useTranslations("product");
    const locale = useLocale() as "ar" | "en";
    const prefersReducedMotion = useReducedMotion();
    const [fallbackOpen, setFallbackOpen] = useState(false);
    const [fallbackMessage, setFallbackMessage] = useState("");

    const handleClick = () => {
        const url = productName
            ? generateInquiryUrl(productName, locale)
            : generateGenericInquiryUrl(locale);

        const result = openWhatsApp(url);
        if (!result.success) {
            // Fallback: show modal with copy option
            const encoded = url.split("?text=")[1] ?? "";
            setFallbackMessage(decodeURIComponent(encoded));
            setFallbackOpen(true);
        }
    };

    return (
        <>
            <div
                className="fixed bottom-6 end-6 z-40 flex flex-col items-end gap-2"
            // T026: end-6 uses logical properties (bottom-right LTR, bottom-left RTL)
            >
                <motion.button
                    onClick={handleClick}
                    aria-label={t("inquireNow")}
                    aria-haspopup="dialog"
                    className="relative flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe59] active:bg-[#18a84e] text-white w-14 h-14 rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.55)] transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 select-none"
                    whileTap={{ scale: 0.94 }}
                    // Entrance animation
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.33, 1, 0.68, 1] as const, delay: 0.6 }}
                >
                    {/* Pulse ring — hidden when prefers-reduced-motion */}
                    {!prefersReducedMotion && (
                        <motion.span
                            className="absolute inset-0 rounded-full bg-[#25D366]"
                            animate={{ scale: [1, 1.5, 1.5], opacity: [0.4, 0, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                        />
                    )}

                    <IconBrandWhatsapp size={32} stroke={1.5} className="flex-shrink-0 relative z-10" />
                </motion.button>
            </div>

            {/* Fallback modal if WhatsApp fails to open */}
            <WhatsAppFallbackModal
                isOpen={fallbackOpen}
                onClose={() => setFallbackOpen(false)}
                messageText={fallbackMessage}
            />
        </>
    );
}
