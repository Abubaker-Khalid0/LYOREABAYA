import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/navigation";
import { Phone, Mail } from "lucide-react";

export function Footer() {
    const t = useTranslations();

    return (
        <footer className="mt-auto border-t border-lyore-primary/10 bg-lyore-background py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand Section */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2 w-max">
                            <div className="relative h-12 w-12">
                                <Image
                                    src="/logo.svg"
                                    alt="LYORE ABAYA"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-2xl font-bold tracking-widest text-lyore-primary">
                                LYORE
                            </span>
                        </Link>
                        <p className="text-sm font-medium leading-relaxed text-lyore-text/80">
                            {t("footer.tagline")}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-bold tracking-wider text-lyore-primary uppercase">
                            {t("footer.quickLinks")}
                        </h3>
                        <nav className="flex flex-col gap-3">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-lyore-text/70 transition-colors hover:text-lyore-primary w-max"
                                >
                                    {t(link.labelKey)}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-bold tracking-wider text-lyore-primary uppercase">
                            {t("footer.contactTitle")}
                        </h3>
                        <div className="flex flex-col gap-3">
                            <a
                                href={CONTACT_INFO.whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-medium text-lyore-text/70 transition-colors hover:text-lyore-primary w-max"
                                aria-label={t("contact.whatsapp")}
                            >
                                <Phone size={16} />
                                <span dir="ltr">{CONTACT_INFO.phone}</span>
                            </a>
                            <a
                                href={`mailto:${CONTACT_INFO.email}`}
                                className="flex items-center gap-2 text-sm font-medium text-lyore-text/70 transition-colors hover:text-lyore-primary w-max"
                                aria-label={t("contact.email")}
                            >
                                <Mail size={16} />
                                <span>{CONTACT_INFO.email}</span>
                            </a>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-bold tracking-wider text-lyore-primary uppercase">
                            {t("footer.socialTitle")}
                        </h3>
                        <div className="flex items-center gap-4">
                            {SOCIAL_LINKS.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-lyore-primary/5 p-2.5 text-lyore-primary transition-colors hover:bg-lyore-primary hover:text-lyore-surface"
                                        aria-label={t(social.labelKey)}
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-lyore-primary/10 pt-8 sm:flex-row md:mt-16 text-center sm:text-start">
                    <p className="text-xs font-medium text-lyore-text/60">
                        {t("footer.rights")}
                    </p>
                </div>
            </div>
        </footer>
    );
}

