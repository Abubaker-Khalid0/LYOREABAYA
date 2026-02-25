"use client";

import { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AboutSection() {
    const t = useTranslations("about");
    const prefersReducedMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

    // Fade-in animation (opacity 0 to 1 over 600ms)
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <section
            ref={sectionRef}
            className="w-full bg-lyore-surface py-16 md:py-24 overflow-hidden"
        >
            {/* Split layout: 50/50 desktop, stacked mobile */}
            <div className="mx-auto max-w-7xl px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Text Column */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeIn}
                    transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.2, ease: [0.33, 1, 0.68, 1] }}
                    className="flex flex-col flex-1 items-start text-start order-2 md:order-1"
                >
                    {/* Decorative accent line (60px × 4px in Champagne Gold) */}
                    <div className="mb-6 h-[4px] w-[60px] bg-[#C9A96E]" />

                    {/* Typography hierarchy (36px desktop, 28px mobile for heading) */}
                    <h2
                        className="text-[28px] md:text-[36px] font-light tracking-wide text-lyore-primary"
                        style={{ fontFamily: "var(--font-heading-ar, var(--font-heading-en))" }}
                    >
                        {t("title")}
                    </h2>

                    {/* Body text to 16px with 1.8 line-height */}
                    <p
                        className="mt-6 text-[16px] text-lyore-text/80 leading-[1.9] max-w-lg font-light tracking-[0.02em]"
                        style={{ fontFamily: "var(--font-body-ar, var(--font-body-en))" }}
                    >
                        {t("body")}
                    </p>

                    {/* "Learn More" button linking to /about */}
                    <div className="mt-8">
                        <Link
                            href="/about"
                            className="inline-flex items-center justify-center bg-lyore-primary text-white hover:bg-lyore-accent px-10 py-4 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:-translate-y-1 active:scale-95"
                        >
                            {t("learnMore")}
                        </Link>
                    </div>
                </motion.div>

                {/* Image Column */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeIn}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] order-1 md:order-2"
                >
                    {/* Decorative Corner Element Top-Start */}
                    <div className="absolute -top-4 -start-4 w-12 h-12 border-t-2 border-s-2 border-[#C9A96E] z-10" />

                    {/* Decorative Corner Element Bottom-End */}
                    <div className="absolute -bottom-4 -end-4 w-12 h-12 border-b-2 border-e-2 border-[#C9A96E] z-10" />

                    {/* Rounded image container (12px minimum) */}
                    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-[0_8px_30px_rgba(85,0,0,0.12)]">
                        <Image
                            src="/images/about-story.png"
                            alt={t("title")}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={false}
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
