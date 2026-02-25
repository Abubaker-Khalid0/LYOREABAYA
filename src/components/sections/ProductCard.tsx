"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Product } from "@/data/products";
import { generateWhatsAppUrlFromProduct } from "@/lib/whatsapp";
interface ProductCardProps {
    product: Product;
    hideQuickView?: boolean;
    hideWhatsApp?: boolean;
}

/**
 * Reusable Product Card component.
 * Features:
 * - 3:4 Aspect ratio image with luxury hover zoom.
 * - Animation is parent-controlled (wrap in motion.div with variants for stagger).
 * - WhatsApp order integration.
 * - Localized names, prices and labels.
 */
export function ProductCard({ product, hideQuickView = false, hideWhatsApp = false }: ProductCardProps) {
    const locale = useLocale() as "ar" | "en";
    const t = useTranslations("product");
    const whatsappUrl = generateWhatsAppUrlFromProduct(product, locale);

    return (
        <div
            className="group relative flex flex-col bg-white p-3 md:p-4 rounded-xl shadow-[0_2px_8px_rgba(85,0,0,0.08),0_4px_16px_rgba(85,0,0,0.04)] transition-all duration-400 ease-[cubic-bezier(0.33,1,0.68,1)] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(85,0,0,0.16),0_20px_48px_rgba(85,0,0,0.12),0_0_40px_rgba(201,169,110,0.25)] ring-1 ring-lyore-primary/5"
        >
            <Link
                href={`/products/${product.slug}`}
                className="relative block aspect-[3/4] overflow-hidden bg-lyore-surface rounded-lg"
            >
                {/* Featured Badge */}
                {product.featured && (
                    <div className="absolute top-3 end-3 z-30">
                        <span className="bg-[#8B6E41] py-1 px-2.5 rounded shadow-md text-white text-[10px] md:text-[11px] font-bold uppercase tracking-widest leading-none flex items-center justify-center">
                            {t('featured')}
                        </span>
                    </div>
                )}
                <motion.div
                    className="relative h-full w-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                >
                    <Image
                        src={product.images[0] ?? "/images/placeholder-product.webp"}
                        alt={product.name[locale]}
                        fill
                        className={`object-cover ${product.images[1] ? "transition-opacity duration-700 ease-in-out group-hover:opacity-0" : ""}`}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    {product.images[1] && (
                        <Image
                            src={product.images[1]}
                            alt={`${product.name[locale]} - Alternate View`}
                            fill
                            className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                    )}
                </motion.div>

                {/* Category Badge */}
                <div className="absolute top-3 start-3 z-10 flex h-[24px] md:h-[26px]">
                    <span className="bg-white/95 backdrop-blur-sm text-lyore-primary text-[10px] md:text-[11px] font-bold uppercase tracking-widest leading-none flex items-center justify-center py-1 px-2.5 rounded shadow-sm border border-lyore-primary/10 h-full">
                        {product.category[locale]}
                    </span>
                </div>

                {/* Hover Quick View Overlay Gradient */}
                {!hideQuickView && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-400 group-hover:opacity-100 flex items-end justify-center pb-6">
                        <span className="translate-y-4 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 text-white text-xs uppercase tracking-widest border border-white/30 px-6 py-2 bg-white/10 backdrop-blur-md hover:bg-white hover:text-lyore-primary text-shadow-light">
                            Quick View
                        </span>
                    </div>
                )}
            </Link>

            {/* Product Details */}
            <div className="flex flex-col flex-1 pt-4 gap-2">
                <Link
                    href={`/products/${product.slug}`}
                    className="flex flex-col gap-1 flex-1"
                >
                    <h3 className="text-sm md:text-base font-light tracking-wide text-lyore-text group-hover:text-lyore-primary transition-colors line-clamp-1 mt-1">
                        {product.name[locale]}
                    </h3>
                    <div className="flex items-center gap-1.5 font-medium mt-1">
                        <span className="text-sm font-semibold text-[#C9A96E] tracking-wide">{product.price}</span>
                        <span className="text-[10px] uppercase tracking-widest text-[#C9A96E]/80">{product.currency[locale]}</span>
                    </div>
                </Link>

                {/* Actions: View Details & WhatsApp */}
                <div className="mt-3 flex gap-2">
                    <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 flex items-center justify-center gap-2 border border-lyore-primary/20 bg-transparent py-2.5 min-h-[40px] rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-widest text-lyore-primary transition-all duration-300 hover:border-lyore-primary hover:bg-lyore-primary hover:text-lyore-surface hover:shadow-button-primary-hover active:scale-[0.98]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {t("viewDetails")}
                    </Link>

                    {!hideWhatsApp && (
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center aspect-square min-h-[40px] px-3 border border-[#25D366]/30 bg-[#25D366]/5 rounded-lg text-[#25D366] transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-[0_4px_12px_rgba(37,211,102,0.3)] hover:-translate-y-0.5 active:scale-95"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="Order via WhatsApp"
                        >
                            <IconBrandWhatsapp size={20} stroke={2} />
                        </a>
                    )}
                </div>
            </div>
        </div >
    );
}
