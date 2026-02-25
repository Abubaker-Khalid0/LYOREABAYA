# Tasks: Collections Page

**Input**: Design documents from `/specs/005-collections-page/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not requested — excluded per constitution (no unit tests).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Design Note**: The user explicitly requires a **very professional, premium design** — not something simple. Every component must reflect luxury aesthetics: refined spacing, elegant typography, polished micro-interactions, subtle gradients, and sophisticated color usage consistent with the LYORE ABAYA brand identity.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Directory structure and translation keys for the Collections page

- [x] T001 Create the collections page directory at `src/app/[locale]/collections/`
- [x] T002 [P] Add missing translation keys for the collections page hero subtitle in `messages/en.json` — add `collections.subtitle` ("Explore our curated collection of luxury abayas") and `collections.heroAlt` ("LYORE ABAYA luxury collection showcase")
- [x] T003 [P] Add missing translation keys for the collections page hero subtitle in `messages/ar.json` — add `collections.subtitle` ("اكتشفي مجموعتنا المختارة من العبايات الفاخرة") and `collections.heroAlt` ("مجموعة عبايات ليور الفاخرة")

**Checkpoint**: Directory created, all translation keys available in both locales.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared page entry point that all user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create the collections page server component at `src/app/[locale]/collections/page.tsx` — include SEO metadata (`title`, `description`, `og:title`, `og:description`) using `generateMetadata()` per locale; render the `CollectionsContent` client component
- [x] T005 Create the `CollectionsContent` client wrapper at `src/components/sections/CollectionsContent.tsx` — `"use client"` component that manages `activeCategory` state (default: `"all"`), extracts unique categories from `products.ts` using `Set()`, renders `CollectionsHero`, `FilterTabs`, and `ProductGrid` in sequence; resets filter to "All" on mount (no state persistence)

**Checkpoint**: Foundation ready — navigating to `/en/collections` or `/ar/collections` renders a blank page shell with no errors. User story implementation can begin.

---

## Phase 3: User Story 1 — Browse All Products (Priority: P1) 🎯 MVP

**Goal**: Display all products from `products.ts` in a premium, responsive grid with a stunning hero banner — the page must look and feel luxurious at first glance.

**Independent Test**: Navigate to `/en/collections` and `/ar/collections` — see a visually striking hero banner followed by all 6 products in a polished grid. Switch locales and verify full RTL/LTR correctness.

### Implementation for User Story 1

- [x] T006 [US1] Create `CollectionsHero.tsx` at `src/components/sections/CollectionsHero.tsx` — full-width hero banner (~40vh) with a background image using `next/image` (`fill`, `object-cover`, `priority`), a sophisticated dark gradient overlay (not flat `bg-black/50` — use a multi-stop gradient like `from-black/70 via-black/40 to-black/60` for depth), centered localized title using heading font (`Playfair Display` / `Noto Naskh Arabic`), an optional localized subtitle in a lighter weight, and a thin decorative gold accent line (`#C9A96E`) below the text; use `start`/`end` logical properties for RTL support; respect `prefers-reduced-motion` for any entrance animation; the hero must evoke luxury — generous letter-spacing on title, elegant font sizing (clamp for responsive), and refined vertical padding
- [x] T007 [US1] Create `ProductGrid.tsx` at `src/components/sections/ProductGrid.tsx` — responsive CSS grid (`grid-cols-2 md:grid-cols-3 xl:grid-cols-4`) with refined gap spacing (`gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12`), renders all products from `products.ts` by mapping over the filtered product array (received via props), wraps each `ProductCard` in a container `div`; if no products match, display a premium-styled "No products found" empty state (localized text from `collections.noProducts`, centered, with muted styling and a subtle icon); products render in data source order (no client-side sorting)
- [x] T008 [US1] Wire `CollectionsHero` and `ProductGrid` into `CollectionsContent.tsx` — pass full product array (all products) to `ProductGrid` initially (no filtering yet); verify the page renders all 6 products with the hero banner above; ensure proper section spacing between hero and grid (generous `py-16 md:py-24`)
- [x] T009 [US1] Add a placeholder hero image at `public/images/collections/hero.webp` — use a high-quality Unsplash abaya/fashion image (development only); ensure it's appropriately sized for full-width rendering

**Checkpoint**: `/en/collections` shows a stunning hero banner + all 6 products in a polished grid. `/ar/collections` renders correctly in RTL. The page looks premium and professional.

---

## Phase 4: User Story 2 — Filter Products by Category (Priority: P1)

