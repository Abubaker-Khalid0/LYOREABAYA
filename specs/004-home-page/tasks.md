# Tasks: Home Page

**Input**: Design documents from `/specs/004-home-page/`  
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, quickstart.md ✓

**Tests**: Not included (constitution prohibits unit tests). Verification is manual browser checks + `npm run build`.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Exact file paths included in descriptions

---

## Phase 1: Setup

**Purpose**: Data and translation updates needed before any component work

- [x] T001 Update product data to set `featured: true` on all 6 products in `src/data/products.ts`
- [x] T002 [P] Add `home.featuredTitle` translation keys ("Featured Designs" / "أبرز التصاميم") to `messages/en.json` and `messages/ar.json`
- [x] T003 [P] Add `collections.bannerText` and `collections.bannerCta` translation keys to `messages/en.json` and `messages/ar.json`
- [x] T004 [P] Create hero slide image directory and add 3 placeholder images (Unsplash development URLs) in `public/images/hero/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared component that multiple user stories depend on

**⚠️ CRITICAL**: ProductCard is used by US2 (FeaturedProducts) and is a core reusable component for Phase 5 (Collections). Must be complete before US2.

- [x] T005 Create `ProductCard` component with image (3:4 aspect ratio, hover zoom scale 1.08), name, price (champagne gold), category badge, WhatsApp button, and card click navigation in `src/components/sections/ProductCard.tsx`

**Checkpoint**: Foundation ready — ProductCard is reusable and all user story implementation can begin

---

## Phase 3: User Story 1 — First Impression via Hero Slider (Priority: P1) 🎯 MVP

**Goal**: Full-screen hero image slider with 3 slides, auto-play (5s), manual navigation (dots + arrows), text fade-in animation, parallax effect, and bilingual support (AR/EN)

**Independent Test**: Load home page → slider auto-advances every 5s, click arrows/dots to navigate manually, CTA button navigates to `/collections`, verify AR and EN text renders correctly

### Implementation for User Story 1

- [x] T006 [US1] Create `HeroSlider` component with Motion `AnimatePresence` slide transitions, auto-play timer (5s interval with cleanup), manual navigation via dot indicators and directional arrows (Lucide `ChevronLeft`/`ChevronRight`), text fade-in-from-bottom animation on slide change, parallax background via Motion `useScroll`/`useTransform`, `prefers-reduced-motion` support via `useReducedMotion` hook, and CTA buttons linking to `/collections` in `src/components/sections/HeroSlider.tsx`
- [x] T007 [US1] Update Home page to replace placeholder content with `HeroSlider` as the first section in `src/app/[locale]/page.tsx`

**Checkpoint**: Hero slider is fully functional — auto-play, manual nav, parallax, bilingual text, CTA navigation all working

---

## Phase 4: User Story 2 — Discovering Featured Products (Priority: P1)

**Goal**: Section showing 6 featured products in a responsive grid (2 cols mobile / 3 cols desktop) with staggered scroll animation and WhatsApp integration per card

**Independent Test**: Scroll past hero → "Featured Designs" section visible with 6 cards, verify stagger animation, click card to navigate to product detail page, click WhatsApp button to verify pre-filled message opens

### Implementation for User Story 2

- [x] T008 [US2] Create `FeaturedProducts` component that filters products where `featured: true`, renders section title from translation key `home.featuredTitle`, displays products in responsive grid (2 cols mobile / 3 cols desktop), and applies staggered scroll-triggered reveal animation using Motion `useInView` + `variants` with `prefers-reduced-motion` support in `src/components/sections/FeaturedProducts.tsx`
- [x] T009 [US2] Add `FeaturedProducts` section to Home page below the HeroSlider in `src/app/[locale]/page.tsx`

**Checkpoint**: Featured products section is fully functional — 6 cards, stagger animation, WhatsApp buttons, product navigation all working

---

## Phase 5: User Story 3 — Learning the Brand Story (Priority: P2)

**Goal**: About section with split layout (text + image), decorative gold accent line, fade-in scroll animation, and correct RTL/LTR mirroring

**Independent Test**: Scroll to About section → verify split layout (text left / image right in LTR, mirrored in RTL), gold accent line visible, fade-in animation triggers, text matches translation files

### Implementation for User Story 3

- [x] T010 [P] [US3] Create `AboutSection` component with split layout using CSS Grid or Flexbox with logical properties (`start`/`end`), brand story text from `about.title` and `about.body` translation keys, complementary image via Next.js `<Image>` component, decorative gold accent line (`#C9A96E` / `bg-lyore-accent`), fade-in scroll animation using Motion `useInView` with `prefers-reduced-motion` support in `src/components/sections/AboutSection.tsx`
- [x] T011 [US3] Add `AboutSection` to Home page below FeaturedProducts in `src/app/[locale]/page.tsx`

