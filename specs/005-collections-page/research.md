# Research: Collections Page

**Feature**: 005-collections-page
**Date**: 2026-02-22

## R1: Animation Pattern for Filter Transitions

**Decision**: Use Framer Motion's `AnimatePresence` with `mode="popLayout"` for filter transitions, and stagger variants for scroll-triggered reveals.

**Rationale**: The existing `FeaturedProducts.tsx` already establishes this pattern with `containerVariants` (staggerChildren) and `itemVariants` (opacity + y translation). Extending this pattern ensures consistency and reduces learning curve.

**Alternatives considered**:
- CSS `View Transitions API` — too experimental, not supported in all target browsers
- `react-spring` — violates constitution (Motion/Framer Motion is mandated)
- FLIP animation library — unnecessary, Motion handles layout animations natively

## R2: Dynamic Category Extraction

**Decision**: Extract unique categories from `products.ts` at component render time using `Set()`. Categories are bilingual (`BilingualText`), so extract using the current locale.

**Rationale**: Categories are not a separate data entity — they're embedded in each product's `category` field. Since the product count is small (6), runtime extraction is negligible performance-wise and avoids maintaining a separate category list.

**Alternatives considered**:
- Separate `categories.ts` file — adds maintenance overhead for no benefit at current scale
- URL-based filtering (`?category=winter`) — adds unnecessary complexity; client-state is simpler for a static page

## R3: Hero Banner Image Strategy

**Decision**: Use a single hero banner image stored at `/public/images/collections/hero.webp`, rendered via Next.js `<Image>` with `fill` and `object-cover`. Dark overlay via CSS `bg-black/50` applied over the image.

**Rationale**: A single image works for both RTL/LTR since the content is symmetric (centered title). WebP format per constitution. The overlay ensures text readability regardless of image content.

**Alternatives considered**:
- Separate AR/EN hero images — unnecessary since title is centered and the image is decorative
- CSS gradient instead of image — user clarified they want a background image (Q1)

## R4: Filter Tab Layout Animation

**Decision**: Use Motion's `layout` prop on the active tab indicator (a `motion.div` positioned behind the active tab) for smooth sliding animation between tabs.

**Rationale**: Motion's `layout` animation automatically animates position and size changes between renders, providing a smooth underline/background indicator that follows the active tab. This is the idiomatic Framer Motion approach.

**Alternatives considered**:
- CSS transitions on tab background — violates constitution (Motion required for interactive animations)
- Spring physics with custom position calculation — overengineered for this use case

## R5: Existing Component Reuse Assessment

**Decision**: Reuse `ProductCard.tsx` as-is with zero modifications.

**Rationale**: The existing component already provides:
- 3:4 aspect ratio image with `<Image>` component ✅
- Hover zoom (scale 1.08) via Motion ✅
- Category badge (maroon, positioned top-start) ✅
- Localized name + price in champagne gold ✅
- WhatsApp order button with `generateWhatsAppUrlFromProduct` ✅
- Locale-aware link to `/products/[slug]` ✅
- Parent-controlled animation (no internal motion wrapper) ✅

No modifications needed. The card is designed to be wrapped in `motion.div` by the parent for stagger animations.

## R6: Translation Keys Assessment

**Decision**: Existing translation keys cover the core needs. Additional keys may be needed for subtitle text and hero description.

**Current keys** (both `ar.json` and `en.json`):
- `collections.title` — page title ✅
- `collections.filterAll` — "All" tab label ✅  
- `collections.noProducts` — empty state message ✅
- `collections.bannerText` — banner overlay text ✅
- `collections.bannerCta` — banner CTA text ✅

**Potentially needed**:
- `collections.subtitle` — optional subtitle for hero banner (if design warrants it)

## Summary

All NEEDS CLARIFICATION items have been resolved through research. No unknowns remain. The implementation can proceed using established patterns from the existing codebase.
