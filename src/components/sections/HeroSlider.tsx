"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SLIDES_COUNT = 3;
const AUTO_PLAY_INTERVAL = 6000;

export function HeroSlider() {
    const t = useTranslations("hero");
    const locale = useLocale() as "ar" | "en";
    const isRtl = locale === "ar";
    const prefersReducedMotion = useReducedMotion();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Resets and restarts the auto-play timer
    const resetTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES_COUNT);
        }, AUTO_PLAY_INTERVAL);
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
        if (timerRef.current) clearInterval(timerRef.current);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        resetTimer();
    }, [resetTimer]);

    useEffect(() => {
        if (prefersReducedMotion) {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }
        resetTimer();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [resetTimer, prefersReducedMotion]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        if (!prefersReducedMotion) resetTimer();
    };
    const slideKeys = ["slide1", "slide2", "slide3"] as const;

    // Floating animation configuration
    const floatAnimation = prefersReducedMotion ? {} : {
        y: ["-3%", "3%", "-3%"],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut" as const
        }
    };

    const particleAnimation1 = prefersReducedMotion ? {} : {
        y: ["-10px", "15px", "-10px"],
        rotate: [0, 45, 0],
        transition: { duration: 7, repeat: Infinity, ease: "easeInOut" as const }
    };

    const particleAnimation2 = prefersReducedMotion ? {} : {
        y: ["15px", "-10px", "15px"],
        rotate: [0, -45, 0],
        transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const }
    };

    return (
        <section
            className="relative min-h-[100dvh] w-full overflow-hidden bg-lyore-background flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* 
                Massive Curved Background Shape (from reference) 
                Positioned on the opposite side of the text.
            */}
            <div
                className={`absolute top-0 bottom-0 w-[150%] lg:w-[65%] rounded-full bg-lyore-primary/5 transition-transform duration-1000 ${isRtl ? 'right-[-50%] lg:right-[-15%] translate-x-1/4' : 'left-[-50%] lg:left-[-15%] -translate-x-1/4'
                    }`}
                style={{
                    width: '150vh',
                    height: '150vh',
                    top: '50%',
                    transform: `translate(${isRtl ? '20%' : '-20%'}, -50%)`,
                }}
            />

            <div className="container relative z-10 mx-auto px-6 lg:px-12 h-full grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 py-24 md:py-32">

                {/* LEFT COLUMN: Content (Text & CTA) */}
                <div className="flex flex-col justify-center space-y-6 md:space-y-8 z-20 order-2 md:order-none">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`text-${currentSlide}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                            className={`flex flex-col gap-4 md:gap-6 ${isRtl ? 'text-right items-end' : 'text-left items-start'}`}
                        >
                            <h1
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-lyore-primary leading-tight drop-shadow-sm tracking-tight"
                                style={{ fontFamily: "var(--font-heading-ar, var(--font-heading-en))" }}
                            >
                                {t(`${slideKeys[currentSlide]}.title`)}
                            </h1>

                            <p
                                className="text-base sm:text-lg md:text-xl text-lyore-text/70 max-w-lg leading-relaxed font-light"
                                style={{ fontFamily: "var(--font-body-ar, var(--font-body-en))" }}
                            >
                                {t(`${slideKeys[currentSlide]}.subtitle`)}
                            </p>

                            <div className="pt-2 md:pt-4">
                                <Link
                                    href="/collections"
                                    className="inline-flex items-center justify-center bg-lyore-primary text-white hover:bg-lyore-accent transition-all duration-300 px-8 py-3 md:px-10 md:py-4 rounded-xl font-bold uppercase tracking-widest text-xs md:text-sm shadow-[0_8px_30px_rgba(85,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(201,169,110,0.4)] hover:-translate-y-1 active:scale-95"
                                >
                                    {t(`${slideKeys[currentSlide]}.cta`)}
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* RIGHT COLUMN: Image & Floating Elements */}
                <div className={`relative h-[45vh] md:h-[70vh] lg:h-[80vh] w-full flex items-center z-10 order-1 md:order-none ${isRtl ? 'md:justify-start' : 'md:justify-end'} justify-center`}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`image-${currentSlide}`}
                            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, rotate: isRtl ? -5 : 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                            className="relative w-full md:w-[120%] h-full drop-shadow-2xl"
                        >
                            <motion.div
                                className={`w-full h-full relative flex items-center ${isRtl ? 'justify-start' : 'justify-end'} justify-center`}
                                animate={floatAnimation}
                            >
                                {/* Main Image */}
                                <Image
                                    src={`/images/hero/slide-${currentSlide + 1}.png`}
                                    alt={t(`${slideKeys[currentSlide]}.title`)}
                                    width={800}
                                    height={1000}
                                    className="object-contain w-auto h-full max-h-[90%] lg:max-h-full"
                                    priority
                                />

                                {/* Floating Particles */}
                                <motion.div animate={particleAnimation1} className={`absolute top-[10%] ${isRtl ? 'right-[20%]' : 'left-[20%]'} w-4 h-4 md:w-5 md:h-5 rounded-full bg-lyore-accent/60 blur-[1px]`} />
                                <motion.div animate={particleAnimation2} className={`absolute bottom-[20%] ${isRtl ? 'left-[10%]' : 'right-[10%]'} w-5 h-5 md:w-8 md:h-8 rotate-45 bg-lyore-primary/40`} />
                                <motion.div animate={particleAnimation1} className={`absolute top-[40%] ${isRtl ? 'left-[5%]' : 'right-[5%]'} w-3 h-3 md:w-4 md:h-4 rounded-full bg-lyore-accent`} />
                                <motion.div animate={particleAnimation2} className={`absolute bottom-[10%] ${isRtl ? 'right-[30%]' : 'left-[30%]'} w-4 h-4 md:w-6 md:h-6 bg-lyore-primary/20 rotate-12`} />
                                <motion.div animate={particleAnimation1} className={`absolute top-[70%] ${isRtl ? 'right-[5%]' : 'left-[5%]'} w-0 h-0 border-l-[6px] md:border-l-[10px] border-l-transparent border-r-[6px] md:border-r-[10px] border-r-transparent border-b-[10px] md:border-b-[18px] border-b-lyore-accent/50 rotate-[-25deg]`} />
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Dots Navigation (Classic Slider Style) */}
            <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center items-center gap-3">
                {Array.from({ length: SLIDES_COUNT }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentSlide
                            ? "w-6 h-2 bg-lyore-primary"
                            : "w-2 h-2 bg-lyore-primary/20 hover:bg-lyore-primary/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === currentSlide ? "true" : "false"}
                    />
                ))}
            </div>
        </section>
    );
}