**Goal**: Dynamic category filter tabs that let customers narrow the product catalog with polished, animated transitions.

**Independent Test**: Click "Winter" tab → only 3 Winter products shown. Click "All" → all 6 shown. Click "Summer" → 3 Summer products. Tab styling is refined with smooth active indicator movement.

### Implementation for User Story 2

- [x] T010 [US2] Create `FilterTabs.tsx` at `src/components/sections/FilterTabs.tsx` — receives `categories: string[]`, `activeCategory: string`, `onCategoryChange: (cat: string) => void` as props; renders horizontal tabs starting with "All" (from `collections.filterAll` translation key) followed by dynamic categories; active tab: `bg-lyore-primary text-lyore-surface` with a Motion `layoutId` animated indicator (a `motion.div` with `layoutId="activeTab"` behind the active tab for a smooth sliding pill effect); inactive tabs: transparent with `border border-lyore-primary/20` and hover state `hover:border-lyore-primary/40`; tabs container: horizontally scrollable on mobile (`overflow-x-auto scrollbar-hide`), with `scroll-snap-type: x mandatory` for polished mobile scrolling; tab typography: uppercase, `tracking-widest`, small font, medium weight for an editorial luxury feel; use `start`/`end` logical properties; respect `prefers-reduced-motion`
- [x] T011 [US2] Integrate `FilterTabs` into `CollectionsContent.tsx` — pass extracted categories and `activeCategory` state; filter the product array (`activeCategory === "all" ? allProducts : allProducts.filter(p => p.category[locale] === activeCategory)`) and pass filtered results to `ProductGrid`; place `FilterTabs` between `CollectionsHero` and `ProductGrid` with appropriate spacing (`mb-10 md:mb-14`)
- [x] T012 [US2] Verify empty state — when a filter returns 0 products, confirm the "No products found" empty state renders correctly with proper localization in both AR and EN

**Checkpoint**: Filter tabs work with smooth indicator animation. Switching categories updates the grid. Empty state handles gracefully.

---

## Phase 5: User Story 3 — Interact with a Product Card (Priority: P1)

**Goal**: Product cards serve as both navigation to detail pages and direct WhatsApp conversion points.

**Independent Test**: Click a product card → navigates to `/en/products/[slug]`. Click the WhatsApp button → opens WhatsApp with pre-filled message containing product name + price in the correct language.

### Implementation for User Story 3

- [x] T013 [US3] Verify `ProductCard.tsx` integration in `ProductGrid.tsx` — confirm that clicking the card (excluding WhatsApp button) navigates to `/[locale]/products/[slug]`; confirm WhatsApp button opens correct pre-filled URL with product name and price in the active locale; verify WhatsApp button `onClick` calls `e.stopPropagation()` to prevent card navigation; verify hover zoom (scale 1.08) on desktop; verify category badge renders in maroon with localized text; verify price renders in champagne gold (`#C9A96E`)
- [x] T014 [US3] Test all 6 products' WhatsApp URLs — for each product, verify the generated URL matches `https://wa.me/971502507859?text=...` with the correct localized localized product name and price in both AR and EN

**Checkpoint**: Every product card correctly links to its detail page and generates a valid WhatsApp URL. All interactions feel polished.

---

## Phase 6: User Story 4 — Scroll-Triggered Animations (Priority: P2)

**Goal**: Premium entrance animations that reinforce the luxury brand experience — staggered product reveals on scroll and smooth AnimatePresence transitions when filtering.

**Independent Test**: Scroll down the page and see products appear with elegant stagger animation. Switch filter tabs and see outgoing products animate out while incoming products animate in.

### Implementation for User Story 4

- [x] T015 [US4] Add stagger reveal animation to `ProductGrid.tsx` — implement container variants (`staggerChildren: 0.12`, `delayChildren: 0.1`) and item variants (`opacity: 0 → 1`, `y: 40 → 0`, `duration: 0.6`, `ease: [0.33, 1, 0.68, 1]`) using Motion; use `useInView` hook with `{ once: true, margin: "-80px 0px" }` to trigger animation when grid enters viewport; wrap each `ProductCard` in a `motion.div` with `variants={itemVariants}`; follow existing pattern from `FeaturedProducts.tsx`; use `useReducedMotion` hook and set `y: 0` and `staggerChildren: 0` when reduced motion is preferred
- [x] T016 [US4] Add AnimatePresence filter transitions to `ProductGrid.tsx` — wrap the product grid in `<AnimatePresence mode="popLayout">` so that when `activeCategory` changes, outgoing cards animate out (`opacity: 0`, `scale: 0.95`, `duration: 0.3`) and incoming cards animate in with the stagger effect; use product `id` as `key` for each `motion.div` to ensure correct identity tracking; respect `prefers-reduced-motion` — skip exit/enter animations when enabled
- [x] T017 [US4] Add subtle entrance animation to `CollectionsHero.tsx` — animate the title and subtitle with a refined fade-up (`opacity: 0 → 1`, `y: 20 → 0`, `duration: 0.8`, `ease: [0.33, 1, 0.68, 1]`) and a slight delay between title and subtitle (stagger 0.2s); animate the gold accent line width from `0 → 64px` with a delay; respect `prefers-reduced-motion`

