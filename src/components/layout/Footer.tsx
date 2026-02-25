import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/navigation";
import { IconBrandWhatsapp, IconMail } from "@tabler/icons-react";

export function Footer() {
    const t = useTranslations();

    return (
        <footer className="relative mt-auto bg-[#0A0A0A] text-white pt-20 pb-10 overflow-hidden">
            {/* Top Decorative Border */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-50" />

            {/* Background Texture/Shimmer (Optional) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.05)_0%,transparent_60%)] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">

                    {/* Brand Section (Wider column on desktop) */}
                    <div className="flex flex-col gap-8 lg:col-span-4">
                        <Link href="/" className="flex flex-col items-start gap-4 w-max group">
                            <div className="relative h-14 w-40 transition-transform duration-500 overflow-hidden">
                                <Image
                                    src="/images/white logo.png"
                                    alt="LYORE ABAYA"
                                    fill
                                    className="object-contain"
                                    priority={false}
                                />
                            </div>
                        </Link>
                        <p
                            className="text-[15px] font-light leading-[1.8] text-white/70 max-w-sm"
                            style={{ fontFamily: "var(--font-body-ar, var(--font-body-en))" }}
                        >
                            {t("footer.tagline")}
                        </p>

                        {/* Social Media Links */}
                        <div className="flex items-center gap-4 mt-2">
                            {SOCIAL_LINKS.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative group flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/80 transition-all duration-300 hover:bg-[#C9A96E] hover:border-[#C9A96E] hover:text-black hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(201,169,110,0.3)]"
                                        aria-label={t(social.labelKey)}
                                    >
                                        <Icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-6 lg:col-span-3 lg:col-start-6">
                        <h3 className="text-sm font-bold tracking-[0.2em] text-[#C9A96E] uppercase relative pb-4 inline-block">
                            {t("footer.quickLinks")}
                            <span className="absolute bottom-0 start-0 w-8 h-[2px] bg-[#C9A96E]" />
                        </h3>
                        <nav className="flex flex-col gap-4 mt-2">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="group flex items-center gap-2 text-[15px] font-light text-white/70 transition-colors hover:text-white w-max"
                                >
                                    <span className="w-0 h-[1px] bg-[#C9A96E] transition-all duration-300 group-hover:w-4" />
                                    {t(link.labelKey)}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-6 lg:col-span-4">
                        <h3 className="text-sm font-bold tracking-[0.2em] text-[#C9A96E] uppercase relative pb-4 inline-block">
                            {t("footer.contactTitle")}
                            <span className="absolute bottom-0 start-0 w-8 h-[2px] bg-[#C9A96E]" />
                        </h3>
                        <div className="flex flex-col gap-5 mt-2">
                            <a
                                href={CONTACT_INFO.whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 bg-white/5 border border-white/10 rounded-lg p-4 transition-all duration-300 hover:bg-white/10 hover:border-[#25D366]/50"
                                aria-label={t("contact.whatsapp")}
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] transition-transform duration-300 group-hover:scale-110">
                                    <IconBrandWhatsapp size={18} stroke={1.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] uppercase tracking-wider text-white/50">{t("contact.whatsapp")}</span>
                                    <span className="text-sm font-medium text-white/90 mt-0.5 tracking-wider" dir="ltr">{CONTACT_INFO.phone}</span>
                                </div>
                            </a>

                            <a
                                href={`mailto:${CONTACT_INFO.email}`}
                                className="group flex items-center gap-4 bg-white/5 border border-white/10 rounded-lg p-4 transition-all duration-300 hover:bg-white/10 hover:border-[#C9A96E]/50"
                                aria-label={t("contact.email")}
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C9A96E]/10 text-[#C9A96E] transition-transform duration-300 group-hover:scale-110">
                                    <IconMail size={18} stroke={1.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] uppercase tracking-wider text-white/50">{t("contact.email")}</span>
                                    <span className="text-sm font-medium text-white/90 mt-0.5">{CONTACT_INFO.email}</span>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="mt-20 pt-8 border-t border-white/10 flex items-center justify-center">
                    <p className="text-[13px] font-light text-white/50 tracking-wide text-center">
                        {t("footer.rights")}
                    </p>
                </div>
            </div>
        </footer>
    );
}

