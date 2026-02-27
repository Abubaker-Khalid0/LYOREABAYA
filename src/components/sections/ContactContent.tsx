"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
    Phone,
    Mail,
    Instagram,
    type LucideIcon,
} from "lucide-react";
import {
    IconBrandWhatsapp,
    IconBrandTiktok,
    IconBrandSnapchat,
    type Icon as TablerIcon,
} from "@tabler/icons-react";
import { generateGenericInquiryUrl } from "@/lib/whatsapp";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ─── Contact channel constants ──────────────────────────────────────────────

const WHATSAPP_NUMBER = "971502507859";
const STORE_PHONE = "+971502507859";
const STORE_EMAIL = "Lyoreabaya@gmail.com";
const STORE_INSTAGRAM = "https://instagram.com/Lyore_abaya";
const STORE_TIKTOK = "https://tiktok.com/@Lyore.abaya";
const STORE_SNAPCHAT = "https://snapchat.com/add/Lyoreabayas";

type LucideChannelDef = {
    key: "phone" | "email" | "instagram";
    href: string;
    external: boolean;
    iconType: "lucide";
    Icon: LucideIcon;
    color: string;
};

type TablerChannelDef = {
    key: "whatsapp" | "tiktok" | "snapchat";
    href: string;
    external: boolean;
    iconType: "tabler";
    Icon: TablerIcon;
    color: string;
};

type ChannelDef = LucideChannelDef | TablerChannelDef;

// ─── Props ───────────────────────────────────────────────────────────────────

interface Props {
    locale: "ar" | "en";
}

// ─── Animation variants ──────────────────────────────────────────────────────

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.07 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const staticCard = { opacity: 1, y: 0 };

// ─── Component ───────────────────────────────────────────────────────────────

export function ContactContent({ locale }: Props) {
    const t = useTranslations("contact");
    const prefersReducedMotion = useReducedMotion();

    const channels: ChannelDef[] = [
        {
            key: "whatsapp",
            href: generateGenericInquiryUrl(locale),
            external: false,
            iconType: "tabler",
            Icon: IconBrandWhatsapp,
            color: "#25D366",
        },
        {
            key: "phone",
            href: `tel:${STORE_PHONE}`,
            external: false,
            iconType: "lucide",
            Icon: Phone,
            color: "#550000",
        },
        {
            key: "email",
            href: `mailto:${STORE_EMAIL}`,
            external: true,
            iconType: "lucide",
            Icon: Mail,
            color: "#550000",
        },
        {
            key: "instagram",
            href: STORE_INSTAGRAM,
            external: true,
            iconType: "lucide",
            Icon: Instagram,
            color: "#E1306C",
        },
        {
            key: "tiktok",
            href: STORE_TIKTOK,
            external: true,
            iconType: "tabler",
            Icon: IconBrandTiktok,
            color: "#010101",
        },
        {
            key: "snapchat",
            href: STORE_SNAPCHAT,
            external: true,
            iconType: "tabler",
            Icon: IconBrandSnapchat,
            color: "#FFFC00",
        },
    ];

    return (
        <main className="min-h-screen bg-lyore-background text-lyore-text">
            {/* ── Page Header (Redesigned matching image exactly) ── */}
            <section className="pt-40 pb-20 text-center px-4 bg-lyore-surface/60 border-b border-lyore-text/5">
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto flex flex-col items-center justify-center"
                >
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-lyore-text tracking-wide mb-4">
                        {t("title")}
                    </h1>
                    <p className="text-lyore-text/60 text-lg font-light mb-8 max-w-2xl">
                        {t("subtitle")}
                    </p>

                    {/* Breadcrumbs Pill */}
                    <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-lyore-text/10 bg-white/60 text-sm font-medium tracking-wide">
                        <a href={`/${locale}`} className="text-lyore-text hover:text-lyore-primary transition-colors">
                            {t("home")}
                        </a>
                        <span className="text-lyore-text/40">/</span>
                        <span className="text-lyore-text/60">{t("breadcrumbContact")}</span>
                    </div>
                </motion.div>
            </section>

            {/* ── Contact Details Section ── */}
            <section className="py-20 px-4 max-w-6xl mx-auto">
                {/* Section Titles */}
                <div className="text-center mb-16">
                    <p className="text-lyore-primary text-sm font-medium tracking-widest uppercase mb-3">
                        {t("contactDetails")}
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-lyore-text">
                        {t("ourContactInfo")}
                    </h2>
                </div>

                {/* Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial={prefersReducedMotion ? false : "hidden"}
                    animate="visible"
                >
                    {channels.map((ch) => {
                        const linkProps = ch.external
                            ? {
                                target: "_blank" as const,
                                rel: "noopener noreferrer",
                            }
                            : {};

                        const label = t(ch.key);
                        // Using dynamic key access since we just added the hint keys (e.g. "whatsappHint")
                        const hint = t(`${ch.key}Hint` as any);

                        return (
                            <motion.a
                                key={ch.key}
                                href={ch.href}
                                aria-label={label}
                                {...linkProps}
                                variants={prefersReducedMotion ? undefined : cardVariants}
                                initial={prefersReducedMotion ? staticCard : undefined}
                                whileHover={
                                    prefersReducedMotion
                                        ? undefined
                                        : { y: -8, scale: 1.02 }
                                }
                                whileTap={
                                    prefersReducedMotion ? undefined : { scale: 0.98 }
                                }
                                transition={{ duration: 0.3 }}
                                className="group flex flex-col items-center text-center p-12 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-transparent hover:border-lyore-text/5 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-lyore-primary focus:ring-offset-4 cursor-pointer"
                            >
                                {/* Large Colored Circle with White Icon */}
                                <div
                                    className="w-20 h-20 rounded-full mb-6 flex items-center justify-center text-white bg-lyore-primary shadow-md group-hover:shadow-lg group-hover:bg-lyore-primary/90 transition-all duration-500 transform group-hover:scale-105"
                                >
                                    {ch.iconType === "lucide" ? (
                                        <ch.Icon
                                            size={32}
                                            strokeWidth={1.5}
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <ch.Icon
                                            size={34}
                                            stroke={1.5}
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-lyore-text mb-2">
                                    {label}
                                </h3>

                                {/* Detail Text */}
                                <span className="text-sm text-lyore-text/60 leading-relaxed font-medium">
                                    {hint}
                                </span>
                            </motion.a>
                        );
                    })}
                </motion.div>
            </section>
        </main>
    );
}
