"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
    className?: string;
    variant?: "default" | "drawer";
}

export function LanguageSwitcher({ className, variant = "default" }: LanguageSwitcherProps) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: "ar" | "en") => {
        if (newLocale === locale) return;
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div
            className={cn(
                "flex items-center gap-2 text-sm font-medium",
                variant === "drawer" ? "text-lg text-lyore-text" : (className ? "" : "text-lyore-surface"),
                className
            )}
        >
            <button
                type="button"
                className={cn(
                    "transition-opacity hover:opacity-100",
                    locale === "ar" ? "opacity-100 font-bold" : "opacity-70"
                )}
                onClick={() => switchLocale("ar")}
                aria-current={locale === "ar" ? "true" : "false"}
            >
                AR
            </button>
            <span className="opacity-50">|</span>
            <button
                type="button"
                className={cn(
                    "transition-opacity hover:opacity-100",
                    locale === "en" ? "opacity-100 font-bold" : "opacity-70"
                )}
                onClick={() => switchLocale("en")}
                aria-current={locale === "en" ? "true" : "false"}
            >
                EN
            </button>
        </div>
    );
}
