# Implementation Plan: Home Page

**Branch**: `004-home-page` | **Date**: 2026-02-22 | **Spec**: [spec.md](file:///c:/Users/DELL/Documents/projects/LYORE-ABAYA/specs/004-home-page/spec.md)  
**Input**: Feature specification from `/specs/004-home-page/spec.md`

## Summary

Build the complete LYORE ABAYA Home page with four sections: a full-screen hero image slider with auto-play and parallax, a featured products grid with staggered scroll animations and WhatsApp integration, a brand story About section with split layout, and a full-width collections banner with parallax. All content is bilingual (AR/EN) via next-intl, all animations use Motion (Framer Motion v12), and the page must work flawlessly in both RTL and LTR layouts on viewports as narrow as 375px.

## Technical Context

**Language/Version**: TypeScript 5.x on Next.js 16.1.6 (App Router)  
**Primary Dependencies**: Motion v12, next-intl v4, shadcn/ui, Lucide React, Tailwind CSS v4, tailwindcss-rtl v0.9  
**Storage**: N/A (static site, no database per constitution)  
**Testing**: Manual verification + `npm run build` (constitution prohibits unit tests)  
**Target Platform**: Web — Desktop + Mobile (375px min), Chrome/Firefox/Safari  
**Project Type**: Web application (Next.js)  
**Performance Goals**: Lighthouse Performance ≥ 90, Accessibility ≥ 95, 60fps animations  
**Constraints**: No backend, no API routes, no state management libraries, all images via `<Image>`, all text from translation files  
**Scale/Scope**: 5 new component files + 1 modified page + 2 modified translation files + 1 modified data file

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Rule | Status | Notes |
|------|--------|-------|
| Next.js 15 App Router only | ✅ PASS | Using App Router (`src/app/[locale]/page.tsx`) |
| TypeScript only | ✅ PASS | All files are `.tsx` / `.ts` |
| Tailwind CSS v4 | ✅ PASS | Design tokens in `globals.css` via `@theme` |
| shadcn/ui first | ✅ PASS | No shadcn components needed for these sections |
| Motion for animations | ✅ PASS | All animations use Motion |
| next-intl for i18n | ✅ PASS | All text from `messages/*.json` |
| Lucide React icons only | ✅ PASS | Arrow icons from Lucide |
| Self-hosted fonts | ✅ PASS | `next/font` already configured in `src/lib/fonts.ts` |
| No backend | ✅ PASS | No API routes, no database |
| Design system colors | ✅ PASS | Using `lyore-*` tokens exclusively |
| No hardcoded text | ✅ PASS | All strings from translation files |
| `<Image>` component only | ✅ PASS | No `<img>` tags |
| 3:4 aspect ratio for products | ✅ PASS | Enforced in ProductCard |
| `prefers-reduced-motion` | ✅ PASS | Uses existing `useReducedMotion` hook |
| Mobile-first (375px min) | ✅ PASS | Responsive grid: 2 cols mobile → 3 cols desktop |
| RTL/LTR via logical properties | ✅ PASS | Using `start`/`end`, never `left`/`right` |
| No unit tests | ✅ PASS | Manual verification only |
| WhatsApp FAB on all pages | ⏳ DEFERRED | FAB is Phase 6 scope per implementation plan |

## Project Structure

### Documentation (this feature)

```text
specs/004-home-page/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0: technology decisions
├── data-model.md        # Phase 1: entity definitions
├── quickstart.md        # Phase 1: setup & verification
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── [locale]/
│       └── page.tsx                    # MODIFY — replace placeholder with home sections
├── components/
│   └── sections/
│       ├── HeroSlider.tsx              # NEW — full-screen image slider
│       ├── FeaturedProducts.tsx         # NEW — featured products grid
│       ├── ProductCard.tsx             # NEW — reusable product card (shared with Phase 5)
│       ├── AboutSection.tsx            # NEW — brand story split layout
│       └── CollectionsBanner.tsx       # NEW — full-width CTA banner
├── data/
│   └── products.ts                     # MODIFY — set all 6 products to featured: true
└── hooks/
    └── useReducedMotion.ts             # EXISTS — already available

messages/
├── ar.json                             # MODIFY — add home.featuredTitle, collections.banner* keys
└── en.json                             # MODIFY — add home.featuredTitle, collections.banner* keys

public/
└── images/
    └── hero/
        ├── slide-1.webp                # NEW — placeholder (Unsplash during dev)
        ├── slide-2.webp                # NEW — placeholder
        └── slide-3.webp                # NEW — placeholder
```

**Structure Decision**: Single Next.js web application following the constitution-mandated file structure. New components go in `src/components/sections/`. No new directories needed beyond `public/images/hero/`.

## Contracts

No API contracts needed — this is a static site with no backend per constitution. All data flows are:
- **Products**: `src/data/products.ts` → `FeaturedProducts.tsx` → `ProductCard.tsx`
- **Translations**: `messages/*.json` → `next-intl` → all components
- **WhatsApp**: `src/lib/whatsapp.ts` → `ProductCard.tsx` (existing utility)

## Verification Plan

### Automated Checks

```bash
# TypeScript compilation + Next.js build (zero errors required)
npm run build

# ESLint check
npm run lint
```

### Browser Verification

1. **Hero Slider**: Open `http://localhost:3000/ar` → Verify 100vh slider with AR text, auto-play every 5s, manual arrows/dots, parallax on scroll
2. **Language Switch**: Toggle to EN → Verify all text switches, layout changes to LTR, slider arrows flip
3. **Featured Products**: Scroll to section → Verify 6 cards with stagger animation, 2-col mobile / 3-col desktop
4. **WhatsApp Integration**: Click WhatsApp button on any card → Verify WhatsApp opens with pre-filled message
5. **Product Navigation**: Click a product card body → Verify navigation to `/products/[slug]`
6. **About Section**: Scroll → Verify split layout (text left / image right in LTR, mirrored in RTL), fade-in animation
7. **Collections Banner**: Scroll → Verify full-width banner with parallax, CTA navigates to `/collections`
8. **Mobile Responsive**: Resize to 375px → Verify no horizontal overflow, all sections functional
9. **Reduced Motion**: Enable `prefers-reduced-motion` in browser DevTools → Verify all animations disabled
10. **Hover Effects**: Hover over product card image → Verify scale(1.08) zoom effect

## Complexity Tracking

No constitution violations. No complexity justifications needed.
