"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CollectionsBanner() {
    const t = useTranslations("collections");
    const prefersReducedMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Parallax effect: background moves at 0.5x scroll speed
    // 0 to 1 progress maps to 0% to 50% movement
    const yTransform = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const backgroundY = prefersReducedMotion ? "0%" : yTransform;

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-[400px] bg-black"
        >
            {/* Parallax Background */}
            <motion.div
                className="absolute inset-x-0 -top-[50%] h-[200%] w-full"
                style={{ y: backgroundY }}
            >
                <Image
                    src="/images/collections-banner.png"
                    alt={t("bannerText")}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={false}
                />
            </motion.div>

            {/* Dark overlay for text readability (Opacity 0.6 to 0.7) */}
            <div className="absolute inset-0 bg-black/60 z-10" />

            {/* Content Overlay */}
            <div className="relative z-20 flex flex-col items-center justify-center gap-8 text-center px-6 w-full max-w-4xl mx-auto">

                {/* Heading Typography (32px mobile, 42px desktop) */}
                <h2
                    className="text-[32px] md:text-[42px] font-light tracking-widest text-white text-balance drop-shadow-2xl capitalize"
                    style={{ fontFamily: "var(--font-heading-ar, var(--font-heading-en))" }}
                >
                    {t("bannerText")}
                </h2>

                {/* CTA Button */}
                <motion.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                    className="relative overflow-hidden rounded-sm"
                >
                    <Link
                        href="/collections"
                        className="group relative flex items-center justify-center border border-lyore-accent/80 bg-lyore-primary/90 backdrop-blur-md min-w-[160px] min-h-[48px] px-8 py-3 text-xs md:text-sm font-bold uppercase tracking-widest text-white transition-all duration-500 hover:bg-lyore-accent hover:border-lyore-accent hover:text-black hover:shadow-[0_0_20px_rgba(201,169,110,0.5)]"
                    >
                        {/* Shimmer Animation Overlay */}
                        <div className="absolute inset-0 -translate-x-[150%] animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg]" />

                        <span className="relative z-10">{t("bannerCta")}</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
