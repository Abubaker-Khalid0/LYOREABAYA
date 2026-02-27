# Quickstart: Secondary Pages (007)

**Branch**: `007-secondary-pages` | **Date**: 2026-02-26  
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

---

## What's Being Built

Three new static pages for LYORE ABAYA:

| Page | Route | Key Content |
|------|-------|-------------|
| Contact | `/[locale]/contact` | 6 contact channel cards (WhatsApp, Phone, Email, Instagram, TikTok, Snapchat) |
| Size Guide | `/[locale]/size-guide` | XS–XXL measurement table + How-to-Measure steps + WhatsApp CTA |
| Returns & Shipping | `/[locale]/returns` | Free shipping banner + Shipping policy + Exchange-only policy + WhatsApp CTA |

All three pages share: Navbar + Footer (from BaseLayout), WhatsApp FAB, text-only page header (title + subtitle), RTL/LTR support, SEO metadata.

---

## File Inventory

### New Files to Create

```
src/app/[locale]/contact/page.tsx
src/app/[locale]/size-guide/page.tsx
src/app/[locale]/returns/page.tsx
src/components/sections/ContactContent.tsx
src/components/sections/SizeGuideContent.tsx
src/components/sections/ReturnsContent.tsx
```

### Files to Modify

```
src/lib/whatsapp.ts           ← add generateExchangeRequestUrl()
messages/ar.json              ← add missing keys, correct exchange/shipping values
messages/en.json              ← add missing keys, correct exchange/shipping values
```

---

## Page Architecture Pattern

Each page follows the exact same pattern as `CollectionsPage`:

```tsx
// src/app/[locale]/contact/page.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactContent } from "@/components/sections/ContactContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "contact" });
    const appT = await getTranslations({ locale, namespace: "app" });
    return {
        title: `${t("title")} | ${appT("title")}`,
        description: t("subtitle"),
        openGraph: { title: `${t("title")} | ${appT("title")}`, description: t("subtitle") },
    };
}

export default async function ContactPage({ params }: Props) {
    const { locale } = await params;
    return <ContactContent locale={locale as "ar" | "en"} />;
}
```

---

## Component Specs

### Shared: PageHeader (inline — not a separate component)

Each `*Content.tsx` renders its own header section:

```tsx
<section className="pt-32 pb-12 text-center">
    <h1 className="text-4xl font-light text-lyore-text tracking-wide">{t("title")}</h1>
    <p className="mt-3 text-lyore-text/60 text-lg font-light">{t("subtitle")}</p>
</section>
```

No background image. `pt-32` clears the fixed Navbar.

---

### ContactContent.tsx (client component)

```
Props: { locale: "ar" | "en" }

Contact channels array (defined inside component):
[
  { key: "whatsapp", href: WHATSAPP_URL, icon: IconBrandWhatsapp (Tabler), external: false },
  { key: "phone",    href: "tel:+971502507859", icon: Phone (Lucide), external: false },
  { key: "email",    href: "mailto:info@lyoreabaya.com", icon: Mail (Lucide), external: true },
  { key: "instagram",href: "https://www.instagram.com/lyoreabaya", icon: Instagram (Lucide), external: true },
  { key: "tiktok",   href: "https://www.tiktok.com/@lyoreabaya", icon: IconBrandTiktok (Tabler), external: true },
  { key: "snapchat", href: "https://www.snapchat.com/add/lyoreabaya", icon: IconBrandSnapchat (Tabler), external: true },
]

Layout: Responsive grid — 1 col mobile → 2 cols md → 3 cols lg
Each card: rounded-xl border, icon + label, hover effect, focus ring
```

**Note**: `IconBrandWhatsapp`, `IconBrandTiktok`, `IconBrandSnapchat` from `@tabler/icons-react`. `Phone`, `Mail`, `Instagram` from `lucide-react`.

---

### SizeGuideContent.tsx (client component)

```
Props: { locale: "ar" | "en" }

Sections (in order):
1. PageHeader (title + subtitle)
2. How-to-Measure steps — 3 steps with Tabler icons
   - IconRuler2 + steps.height + steps.heightDesc
   - IconArrowsHorizontal + steps.chest + steps.chestDesc  
   - IconArrowsVertical + steps.waist + steps.waistDesc
3. Size table — overflow-x-auto wrapper for mobile
   Columns: Size | Length (cm) | Chest (cm) | Waist (cm)
   6 rows from SIZE_TABLE constant
4. WhatsApp CTA button → generateGenericInquiryUrl(locale)
```

**RTL note**: Table `dir` is inherited from `<html dir="rtl">` — no extra handling needed.

---

### ReturnsContent.tsx (client component)

```
Props: { locale: "ar" | "en" }

Sections (in order):
1. PageHeader (title + subtitle)
2. Free Shipping banner — full-width, maroon bg (#550000), white text
   Icon: Truck (Lucide) + t("freeShipping")
3. Shipping Policy card
   Icon: Package (Lucide) + t("shippingTitle") + t("shippingPolicy")
4. Exchange Policy card  
   Icon: ArrowLeftRight (Lucide) + t("returnsTitle") + t("returnsPolicy")
5. WhatsApp CTA → generateExchangeRequestUrl(locale) [NEW function]
   Text: t("exchangeCta")
```

---

## Translation Changes Required

### ar.json — Add keys

