"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, Variants } from "framer-motion";
import { products } from "@/data/products";
import { ProductCard } from "@/components/sections/ProductCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function FeaturedProducts() {
    const t = useTranslations("home");
    const prefersReducedMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

    const featuredProducts = products.filter((p) => p.featured).slice(0, 3);

    if (featuredProducts.length === 0) return null;

    // Stagger container variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        },
    };

    return (
        <section
            ref={sectionRef}
            className="w-full bg-lyore-background py-16 md:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 flex flex-col items-center text-center"
                >
                    <h2
                        className="text-3xl font-light tracking-widest text-lyore-primary sm:text-4xl"
                        style={{ fontFamily: "var(--font-heading-ar, var(--font-heading-en))" }}
                    >
                        {t("featuredTitle")}
                    </h2>
                    <div className="mt-4 h-0.5 w-16 bg-lyore-accent/60" />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-12"
                >
                    {featuredProducts.map((product) => (
                        <motion.div key={product.id} variants={itemVariants}>
                            <ProductCard product={product} hideWhatsApp={true} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
