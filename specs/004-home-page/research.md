# Research: Home Page (004-home-page)

**Date**: 2026-02-22  
**Feature**: Home Page — HeroSlider, FeaturedProducts, AboutSection, CollectionsBanner

## Summary

No NEEDS CLARIFICATION items were found in technical context. The constitution and codebase provide all necessary decisions. This document records key findings and best-practice decisions.

---

## Decision 1: Hero Slider Animation Strategy

**Decision**: Use Motion (Framer Motion v12) `AnimatePresence` + `motion.div` with `variants` for slide transitions. Auto-play via `useEffect` + `setInterval` with cleanup.

**Rationale**: Constitution mandates Motion for all interactive animations (CSS-only prohibited). `AnimatePresence` handles exit/enter transitions cleanly. `useEffect` timer ensures auto-play resumes correctly after manual navigation.

**Alternatives considered**:
- **Swiper.js** — Rejected: adds external dependency; constitution requires justification for new deps and Motion is already available.
- **CSS keyframes** — Rejected: constitution prohibits CSS-only animations for interactive elements.
- **Embla Carousel** — Rejected: Motion already handles this; no justification for added complexity.

---

## Decision 2: Parallax Implementation

**Decision**: Use Motion `useScroll` + `useTransform` hooks to apply `translateY` transform on hero and banner background images based on scroll progress.

**Rationale**: Clean declarative API, GPU-accelerated transforms, and respects `prefers-reduced-motion` when gated via `useReducedMotion` hook (already exists at `src/hooks/useReducedMotion.ts`).

**Alternatives considered**:
- **CSS `background-attachment: fixed`** — Rejected: poor iOS Safari support and not controllable via Motion.
- **Intersection Observer + manual transform** — Rejected: Motion provides this out of the box.

---

## Decision 3: Featured Products Data Source

**Decision**: Filter products from `src/data/products.ts` where `featured: true`. Currently 4 products are flagged as featured (prod-001, prod-003, prod-004, prod-006). Spec requires 6, so 2 more products need `featured: true` set.

**Rationale**: Single source of truth per constitution. The `products.ts` file is complete with 6 products; just need to ensure all 6 (or exactly 6) have `featured: true` or the section shows all products.

**Action required**: Update `products.ts` to set `featured: true` on prod-002 and prod-005 (or adjust spec to show 4 featured). This is a data decision, not an architecture decision.

---

## Decision 4: Image Strategy for Hero Slides

**Decision**: Use Unsplash placeholder images during development. Store hero slide references in translation files (the images themselves will be stored in `/public/images/hero/`). Use Next.js `<Image>` component with `priority` for the first slide and lazy loading for subsequent slides.

**Rationale**: Constitution requires Next.js `<Image>` (no `<img>` tags), WebP in production, and lazy loading below fold. Hero is above fold, so first slide gets `priority`. Placeholder Unsplash URLs are permitted during development.

**Alternatives considered**:
- **Static imports** — Considered but Unsplash URLs are fine for dev; production will use local WebP files.

---

## Decision 5: ProductCard as Shared Component

**Decision**: Build `ProductCard.tsx` in `src/components/sections/` as a reusable component used by both FeaturedProducts (Home page) and ProductGrid (Collections page, Phase 5).

**Rationale**: Implementation plan explicitly designates ProductCard as a "CORE COMPONENT" reused across pages. Building it during Phase 4 ensures Phase 5 can reuse it directly.

**Alternatives considered**:
- **Separate card per page** — Rejected: violates DRY and the implementation plan.

---

## Decision 6: Client vs Server Component Strategy

**Decision**: `page.tsx` (Home) is a Server Component. Individual section components (`HeroSlider`, `FeaturedProducts`, `AboutSection`, `CollectionsBanner`) are Client Components (marked `"use client"`) since they use Motion animations and browser APIs (IntersectionObserver, setInterval).

**Rationale**: Next.js 15 App Router defaults to Server Components. Motion requires client-side rendering. Keeping sections as small client components preserves SSR benefits for the outer page shell.

**Alternatives considered**:
- **All server** — Not possible; Motion hooks require client-side JavaScript.
- **All client** — Loses SSR benefits unnecessarily.
