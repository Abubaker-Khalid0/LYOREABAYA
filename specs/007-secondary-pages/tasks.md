# Tasks: Secondary Pages (007)

**Input**: Design documents from `/specs/007-secondary-pages/`
**Branch**: `007-secondary-pages`
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Quickstart**: [quickstart.md](./quickstart.md)

**Tests**: Not requested — constitution prohibits unit tests. Manual verification via browser + `npm run build`.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add the `generateExchangeRequestUrl()` function and correct translation files before any page can be implemented. These are blocking prerequisites shared by all three user stories.

- [x] T001 Add `generateExchangeRequestUrl(locale)` function to `src/lib/whatsapp.ts` — returns `wa.me/971502507859` URL with Arabic/English exchange request message
- [x] T002 [P] Add missing `contact.subtitle` and `contact.whatsappHint` keys to `messages/ar.json`
- [x] T003 [P] Add missing `contact.subtitle` and `contact.whatsappHint` keys to `messages/en.json`
- [x] T004 [P] Add missing `sizeGuide.subtitle` and `sizeGuide.steps.*` keys (height, heightDesc, chest, chestDesc, waist, waistDesc) to `messages/ar.json`
- [x] T005 [P] Add missing `sizeGuide.subtitle` and `sizeGuide.steps.*` keys to `messages/en.json`
- [x] T006 [P] Add missing `returns.subtitle`, `returns.shippingTitle`, `returns.returnsTitle`, `returns.exchangeCta` keys to `messages/ar.json`; correct `returns.shippingPolicy` to "٢-٥ أيام عمل"; correct `returns.returnsPolicy` to exchange-only wording
- [x] T007 [P] Add missing `returns.subtitle`, `returns.shippingTitle`, `returns.returnsTitle`, `returns.exchangeCta` keys to `messages/en.json`; correct `returns.shippingPolicy` to "2–5 business days"; correct `returns.returnsPolicy` to exchange-only wording

**Checkpoint**: T001–T007 complete → translations correct, utility ready → all three pages can be built

---

## Phase 2: Foundational (Route Files — Unblocked after Phase 1)

**Purpose**: Create the three empty page route files so Next.js registers the routes. These are the server component shells — no content yet.

- [x] T008 [P] Create `src/app/[locale]/contact/page.tsx` — server component with `generateMetadata` (using `contact.title`, `contact.subtitle`) and `<ContactContent locale={locale} />` render call
- [x] T009 [P] Create `src/app/[locale]/size-guide/page.tsx` — server component with `generateMetadata` (using `sizeGuide.title`, `sizeGuide.subtitle`) and `<SizeGuideContent locale={locale} />` render call
- [x] T010 [P] Create `src/app/[locale]/returns/page.tsx` — server component with `generateMetadata` (using `returns.title`, `returns.subtitle`) and `<ReturnsContent locale={locale} />` render call

**Checkpoint**: Routes exist, build passes (stubs may be needed) — user story pages can now be implemented in parallel

---

## Phase 3: User Story 1 — Contact the Store (Priority: P1) 🎯 MVP

**Goal**: Customers can visit `/[locale]/contact` and find all six contact channels (WhatsApp, Phone, Email, Instagram, TikTok, Snapchat) with correct working links in both AR and EN.

**Independent Test**: Navigate to `/ar/contact` and `/en/contact`. All six cards render, each link opens the correct destination, page title and meta description are locale-correct, WhatsApp FAB is visible, RTL layout is correct in Arabic.

### Implementation for User Story 1

- [x] T011 [US1] Create `src/components/sections/ContactContent.tsx` as a `"use client"` component with Props interface `{ locale: "ar" | "en" }` — define `CONTACT_CHANNELS` constant array with: WhatsApp (`wa.me/971502507859`), Phone (`tel:+971502507859`), Email (`mailto:info@lyoreabaya.com`), Instagram (`https://www.instagram.com/lyoreabaya`), TikTok (`https://www.tiktok.com/@lyoreabaya`), Snapchat (`https://www.snapchat.com/add/lyoreabaya`)
- [x] T012 [US1] In `ContactContent.tsx`: render minimal text-only page header with `<h1>` using `t("title")` and subtitle `t("subtitle")` — `pt-32` to clear fixed Navbar, no background image [FR-033]
- [x] T013 [US1] In `ContactContent.tsx`: render responsive card grid (1 col → 2 col md → 3 col lg) mapping `CONTACT_CHANNELS` — each card shows icon + translated label + hover/focus styles; external links use `target="_blank" rel="noopener noreferrer"` [FR-002, FR-009]
- [x] T014 [US1] In `ContactContent.tsx`: wrap card entrance in `motion.div` with `initial/animate/whileHover` variants; gate framer animation on `!prefersReducedMotion` using `useReducedMotion` hook [FR-031]
- [x] T015 [US1] Verify all six contact channel links open correctly in both locales; verify `aria-label` on each card; verify RTL card layout in `/ar/contact` [FR-010, FR-030, SC-001]

