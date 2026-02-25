"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { NAV_LINKS } from "@/lib/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileDrawer } from "./MobileDrawer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Navbar() {
    const t = useTranslations();
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const prefersReducedMotion = useReducedMotion();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (typeof window !== "undefined") {
            setIsScrolled(latest > 50); // Becomes solid faster for better UX
        }
    });

    // Split links for center-logo desktop layout
    const leftLinks = NAV_LINKS.slice(0, Math.ceil(NAV_LINKS.length / 2));
    const rightLinks = NAV_LINKS.slice(Math.ceil(NAV_LINKS.length / 2));

    // Determine if the current page has a dark hero banner at the top
    const isDarkHeroPage = pathname.includes('/collections');

    // Dynamic text colors based on scroll state and page context
    const useLightText = isScrolled || isDarkHeroPage;
    const textColorClass = useLightText ? "text-lyore-surface" : "text-lyore-primary";
    const textMutedClass = useLightText ? "text-lyore-surface/90 font-light" : "text-lyore-primary/80 font-medium";
    const activeTextClass = "text-lyore-accent font-medium";

    return (
        <>
            <motion.header
                className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'border-b border-lyore-surface/10' : ''}`} initial={{ backgroundColor: "rgba(0, 0, 0, 0)", backdropFilter: "blur(0px)" }}
                animate={{
                    backgroundColor: isScrolled
                        ? "rgba(85, 0, 0, 0.9)" // Deep Lyore Maroon
                        : "rgba(0, 0, 0, 0)", // Transparent at top
                    backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)" // Glassmorphism
                }}
                transition={{
                    duration: prefersReducedMotion ? 0 : 0.4,
                    ease: [0.33, 1, 0.68, 1]
                }}
            >
                {/* 
                    Top small strip for language/announcements (optional, keeping it minimal)
                    Main Navbar below 
                */}
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">

                    {/* MOBILE LEFT: Hamburger */}
                    <div className="flex md:hidden w-1/3 justify-start">
                        <button
                            className={`p-2 -ms-2 hover:text-lyore-accent transition-colors ${textColorClass}`}
                            onClick={() => setIsDrawerOpen(true)}
                            aria-label={t("nav.openMenu")}
                            aria-expanded={isDrawerOpen}
                        >
                            <Menu strokeWidth={1.5} size={28} />
                        </button>
                    </div>

                    {/* DESKTOP LEFT: Navigation Links */}
                    <nav className="hidden md:flex w-1/3 items-center justify-start gap-8">
                        {leftLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`whitespace-nowrap text-sm uppercase tracking-[0.15em] transition-colors duration-300 hover:text-lyore-accent
                                        ${isActive ? activeTextClass : textMutedClass}
                                    `}
                                >
                                    {t(link.labelKey)}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* CENTER: Logo */}
                    <div className="flex w-1/3 justify-center">
                        <Link href="/" className="relative flex flex-col items-center justify-center p-2 group">
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-lyore-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className={`relative transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${isScrolled ? 'h-10 w-28 md:h-12 md:w-32' : 'h-14 w-36 md:h-16 md:w-40'}`}>
                                <div className="absolute inset-0 w-full h-full transition-opacity duration-300" style={{ opacity: useLightText ? 0 : 1 }}>
                                    <Image
                                        src="/images/logo.png"
                                        alt="LYORE ABAYA"
                                        fill
                                        className="object-contain mix-blend-multiply"
                                    />
                                </div>
                                <div className="absolute inset-0 w-full h-full transition-opacity duration-300" style={{ opacity: useLightText ? 1 : 0 }}>
                                    <Image
                                        src="/images/white%20logo.png"
                                        alt="LYORE ABAYA"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="sr-only">LYORE ABAYA</span>
                            </div>
                        </Link>
                    </div>

                    {/* DESKTOP RIGHT: Navigation Links + Tools */}
                    <nav className="hidden md:flex w-1/3 items-center justify-end gap-8">
                        {rightLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`whitespace-nowrap text-sm uppercase tracking-[0.15em] transition-colors duration-300 hover:text-lyore-accent
                                        ${isActive ? activeTextClass : textMutedClass}
                                    `}
                                >
                                    {t(link.labelKey)}
                                </Link>
                            );
                        })}

                        <div className={`flex items-center gap-4 border-s transition-colors duration-500 ps-6 ${isScrolled ? 'border-lyore-surface/20' : 'border-lyore-primary/20'}`}>
                            <div className="scale-90">
                                <LanguageSwitcher className={textColorClass} />
                            </div>
                        </div>
                    </nav>

                    {/* MOBILE RIGHT: Utility Icons */}
                    <div className="flex md:hidden w-1/3 justify-end items-center gap-4">
                        <LanguageSwitcher className={textColorClass} />
                    </div>

                </div>
            </motion.header>

            <MobileDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </>
    );
}
