"use client";

import { useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu } from "lucide-react";
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
        // Transition to solid ONLY after scrolling past 100vh
        if (typeof window !== "undefined") {
            setIsScrolled(latest > window.innerHeight - 50); // slight buffer
        }
    });

    return (
        <>
            <motion.header
                className="fixed top-0 z-40 w-full"
                initial={{ backgroundColor: "rgba(85, 0, 0, 0)" }}
                animate={{
                    backgroundColor: isScrolled
                        ? "rgba(85, 0, 0, 1)" // --lyore-primary (#550000)
                        : "rgba(85, 0, 0, 0)", // transparent
                }}
                transition={{
                    duration: prefersReducedMotion ? 0 : 0.3,
                }}
            >
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                    {/* Logo (Start Side) */}
                    <Link href="/" className="flex items-center gap-2 z-50">
                        <div className="relative h-10 w-10">
                            {/* Fallback handled by alt text if svg is missing */}
                            <Image
                                src="/logo.svg"
                                alt="LYORE ABAYA"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="text-2xl font-bold tracking-widest text-lyore-surface">
                            LYORE
                        </span>
                    </Link>

                    {/* Desktop Navigation (End Side) */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={isActive ? "page" : undefined}
                                    className="text-sm font-medium tracking-wide text-lyore-surface/90 transition-colors hover:text-lyore-surface"
                                >
                                    {t(link.labelKey)}
                                </Link>
                            );
                        })}
                        <div className="h-4 w-px bg-lyore-surface/30 mx-2" />
                        <LanguageSwitcher />
                    </nav>

                    {/* Mobile Hamburger (End Side) */}
                    <button
                        className="md:hidden text-lyore-surface p-2 -me-2"
                        onClick={() => setIsDrawerOpen(true)}
                        aria-label="Open menu"
                        aria-expanded={isDrawerOpen}
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </motion.header>

            <MobileDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </>
    );
}