**Checkpoint**: `/ar/contact` and `/en/contact` fully functional — all six cards working, RTL correct, SEO metadata present

---

## Phase 4: User Story 2 — Find the Right Size (Priority: P1)

**Goal**: Customers can visit `/[locale]/size-guide` and view the XS–XXL measurement table, a How-to-Measure section with icons, and a WhatsApp CTA — all in both AR and EN.

**Independent Test**: Navigate to `/ar/size-guide` and `/en/size-guide`. Text-only page header visible. Size table has 6 rows with correct measurements. Table is horizontally scrollable at 375px. How-to-Measure section shows 3 icon-accompanied steps. WhatsApp CTA opens correct `wa.me` URL.

### Implementation for User Story 2

- [x] T016 [US2] Create `src/components/sections/SizeGuideContent.tsx` as a `"use client"` component with Props interface `{ locale: "ar" | "en" }` — define `SIZE_TABLE` constant (XS–XXL with height/chest/waist ranges) and `MEASUREMENT_STEPS` constant (3 steps: height/IconRuler2, chest/IconArrowsHorizontal, waist/IconArrowsVertical from `@tabler/icons-react`)
- [x] T017 [US2] In `SizeGuideContent.tsx`: render minimal text-only page header with `<h1>` using `t("title")` and `t("subtitle")` [FR-033]
- [x] T018 [US2] In `SizeGuideContent.tsx`: render How-to-Measure section — map `MEASUREMENT_STEPS` to a 3-column responsive grid (1 col mobile, 3 col md); each item shows Tabler icon + `t("steps.[key]")` title + `t("steps.[key]Desc")` description [FR-015]
- [x] T019 [US2] In `SizeGuideContent.tsx`: render size table wrapped in `overflow-x-auto` div for mobile scrollability; columns use `t("headers.size")`, `t("headers.length")`, `t("headers.chest")`, `t("headers.waist")`; map `SIZE_TABLE` to `<tr>` rows [FR-013, FR-014]
- [x] T020 [US2] In `SizeGuideContent.tsx`: render WhatsApp CTA section below the table — button text `t("cta")`, `href` via `generateGenericInquiryUrl(locale)` — `motion.div` entrance animation gated on `!prefersReducedMotion` [FR-016, FR-017]
- [x] T021 [US2] Verify at 375px width the table scrolls without page overflow; verify RTL table layout in `/ar/size-guide`; verify WhatsApp CTA URL in both locales [FR-014, FR-018, SC-003]

**Checkpoint**: `/ar/size-guide` and `/en/size-guide` fully functional — table readable at 375px, WhatsApp CTA working, RTL correct

---

## Phase 5: User Story 3 — Understand Shipping & Returns Policy (Priority: P2)

**Goal**: Customers can visit `/[locale]/returns` and read the free shipping policy, the exchange-only 7-day policy, and contact the store via WhatsApp to initiate an exchange.

**Independent Test**: Navigate to `/ar/returns` and `/en/returns`. Text-only page header visible. Free shipping banner prominent. Shipping section shows 2–5 business days. Exchange section shows exchange-only, 7-day, unworn/tagged/original-packaging policy. WhatsApp CTA opens exchange request URL. "Return/refund" terminology is absent — only "exchange" used.

### Implementation for User Story 3

- [x] T022 [US3] Create `src/components/sections/ReturnsContent.tsx` as a `"use client"` component with Props interface `{ locale: "ar" | "en" }`
- [x] T023 [US3] In `ReturnsContent.tsx`: render minimal text-only page header with `<h1>` using `t("title")` and `t("subtitle")` [FR-033]
- [x] T024 [US3] In `ReturnsContent.tsx`: render full-width Free Shipping banner — maroon background (`#550000`), white text, Truck icon (Lucide), text `t("freeShipping")` [FR-021]
- [x] T025 [US3] In `ReturnsContent.tsx`: render Shipping Policy card — Package icon (Lucide), `t("shippingTitle")` heading, `t("shippingPolicy")` body (must read "2–5 business days" / "٢-٥ أيام عمل") [FR-022]
- [x] T026 [US3] In `ReturnsContent.tsx`: render Exchange Policy card — ArrowLeftRight icon (Lucide), `t("returnsTitle")` heading, `t("returnsPolicy")` body (exchange-only, 7-day, unworn/tagged/original packaging) [FR-023]
- [x] T027 [US3] In `ReturnsContent.tsx`: render WhatsApp CTA for exchange requests — button text `t("exchangeCta")`, `href` via `generateExchangeRequestUrl(locale)` from `src/lib/whatsapp.ts` — `motion.div` entrance animation gated on `!prefersReducedMotion` [FR-024]
- [x] T028 [US3] Verify "return/refund" terminology is absent from rendered page in both locales; verify WhatsApp CTA opens exchange-specific message; verify RTL layout in `/ar/returns` [FR-025, SC-005]