**Checkpoint**: Scrolling reveals products with an elegant stagger effect. Filter transitions feel smooth and polished. Hero text animates in gracefully. All animations disabled under `prefers-reduced-motion`.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, accessibility, mobile quality, and build check

- [x] T018 Verify RTL/LTR layout for the entire Collections page — test `/ar/collections` and `/en/collections` side by side; confirm: hero text alignment, filter tab order and scroll direction, product grid direction, category badge position (`start-3`), WhatsApp button layout; no misaligned elements in either direction
- [x] T019 Verify no horizontal overflow on mobile at 375px viewport width — resize browser to 375px; check hero banner scales without overflow; check filter tabs scroll horizontally without page overflow; check product grid renders 2 columns correctly; check no content is clipped or overflows
- [x] T020 [P] Add ARIA attributes to interactive elements — `FilterTabs`: add `role="tablist"` on container, `role="tab"` + `aria-selected` on each tab, `aria-label` on the scrollable container; `ProductGrid`: add `aria-live="polite"` so screen readers announce filter changes; hero: add `aria-label` on the section
- [x] T021 [P] Verify lazy loading on product images — confirm all product card images (below the fold) use default lazy loading via `next/image`; hero image should use `priority` prop (above the fold)
- [x] T022 Run `npm run build` — must complete with zero TypeScript errors and zero build warnings
- [x] T023 Run quickstart.md validation — follow all 8 test scenarios in `specs/005-collections-page/quickstart.md` and verify each passes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Phase 2 — hero + grid
- **User Story 2 (Phase 4)**: Depends on Phase 3 (needs ProductGrid) — adds filtering
- **User Story 3 (Phase 5)**: Depends on Phase 3 (needs ProductCard in grid) — verifies card interactions
- **User Story 4 (Phase 6)**: Depends on Phases 3 + 4 (needs grid + filter transitions) — adds animations
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (Browse All)**: Can start after Foundational. No story dependencies.
- **US2 (Filter)**: Depends on US1 (needs the grid to be in place).
- **US3 (Card Interaction)**: Can start after US1 (needs cards in grid). Can run parallel with US2.
- **US4 (Animations)**: Depends on US1 + US2 (needs grid + filter state for AnimatePresence).

### Parallel Opportunities

- T002 + T003 (translation files) — parallel, different files
- T006 + T007 (hero + grid) — parallel after T005, different files
- T013 + T010 — US3 verification can run parallel with US2 FilterTabs creation (different files)
- T015 + T017 (grid animations + hero animations) — parallel, different files
- T020 + T021 (ARIA + lazy loading) — parallel, different concerns

---

## Parallel Example: Phase 3 (User Story 1)

```text
# After T005 (CollectionsContent) is complete, launch in parallel:
Task T006: Create CollectionsHero.tsx
Task T007: Create ProductGrid.tsx
Task T009: Add placeholder hero image

# Then integrate:
Task T008: Wire hero + grid into CollectionsContent.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T003)
2. Complete Phase 2: Foundational (T004–T005)
3. Complete Phase 3: User Story 1 — Browse All Products (T006–T009)
4. **STOP and VALIDATE**: Page shows hero + all 6 products in premium grid
5. The page is usable and looks professional at this point

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (Browse All) → Premium hero + grid visible → **MVP!**
3. Add US2 (Filter) → Category filtering with smooth indicator
4. Add US3 (Card Interaction) → WhatsApp + navigation verified
5. Add US4 (Animations) → Stagger reveals + filter transitions
6. Polish → Accessibility, mobile QA, build check

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- **Design emphasis**: every component must reflect luxury aesthetics — generous spacing, elegant typography, refined micro-interactions, and sophisticated color treatment
