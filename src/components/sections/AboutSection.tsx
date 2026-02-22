"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AboutSection() {
    const t = useTranslations("about");
    const prefersReducedMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

    const fadeUp = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section
            ref={sectionRef}
            className="w-full bg-lyore-surface py-16 md:py-24"
        >
            <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 md:gap-12 md:px-8 lg:gap-16">
                {/* Text Column — appears on the start side (left in LTR, right in RTL) */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col justify-center"
                >
                    {/* Decorative gold accent line */}
                    <div className="mb-6 h-1 w-12 bg-lyore-accent" />

                    <h2
                        className="text-3xl font-bold tracking-tight text-lyore-primary sm:text-4xl"
                        style={{ fontFamily: "var(--font-heading-ar, var(--font-heading-en))" }}
                    >
                        {t("title")}
                    </h2>

                    <p
                        className="mt-6 text-lg leading-relaxed text-lyore-text/80"
                        style={{ fontFamily: "var(--font-body-ar, var(--font-body-en))" }}
                    >
                        {t("body")}
                    </p>
                </motion.div>

                {/* Image Column — appears on the end side (right in LTR, left in RTL) */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
                    className="relative aspect-[4/5] w-full overflow-hidden"
                >
                    <Image
                        src="/images/about-story.png"
                        alt={t("title")}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </motion.div>
            </div>
        </section>
    );
}
