# Tasks: Phase 1 — Foundation & Setup

**Input**: Design documents from `/specs/001-foundation-setup/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅  
**Tests**: Not requested (constitution PROHIBITS unit tests)

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Initialize the Next.js project and install all mandated dependencies

- [x] T001 Initialize Next.js 15 project with `npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --use-npm` in project root
- [x] T002 Install runtime dependencies with `npm install motion next-intl lucide-react` in project root
- [x] T003 Install dev dependency with `npm install -D tailwindcss-rtl` in project root
- [x] T004 Initialize shadcn/ui with `npx shadcn@latest init` configured to use `src/components/ui/`

**Checkpoint**: `npm run dev` starts the default Next.js app without errors

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before any user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Create mandatory directory `src/components/layout/` with `.gitkeep` file
- [x] T006 [P] Create mandatory directory `src/components/sections/` with `.gitkeep` file
- [x] T007 [P] Create mandatory directory `src/data/` with `.gitkeep` file
- [x] T008 [P] Create mandatory directory `public/images/` with `.gitkeep` file
- [x] T009 Create placeholder `messages/ar.json` with sample key `{"app.title": "لـيـور عباية"}` in `messages/ar.json`
- [x] T010 [P] Create placeholder `messages/en.json` with sample key `{"app.title": "LYORE ABAYA"}` in `messages/en.json`
- [x] T011 Create `src/data/products.ts` with the `Product` interface and empty typed array `export const products: Product[] = []`

**Checkpoint**: All mandatory directories and placeholder files exist per constitution

---

## Phase 3: User Story 1 - Developer Initializes the Project (Priority: P1) 🎯 MVP

**Goal**: A developer can clone, install, and run `npm run dev` with zero errors. Design tokens are visible in the browser.

**Independent Test**: Run `npm run dev`, open browser, verify zero console errors and CSS custom properties `--color-primary` through `--color-text` are available.

### Implementation for User Story 1

- [x] T012 [US1] Define CSS custom properties for all 6 design tokens in `:root` block in `src/app/globals.css`
- [x] T013 [US1] Extend Tailwind theme in `tailwind.config.ts` to map design token CSS variables to Tailwind color utilities (e.g., `primary`, `secondary`, `accent`, `background`, `surface`, `text`)
- [x] T014 [US1] Add `tailwindcss-rtl` plugin to `plugins` array in `tailwind.config.ts`
- [x] T015 [US1] Verify `npm run dev` starts with zero errors and design tokens render on the default page at `http://localhost:3000`

**Checkpoint**: US1 complete — `npm run dev` runs, design tokens available globally, zero console errors

---

## Phase 4: User Story 2 - Bilingual RTL/LTR Rendering (Priority: P1)

**Goal**: Arabic route (`/ar/`) renders RTL with Arabic fonts, English route (`/en/`) renders LTR with English fonts.

**Independent Test**: Navigate to `/ar/` and `/en/` in browser. Verify `dir` attribute, `lang` attribute, and font families via DevTools inspection.

### Implementation for User Story 2

- [x] T016 [US2] Create font configuration file at `src/lib/fonts.ts` using `next/font/google` to load Playfair Display, Inter, Noto Naskh Arabic, and Tajawal with appropriate subsets and `fallback` options (`['serif']` for heading fonts, `['sans-serif']` for body fonts)
- [x] T017 [US2] Create `i18n/routing.ts` defining locales `['ar', 'en']` with default locale `'ar'` using `defineRouting` from `next-intl/routing`
- [x] T018 [US2] Create `i18n/request.ts` to load translation messages via `getRequestConfig` from `next-intl/server`
- [x] T019 [US2] Create locale middleware at `middleware.ts` in project root using `createMiddleware` from `next-intl/middleware` with the routing config
- [x] T020 [US2] Update `next.config.ts` to integrate `createNextIntlPlugin` from `next-intl/plugin` wrapping the config
- [x] T021 [US2] Rewrite `src/app/[locale]/layout.tsx` to set `dir="rtl"|"ltr"` and `lang="ar"|"en"` on `<html>` based on locale, apply locale-specific font classes (Arabic fonts for `ar`, English fonts for `en`), and import `globals.css`
- [x] T022 [US2] Rewrite `src/app/[locale]/page.tsx` as a placeholder home page using `useTranslations` from `next-intl` to display translated text confirming i18n works
- [x] T023 [US2] Verify `/ar/` renders with `dir="rtl"`, Arabic heading font (Noto Naskh Arabic), and Arabic body font (Tajawal) via browser DevTools
- [x] T024 [US2] Verify `/en/` renders with `dir="ltr"`, English heading font (Playfair Display), and English body font (Inter) via browser DevTools
- [x] T025 [US2] Verify navigating to `/` redirects to `/ar/` (default locale redirect)

**Checkpoint**: US2 complete — both locales render with correct direction, fonts, and translated text

---

## Phase 5: User Story 3 - Design System Tokens Are Globally Available (Priority: P2)

**Goal**: Any component can reference design tokens without local definitions. Tokens work with both CSS `var()` and Tailwind utility classes.

**Independent Test**: Create a temporary test element using Tailwind `bg-primary` and `text-accent` classes, verify correct colors render.

