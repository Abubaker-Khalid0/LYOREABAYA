"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AnnouncementBar() {
    const t = useTranslations("announcement");
    const prefersReducedMotion = useReducedMotion();
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Check sessionStorage on mount
        try {
            const isDismissed = sessionStorage.getItem("lyore_announcement_dismissed");
            if (!isDismissed) {
                setIsVisible(true);
            }
        } catch (e) {
            // Graceful degradation if sessionStorage is blocked
            setIsVisible(true);
        }
    }, []);

    const dismiss = () => {
        setIsVisible(false);
        try {
            sessionStorage.setItem("lyore_announcement_dismissed", "true");
        } catch (e) {
            // Ignore if sessionStorage is blocked
        }
    };

    // Don't render until mounted to avoid hydration mismatch
    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                    className="overflow-hidden bg-lyore-primary text-lyore-surface relative z-50"
                >
                    <div className="flex min-h-[40px] items-center justify-center px-10 py-2">
                        {/* Mobile Marquee / Desktop Static */}
                        <div className="w-full overflow-hidden whitespace-nowrap md:whitespace-normal md:text-center text-sm font-medium tracking-wide">
                            {/* CSS Marquee animation for mobile only */}
                            <div className="inline-block animate-marquee md:animate-none">
                                {t("text")}
                                <span className="md:hidden opacity-0 select-none px-4">|</span> {/* Spacing for loop */}
                                <span className="md:hidden">{t("text")}</span>
                            </div>
                        </div>

                        {/* Dismiss Button */}
                        <button
                            onClick={dismiss}
                            className="absolute end-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 transition-colors hover:bg-black/10 focus-visible:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lyore-surface/50"
                            aria-label={t("dismiss")}
                        >
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