**Checkpoint**: About section is fully functional — split layout mirrors correctly in RTL/LTR, fade-in animation works, text from translations

---

## Phase 6: User Story 4 — Navigating to Full Collections (Priority: P2)

**Goal**: Full-width collections banner with background image, parallax scroll effect, overlay text, and CTA button linking to `/collections`

**Independent Test**: Scroll to bottom of home page → verify full-width banner with parallax, overlay text matches locale, CTA navigates to `/collections`, minimum 44px tap target on mobile

### Implementation for User Story 4

- [x] T012 [P] [US4] Create `CollectionsBanner` component with full-width background image via Next.js `<Image>`, parallax scroll effect using Motion `useScroll`/`useTransform`, overlay text from `collections.bannerText` translation key, CTA button from `collections.bannerCta` linking to `/collections`, `prefers-reduced-motion` support, and minimum 44px tap target for CTA in `src/components/sections/CollectionsBanner.tsx`
- [x] T013 [US4] Add `CollectionsBanner` to Home page below AboutSection (before Footer) in `src/app/[locale]/page.tsx`

**Checkpoint**: Collections banner is fully functional — parallax, overlay text, CTA navigation, mobile tap targets all working

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final quality checks across all sections

- [x] T014 Verify `prefers-reduced-motion` disables all animations (parallax, fade-in, stagger, slider transitions) across HeroSlider, FeaturedProducts, AboutSection, and CollectionsBanner
- [x] T015 [P] Verify no horizontal overflow at 375px mobile viewport across all sections on the Home page
- [x] T016 [P] Verify all images below the hero fold use lazy loading (`loading="lazy"` or Next.js `<Image>` default behavior)
- [x] T017 Run `npm run build` and confirm zero TypeScript errors and zero build warnings
- [x] T018 Verify Home page renders correctly in both Arabic (RTL) and English (LTR) with zero layout or text-direction errors
- [x] T019 Run quickstart.md 10-step browser verification checklist and confirm all checks pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: T005 depends on T001 (product data needed for card testing)
- **User Story 1 (Phase 3)**: Depends on T004 (hero images) — independent of ProductCard
- **User Story 2 (Phase 4)**: Depends on T001, T002, T005 (product data + translations + ProductCard)
- **User Story 3 (Phase 5)**: Depends on Phase 1 completion only — independent of US1 and US2
- **User Story 4 (Phase 6)**: Depends on T003 (banner translations) — independent of US1, US2, US3
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1 — Hero Slider)**: Independent. Can start after T004.
- **US2 (P1 — Featured Products)**: Depends on T005 (ProductCard). Can start after Phase 2.
- **US3 (P2 — About Section)**: Fully independent. Can start after Phase 1.
- **US4 (P2 — Collections Banner)**: Fully independent. Can start after T003.

### Within Each User Story

- Component creation before page integration
- All page integrations (T007, T009, T011, T013) target the same file — execute sequentially

### Parallel Opportunities

- T002, T003, T004 can all run in parallel (Phase 1)
- T006 (US1) and T010 (US3) and T012 (US4) can run in parallel (different files)
- T005 (ProductCard) can run in parallel with T006 (HeroSlider) — different files
- T015 and T016 can run in parallel (Phase 7)

---

## Parallel Example: Phase 1 + Early Phase 2/3

```text
# Launch all Phase 1 setup tasks together:
Task T001: Update products.ts featured flags
Task T002: Add home.featuredTitle translation keys
Task T003: Add collections.banner* translation keys
Task T004: Create hero image placeholders

# After T004 completes, launch US1 and US3 in parallel:
Task T006: Create HeroSlider component (US1)
Task T010: Create AboutSection component (US3)

# After T001 completes, launch ProductCard:
Task T005: Create ProductCard component (Foundation)

# After T003 completes, launch US4:
Task T012: Create CollectionsBanner component (US4)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T004)
2. Complete Phase 2: Foundational — ProductCard (T005)
3. Complete Phase 3: User Story 1 — HeroSlider (T006–T007)
4. **STOP and VALIDATE**: Hero slider is the MVP — test independently
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (Hero Slider) → Test → **MVP shipped!**
3. Add US2 (Featured Products) → Test → Product discovery enabled
4. Add US3 (About Section) → Test → Brand story live
5. Add US4 (Collections Banner) → Test → Full home page complete
6. Polish (Phase 7) → Production-ready

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] labels map tasks to specific user stories for traceability
- No test tasks included (constitution prohibits unit tests)
- All page integrations (T007, T009, T011, T013) edit the same file (`page.tsx`) — must be sequential
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
