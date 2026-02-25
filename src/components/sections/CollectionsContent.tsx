"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { products } from "@/data/products";
import { CollectionsHero } from "./CollectionsHero";
import { FilterTabs } from "./FilterTabs";
import { ProductGrid } from "./ProductGrid";

type Props = {
    locale: string;
};

export function CollectionsContent({ locale }: Props) {
    const t = useTranslations("collections");
    const [activeCategory, setActiveCategory] = useState<string>("all");

    // Reset filter to "all" on mount (no state persistence per spec)
    useEffect(() => {
        setActiveCategory("all");
    }, []);

    // Extract unique categories from products using the locale key
    const localeKey = locale === "ar" ? "ar" : "en";
    const categories = Array.from(
        new Set(products.map((p) => p.category[localeKey]))
    );

    // Filter products based on active category
    const filteredProducts =
        activeCategory === "all"
            ? products
            : products.filter((p) => p.category[localeKey] === activeCategory);

    return (
        <div className="min-h-screen bg-lyore-background text-lyore-text">
            {/* Header Section */}
            <CollectionsHero />

            <div className="py-16 md:py-24 px-4 md:px-6 lg:px-8 w-full max-w-[1600px] mx-auto">
                {/* Category Filters */}
                <FilterTabs
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />

                {/* Product Grid */}
                <ProductGrid products={filteredProducts} />
            </div>
        </div>
    );
}
