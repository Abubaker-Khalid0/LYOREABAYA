"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { generateExchangeRequestUrl } from "@/lib/whatsapp";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IconPackage, IconArrowLeftRight, IconTruckDelivery } from "@tabler/icons-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const staticVar = { opacity: 1, y: 0 };

// ─── Props ───────────────────────────────────────────────────────────────────

type Props = { locale: "ar" | "en" };

export function ReturnsContent({ locale }: Props) {
    const t = useTranslations("returns");
    const prefersReducedMotion = useReducedMotion();

    // Use the specialized exchange URL generator for this page
    const whatsappUrl = generateExchangeRequestUrl(locale);

    return (
        <main className="min-h-screen bg-lyore-background text-lyore-text pb-24">
            {/* ── Page Header (FR-033/FR-019) ── */}
            <section className="pt-32 pb-12 text-center px-4 bg-lyore-surface/30">
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="font-serif text-4xl md:text-5xl font-light text-lyore-text tracking-wide">
                        {t("title")}
                    </h1>
                    <p className="mt-3 text-lyore-text/60 text-lg font-light">
                        {t("subtitle")}
                    </p>
                    <div className="mx-auto mt-6 w-16 h-px bg-lyore-accent opacity-60" />
                </motion.div>
            </section>

            <div className="max-w-4xl mx-auto px-4 mt-16 space-y-16">
                {/* ── Free Shipping Banner (FR-021) ── */}
                <motion.section
                    variants={prefersReducedMotion ? undefined : fadeInVariants}
                    initial={prefersReducedMotion ? staticVar : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <div className="bg-[#550000] text-white rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-center gap-4 shadow-lg relative overflow-hidden">
                        {/* Decorative background circle */}
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                        <IconTruckDelivery size={32} stroke={1.5} className="text-white/90" />
                        <h2 className="text-xl md:text-2xl font-serif tracking-wide text-center">
                            {t("freeShipping")}
                        </h2>
                    </div>
                </motion.section>

                {/* ── Policy Cards Container ── */}
                <motion.section
                    variants={staggerContainer}
                    initial={prefersReducedMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {/* ── Shipping Policy Card (FR-022) ── */}
                    <motion.div
                        variants={prefersReducedMotion ? undefined : fadeInVariants}
                        className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-lyore-text/5 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-shadow duration-500 h-full flex flex-col"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-lyore-surface border border-lyore-accent/20 flex items-center justify-center text-lyore-primary mb-6 shrink-0">
                            <IconPackage size={32} stroke={1.5} />
                        </div>
                        <h3 className="text-2xl font-serif text-lyore-text mb-4">
                            {t("shippingTitle")}
                        </h3>
                        <p className="text-lyore-text/70 leading-relaxed font-light">
                            {t("shippingPolicy")}
                        </p>
                    </motion.div>

                    {/* ── Exchange Policy Card (FR-023) ── */}
                    <motion.div
                        variants={prefersReducedMotion ? undefined : fadeInVariants}
                        className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-lyore-text/5 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-shadow duration-500 h-full flex flex-col"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-lyore-surface border border-lyore-accent/20 flex items-center justify-center text-lyore-primary mb-6 shrink-0">
                            <IconArrowLeftRight size={32} stroke={1.5} />
                        </div>
                        <h3 className="text-2xl font-serif text-lyore-text mb-4">
                            {t("returnsTitle")}
                        </h3>
                        <p className="text-lyore-text/70 leading-relaxed font-light">
                            {t("returnsPolicy")}
                        </p>
                    </motion.div>
                </motion.section>

                {/* ── WhatsApp Exchange CTA (FR-024) ── */}
                <motion.section
                    variants={prefersReducedMotion ? undefined : fadeInVariants}
                    initial={prefersReducedMotion ? staticVar : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex justify-center pt-8 border-t border-lyore-text/10"
                >
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-4 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white px-8 py-5 rounded-full transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-4"
                        aria-label={t("exchangeCta")}
                    >
                        <IconBrandWhatsapp size={24} className="group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-medium tracking-wide">
                            {t("exchangeCta")}
                        </span>
                    </a>
                </motion.section>
            </div>
        </main>
    );
}
