"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence, useScroll, useTransform, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SLIDES_COUNT = 3;
const AUTO_PLAY_INTERVAL = 5000;

export function HeroSlider() {
    const t = useTranslations("hero");
    const locale = useLocale() as "ar" | "en";
    const isRtl = locale === "ar";
    const prefersReducedMotion = useReducedMotion();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Parallax logic: 
    // Image starts slightly higher (-15% top height) and moves down smoothly to avoid gaps.
    const { scrollYProgress } = useScroll({
        offset: ["start start", "end start"],
    });

    // Move image down by 15% of its own height as container scrolls out of view.
    const yTransform = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const backgroundY = prefersReducedMotion ? "0%" : yTransform;

    // Resets and restarts the auto-play timer
    const resetTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setDirection(1);
            setCurrentSlide((prev) => (prev + 1) % SLIDES_COUNT);
        }, AUTO_PLAY_INTERVAL);
    }, []);

    useEffect(() => {
        resetTimer();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [resetTimer]);

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentSlide((prev) => (prev + newDirection + SLIDES_COUNT) % SLIDES_COUNT);
        resetTimer();
    };

    const goToSlide = (index: number) => {
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
        resetTimer();
    };

    const handleNext = () => paginate(1);
    const handlePrev = () => paginate(-1);

    // Slide Transition Variants
    const slideVariants = {
        enter: (dir: number) => ({
            x: prefersReducedMotion ? 0 : (isRtl ? -dir * 100 : dir * 100) + "%",
            opacity: prefersReducedMotion ? 0 : 1,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: prefersReducedMotion ? 0 : (isRtl ? dir * 100 : -dir * 100) + "%",
            opacity: prefersReducedMotion ? 0 : 1,
        }),
    };

    // Text Transition Variants
    const textVariants: Variants = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } },
        exit: { opacity: 0, y: prefersReducedMotion ? 0 : -20, transition: { duration: 0.3 } },
    };

    // Keys mapping to messages/*.json
    const slideKeys = ["slide1", "slide2", "slide3"] as const;

    return (
        <section className="relative h-[100dvh] w-full overflow-hidden bg-lyore-background">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.5 },
                    }}
                    className="absolute inset-0 h-full w-full"
                >
                    {/* Background Parallax Layer */}
                    <motion.div
                        className="absolute inset-x-0 -top-[15%] h-[115%] w-full"
                        style={{ y: backgroundY }}
                    >
                        <Image
                            src={`/images/hero/slide-${currentSlide + 1}.png`}
                            alt={t(`${slideKeys[currentSlide]}.title`)}
                            fill
                            priority={currentSlide === 0}
                            className="object-cover"
                            sizes="100vw"
                        />
                        {/* Overlay to ensure text readability */}
                        <div className="absolute inset-0 bg-black/40" />
                    </motion.div>

                    {/* Text Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 text-center">
                        <motion.div
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex max-w-4xl flex-col items-center gap-6 md:gap-8"
                        >
                            <h1
                                className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl text-balance drop-shadow-md"
                                style={{ fontFamily: "var(--font-heading-ar, var(--font-heading-en))" }}
                            >
                                {t(`${slideKeys[currentSlide]}.title`)}
                            </h1>
                            <p
                                className="text-lg text-white/90 sm:text-xl md:text-2xl text-balance drop-shadow-sm max-w-2xl"
                                style={{ fontFamily: "var(--font-body-ar, var(--font-body-en))" }}
                            >
                                {t(`${slideKeys[currentSlide]}.subtitle`)}
                            </p>
                            <Link
                                href="/collections"
                                className="mt-4 flex items-center justify-center border border-white/50 bg-white/10 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95"
                            >
                                {t(`${slideKeys[currentSlide]}.cta`)}
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8 z-10 pointer-events-none">
                <button
                    onClick={handlePrev}
                    className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110 active:scale-95"
                    aria-label="Previous Slide"
                >
                    {isRtl ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
                </button>
                <button
                    onClick={handleNext}
                    className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110 active:scale-95"
                    aria-label="Next Slide"
                >
                    {isRtl ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                </button>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {Array.from({ length: SLIDES_COUNT }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-lyore-accent" : "w-2.5 bg-white/50 hover:bg-white/80"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === currentSlide ? "true" : "false"}
                    />
                ))}
            </div>
        </section>
    );
}
