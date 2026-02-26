"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Phone, Mail, Instagram } from "lucide-react";

interface WhatsAppFallbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    /** The raw WhatsApp message text to copy */
    messageText: string;
}

/** Store contact details */
const STORE_PHONE = "+971502507859";
const STORE_EMAIL = "info@lyoreabaya.com";
const STORE_INSTAGRAM = "https://www.instagram.com/lyoreabaya";

/**
 * WhatsApp Fallback Modal (T022)
 * Shown when `openWhatsApp()` fails — popup blocked or WhatsApp not installed.
 * Provides alternative contact methods and a "Copy message" button.
 */
export function WhatsAppFallbackModal({ isOpen, onClose, messageText }: WhatsAppFallbackModalProps) {
    const t = useTranslations("product");
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleCopy = useCallback(async () => {
        if (!messageText) return;
        try {
            await navigator.clipboard.writeText(messageText);
            setCopied(true);
            timeoutRef.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard API not available — silently fail
        }
    }, [messageText]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="fallback-modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label={t("whatsappFallbackTitle")}
                >
                    <motion.div
                        key="fallback-modal-content"
                        initial={{ opacity: 0, scale: 0.96, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 8 }}
                        transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] as const }}
                        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 end-4 text-lyore-text/40 hover:text-lyore-text transition-colors p-1.5 rounded-full hover:bg-lyore-surface focus:outline-none focus:ring-2 focus:ring-lyore-primary"
                            aria-label={t("closeLightbox")}
                        >
                            <X size={18} />
                        </button>

                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-lyore-text tracking-wide">
                                {t("whatsappFallbackTitle")}
                            </h2>
                            <p className="text-sm text-lyore-text/60 mt-1 leading-relaxed">
                                {t("whatsappFallbackMessage")}
                            </p>
                        </div>

                        {/* Contact Options */}
                        <div className="flex flex-col gap-3 mb-6">
                            {/* Phone */}
                            <a
                                href={`tel:${STORE_PHONE}`}
                                className="flex items-center gap-3 p-3 rounded-xl border border-lyore-primary/10 hover:border-lyore-primary/30 hover:bg-lyore-surface/50 transition-all duration-200 group"
                            >
                                <div className="flex items-center justify-center w-9 h-9 bg-lyore-primary/10 rounded-lg group-hover:bg-lyore-primary/20 transition-colors flex-shrink-0">
                                    <Phone size={16} className="text-lyore-primary" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-lyore-text/50 font-medium">
                                        {t("inquireNow")}
                                    </p>
                                    <p className="text-sm font-semibold text-lyore-text dir-ltr" dir="ltr">
                                        {STORE_PHONE}
                                    </p>
                                </div>
                            </a>

                            {/* Instagram */}
                            <a
                                href={STORE_INSTAGRAM}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-xl border border-lyore-primary/10 hover:border-lyore-primary/30 hover:bg-lyore-surface/50 transition-all duration-200 group"
                            >
                                <div className="flex items-center justify-center w-9 h-9 bg-lyore-primary/10 rounded-lg group-hover:bg-lyore-primary/20 transition-colors flex-shrink-0">
                                    <Instagram size={16} className="text-lyore-primary" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-lyore-text/50 font-medium">Instagram</p>
                                    <p className="text-sm font-semibold text-lyore-text">@lyoreabaya</p>
                                </div>
                            </a>

                            {/* Email */}
                            <a
                                href={`mailto:${STORE_EMAIL}`}
                                className="flex items-center gap-3 p-3 rounded-xl border border-lyore-primary/10 hover:border-lyore-primary/30 hover:bg-lyore-surface/50 transition-all duration-200 group"
                            >
                                <div className="flex items-center justify-center w-9 h-9 bg-lyore-primary/10 rounded-lg group-hover:bg-lyore-primary/20 transition-colors flex-shrink-0">
                                    <Mail size={16} className="text-lyore-primary" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-lyore-text/50 font-medium">Email</p>
                                    <p className="text-sm font-semibold text-lyore-text">{STORE_EMAIL}</p>
                                </div>
                            </a>
                        </div>

                        {/* Copy Message Button */}
                        {messageText && (
                            <button
                                onClick={handleCopy}
                                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${copied
                                    ? "bg-green-50 text-green-600 border border-green-200"
                                    : "bg-lyore-surface hover:bg-lyore-primary/5 text-lyore-text border border-lyore-primary/10 hover:border-lyore-primary/30"
                                    }`}
                            >
                                {copied ? (
                                    <>
                                        <Check size={16} />
                                        {t("messageCopied")}
                                    </>
                                ) : (
                                    <>
                                        <Copy size={16} />
                                        {t("copyMessage")}
                                    </>
                                )}
                            </button>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
