"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, Variants, useInView } from "framer-motion";
import { PackageOpen } from "lucide-react";
import { Product } from "@/data/products";
import { ProductCard } from "@/components/sections/ProductCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProductGridProps {
    products: Product[];
}

/**
 * ProductGrid component - displays products in a responsive grid layout.
 * Features:
 * - Responsive CSS grid: 2 columns on mobile, 3 on tablet, 4 on desktop
 * - Refined gap spacing for premium aesthetics
 * - Premium-styled empty state with localized text
 * - Products render in data source order (no client-side sorting)
 */
export function ProductGrid({ products }: ProductGridProps) {
    const t = useTranslations("collections");

    const prefersReducedMotion = useReducedMotion();
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

    // Animation Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.12,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40, scale: prefersReducedMotion ? 1 : 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const }
        },
        exit: {
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 0.95,
            transition: { duration: 0.3 }
        }
    };

    return (
        <AnimatePresence mode="wait">
            {products.length === 0 ? (
                <div key="empty-state" className="flex flex-col items-center justify-center py-20 md:py-32 px-4 flex-1">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center gap-6 max-w-md text-center"
                    >
                        {/* Subtle icon */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-lyore-primary/5 blur-2xl rounded-full" />
                            <PackageOpen
                                className="relative w-16 h-16 md:w-20 md:h-20 text-lyore-primary/30 stroke-[1.5]"
                                aria-hidden="true"
                            />
                        </div>

                        {/* Localized empty state text */}
                        <div className="space-y-2">
                            <p className="text-lg md:text-xl font-light tracking-wide text-lyore-text/60">
                                {t("noProducts")}
                            </p>
                            <p className="text-sm text-lyore-text/40 tracking-wide">
                                {t("noProductsHint")}
                            </p>
                        </div>
                    </motion.div>
                </div>
            ) : (
                <motion.div
                    key="product-grid"
                    id="product-grid"
                    ref={sectionRef}
                    aria-live="polite"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12 min-h-[50vh]"
                >
                    <AnimatePresence mode="popLayout">
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={itemVariants}
                                exit="exit"
                                layout={!prefersReducedMotion}
                            >
                                <ProductCard product={product} hideQuickView={true} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