**Checkpoint**: `/ar/returns` and `/en/returns` fully functional — exchange policy clearly stated, WhatsApp CTA working, terminology correct

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, animation, build validation, and final cross-page checks across all three pages.

- [x] T029 [P] Add `aria-label` to every interactive element (contact cards, WhatsApp CTAs, Size Guide table) across `ContactContent.tsx`, `SizeGuideContent.tsx`, `ReturnsContent.tsx` — verify Lighthouse Accessibility ≥ 95 on all three pages [FR-030, SC-007]
- [x] T030 [P] Verify `prefers-reduced-motion` is respected on all `motion.div` entrance animations across all three section components — no motion if OS setting is reduced [FR-031]
- [x] T031 [P] Verify all three pages have correct `<h1>` hierarchy (one per page), correct `<title>` and meta description in both locales, and that the WhatsApp FAB is visible on each page [FR-027, FR-028, FR-029, SC-010]
- [x] T032 [P] Verify no horizontal overflow at 375px viewport on Contact page (card grid) and Returns page (policy cards); Size Guide table scrolls independently [SC-003, FR-014]
- [x] T033 Run `npm run build` — confirm zero TypeScript errors, zero build warnings across all new files (`page.tsx` × 3, `*Content.tsx` × 3, `whatsapp.ts`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately. T002–T007 all parallelizable.
- **Phase 2 (Routes)**: Depends on Phase 1 completion. T008–T010 all parallelizable with each other.
- **Phase 3 (US1 Contact)**: Depends on Phase 2. T011–T015 sequential within US1.
- **Phase 4 (US2 Size Guide)**: Depends on Phase 2 only — **independent of Phase 3** (different file).
- **Phase 5 (US3 Returns)**: Depends on T001 (generateExchangeRequestUrl) and Phase 2 only.
- **Phase 6 (Polish)**: Depends on Phases 3, 4, and 5 all complete. T029–T032 parallelizable.

### User Story Dependencies

- **US1 (Contact)**: Independent after Phase 2
- **US2 (Size Guide)**: Independent after Phase 2 — can run in parallel with US1
- **US3 (Returns)**: Independent after Phase 1 (T001) and Phase 2 — can run in parallel with US1 and US2

### Within Each User Story

- Page route file (Phase 2) → Section component scaffold (T011/T016/T022) → Header render → Content render → CTA render → Verification

### Parallel Opportunities

- T002–T007: All translation tasks can run simultaneously (different files/keys)
- T008–T010: All route files can be created simultaneously
- US1 (T011–T015) ‖ US2 (T016–T021) ‖ US3 (T022–T028): All three stories after Phase 2
- T029–T032: All polish tasks run simultaneously

---

## Parallel Example: Phases 1–2

```
# Phase 1 — run all simultaneously:
T002: ar.json contact keys
T003: en.json contact keys
T004: ar.json sizeGuide keys
T005: en.json sizeGuide keys
T006: ar.json returns keys + corrections
T007: en.json returns keys + corrections
T001: whatsapp.ts new function (independent file)

# Phase 2 — after Phase 1 complete, run simultaneously:
T008: contact/page.tsx
T009: size-guide/page.tsx
T010: returns/page.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 — Contact Page)

1. Complete Phase 1: Setup (T001–T007)
2. Complete Phase 2: Routes (T008–T010, focus on T008)
3. Complete Phase 3: Contact page (T011–T015)
4. **STOP and VALIDATE**: All six contact cards work, RTL correct, SEO present
5. Ship Contact page as standalone MVP

### Incremental Delivery

1. Phase 1 + Phase 2 → Routes registered, translations correct
2. Phase 3 (Contact) → First complete secondary page ✅
3. Phase 4 (Size Guide) → Reduces sizing hesitation, increases conversion confidence ✅
4. Phase 5 (Returns) → Completes policy transparency ✅
5. Phase 6 (Polish) → Accessibility ≥ 95, build clean ✅

### Parallel Team Strategy

After Phase 1 + 2:
- **Agent A**: Phase 3 — Contact page (T011–T015)
- **Agent B**: Phase 4 — Size Guide page (T016–T021)
- **Agent C**: Phase 5 — Returns page (T022–T028)

---

## Notes

- Total tasks: **33**
- Phase 1 (Setup): 7 tasks | Phase 2 (Routes): 3 tasks
- US1 (Contact): 5 tasks | US2 (Size Guide): 6 tasks | US3 (Returns): 7 tasks | Polish: 5 tasks
- All tasks include exact file paths
- No test tasks — constitution prohibits unit tests; verification tasks (T015, T021, T028, T029–T033) are manual browser checks
- `[P]` tasks = different files, safe to run in parallel
- Commit after each phase checkpoint
