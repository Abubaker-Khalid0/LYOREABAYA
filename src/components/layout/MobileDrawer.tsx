"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/lib/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
    const t = useTranslations();
    const locale = useLocale();
    const pathname = usePathname();
    const prefersReducedMotion = useReducedMotion();
    const isRTL = locale === "ar";

    // Auto-close on route change
    useEffect(() => {
        if (isOpen) {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Slide direction: in RTL the drawer slides in from the left (negative x),
    // in LTR it slides in from the right (positive x).
    const offscreenX = isRTL ? "-100%" : "100%";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        aria-hidden="true"
                    />

                    {/* Drawer panel */}
                    <motion.div
                        initial={{ x: offscreenX }}
                        animate={{ x: 0 }}
                        exit={{ x: offscreenX }}
                        transition={
                            prefersReducedMotion
                                ? { duration: 0 }
                                : { type: "spring", damping: 25, stiffness: 200 }
                        }
                        role="dialog"
                        aria-modal="true"
                        className="fixed inset-y-0 end-0 z-50 flex w-full max-w-sm flex-col bg-lyore-background p-6 shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-2" onClick={onClose}>
                                <div className="relative h-8 w-8">
                                    <Image
                                        src="/logo.svg"
                                        alt="LYORE ABAYA"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                                <span className="text-xl font-bold tracking-widest text-lyore-primary">LYORE</span>
                            </Link>
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 text-lyore-text transition-colors hover:bg-black/5"
                                aria-label={t("nav.closeMenu")}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="mt-12 flex flex-col gap-6">
                            {NAV_LINKS.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`text-2xl font-medium transition-colors hover:text-lyore-primary ${isActive ? "text-lyore-primary" : "text-lyore-text"
                                            }`}
                                    >
                                        {t(link.labelKey)}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-auto pb-8">
                            <LanguageSwitcher variant="drawer" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
