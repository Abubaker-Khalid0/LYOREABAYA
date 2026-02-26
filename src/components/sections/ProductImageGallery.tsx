"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { X } from "lucide-react";

interface ProductImageGalleryProps {
    images: string[];
    productName: string;
}

/**
 * Product Image Gallery Component (T013, T014)
 * Handles main image, thumbnail selection, and a Framer Motion lightbox modal
 * with keyboard support (Escape to close).
 */
export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
    const t = useTranslations("product");
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    const displayImages = images.length > 0 ? images : ["/images/placeholder-product.svg"];

    // Handle Escape key to close lightbox (T014)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isLightboxOpen) {
                setIsLightboxOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isLightboxOpen]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isLightboxOpen]);

    const handleThumbnailClick = (index: number) => {
        setActiveIndex(index);
    };

    const handleMainImageClick = () => {
        setIsLightboxOpen(true);
    };

    // Animation variants obeying prefers-reduced-motion
    const fadeVariant = prefersReducedMotion
        ? { hidden: { opacity: 1 }, visible: { opacity: 1 }, exit: { opacity: 1 } }
        : { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };

    const scaleVariant = prefersReducedMotion
        ? { hidden: { scale: 1, opacity: 1 }, visible: { scale: 1, opacity: 1 }, exit: { scale: 1, opacity: 1 } }
        : { hidden: { scale: 0.95, opacity: 0 }, visible: { scale: 1, opacity: 1 }, exit: { scale: 0.95, opacity: 0 } };

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Main Image */}
            <div
                className="w-full sm:max-w-md md:max-w-lg lg:max-w-none mx-auto relative aspect-[3/4] bg-lyore-surface/50 rounded-xl overflow-hidden cursor-zoom-in group border border-lyore-primary/5 shadow-sm"
                onClick={handleMainImageClick}
                role="button"
                aria-label={t("clickToZoom")}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleMainImageClick();
                    }
                }}
            >
                <motion.div
                    key={activeIndex}
                    initial="hidden"
                    animate="visible"
                    variants={fadeVariant}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
                    className="w-full h-full"
                >
                    <Image
                        src={displayImages[activeIndex]}
                        alt={t("imageAlt", { index: activeIndex + 1, total: displayImages.length })}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={activeIndex === 0}
                    />
                </motion.div>

                {/* Image Counter Badge (Mobile) */}
                {displayImages.length > 1 && (
                    <div className="absolute bottom-4 end-4 bg-white/90 backdrop-blur-sm text-lyore-primary text-xs font-medium px-3 py-1.5 rounded-full shadow-sm md:hidden">
                        {activeIndex + 1} / {displayImages.length}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {displayImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x" role="tablist">
                    {displayImages.map((src, index) => (
                        <button
                            key={index}
                            role="tab"
                            aria-selected={activeIndex === index}
                            aria-label={t("thumbnailAlt", { index: index + 1 })}
                            onClick={() => handleThumbnailClick(index)}
                            className={`relative w-20 h-24 md:w-24 md:h-32 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 snap-start border-2 ${activeIndex === index
                                ? "border-[#C9A96E] ring-2 ring-[#C9A96E]/20 shadow-sm"
                                : "border-transparent hover:border-lyore-primary/30 opacity-70 hover:opacity-100"
                                }`}
                        >
                            <Image
                                src={src}
                                alt={t("thumbnailAlt", { index: index + 1 })}
                                fill
                                className="object-cover"
                                sizes="96px"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox Modal (T014) */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={fadeVariant}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10"
                        onClick={() => setIsLightboxOpen(false)}
                        role="dialog"
                        aria-modal="true"
                        aria-label={t("clickToZoom")}
                    >
                        {/* Close button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsLightboxOpen(false);
                            }}
                            className="absolute top-4 end-4 md:top-8 md:end-8 z-50 p-2 md:p-3 bg-white/10 hover:bg-white/25 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                            aria-label={t("closeLightbox")}
                        >
                            <X size={24} className="md:w-8 md:h-8" />
                        </button>

                        <motion.div
                            className="relative w-full h-full max-w-5xl rounded-lg overflow-hidden flex items-center justify-center"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={scaleVariant}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.33, 1, 0.68, 1] as const }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={displayImages[activeIndex]}
                                alt={t("imageAlt", { index: activeIndex + 1, total: displayImages.length })}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />
                        </motion.div>

                        {/* Lightbox Thumbnails */}
                        {displayImages.length > 1 && (
                            <div className="absolute bottom-6 start-1/2 -translate-x-1/2 flex items-center justify-center gap-2 md:gap-4 max-w-full overflow-x-auto px-4 z-50 scrollbar-none snap-x">
                                {displayImages.map((src, index) => (
                                    <button
                                        key={`lightbox-thumb-${index}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleThumbnailClick(index);
                                        }}
                                        className={`relative w-16 h-20 md:w-20 md:h-24 flex-shrink-0 snap-center rounded overflow-hidden transition-all duration-300 border-2 ${activeIndex === index
                                            ? "border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] ring-2 ring-white/50"
                                            : "border-transparent opacity-50 hover:opacity-100 ring-1 ring-white/20"
                                            }`}
                                    >
                                        <Image
                                            src={src}
                                            alt={t("thumbnailAlt", { index: index + 1 })}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
