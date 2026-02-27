import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ReturnsContent } from "@/components/sections/ReturnsContent";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "returns" });
    const appT = await getTranslations({ locale, namespace: "app" });

    const title = `${t("title")} | ${appT("title")}`;
    const description = t("subtitle");

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
    };
}

export default async function ReturnsPage({ params }: Props) {
    const { locale } = await params;
    return <ReturnsContent locale={locale as "ar" | "en"} />;
}
