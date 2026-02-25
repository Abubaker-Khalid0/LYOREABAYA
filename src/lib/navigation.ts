import { IconBrandInstagram, IconBrandTiktok, IconBrandSnapchat } from "@tabler/icons-react";

export interface NavLink {
    labelKey: string;
    href: string;
}

export interface SocialLink {
    platform: string;
    url: string;
    labelKey: string;
    icon: React.ElementType;
}

export interface ContactInfo {
    whatsappUrl: string;
    phone: string;
    email: string;
}

export const NAV_LINKS: NavLink[] = [
    { labelKey: "nav.home", href: "/" },
    { labelKey: "nav.collections", href: "/collections" },
    { labelKey: "nav.sizeGuide", href: "/size-guide" },
    { labelKey: "nav.returns", href: "/returns" },
    { labelKey: "nav.contact", href: "/contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
    {
        platform: "instagram",
        url: "https://instagram.com/Lyore_abaya",
        labelKey: "contact.instagram",
        icon: IconBrandInstagram,
    },
    {
        platform: "tiktok",
        url: "https://tiktok.com/@Lyore.abaya",
        labelKey: "contact.tiktok",
        icon: IconBrandTiktok,
    },
    {
        platform: "snapchat",
        url: "https://snapchat.com/add/Lyoreabayas",
        labelKey: "contact.snapchat",
        icon: IconBrandSnapchat,
    },
];

export const CONTACT_INFO: ContactInfo = {
    whatsappUrl: "https://wa.me/971502507859",
    phone: "+971 50 250 7859",
    email: "Lyoreabaya@gmail.com",
};
