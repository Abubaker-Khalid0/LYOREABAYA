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

    const yTransform = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const backgroundY = prefersReducedMotion ? "0%" : yTransform;

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden"
            style={{ height: "clamp(320px, 50vh, 500px)" }}
        >
            {/* Parallax Background */}
            <motion.div
                className="absolute inset-x-0 -top-[20%] h-[140%] w-full"
                style={{ y: backgroundY }}
            >
                <Image
                    src="/images/collections-banner.webp"
                    alt={t("bannerText")} fill
                    className="object-cover"
                    sizes="100vw"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/50" />
            </motion.div>

            {/* Content Overlay */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-4 text-center">
                <h2
                    className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl text-balance drop-shadow-md"
                    style={{ fontFamily: "var(--font-heading-ar, var(--font-heading-en))" }}
                >
                    {t("bannerText")}
                </h2>
                <Link
                    href="/collections"
                    className="flex min-h-[44px] items-center justify-center border border-white/50 bg-white/10 px-10 py-3.5 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95"
                >
                    {t("bannerCta")}
                </Link>
            </div>
        </section>
    );
}
