"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FilterTabsProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export function FilterTabs({
    categories,
    activeCategory,
    onCategoryChange,
}: FilterTabsProps) {
    const t = useTranslations("collections");
    const prefersReducedMotion = useReducedMotion();

    const allCategories = ["all", ...categories];

    return (
        <div className="w-full mb-6 md:mb-8 overflow-hidden">
            <div
                className="flex items-center justify-start overflow-x-auto scrollbar-hide snap-x mandatory px-4 pb-4 -mx-4 md:mx-0 pt-2 gap-3"
                style={{ scrollSnapType: "x mandatory" }}
                role="tablist"
                aria-label={t("filterAll")}
            >
                {allCategories.map((category) => {
                    const isActive = activeCategory === category;
                    const label = category === "all" ? t("filterAll") : category;

                    return (
                        <button
                            key={category}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls="product-grid"
                            onClick={() => onCategoryChange(category)}
                            className={`relative flex items-center justify-center min-w-max px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[11px] md:text-xs font-semibold tracking-widest uppercase transition-colors duration-300 snap-center outline-none focus-visible:ring-2 focus-visible:ring-lyore-accent focus-visible:ring-offset-2 ${isActive
                                ? "text-lyore-surface"
                                : "text-lyore-primary/70 border border-lyore-primary/20 hover:border-lyore-primary/50 hover:text-lyore-primary"
                                }`}
                        >
                            {/* Animated Background Indicator for Active Tab */}
                            {isActive && !prefersReducedMotion && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute inset-0 bg-lyore-primary rounded-full z-0"
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                    }}
                                />
                            )}

                            {/* Fallback for reduced motion or SSR */}
                            {(prefersReducedMotion || false) && isActive && (
                                <div className="absolute inset-0 bg-lyore-primary rounded-full z-0" />
                            )}

                            <span className="relative z-10">{label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
