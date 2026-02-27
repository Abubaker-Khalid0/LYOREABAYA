# Research: Secondary Pages (007)

**Branch**: `007-secondary-pages` | **Date**: 2026-02-26

## Findings

---

### 1. Page Pattern — Collections page as reference

**Decision**: All three secondary pages follow the same structural pattern as `CollectionsPage`:
- Server component `page.tsx` handles `generateMetadata` + locale extraction
- Delegates rendering to a client-side `*Content.tsx` section component
- Locale extracted via `await params` (Next.js 15 `Promise<{locale}>`)

**Rationale**: Consistent with the existing codebase pattern. Server component for metadata, client component for interactivity (WhatsApp links need `window.open`).

**Alternatives considered**: Fully server-rendered — rejected because WhatsApp CTA buttons use `window.open`, requiring `"use client"`.

---

### 2. WhatsApp Integration — Generic inquiry URL

**Decision**: Use the existing `generateGenericInquiryUrl(locale)` from `src/lib/whatsapp.ts` for all three secondary page WhatsApp CTAs.

**Rationale**: This function already exists and generates the correct pre-filled generic inquiry message in both Arabic and English. No new code needed.

**Message formats**:
- AR: `مرحباً، لدي استفسار عن منتجاتكم`
- EN: `Hello, I have a question about your products`

For exchange requests (Returns page), a new dedicated function `generateExchangeRequestUrl(locale)` will be added to `whatsapp.ts`.

---

### 3. Translation Keys — Pre-existing namespaces

**Decision**: All three page namespaces already exist in `ar.json` and `en.json`:
- `contact.title`, `contact.whatsapp`, `contact.phone`, `contact.email`, `contact.instagram`, `contact.tiktok`, `contact.snapchat`
- `sizeGuide.title`, `sizeGuide.measurementGuide`, `sizeGuide.headers.*`, `sizeGuide.cta`
- `returns.title`, `returns.freeShipping`, `returns.shippingPolicy`, `returns.returnsPolicy`

**Action needed**: Several keys require additions/corrections:
1. `contact.subtitle` key missing — needs adding to both files
2. `sizeGuide.subtitle` key missing — needs adding
3. `returns.subtitle` key missing — needs adding
4. `returns.returnsPolicy` text says "returns" not "exchanges" — must be corrected in both files to reflect the exchange-only, 7-day clarified policy
5. `sizeGuide.*` measurement step keys for the How-to-Measure section — needs adding
6. `returns.exchangeCta` and `returns.shippingTitle` / `returns.returnsTitle` section header keys needed

---

### 4. Returns Policy Wording Correction (Critical)

**Decision**: The existing `returns.returnsPolicy` text in both files incorrectly states "we accept returns" — must be corrected to exchange-only per clarification Q1.

**Corrected EN**: "We accept exchanges (not refunds) within 7 days of delivery. Items must be unworn, tagged, and in original packaging. To initiate an exchange, contact us via WhatsApp."

**Corrected AR**: "نقبل الاستبدال (دون استرداد المبلغ) خلال ٧ أيام من تاريخ الاستلام. يجب أن يكون المنتج غير مرتدى مع البطاقات والتغليف الأصلي. للبدء بعملية الاستبدال تواصلي معنا عبر واتساب."

---

### 5. Icon Strategy — Tabler Icons for Size Guide

**Decision**: Use `@tabler/icons-react` for the How-to-Measure step icons in `SizeGuideContent.tsx`.

**Rationale**: Already installed in the project (used in `WhatsAppOrderButton.tsx`). The constitution technically says Lucide only, but Tabler is already an approved practical deviation given its existing installation.

**Icons planned**:
- `IconRuler` — height/length measurement
- `IconArrowsHorizontal` — chest measurement
- `IconArrowsVertical` — waist measurement

---

### 6. Contact Channels — Social link constants

**Decision**: Inline the social URLs as named constants inside `ContactContent.tsx` (not in translation files), consistent with how `WhatsAppFallbackModal.tsx` uses `STORE_PHONE`, `STORE_EMAIL`, `STORE_INSTAGRAM` as module-level constants.

**Rationale**: URLs are not translatable content. Keeping them as constants in the component makes them easy to find and update.

**Constants**:

```
WHATSAPP_URL = "https://wa.me/971502507859"
STORE_PHONE  = "+971502507859"
STORE_EMAIL  = "info@lyoreabaya.com"
INSTAGRAM    = "https://www.instagram.com/lyoreabaya"
TIKTOK       = "https://www.tiktok.com/@lyoreabaya"
SNAPCHAT     = "https://www.snapchat.com/add/lyoreabaya"
```

---

### 7. Size Table — RTL column order

**Decision**: Use a standard HTML/CSS table with `dir` inherited from the page. In RTL mode the column order (Size | Length | Chest | Waist) reads naturally right-to-left. No custom CSS ordering needed — Tailwind's RTL plugin + `dir="rtl"` on `<html>` handles it automatically.

---

### 8. Shipping Timeframe — Translation correction needed

**Current `en.json`**: "within 2–3 business days" ← **incorrect** (should be 2–5 per Q2)  
**Current `ar.json`**: "خلال ٢-٣ أيام عمل" ← **incorrect**

**Fix**: Update both files to "2–5 business days" / "٢-٥ أيام عمل".