### Implementation for User Story 3

- [x] T026 [US3] Update `src/app/[locale]/page.tsx` to include sample elements demonstrating all 6 design tokens via both CSS `var(--color-*)` and Tailwind utility classes (`bg-primary`, `text-accent`, etc.)
- [x] T027 [US3] Verify all 6 design token CSS custom properties (`--color-primary`, `--color-secondary`, `--color-accent`, `--color-background`, `--color-surface`, `--color-text`) are accessible on any rendered page via browser DevTools computed `:root` styles

**Checkpoint**: US3 complete — tokens accessible globally via CSS variables and Tailwind classes

---

## Phase 6: User Story 4 - Folder Structure Matches Constitution (Priority: P2)

**Goal**: Project directory layout matches constitution exactly. All developers and AI agents can locate files predictably.

**Independent Test**: Run directory listing and verify all mandatory paths exist.

### Implementation for User Story 4

- [x] T028 [US4] Verify directory structure contains all mandatory directories: `src/app/[locale]/`, `src/components/ui/`, `src/components/layout/`, `src/components/sections/`, `src/data/`, `src/lib/`, `messages/`, `public/images/`
- [x] T029 [US4] Verify placeholder files exist: `messages/ar.json`, `messages/en.json`, `src/data/products.ts`, `src/lib/utils.ts`
- [x] T030 [US4] Verify `src/data/products.ts` contains the `Product` interface with all fields from data-model.md (`id`, `slug`, `name`, `description`, `price`, `currency`, `category`, `sizes`, `colors`, `images`, `featured`, `whatsappMessage`)

**Checkpoint**: US4 complete — all directories and files match constitution's mandatory layout

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final verification across all user stories

- [x] T031 Verify `npm run build` completes with zero TypeScript or compilation errors
- [x] T032 Verify no requests to `fonts.googleapis.com` appear in browser Network tab (fonts are self-hosted)
- [x] T033 Verify 375px mobile viewport renders without horizontal scrollbar
- [x] T034 Verify zero console errors on both `/ar/` and `/en/` routes (final recheck after all stories)
- [x] T035 Run quickstart.md validation — verify all checklist items pass
- [x] T036 Verify no hardcoded `left`/`right` CSS in any source file — grep all `.tsx`, `.ts`, and `.css` files for prohibited directional properties (FR-016)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — creates directory structure
- **US1 (Phase 3)**: Depends on Phase 2 — design tokens in `globals.css` + `tailwind.config.ts`
- **US2 (Phase 4)**: Depends on Phase 2 — i18n, fonts, layout (largest phase)
- **US3 (Phase 5)**: Depends on US1 (tokens must exist) + US2 (page must use i18n)
- **US4 (Phase 6)**: Depends on Phase 2 + all file creation from US1/US2
- **Polish (Phase 7)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2 — no dependencies on other stories
- **US2 (P1)**: Can start after Phase 2 — no dependencies on other stories
- **US3 (P2)**: Depends on US1 (tokens) and US2 (i18n page)
- **US4 (P2)**: Verification task — depends on all creation tasks

### Parallel Opportunities

- T005, T006, T007, T008 (directory creation) — all parallelizable
- T009, T010 (translation placeholders) — parallelizable
- T012, T013, T014 (US1 design tokens + Tailwind config) — can be done in one sitting but affect different files
- T016, T017, T018, T019 (US2 font config + i18n setup) — parallelizable (different files)
- US1 and US2 can be implemented in parallel (different file sets)

---

## Parallel Example: Phase 2 (Foundational)

```text
# All directory creation tasks in parallel:
Task T005: Create src/components/layout/.gitkeep
Task T006: Create src/components/sections/.gitkeep
Task T007: Create src/data/.gitkeep
Task T008: Create public/images/.gitkeep

# Translation placeholders in parallel:
Task T009: Create messages/ar.json
Task T010: Create messages/en.json
```

## Parallel Example: US1 + US2 (can run simultaneously)

```text
# US1 track (design tokens):
Task T012: Define CSS custom properties in globals.css
Task T013: Extend Tailwind theme in tailwind.config.ts
Task T014: Add RTL plugin in tailwind.config.ts

# US2 track (i18n + fonts) — independent files:
Task T016: Create src/lib/fonts.ts
Task T017: Create i18n/routing.ts
Task T018: Create i18n/request.ts
Task T019: Create middleware.ts
```

---

## Implementation Strategy

### MVP First (US1 + US2 Only)

1. Complete Phase 1: Setup (T001–T004)
2. Complete Phase 2: Foundational (T005–T011)
3. Complete Phase 3: US1 — Design Tokens (T012–T015)
4. Complete Phase 4: US2 — Bilingual RTL/LTR (T016–T025)
5. **STOP and VALIDATE**: `npm run dev`, test both locales, verify tokens
6. Both P1 stories are now functional

### Full Delivery

1. Setup → Foundational → US1 → US2 → US3 → US4 → Polish
2. Each phase validates independently before proceeding
3. Total tasks: **36**

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Constitution PROHIBITS unit tests — all verification is manual browser inspection
- Commit after each phase checkpoint
- Use `start`/`end` logical properties, never `left`/`right`
- All text must come from `messages/*.json`, never hardcoded
