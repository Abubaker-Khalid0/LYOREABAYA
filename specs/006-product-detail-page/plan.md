# Implementation Plan: Product Detail Page

**Branch**: `6-product-detail-page` | **Date**: February 25, 2026 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-product-detail-page/spec.md`

## Summary

Create a comprehensive product detail page that displays individual abaya products with high-quality image galleries, size/color selection, WhatsApp ordering integration, and related product recommendations. The page must support bilingual content (Arabic RTL / English LTR), provide graceful error handling, and maintain the luxury brand aesthetic throughout the user experience.

## Technical Context

**Language/Version**: TypeScript with Next.js 15 (App Router)  
**Primary Dependencies**: next-intl (i18n), Motion (Framer Motion v12 for animations), shadcn/ui (UI components), Lucide React (icons)  
**Storage**: Static data in `/src/data/products.ts` (no backend/database)  
**Testing**: Manual testing + Lighthouse audits (no unit tests per constitution)  
**Target Platform**: Web (responsive: mobile-first 375px minimum → desktop)  
**Project Type**: Static luxury e-commerce website (Next.js App Router with static export)  
**Performance Goals**: Lighthouse Performance ≥ 90, Accessibility ≥ 95, page load < 2 seconds  
**Constraints**: No backend, all orders via WhatsApp, WebP images (1200x1600px, max 500KB), RTL/LTR support mandatory  
**Scale/Scope**: 6 user stories (4 P1, 2 P2), 40+ functional requirements, single product detail page with 6 major components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

✅ **Tech Stack Compliance**:
- Next.js 15 App Router ✓
- TypeScript ✓
- Tailwind CSS v4 ✓
- shadcn/ui components ✓
- Motion (Framer Motion v12) ✓
- next-intl for i18n ✓
- Lucide React icons ✓
- Self-hosted fonts via next/font ✓

✅ **No-Backend Rules**:
- No database ✓
- No server actions that write data ✓
- No authentication ✓
- No shopping cart ✓
- Product data in `/src/data/products.ts` ✓
- Translations in `/messages/*.json` ✓

✅ **Design System**:
- Using mandated color palette (Primary #550000, Accent #C9A96E, etc.) ✓
- Typography rules followed (Playfair Display/Inter for EN, Noto Naskh Arabic/Tajawal for AR) ✓

✅ **Layout & Responsiveness**:
- Mobile-first (375px minimum) ✓
- RTL/LTR support via next-intl + Tailwind RTL plugin ✓
- Logical properties (start/end) instead of left/right ✓

✅ **WhatsApp Integration**:
- WhatsApp CTA on product pages ✓
- Pre-filled messages with product details ✓
- WhatsApp FAB on all pages ✓
- Business number: +971 50 250 7859 ✓

✅ **Image Rules**:
- Next.js `<Image>` component only ✓
- WebP format (1200x1600px, max 500KB per clarifications) ✓
- Lazy loading below fold ✓
- 3:4 aspect ratio ✓

✅ **Performance Rules**:
- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95 ✓
- Respect `prefers-reduced-motion` ✓
- Lazy loading on images ✓

✅ **Code Quality**:
- PascalCase components ✓
- TypeScript Props interfaces ✓
- No magic strings (translations only) ✓
- shadcn in `/src/components/ui/` ✓
- Custom components in `/src/components/sections/` ✓

✅ **File Structure**:
- Follows mandated structure ✓
- Product page at `/src/app/[locale]/products/[slug]/page.tsx` ✓

✅ **Prohibited Actions**:
- No Tailwind CDN ✓
- No API routes ✓
- No state management libraries ✓
- No `<img>` tags ✓
- No hardcoded text ✓
- No unit tests ✓

**Result**: ✅ ALL GATES PASS — No constitution violations

## Project Structure

### Documentation (this feature)

```text
specs/006-product-detail-page/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (to be created)
├── data-model.md        # Phase 1 output (to be created)
├── quickstart.md        # Phase 1 output (to be created)
├── contracts/           # Phase 1 output (N/A - no API contracts for static site)
├── checklists/
│   └── requirements.md  # Spec quality checklist (completed)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── [locale]/
│       ├── products/
│       │   └── [slug]/
│       │       └── page.tsx              # NEW: Product detail page (server component)
│       ├── page.tsx                      # Existing: Home page
│       ├── collections/
│       │   └── page.tsx                  # Existing: Collections page
│       └── layout.tsx                    # Existing: Root layout
├── components/
│   ├── ui/                               # Existing: shadcn components
│   ├── layout/                           # Existing: Navbar, Footer
│   └── sections/
│       ├── ProductCard.tsx               # Existing: Used in collections
│       ├── ProductImageGallery.tsx       # NEW: Image gallery with thumbnails + lightbox
│       ├── ProductInfo.tsx               # NEW: Product details, size/color selection
│       ├── WhatsAppOrderButton.tsx       # NEW: Primary order CTA
│       ├── WhatsAppFAB.tsx               # NEW: Floating action button (all pages)
│       └── RelatedProducts.tsx           # NEW: "You May Also Like" section
├── data/
│   └── products.ts                       # UPDATED: Add collection/style tags field
├── lib/
│   ├── utils.ts                          # Existing: shadcn utilities
│   └── whatsapp.ts                       # UPDATED: Add failure handling utilities
└── hooks/
    └── useReducedMotion.ts               # Existing: Accessibility hook

messages/
├── ar.json                               # UPDATED: Add product detail translations
└── en.json                               # UPDATED: Add product detail translations

public/
└── images/
    ├── products/                         # NEW: Product images (WebP, 1200x1600px)
    └── placeholder-product.svg           # NEW: Fallback image
```

**Structure Decision**: Single Next.js App Router project (Option 1 from template). All components are client-side React components within the Next.js app structure. No separate backend or API layer needed since this is a static site with WhatsApp integration for orders.

## Complexity Tracking

> **No violations detected** — Constitution Check passed all gates. This section is not applicable.

