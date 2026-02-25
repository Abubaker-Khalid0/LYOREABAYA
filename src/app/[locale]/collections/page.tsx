import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CollectionsContent } from "@/components/sections/CollectionsContent";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "collections" });
    const appT = await getTranslations({ locale, namespace: "app" });

    const title =
        locale === "ar"
            ? `${t("title")} | ${appT("title")}`
            : `${t("title")} | ${appT("title")}`;

    const description =
        locale === "ar"
            ? t("subtitle")
            : t("subtitle");

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
    };
}

export default async function CollectionsPage({ params }: Props) {
    const { locale } = await params;
    return <CollectionsContent locale={locale} />;
}
