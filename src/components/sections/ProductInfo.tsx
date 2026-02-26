"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Product, ProductColor } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Check } from "lucide-react";
import { WhatsAppOrderButton } from "@/components/sections/WhatsAppOrderButton";
import { WhatsAppFallbackModal } from "@/components/sections/WhatsAppFallbackModal";

interface ProductInfoProps {
    product: Product;
    locale: "ar" | "en";
}

export function ProductInfo({ product, locale }: ProductInfoProps) {
    const t = useTranslations("product");
    const prefersReducedMotion = useReducedMotion();

    // Selection States
    const [selectedSize, setSelectedSize] = useState<string | null>(
        product.sizes.length === 1 ? product.sizes[0] : null
    );
    const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
        product.colors.length === 1 ? product.colors[0] : null
    );

    // Validation States (T019)
    const [sizeError, setSizeError] = useState(false);
    const [colorError, setColorError] = useState(false);

    // Fallback Modal State (T022)
    const [fallbackOpen, setFallbackOpen] = useState(false);
    const [fallbackMessage, setFallbackMessage] = useState("");

    // Clear errors on selection
    useEffect(() => { if (selectedSize) setSizeError(false); }, [selectedSize]);
    useEffect(() => { if (selectedColor) setColorError(false); }, [selectedColor]);

    // Validation fail callback — sets both errors (T019 + T023)
    const handleValidationFail = () => {
        if (!selectedSize && product.sizes.length > 1) setSizeError(true);
        if (!selectedColor && product.colors.length > 1) setColorError(true);
    };

    // Fallback callback — opens modal (T022 + T023)
    const handleFallback = (messageText: string) => {
        setFallbackMessage(messageText);
        setFallbackOpen(true);
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as const }
        }
    };

    return (
        <>
            <motion.div
                className="flex flex-col gap-6"
                initial="hidden"
                animate="visible"
                variants={prefersReducedMotion ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : contentVariants}
            >
                {/* Header: Category Badge, Title, Price */}
                <div className="flex flex-col gap-4 border-b border-lyore-primary/10 pb-6">
                    <div className="flex items-center">
                        <span className="bg-lyore-primary text-white text-[10px] md:text-xs font-bold uppercase tracking-widest leading-none py-1.5 px-3 rounded shadow-sm">
                            {product.category[locale]}
                        </span>
                    </div>

                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-lyore-text tracking-wide leading-tight">
                        {product.name[locale]}
                    </h1>

                    <div className="flex items-center gap-2 font-medium">
                        <span className="text-xl md:text-2xl font-semibold text-[#C9A96E] tracking-wide">
                            {product.price}
                        </span>
                        <span className="text-sm uppercase tracking-widest text-[#C9A96E]/80 mt-1">
                            {product.currency[locale]}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <div className="prose prose-sm md:prose-base prose-neutral max-w-none">
                    <p className="text-lyore-text/80 leading-relaxed font-light">
                        {product.description[locale]}
                    </p>
                </div>

                {/* Selectors + Buttons Section */}
                <div className="border-t border-lyore-primary/10 pt-6 mt-2 flex flex-col gap-8">

                    {/* Size Selector (T017) */}
                    <div className="flex flex-col gap-3">
                        <span className="text-sm font-semibold uppercase tracking-wider text-lyore-text">
                            {t("selectSize")}
                        </span>

                        <div className="flex flex-wrap gap-3" role="radiogroup" aria-label={t("selectSize")}>
                            {product.sizes.map((size) => {
                                const isSelected = selectedSize === size;
                                return (
                                    <button
                                        key={`size-${size}`}
                                        role="radio"
                                        aria-checked={isSelected}
                                        onClick={() => setSelectedSize(size)}
                                        className={`
                                            relative flex items-center justify-center min-w-[3rem] h-12 px-4
                                            border rounded-md text-sm font-medium tracking-wide transition-all duration-200
                                            focus:outline-none focus:ring-2 focus:ring-lyore-primary focus:ring-offset-2
                                            ${isSelected
                                                ? "border-lyore-primary bg-lyore-primary text-white shadow-sm"
                                                : "border-lyore-primary/20 bg-transparent text-lyore-text hover:border-lyore-primary/60 hover:bg-lyore-surface"
                                            }
                                        `}
                                    >
                                        {size}
                                    </button>
                                );
                            })}
                        </div>

                        <AnimatePresence>
                            {sizeError && (
                                <motion.span
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-500 text-xs font-medium tracking-wide"
                                    aria-live="polite"
                                >
                                    {t("errorSelectSize")}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Color Selector (T018) */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold uppercase tracking-wider text-lyore-text">
                                {t("selectColor")}
                            </span>
                            {selectedColor && (
                                <span className="text-sm text-lyore-text/60">— {selectedColor.name}</span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-3" role="radiogroup" aria-label={t("selectColor")}>
                            {product.colors.map((color) => {
                                const isSelected = selectedColor?.name === color.name;
                                const isLightColor = ["#ffffff", "#fff", "#fafafa"].includes(color.hex.toLowerCase());
                                return (
                                    <button
                                        key={`color-${color.name}`}
                                        role="radio"
                                        aria-checked={isSelected}
                                        aria-label={color.name}
                                        onClick={() => setSelectedColor(color)}
                                        className={`
                                            relative flex items-center justify-center w-10 h-10 rounded-full
                                            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lyore-primary focus:ring-offset-2
                                            ${isSelected ? "ring-2 ring-lyore-primary ring-offset-2 scale-110" : "ring-1 ring-black/10 hover:scale-105"}
                                        `}
                                        style={{ backgroundColor: color.hex }}
                                    >
                                        {isSelected && (
                                            <Check
                                                size={16}
                                                className={isLightColor ? "text-lyore-text" : "text-white"}
                                                strokeWidth={3}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <AnimatePresence>
                            {colorError && (
                                <motion.span
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-500 text-xs font-medium tracking-wide"
                                    aria-live="polite"
                                >
                                    {t("errorSelectColor")}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* WhatsApp Buttons (T023) */}
                    <WhatsAppOrderButton
                        product={product}
                        locale={locale}
                        selectedSize={selectedSize}
                        selectedColor={selectedColor}
                        onValidationFail={handleValidationFail}
                        onFallback={handleFallback}
                    />

                </div>
            </motion.div>

            {/* Fallback Modal – rendered outside main motion.div to avoid stacking context issues */}
            <WhatsAppFallbackModal
                isOpen={fallbackOpen}
                onClose={() => setFallbackOpen(false)}
                messageText={fallbackMessage}
            />
        </>
    );
}
