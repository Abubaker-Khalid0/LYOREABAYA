import { useTranslations } from "next-intl";

export default function HomePage() {
    const t = useTranslations("app");
    const tk = useTranslations("tokens");

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-12 bg-lyore-background px-4 py-16 text-lyore-text">
            {/* Existing hero content */}
            <section className="text-center">
                <h1
                    className="text-4xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-heading-ar, var(--font-heading-en))" }}
                >
                    {t("title")}
                </h1>
                <p
                    className="text-lg"
                    style={{ fontFamily: "var(--font-body-ar, var(--font-body-en))" }}
                >
                    {t("description")}
                </p>
            </section>

            {/* Design Token Showcase — demonstrates all 6 tokens via Tailwind utilities */}
            <section className="w-full max-w-3xl">
                <h2 className="text-2xl font-semibold text-center mb-2">
                    {tk("heading")}
                </h2>
                <p className="text-sm text-center mb-8 opacity-70">
                    {tk("subheading")}
                </p>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {/* Token 1: Primary — Tailwind bg utility */}
                    <div className="rounded-lg overflow-hidden border border-lyore-text/10">
                        <div className="h-20 bg-lyore-primary" />
                        <div className="p-3 bg-lyore-surface text-center">
                            <p className="text-sm font-medium">{tk("primary")}</p>
                            <code className="text-xs opacity-60">bg-lyore-primary</code>
                        </div>
                    </div>

                    {/* Token 2: Secondary — Tailwind bg utility */}
                    <div className="rounded-lg overflow-hidden border border-lyore-text/10">
                        <div className="h-20 bg-lyore-secondary" />
                        <div className="p-3 bg-lyore-surface text-center">
                            <p className="text-sm font-medium">{tk("secondary")}</p>
                            <code className="text-xs opacity-60">bg-lyore-secondary</code>
                        </div>
                    </div>

                    {/* Token 3: Accent — Tailwind bg utility */}
                    <div className="rounded-lg overflow-hidden border border-lyore-text/10">
                        <div className="h-20 bg-lyore-accent" />
                        <div className="p-3 bg-lyore-surface text-center">
                            <p className="text-sm font-medium">{tk("accent")}</p>
                            <code className="text-xs opacity-60">bg-lyore-accent</code>
                        </div>
                    </div>

                    {/* Token 4: Background — CSS var() demo */}
                    <div className="rounded-lg overflow-hidden border border-lyore-text/10">
                        <div
                            className="h-20"
                            style={{ backgroundColor: "var(--color-lyore-background)" }}
                        />
                        <div className="p-3 bg-lyore-surface text-center">
                            <p className="text-sm font-medium">{tk("background")}</p>
                            <code className="text-xs opacity-60">var(--color-lyore-background)</code>
                        </div>
                    </div>

                    {/* Token 5: Surface — CSS var() demo */}
                    <div className="rounded-lg overflow-hidden border border-lyore-text/10">
                        <div
                            className="h-20"
                            style={{ backgroundColor: "var(--color-lyore-surface)" }}
                        />
                        <div className="p-3 bg-lyore-surface text-center">
                            <p className="text-sm font-medium">{tk("surface")}</p>
                            <code className="text-xs opacity-60">var(--color-lyore-surface)</code>
                        </div>
                    </div>

                    {/* Token 6: Text — CSS var() demo (text color shown as bg for visibility) */}
                    <div className="rounded-lg overflow-hidden border border-lyore-text/10">
                        <div
                            className="h-20"
                            style={{ backgroundColor: "var(--color-lyore-text)" }}
                        />
                        <div className="p-3 bg-lyore-surface text-center">
                            <p className="text-sm font-medium">{tk("text")}</p>
                            <code className="text-xs opacity-60">var(--color-lyore-text)</code>
                        </div>
                    </div>
                </div>

                {/* Combined example using multiple tokens together */}
                <div className="mt-8 rounded-lg bg-lyore-surface p-6 border border-lyore-text/10">
                    <p
                        className="text-lyore-primary font-semibold text-lg mb-2"
                        style={{ fontFamily: "var(--font-heading-ar, var(--font-heading-en))" }}
                    >
                        {t("title")}
                    </p>
                    <p className="text-lyore-text mb-4">{t("description")}</p>
                    <span className="inline-block rounded-full bg-lyore-accent px-4 py-2 text-sm font-medium text-lyore-surface">
                        bg-lyore-accent + text-lyore-surface
                    </span>
                </div>
            </section>
        </main>
    );
}