```json
"contact": {
  "subtitle": "سنكون سعيدات بالتواصل معكِ",
  "whatsappHint": "اضغطي للتواصل المباشر"
},
"sizeGuide": {
  "subtitle": "اختاري مقاسك بدقة",
  "steps": {
    "height": "الطول",
    "heightDesc": "قفي منتصبة وقيسي من أعلى الرأس حتى الأرض",
    "chest": "الصدر",
    "chestDesc": "قيسي حول أعرض جزء من الصدر",
    "waist": "الخصر",
    "waistDesc": "قيسي حول أضيق جزء من الخصر"
  }
},
"returns": {
  "subtitle": "سياسات الشحن والاستبدال",
  "shippingTitle": "سياسة الشحن",
  "returnsTitle": "سياسة الاستبدال",
  "exchangeCta": "لبدء طلب الاستبدال، تواصلي معنا عبر واتساب"
}
```

### ar.json — Correct existing keys

```json
"returns.shippingPolicy": "نشحن جميع الطلبات خلال ٢-٥ أيام عمل داخل الإمارات. للشحن الدولي يرجى التواصل معنا عبر واتساب.",
"returns.returnsPolicy": "نقبل الاستبدال (دون استرداد المبلغ) خلال ٧ أيام من تاريخ الاستلام. يجب أن يكون المنتج غير مرتدى مع البطاقات والتغليف الأصلي. للبدء بعملية الاستبدال تواصلي معنا عبر واتساب."
```

### en.json — Add keys (mirror of above in English)

```json
"contact": { "subtitle": "We'd love to hear from you", "whatsappHint": "Tap to chat directly" },
"sizeGuide": {
  "subtitle": "Find your perfect fit",
  "steps": {
    "height": "Height", "heightDesc": "Stand straight and measure from top of head to floor",
    "chest": "Chest",   "chestDesc": "Measure around the fullest part of your chest",
    "waist": "Waist",   "waistDesc": "Measure around the narrowest part of your waist"
  }
},
"returns": {
  "subtitle": "Our policies, for your peace of mind",
  "shippingTitle": "Shipping Policy",
  "returnsTitle": "Exchange Policy",
  "exchangeCta": "To start an exchange request, contact us via WhatsApp"
}
```

### en.json — Correct existing keys

```json
"returns.shippingPolicy": "We ship all orders within 2–5 business days across the UAE. For international shipping, please contact us via WhatsApp.",
"returns.returnsPolicy": "We accept exchanges (not refunds) within 7 days of delivery. Items must be unworn, tagged, and in original packaging. To initiate an exchange, contact us via WhatsApp."
```

---

## Testing Checklist

> Validates against spec FR- and SC- references

### Contact Page (`/[locale]/contact`)

- [ ] All 6 cards render with correct labels in AR and EN
- [ ] WhatsApp card opens `wa.me/971502507859` (no modal)
- [ ] Phone card triggers `tel:` link
- [ ] Email card triggers `mailto:` link
- [ ] Instagram, TikTok, Snapchat open in new tab with `rel="noopener noreferrer"`
- [ ] Page header shows title + subtitle (no image) [FR-033]
- [ ] RTL layout correct in Arabic [FR-010]
- [ ] LTR layout correct in English
- [ ] WhatsApp FAB visible [FR-028]
- [ ] `<title>` and meta description in active locale [FR-029]
- [ ] All interactive elements have focus rings [FR-030]
- [ ] No hardcoded strings — all from translations [FR-011]

### Size Guide Page (`/[locale]/size-guide`)

- [ ] Page header shows title + subtitle (no image) [FR-033]
- [ ] How-to-Measure section shows 3 steps with icons [FR-015]
- [ ] Size table shows all 6 rows (XS–XXL) with correct measurements [FR-013]
- [ ] Table is horizontally scrollable at 375px width without page overflow [FR-014, SC-003]
- [ ] Column headers translated correctly in AR and EN
- [ ] WhatsApp CTA visible below table [FR-016]
- [ ] WhatsApp CTA opens correct `wa.me` URL [FR-017]
- [ ] RTL table layout in Arabic [FR-018]
- [ ] No hardcoded strings [FR-019]
- [ ] WhatsApp FAB visible [FR-028]
- [ ] `prefers-reduced-motion` respected on any animations [FR-031]

### Returns & Shipping Page (`/[locale]/returns`)

- [ ] Page header shows title + subtitle (no image) [FR-033]
- [ ] Free Shipping banner prominently displayed [FR-021]
- [ ] Shipping Policy section shows 2–5 business days [FR-022]
- [ ] Exchange Policy section shows "exchange only, 7 days, unworn/tagged/original packaging" [FR-023]
- [ ] Exchange WhatsApp CTA opens correct `wa.me` URL with exchange message [FR-024]
- [ ] "Return" terminology not used anywhere — only "exchange" [Clarification Q1]
- [ ] RTL layout in Arabic [FR-025]
- [ ] No hardcoded strings [FR-026]
- [ ] WhatsApp FAB visible [FR-028]

### Cross-Page

- [ ] All 3 pages: Navbar + Footer present [FR-027]
- [ ] All 3 pages: Locale-appropriate SEO metadata [FR-029, SC-010]
- [ ] All 3 pages: Load within 2 seconds [SC-008]
- [ ] All 3 pages: Lighthouse Accessibility ≥ 95 [FR-030, SC-007]
- [ ] All 3 pages: Correct `<h1>` hierarchy (one per page)
- [ ] `npm run build` produces zero TypeScript errors
