# Implementation Plan: i18n & Content Foundation

**Branch**: `002-i18n-content-foundation` | **Date**: 2026-02-21 | **Spec**: [spec.md](file:///c:/Users/DELL/Documents/projects/LYORE-ABAYA/specs/002-i18n-content-foundation/spec.md)
**Input**: Feature specification from `/specs/002-i18n-content-foundation/spec.md`

## Summary

Establish the complete internationalization and content data layer for the LYORE ABAYA website. This builds on Phase 1's foundation (next-intl routing, Product type definition, minimal translation stubs) by: expanding both translation files (`ar.json`, `en.json`) with all user-facing keys across all pages, populating the product data array with 6 bilingual placeholder products (3 Winter / 3 Summer), and creating a WhatsApp utility that generates locale-aware pre-filled order URLs. After this phase, every component can pull translated strings and product data, and WhatsApp ordering links will generate correctly in both languages.

## Technical Context

**Language/Version**: TypeScript 5.x (Next.js 15 App Router)  
**Primary Dependencies**: next-intl (i18n routing + translations), Next.js 15, Tailwind CSS v4  
**Storage**: Static TypeScript array (`/src/data/products.ts`) — no database  
**Testing**: Manual browser verification (constitution prohibits unit tests)  
**Target Platform**: Web (responsive, mobile-first)  
**Project Type**: Web application (Next.js, no backend)  
**Performance Goals**: Lighthouse Performance ≥ 90, Accessibility ≥ 95  
**Constraints**: No backend, no API routes, all text from translation files, self-hosted fonts only  
**Scale/Scope**: 6 pages, 6 products, 2 locales (AR/EN), 2 categories (Winter/Summer)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Rule | Status | Evidence |
|------|--------|----------|
| Next.js 15 App Router only | ✅ PASS | All files under `src/app/[locale]/` |
| TypeScript only | ✅ PASS | All source files are `.ts` / `.tsx` |
| Tailwind CSS v4 | ✅ PASS | No inline styles; Tailwind configured |
| next-intl for i18n | ✅ PASS | `routing.ts`, `request.ts`, `middleware.ts` use next-intl |
| No hardcoded strings | ✅ PASS | All text from `messages/*.json` |
| Translations in `/messages/` | ✅ PASS | `ar.json` and `en.json` exist |
| Product data in `/src/data/products.ts` | ✅ PASS | Type defined, array to be populated |
| No backend / API routes | ✅ PASS | No `/api/` directory |
| No database | ✅ PASS | Static data in TS array |
| Self-hosted fonts via `next/font` | ✅ PASS | `src/lib/fonts.ts` configured |
| Lucide React icons only | ✅ PASS | No other icon libs |
| No unit tests | ✅ PASS | No test framework or files |
| WhatsApp URL format | ✅ PASS | Will use `https://wa.me/971502507859?text=...` |
| Product images 3:4 portrait | ✅ PASS | Interface enforces via `images: string[]` |

**GATE RESULT: ✅ ALL PASS — proceed to Phase 0**

## Project Structure

### Documentation (this feature)

```text
specs/002-i18n-content-foundation/
├── spec.md              # Feature specification (complete)
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
messages/
├── ar.json                    # [MODIFY] Expand with all translation keys
└── en.json                    # [MODIFY] Expand with all translation keys

src/
├── app/
│   └── [locale]/
│       ├── layout.tsx         # [EXISTS] Already configured
│       └── page.tsx           # [EXISTS] Already configured
├── data/
│   └── products.ts            # [MODIFY] Populate with 6 products
├── i18n/
│   ├── routing.ts             # [EXISTS] AR/EN routing configured
│   └── request.ts             # [EXISTS] Message loading configured
├── lib/
│   ├── fonts.ts               # [EXISTS] Fonts configured
│   ├── utils.ts               # [EXISTS] cn() utility
│   └── whatsapp.ts            # [NEW] WhatsApp URL generator utility
└── middleware.ts               # [EXISTS] Locale middleware configured
```

**Structure Decision**: Next.js App Router structure per constitution. This phase modifies 3 existing files and creates 1 new file. No structural changes needed.

## Files to Change

### [MODIFY] `messages/ar.json`

Expand from 2 sections (app, tokens) to full coverage of all pages:
- `announcement` — announcement bar text
- `nav` — navigation labels (home, collections, sizeGuide, contact)
- `hero` — 3 slides (title, subtitle, CTA each)
- `product` — product labels (orderNow, inquire, selectSize, selectColor, currency, featured, noProducts)
- `about` — title and body text
- `collections` — page title, filterAll, noProducts
- `sizeGuide` — page title, headers, measurement guidance, CTA
- `contact` — page title, channel labels
- `returns` — page title, shipping/returns policy text
- `footer` — quick links, social labels, contact info, copyright
- `common` — shared labels (loading, error, back, viewAll)

### [MODIFY] `messages/en.json`

Mirror the exact same key structure as `ar.json` with English translations.

### [MODIFY] `src/data/products.ts`

Keep existing `BilingualText`, `ProductColor`, and `Product` interfaces unchanged. Replace `export const products: Product[] = []` with an array of 6 fully-populated products:
- 3 products in category شتوي / Winter
- 3 products in category صيفي / Summer
- At least 3 marked as `featured: true`
- Each with: realistic bilingual name/description, price in AED range 350–1200, sizes (S/M/L/XL/XXL), 2–3 colors, 3 Unsplash placeholder images, bilingual WhatsApp message template

### [NEW] `src/lib/whatsapp.ts`

Create a utility module with:
- `generateWhatsAppUrl(params)` — takes product name, price, locale, optional size and color, returns formatted `https://wa.me/971502507859?text=...` URL
- The WhatsApp number `971502507859` as a constant
- Arabic message template with emoji formatting (as per implementation plan)
- English message template matching the same structure
- Proper `encodeURIComponent` for URL safety
- Typed `Props` interface for function parameters per constitution

## Verification Plan

### Manual Verification (Browser)

Since the constitution prohibits unit tests, all verification is manual via the running dev server:

1. **Translation completeness check**:
   - Open browser to `http://localhost:3000/ar/` — verify Arabic text renders (RTL direction)
   - Switch to `http://localhost:3000/en/` — verify English text renders (LTR direction)
   - Check browser console for any missing translation key warnings from next-intl

2. **Product data check**:
   - Import `products` in any existing page component and render them
   - Verify all 6 products have non-empty bilingual fields
   - Verify 3 Winter + 3 Summer category split

3. **WhatsApp URL check**:
   - Call `generateWhatsAppUrl()` with sample data in browser console or a test page
   - Verify URL format: `https://wa.me/971502507859?text=...`
   - Verify Arabic message contains product name, price, size, color with correct emoji
   - Verify English message matches the same structure
   - Verify special characters are URL-encoded

4. **Build verification**:
   - Run `npm run build` — must complete with zero errors
   - Confirms TypeScript types are correct and all imports resolve

## Complexity Tracking

> No constitution violations detected. No complexity justifications needed.
