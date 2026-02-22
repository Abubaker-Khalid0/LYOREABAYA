import { Instagram, MessageCircle, Ghost } from "lucide-react";

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
        url: "https://instagram.com/lyoreabaya",
        labelKey: "contact.instagram",
        icon: Instagram,
    },
    {
        platform: "tiktok",
        url: "https://tiktok.com/@lyoreabaya",
        labelKey: "contact.tiktok",
        icon: MessageCircle, // Using MessageCircle as a close approximation for TikTok if custom icon isn't available
    },
    {
        platform: "snapchat",
        url: "https://snapchat.com/add/lyoreabaya",
        labelKey: "contact.snapchat",
        icon: Ghost, // Using Ghost as a close approximation for Snapchat
    },
];

export const CONTACT_INFO: ContactInfo = {
    whatsappUrl: "https://wa.me/971502507859",
    phone: "+971 50 250 7859",
    email: "info@lyoreabaya.com", // Fallback email, to be confirmed
};
