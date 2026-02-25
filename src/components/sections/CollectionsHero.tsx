"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CollectionsHero() {
    const t = useTranslations("collections");
    const locale = useLocale() as "ar" | "en";
    const isRtl = locale === "ar";
    const prefersReducedMotion = useReducedMotion();

    // Sophisticated entrance animations
    const titleVariants = prefersReducedMotion
        ? { opacity: 1, y: 0 }
        : {
            initial: { opacity: 0, y: 20 },
            animate: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.8,
                    ease: [0.33, 1, 0.68, 1] as const,
                },
            },
        };

    const subtitleVariants = prefersReducedMotion
        ? { opacity: 1, y: 0 }
        : {
            initial: { opacity: 0, y: 20 },
            animate: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.8,
                    ease: [0.33, 1, 0.68, 1] as const,
                    delay: 0.2,
                },
            },
        };

    const lineVariants = prefersReducedMotion
        ? { width: "64px" }
        : {
            initial: { width: 0 },
            animate: {
                width: "64px",
                transition: {
                    duration: 0.8,
                    ease: [0.33, 1, 0.68, 1] as const,
                    delay: 0.4,
                },
            },
        };

    return (
        <section
            className="relative w-full h-[40vh] overflow-hidden"
            aria-label={t("title")}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/collections/hero.webp"
                    alt={t("heroAlt")}
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* Sophisticated Multi-Stop Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60" />

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-12 text-center">
                {/* Title */}
                <motion.h1
                    className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-wider ${isRtl ? "font-heading-ar" : "font-heading-en"
                        }`}
                    style={{
                        fontFamily:
                            locale === "ar"
                                ? "var(--font-heading-ar)"
                                : "var(--font-heading-en)",
                        letterSpacing: "0.1em",
                    }}
                    {...(prefersReducedMotion
                        ? {}
                        : {
                            initial: titleVariants.initial,
                            animate: titleVariants.animate,
                        })}
                >
                    {t("title")}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-white/90 font-light max-w-2xl leading-relaxed"
                    style={{
                        fontFamily:
                            locale === "ar"
                                ? "var(--font-body-ar)"
                                : "var(--font-body-en)",
                    }}
                    {...(prefersReducedMotion
                        ? {}
                        : {
                            initial: subtitleVariants.initial,
                            animate: subtitleVariants.animate,
                        })}
                >
                    {t("subtitle")}
                </motion.p>

                {/* Decorative Gold Accent Line */}
                <motion.div
                    className="mt-6 md:mt-8 h-[2px] bg-lyore-accent"                    {...(prefersReducedMotion
                        ? { style: { width: "64px" } }
                        : {
                            initial: lineVariants.initial,
                            animate: lineVariants.animate,
                        })}
                />
            </div>
        </section>
    );
}
