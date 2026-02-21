# Tasks: i18n & Content Foundation

**Feature Branch**: `002-i18n-content-foundation`  
**Spec**: [spec.md](file:///C:/Users/DELL/Documents/projects/LYORE-ABAYA/specs/002-i18n-content-foundation/spec.md)  
**Plan**: [plan.md](file:///C:/Users/DELL/Documents/projects/LYORE-ABAYA/specs/002-i18n-content-foundation/plan.md)

## Implementation Strategy

We will build the foundation (translations and data layer) first, then verify the bilingual browsing and language switching capabilities, followed by the product data population and finally the WhatsApp ordering logic. Each phase is designed to be an incrementally testable slice of the feature.

## Phase 1: Setup

- [x] T001 Verify project structure and `next-intl` configuration alignment in `src/i18n/routing.ts` and `src/middleware.ts`

## Phase 2: Foundational

- [x] T002 [P] Expand `messages/ar.json` with all 15 content sections (announcement, nav, hero, product, about, collections, sizeGuide, contact, returns, footer, common, etc.)
- [x] T003 [P] Expand `messages/en.json` mirroring the exact same key structure as `ar.json` with English translations
- [x] T004 [P] Implement `generateWhatsAppUrl` utility function in `src/lib/whatsapp.ts` using constants from the constitution

## Phase 3: User Story 1 & 2 — Bilingual Content & Switching

**Goal**: Full coverage of translated strings and working locale switching (RTL/LTR).

**Independent Test**: Loading `/ar/` shows all text in Arabic (RTL); loading `/en/` shows all text in English (LTR). No hardcoded strings.

- [x] T005 [US1] [US2] Verify all translation keys render without warnings in the browser at `/ar/`
- [x] T006 [US1] [US2] Verify all translation keys render without warnings in the browser at `/en/`
- [x] T007 [US1] [US2] Confirm `dir` attribute and font family switch correctly between locales per constitution in `src/app/[locale]/layout.tsx`

## Phase 4: User Story 3 — Product Catalog

**Goal**: Populate source of truth for all products.

**Independent Test**: `src/data/products.ts` contains 6 unique products with full bilingual metadata.

- [x] T008 [US3] Populate `src/data/products.ts` with 6 products (3 Winter, 3 Summer categories) following `data-model.md` distribution
- [x] T009 [US3] Ensure realistic bilingual names, descriptions, and category labels for all placeholder products in `src/data/products.ts`

## Phase 5: User Story 4 — WhatsApp Ordering

**Goal**: Functional WhatsApp order link generation.

**Independent Test**: Calling `generateWhatsAppUrl` with product data returns a valid URL for the store number.

- [x] T010 [US4] Integrate `generateWhatsAppUrl` with bilingual product data in `src/lib/whatsapp.ts`
- [x] T011 [US4] Verify WhatsApp URL pre-fills product name, price, size, and color in the correct language format

## Phase 6: Polish

- [x] T012 Perform a final sweep to ensure zero hardcoded strings exist in any component
- [x] T013 Run production build via `npm run build` to confirm zero TypeScript or linting errors

---

## Dependencies

1. **Foundational (Phase 2)** must complete before Story phases.
2. **Product Catalog (US3)** should complete before **WhatsApp Ordering (US4)** to provide real data for link generation.

## Parallel Execution

- T002, T003, and T004 can be implemented in parallel as they touch different files (`ar.json`, `en.json`, `whatsapp.ts`).
- T005 and T006 can be tested in parallel.
