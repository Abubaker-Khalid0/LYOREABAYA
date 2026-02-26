"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { getRelatedProducts } from "@/lib/products";
import { ProductCard } from "@/components/sections/ProductCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RelatedProductsProps {
    currentProduct: Product;
    allProducts: Product[];
    locale: "ar" | "en";
}

/**
 * RelatedProducts Component (T027 / US6)
 * Displays 3 related products below the product details using getRelatedProducts()
 * with multi-tier fallback: same category → collectionTags → featured → newest.
 * Stagger reveal animation via Framer Motion.
 */
export function RelatedProducts({ currentProduct, allProducts, locale }: RelatedProductsProps) {
    const t = useTranslations("product");
    const prefersReducedMotion = useReducedMotion();

    const related = getRelatedProducts(currentProduct, allProducts, 3);

    if (related.length === 0) return null;

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.12,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as const }
        }
    };

    const staticVariants = {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="mt-20 border-t border-lyore-primary/10 pt-16">
            {/* Section Heading */}
            <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
                className="mb-12 flex flex-col items-center text-center"
            >
                <h2
                    className="text-3xl font-light tracking-widest text-lyore-primary sm:text-4xl"
                    style={{ fontFamily: "var(--font-heading-ar, var(--font-heading-en))" }}
                >
                    {t("relatedProducts")}
                </h2>
                <div className="mt-4 h-0.5 w-16 bg-lyore-accent/60" />
            </motion.div>

            {/* Products Grid: 1 col mobile → 3 cols desktop */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={containerVariants}
            >
                {related.map((product) => (
                    <motion.div
                        key={product.id}
                        variants={prefersReducedMotion ? staticVariants : itemVariants}
                    >
                        <ProductCard
                            product={product}
                            hideQuickView={false}
                            hideWhatsApp={false}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
