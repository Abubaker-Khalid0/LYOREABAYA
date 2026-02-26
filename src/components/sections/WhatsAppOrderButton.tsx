"use client";

import { useTranslations } from "next-intl";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { MessageCircle } from "lucide-react";
import { Product, ProductColor } from "@/data/products";
import {
    generateWhatsAppUrlFromProduct,
    generateInquiryUrlFromProduct,
    openWhatsApp,
    extractMessageFromUrl,
} from "@/lib/whatsapp";

interface WhatsAppOrderButtonProps {
    product: Product;
    locale: "ar" | "en";
    selectedSize: string | null;
    selectedColor: ProductColor | null;
    /** Called when validation fails — so parent can show inline errors */
    onValidationFail: () => void;
    /** Called when WhatsApp fails to open — so parent can show fallback modal */
    onFallback: (messageText: string) => void;
}

/**
 * WhatsApp Order Button Component (T020, T021)
 * Primary "Order Now" button validates size/color before opening WhatsApp.
 * Secondary "Inquire" button opens WhatsApp with simpler message, no validation.
 */
export function WhatsAppOrderButton({
    product,
    locale,
    selectedSize,
    selectedColor,
    onValidationFail,
    onFallback,
}: WhatsAppOrderButtonProps) {
    const t = useTranslations("product");

    // Primary: Order Now (T020)
    const handleOrder = () => {
        // Only require selections for options that exist on the product
        const needsSize = product.sizes.length > 0;
        const needsColor = product.colors.length > 0;

        const hasSize = !needsSize || !!selectedSize;
        const hasColor = !needsColor || !!selectedColor;

        if (!hasSize || !hasColor) {
            onValidationFail();
            return;
        }

        const url = generateWhatsAppUrlFromProduct(product, locale, {
            size: selectedSize ?? undefined,
            color: selectedColor?.name,
        });

        const result = openWhatsApp(url);

        if (!result.success) {
            const messageText = extractMessageFromUrl(url);
            onFallback(messageText);
        }
    };

    // Secondary: Inquire (T021)
    const handleInquire = () => {
        const url = generateInquiryUrlFromProduct(product, locale);
        const result = openWhatsApp(url);

        if (!result.success) {
            const messageText = extractMessageFromUrl(url);
            onFallback(messageText);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            {/* Primary: Order Now */}
            <button
                onClick={handleOrder}
                className="w-full flex items-center justify-center gap-3 bg-lyore-primary hover:bg-lyore-primary/90 text-white font-bold py-4 px-6 rounded-xl text-sm uppercase tracking-widest transition-all duration-200 shadow-sm hover:shadow-button-primary-hover active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-lyore-primary focus:ring-offset-2 min-h-[52px]"
                aria-label={t("orderNow")}
            >
                <IconBrandWhatsapp size={20} stroke={2} />
                {t("orderNow")}
            </button>

            {/* Secondary: Inquire */}
            <button
                onClick={handleInquire}
                className="w-full flex items-center justify-center gap-3 border border-lyore-primary/20 hover:border-lyore-primary text-lyore-primary font-medium py-3.5 px-6 rounded-xl text-sm uppercase tracking-widest transition-all duration-200 hover:bg-lyore-primary/5 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-lyore-primary focus:ring-offset-2 min-h-[48px]"
                aria-label={t("inquire")}
            >
                <MessageCircle size={18} />
                {t("inquire")}
            </button>
        </div>
    );
}
