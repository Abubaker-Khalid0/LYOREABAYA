import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getFontClasses } from "@/lib/fonts";
import "../globals.css";

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
    title: "LYORE ABAYA — لـيـور عباية",
    description: "Luxury abayas with modern designs | عبايات فاخرة بتصاميم عصرية",
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;
    const dir = locale === "ar" ? "rtl" : "ltr";
    const fontClasses = getFontClasses(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} dir={dir}>
            <body className={`${fontClasses} antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
