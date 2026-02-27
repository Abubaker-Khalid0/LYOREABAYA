"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { generateGenericInquiryUrl } from "@/lib/whatsapp";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IconRulerMeasure, IconShirt, IconLineDashed } from "@tabler/icons-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

// ─── Data Constants ──────────────────────────────────────────────────────────

const SIZE_TABLE = [
    { size: "XS", length: 50, bust: 40, sleeve: 26.5, hips: 44, shoulder: 15 },
    { size: "S", length: 52, bust: 42, sleeve: 26.5, hips: 46, shoulder: 16 },
    { size: "M", length: 54, bust: 43, sleeve: 27, hips: 48, shoulder: 16 },
    { size: "L", length: 56, bust: 45, sleeve: 27.5, hips: 52, shoulder: 16.5 },
    { size: "XL", length: 58, bust: 46, sleeve: 28, hips: 54, shoulder: 18 },
    { size: "XXL", length: 60, bust: 47, sleeve: 28.5, hips: 60, shoulder: 18 },
];

const MEASURE_STEPS = [
    {
        key: "height",
        icon: IconRulerMeasure,
    },
    {
        key: "chest",
        icon: IconShirt,
    },
    {
        key: "waist",
        icon: IconLineDashed,
    },
] as const;

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const tableRowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const staticVar = { opacity: 1, y: 0, x: 0 };

// ─── Props ───────────────────────────────────────────────────────────────────

type Props = { locale: "ar" | "en" };

export function SizeGuideContent({ locale }: Props) {
    const t = useTranslations("sizeGuide");
    const prefersReducedMotion = useReducedMotion();

    const isRtl = locale === "ar";
    const whatsappUrl = generateGenericInquiryUrl(locale);

    return (
        <main className="min-h-screen bg-lyore-background text-lyore-text pb-24">
            {/* ── Page Header (FR-033/FR-015) ── */}
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

            <div className="max-w-4xl mx-auto px-4 mt-16 space-y-20">
                {/* ── Size Table Section (FR-012, FR-013, FR-014) ── */}
                <motion.section
                    variants={prefersReducedMotion ? undefined : fadeInVariants}
                    initial={prefersReducedMotion ? staticVar : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="overflow-hidden rounded-3xl border border-lyore-text/10 bg-white shadow-sm"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="bg-lyore-surface/80 border-b border-lyore-text/10">
                                    <th className={`p-4 md:p-6 font-medium text-lyore-primary text-sm uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'}`}>
                                        {t("headers.size")}
                                    </th>
                                    <th className={`p-4 md:p-6 font-medium text-lyore-primary text-sm uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'}`}>
                                        {t("headers.length")}
                                    </th>
                                    <th className={`p-4 md:p-6 font-medium text-lyore-primary text-sm uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'}`}>
                                        {t("headers.bust")}
                                    </th>
                                    <th className={`p-4 md:p-6 font-medium text-lyore-primary text-sm uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'}`}>
                                        {t("headers.sleeve")}
                                    </th>
                                    <th className={`p-4 md:p-6 font-medium text-lyore-primary text-sm uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'}`}>
                                        {t("headers.hips")}
                                    </th>
                                    <th className={`p-4 md:p-6 font-medium text-lyore-primary text-sm uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'}`}>
                                        {t("headers.shoulder")}
                                    </th>
                                </tr>
                            </thead>
                            <motion.tbody
                                variants={staggerContainer}
                                initial={prefersReducedMotion ? false : "hidden"}
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {SIZE_TABLE.map((row, idx) => (
                                    <motion.tr
                                        key={row.size}
                                        variants={prefersReducedMotion ? undefined : tableRowVariants}
                                        className="border-b border-lyore-text/5 hover:bg-lyore-surface/30 transition-colors duration-200"
                                    >
                                        <td className={`p-4 md:p-6 font-semibold text-lyore-text ${isRtl ? 'text-right' : 'text-left'}`}>
                                            {row.size}
                                        </td>
                                        <td className={`p-4 md:p-6 text-lyore-text/80 ${isRtl ? 'text-right' : 'text-left'}`}>
                                            {row.length}
                                        </td>
                                        <td className={`p-4 md:p-6 text-lyore-text/80 ${isRtl ? 'text-right' : 'text-left'}`}>
                                            {row.bust}
                                        </td>
                                        <td className={`p-4 md:p-6 text-lyore-text/80 ${isRtl ? 'text-right' : 'text-left'}`}>
                                            {row.sleeve}
                                        </td>
                                        <td className={`p-4 md:p-6 text-lyore-text/80 ${isRtl ? 'text-right' : 'text-left'}`}>
                                            {row.hips}
                                        </td>
                                        <td className={`p-4 md:p-6 text-lyore-text/80 ${isRtl ? 'text-right' : 'text-left'}`}>
                                            {row.shoulder}
                                        </td>
                                    </motion.tr>
                                ))}
                            </motion.tbody>
                        </table>
                    </div>
                </motion.section>

                {/* ── How to Measure Section (FR-016, FR-017) ── */}
                <motion.section
                    variants={prefersReducedMotion ? undefined : fadeInVariants}
                    initial={prefersReducedMotion ? staticVar : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h2 className="text-2xl md:text-3xl font-serif text-center mb-12 text-lyore-text">
                        {t("measurementGuide")}
                    </h2>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial={prefersReducedMotion ? false : "hidden"}
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {MEASURE_STEPS.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.key}
                                    variants={prefersReducedMotion ? undefined : fadeInVariants}
                                    className="flex flex-col items-center text-center group"
                                >
                                    {/* Animated Circle Icon */}
                                    <div className="w-20 h-20 rounded-full bg-lyore-surface border border-lyore-accent/20 flex items-center justify-center mb-6 text-lyore-primary group-hover:bg-lyore-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:-translate-y-2">
                                        <Icon size={32} stroke={1.5} />
                                    </div>

                                    {/* Step Title & Desc */}
                                    <h3 className="text-xl font-medium text-lyore-text mb-3">
                                        <span className="text-lyore-accent/60 me-2 text-sm">0{idx + 1}</span>
                                        {t(`steps.${step.key}`)}
                                    </h3>
                                    <p className="text-lyore-text/60 leading-relaxed text-sm max-w-xs">
                                        {t(`steps.${step.key}Desc`)}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.section>

                {/* ── WhatsApp CTA (FR-018) ── */}
                <motion.section
                    variants={prefersReducedMotion ? undefined : fadeInVariants}
                    initial={prefersReducedMotion ? staticVar : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex justify-center mt-16 pt-12 border-t border-lyore-text/10"
                >
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-4 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white px-8 py-5 rounded-full transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-4"
                        aria-label={t("cta")}
                    >
                        <IconBrandWhatsapp size={24} className="group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-medium tracking-wide">
                            {t("cta")}
                        </span>
                    </a>
                </motion.section>
            </div>
        </main>
    );
}
