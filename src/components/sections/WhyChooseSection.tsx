"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Award, Scissors, Feather, Truck } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { staggerContainer, staggerItem, getVariantWithReducedMotion } from "@/lib/motion-variants";

const featureKeys = ["quality", "craftsmanship", "materials", "delivery"] as const;

export function WhyChooseSection() {
    const t = useTranslations("whyChoose");
    const locale = useLocale();
    const isRtl = locale === "ar";
    const prefersReducedMotion = useReducedMotion();

    const icons = {
        quality: Award,
        craftsmanship: Scissors,
        materials: Feather,
        delivery: Truck,
    };

    return (
        <section className="py-24 md:py-32 bg-lyore-background overflow-hidden relative">
            {/* Background subtle elegant decoration */}
            <div className="absolute top-0 w-96 h-96 bg-lyore-accent/5 rounded-full blur-3xl pointer-events-none -end-[10%]" />
            <div className="absolute bottom-0 w-96 h-96 bg-lyore-accent/5 rounded-full blur-3xl pointer-events-none -start-[10%]" />
            <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-10">
                {/* Section Heading */}
                <motion.div
                    initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className="flex flex-col items-center text-center mb-16 md:mb-24"
                >
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-light text-lyore-text mb-6 tracking-wide"
                        style={{ fontFamily: "var(--font-heading-ar, var(--font-heading-en))" }}
                    >
                        {t('title')}
                    </h2>
                    {/* Decorative gold line */}
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-lyore-accent to-transparent" />
                </motion.div>

                {/* 4-Column Grid for features */}
                <motion.div
                    variants={getVariantWithReducedMotion(staggerContainer, prefersReducedMotion)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10"
                >
                    {featureKeys.map((key) => {
                        const Icon = icons[key];
                        return (
                            <motion.div
                                key={key}
                                variants={getVariantWithReducedMotion(staggerItem, prefersReducedMotion)}
                                className="group flex flex-col items-center text-center feature-card"
                            >
                                {/* Circular Icon Container: 80px diameter */}
                                <div className="w-20 h-20 rounded-full bg-lyore-surface/80 border border-lyore-accent/20 flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:border-lyore-accent/50 group-hover:shadow-glow-gold">
                                    <Icon
                                        className="w-8 h-8 text-lyore-accent transition-transform duration-500 group-hover:rotate-6"
                                        strokeWidth={1.2}
                                    />
                                </div>

                                {/* Title */}
                                <h3
                                    className="text-lg md:text-xl font-medium text-lyore-text mb-4"
                                    style={{ fontFamily: "var(--font-heading-ar, var(--font-heading-en))" }}
                                >
                                    {t(`features.${key}.title`)}
                                </h3>

                                {/* Description */}
                                <p
                                    className="text-sm md:text-base text-lyore-text/70 leading-relaxed"
                                    style={{ fontFamily: "var(--font-body-ar, var(--font-body-en))" }}
                                >
                                    {t(`features.${key}.description`)}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
