# Implementation Plan: Collections Page

**Branch**: `005-collections-page` | **Date**: 2026-02-22 | **Spec**: [spec.md](file:///c:/Users/DELL/Documents/projects/LYORE-ABAYA/specs/005-collections-page/spec.md)
**Input**: Feature specification from `/specs/005-collections-page/spec.md`

## Summary

Build the Collections page for the LYORE ABAYA luxury e-commerce site. The page displays all products in a filterable, animated grid with a hero banner, dynamic category filter tabs, and reusable product cards. Products are sourced from `products.ts`, filtered client-side by category, and each card links to the product detail page or WhatsApp. The page supports bilingual (AR/EN) rendering with RTL/LTR layouts.

**Key reuse**: The existing `ProductCard` component and `FeaturedProducts` stagger animation patterns will be leveraged directly.

## Technical Context

**Language/Version**: TypeScript (Next.js 15 App Router)
**Primary Dependencies**: Next.js 15, Tailwind CSS v4, shadcn/ui, Motion (Framer Motion v12), next-intl, Lucide React
**Storage**: N/A — static site, data from `products.ts`
**Testing**: Build verification (`npm run build`), browser visual testing
**Target Platform**: Web (modern browsers — Chrome, Firefox, Safari on desktop & mobile)
**Project Type**: Web (Next.js App Router with `[locale]` routing)
**Performance Goals**: Lighthouse Performance ≥ 90, Accessibility ≥ 95
**Constraints**: No backend, no API routes, all text from translation files, images via next/image only
**Scale/Scope**: 6 products, 2 categories (Winter/Summer), 2 locales (AR/EN)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Rule | Status | Notes |
|------|--------|-------|
| Next.js 15 App Router only | ✅ PASS | Page at `app/[locale]/collections/page.tsx` |
| TypeScript only | ✅ PASS | All files `.tsx` / `.ts` |
| Tailwind CSS v4 only | ✅ PASS | No inline styles |
| shadcn/ui first | ✅ PASS | No shadcn components needed for this feature |
| Motion for animations | ✅ PASS | AnimatePresence, stagger, layout animations |
| next-intl for i18n | ✅ PASS | All text from translation files |
| Lucide React icons only | ✅ PASS | No new icons needed |
| Self-hosted fonts | ✅ PASS | Already configured, no changes |
| No backend | ✅ PASS | Data from `products.ts`, client-side filtering |
| Design System colors | ✅ PASS | Using `lyore-primary`, `lyore-accent`, etc. |
| Mobile-first (375px min) | ✅ PASS | Grid: 2→3→4 columns |
| RTL/LTR via logical props | ✅ PASS | Using `start`/`end` not `left`/`right` |
| `next/image` only | ✅ PASS | `<Image>` component throughout |
| Product images 3:4 | ✅ PASS | `aspect-[3/4]` on cards |
| `prefers-reduced-motion` | ✅ PASS | `useReducedMotion` hook |
| No hardcoded strings | ✅ PASS | All text from `collections.*` translation keys |
| No unit tests | ✅ PASS | Constitution prohibits tests |

## Project Structure

### Documentation (this feature)

```text
specs/005-collections-page/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (via /speckit.tasks)
```

### Source Code (new + modified files)

```text
src/
├── app/
│   └── [locale]/
│       └── collections/
│           └── page.tsx           # [NEW] Collections page (server component wrapper)
├── components/
│   └── sections/
│       ├── ProductCard.tsx        # [EXISTS] Reuse as-is
│       ├── CollectionsHero.tsx    # [NEW] Hero banner with image + overlay
│       ├── FilterTabs.tsx         # [NEW] Category filter tabs
│       └── ProductGrid.tsx        # [NEW] Animated product grid
└── data/
    └── products.ts                # [EXISTS] No changes needed

messages/
├── ar.json                        # [MODIFY] Add missing collections keys
└── en.json                        # [MODIFY] Add missing collections keys
```

**Structure Decision**: Follows the constitution's mandatory file structure. New page at `app/[locale]/collections/page.tsx`. New section components in `components/sections/`. Existing `ProductCard.tsx` reused without modification.

## Component Architecture

### Dependency Graph

```text
collections/page.tsx (server component)
  └── CollectionsContent.tsx (client component — "use client")
        ├── CollectionsHero.tsx
        ├── FilterTabs.tsx
        └── ProductGrid.tsx
              └── ProductCard.tsx (existing)
```

### Component Responsibilities

| Component | Type | Responsibility |
|-----------|------|----------------|
| `page.tsx` | Server | SEO metadata, layout wrapper, loads translations |
| `CollectionsContent.tsx` | Client | Client-side filter state, coordinates hero + tabs + grid |
| `CollectionsHero.tsx` | Client | Full-width hero banner (~40vh), background image, dark overlay, centered title |
| `FilterTabs.tsx` | Client | Horizontal filter tabs, "All" always first, active state styling, layout animation |
| `ProductGrid.tsx` | Client | AnimatePresence grid, stagger animation, empty state |
| `ProductCard.tsx` | Client | **Existing** — 3:4 image, hover zoom, WhatsApp button, i18n |

## Implementation Phases

### Phase A: Page Setup & Hero Banner
1. Create `app/[locale]/collections/page.tsx` (server component with metadata)
2. Create `CollectionsContent.tsx` (client component with filter state)
3. Create `CollectionsHero.tsx` (~40vh hero with background image + dark overlay)
4. Add any missing translation keys to `ar.json` / `en.json`

### Phase B: Filter Tabs
1. Create `FilterTabs.tsx` with dynamic category extraction from products
2. Implement horizontal scroll on mobile
3. Active tab: maroon bg + white text; inactive: transparent + border
4. Motion layout animation for tab indicator

### Phase C: Product Grid
1. Create `ProductGrid.tsx` with responsive grid (2→3→4 cols)
2. Integrate existing `ProductCard.tsx`
3. Implement AnimatePresence for filter transitions
4. Stagger reveal animation on scroll using `useInView`
5. "No products found" empty state
6. Respect `prefers-reduced-motion` via `useReducedMotion`

### Phase D: Integration & Polish
1. Wire all components together in `CollectionsContent.tsx`
2. Verify RTL/LTR rendering
3. Verify WhatsApp links
4. Build verification (`npm run build`)

## Verification Plan

### Automated Tests

1. **Build check**: Run `npm run build` — must complete with zero TypeScript errors and zero warnings.

### Browser Verification

2. **Visual check (English)**: Open `http://localhost:3000/en/collections` in browser at desktop viewport (1280px). Verify:
   - Hero banner is ~40vh with background image + dark overlay + centered "Collections" title
   - All 6 products visible in 3-column grid
   - Filter tabs: "All", "Winter" (شتوي), "Summer" (صيفي)
   - Clicking "Winter" tab shows only 3 Winter products with animation
   - Clicking "All" restores all 6 products
   - Product card hover zoom works
   - WhatsApp button on any card opens correct URL

3. **Visual check (Arabic/RTL)**: Open `http://localhost:3000/ar/collections`. Verify:
   - Page is RTL
   - Hero title in Arabic
   - Filter tabs in Arabic
   - Category badges in Arabic
   - WhatsApp button text in Arabic

4. **Mobile check (375px)**: Resize browser to 375px width. Verify:
   - Grid shows 2 columns
   - Filter tabs are horizontally scrollable
   - No horizontal overflow
   - Hero banner scales properly

5. **Empty state**: Temporarily modify filter logic or use a non-existent category — verify "No products found" message appears

6. **Reduced motion**: Enable `prefers-reduced-motion` in browser devtools — verify no entrance/stagger animations fire

## Complexity Tracking

No constitution violations to justify.
