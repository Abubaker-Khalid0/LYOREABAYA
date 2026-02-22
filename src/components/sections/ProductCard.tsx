"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Product } from "@/data/products";
import { generateWhatsAppUrlFromProduct } from "@/lib/whatsapp";

interface ProductCardProps {
    product: Product;
}

/**
 * Reusable Product Card component.
 * Features:
 * - 3:4 Aspect ratio image with luxury hover zoom.
 * - Animation is parent-controlled (wrap in motion.div with variants for stagger).
 * - WhatsApp order integration.
 * - Localized names, prices and labels.
 */
export function ProductCard({ product }: ProductCardProps) {
    const locale = useLocale() as "ar" | "en";
    const t = useTranslations("product");

    const whatsappUrl = generateWhatsAppUrlFromProduct(product, locale);

    return (
        <div
            className="group relative flex flex-col overflow-hidden bg-lyore-surface"
        >
            {/* Image Container with 3:4 Aspect Ratio */}
            <Link
                href={`/products/${product.slug}`}
                className="relative block aspect-[3/4] overflow-hidden"
            >
                <motion.div
                    className="relative h-full w-full"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                >
                    <Image
                        src={product.images[0]}
                        alt={product.name[locale]}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                </motion.div>

                {/* Category Badge */}
                <div className="absolute top-3 start-3">
                    <span className="bg-lyore-primary/80 backdrop-blur-sm text-lyore-surface text-[10px] uppercase tracking-widest px-2 py-1 font-medium">
                        {product.category[locale]}
                    </span>
                </div>
            </Link>

            {/* Product Details */}
            <div className="flex flex-col flex-1 p-4 gap-2">
                <Link
                    href={`/products/${product.slug}`}
                    className="flex flex-col gap-1 flex-1"
                >
                    <h3 className="text-sm font-medium text-lyore-text group-hover:text-lyore-primary transition-colors">
                        {product.name[locale]}
                    </h3>
                    <div className="flex items-center gap-1 text-lyore-accent font-semibold tracking-wide">
                        <span className="text-sm">{product.price}</span>
                        <span className="text-xs uppercase">{product.currency[locale]}</span>
                    </div>
                </Link>

                {/* WhatsApp Order Button */}
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-2 border border-lyore-primary/20 py-2.5 text-xs font-bold uppercase tracking-widest text-lyore-primary transition-all hover:bg-lyore-primary hover:text-lyore-surface"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Phone size={14} className="fill-current" />
                    {t("orderNow")}
                </a>
            </div>
        </div>
    );
}
