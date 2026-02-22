import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFoundPage() {
    const t = useTranslations("notFound");

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
            <h1 className="text-4xl font-bold tracking-widest text-lyore-primary mb-4">
                404
            </h1>
            <h2 className="text-2xl font-semibold text-lyore-text mb-2">
                {t("title")}
            </h2>
            <p className="text-lyore-text/70 mb-8 max-w-md">
                {t("message")}
            </p>
            <Link
                href="/"
                className="bg-lyore-primary text-lyore-surface px-8 py-3 rounded-full font-medium tracking-wide transition-colors hover:bg-lyore-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lyore-primary focus-visible:ring-offset-2"
            >
                {t("cta")}
            </Link>
        </div>
    );
}
