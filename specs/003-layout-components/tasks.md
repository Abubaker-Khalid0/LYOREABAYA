# Tasks: Layout Components

**Input**: Design documents from `/specs/003-layout-components/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Tests**: No tests — constitution prohibits unit tests.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create shared constants and translation keys needed by all layout components

- [x] T001 [P] Create shared navigation constants (nav links, social links, contact info) in `src/lib/navigation.ts`
- [x] T002 [P] Add missing translation keys (`notFound.*`, `nav.returns`, `announcement.dismiss`) to `messages/ar.json`
- [x] T003 [P] Add missing translation keys (`notFound.*`, `nav.returns`, `announcement.dismiss`) to `messages/en.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create the LanguageSwitcher component — used by both Navbar (US1) and MobileDrawer (US2)

**⚠️ CRITICAL**: Navbar and MobileDrawer both depend on this component

- [x] T004 Create LanguageSwitcher component using next-intl `useRouter`/`usePathname` in `src/components/layout/LanguageSwitcher.tsx`

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 - Site-Wide Navigation (Priority: P1) 🎯 MVP

**Goal**: Desktop visitors see a fixed navbar with logo, nav links, language switcher, and a transparent → solid scroll transition at 100vh

**Independent Test**: Load any page at desktop width. Verify logo + nav links visible. Scroll past hero to see background transition. Click links to navigate between pages.

### Implementation for User Story 1

- [x] T005 [US1] Create Navbar component with logo, navigation links (from `navigation.ts`), LanguageSwitcher, fixed positioning, and scroll-aware background transition (transparent → solid maroon at `scrollY > innerHeight`) using Motion in `src/components/layout/Navbar.tsx`
- [x] T006 [US1] Import and render Navbar inside `NextIntlClientProvider` in `src/app/[locale]/layout.tsx` (place between AnnouncementBar placeholder and `{children}`)

**Checkpoint**: Desktop navigation is fully functional with scroll effect and language switching

---

## Phase 4: User Story 2 - Mobile Navigation Experience (Priority: P1)

**Goal**: Mobile visitors see a hamburger icon that opens a full-screen drawer with nav links and language switcher

**Independent Test**: Resize browser to 375px. Verify hamburger icon visible. Tap to open drawer with slide-in animation. Test close via X, backdrop, and link navigation.

### Implementation for User Story 2

- [x] T007 [US2] Create MobileDrawer component with full-screen overlay, Motion `AnimatePresence` slide-in from `inset-inline-start`, nav links, LanguageSwitcher, close on X/backdrop/navigation in `src/components/layout/MobileDrawer.tsx`
- [x] T008 [US2] Integrate MobileDrawer into Navbar — add hamburger icon (Lucide `Menu`) visible on mobile, toggle MobileDrawer open/close state in `src/components/layout/Navbar.tsx`

**Checkpoint**: Mobile navigation drawer works with all close triggers and respects RTL/LTR

---

## Phase 5: User Story 3 - Language Switching (Priority: P1)

**Goal**: Visitors can toggle between AR (RTL) and EN (LTR) and see all text, direction, and fonts update

**Independent Test**: Click the AR|EN toggle in navbar (desktop) or mobile drawer. Verify page direction flips, fonts change, and all text updates to the selected language.

### Implementation for User Story 3

- [x] T009 [US3] Verify end-to-end language switching flow — ensure Navbar links, page content, and Footer all update when toggling locale via LanguageSwitcher in both desktop and mobile contexts

> Note: LanguageSwitcher was built in T004 and integrated in T005/T007. This task is a verification and integration pass — fix any issues found with locale switching across components.

**Checkpoint**: Language switching works seamlessly across all layout components

---

## Phase 6: User Story 4 - Announcement Bar Visibility (Priority: P2)

**Goal**: Visitors see a promotional bar at the top of every page with marquee on mobile, dismissible via X with sessionStorage persistence

**Independent Test**: Load any page and verify bar is visible with maroon background. Dismiss it, navigate to another page, verify it stays hidden. Close tab, reopen, verify it reappears.

### Implementation for User Story 4

- [x] T010 [US4] Create AnnouncementBar component with maroon bg, translated text, CSS marquee on mobile, static text on desktop, X dismiss button with Motion collapse animation, sessionStorage persistence (try-catch for graceful degradation), `prefers-reduced-motion` support in `src/components/layout/AnnouncementBar.tsx`
- [x] T011 [US4] Import and render AnnouncementBar as the first child in the body, above Navbar, in `src/app/[locale]/layout.tsx`

**Checkpoint**: Announcement bar is visible, dismissible, and session-persistent on all pages

---

## Phase 7: User Story 5 - Footer Information Access (Priority: P2)

**Goal**: Visitors see a comprehensive footer with logo, tagline, quick links, social media icons (Lucide), contact info, and copyright

**Independent Test**: Scroll to bottom of any page. Verify all links work, social icons open correct profiles in new tabs, WhatsApp/email/phone links are functional, RTL layout is mirrored.

### Implementation for User Story 5

- [x] T012 [US5] Create Footer component with LYORE SVG logo, brand tagline, quick links (from `navigation.ts`), social media icons (Lucide `Instagram`, `MessageCircle` for TikTok, `Ghost` for Snapchat or closest match), contact section (WhatsApp `wa.me`, email `mailto:`, phone `tel:`), copyright text — all from translations, responsive grid, logical CSS properties in `src/components/layout/Footer.tsx`
- [x] T013 [US5] Import and render Footer as the last child in the body, after `{children}`, in `src/app/[locale]/layout.tsx`

**Checkpoint**: Footer renders completely with working links and RTL support

---

## Phase 8: User Story 6 - Consistent Page Layout (Priority: P1)

**Goal**: Every page (including 404) wraps content in a consistent layout shell with AnnouncementBar + Navbar + content + Footer, correct direction and fonts

**Independent Test**: Navigate between Home, Collections, Size Guide, Contact, and a nonexistent URL (404). Verify all pages show identical layout shell with correct locale direction and fonts.

### Implementation for User Story 6

- [x] T014 [US6] Finalize `src/app/[locale]/layout.tsx` — ensure body has `min-h-screen flex flex-col` for sticky footer, main content area has `flex-1`, and all layout components are in correct order: AnnouncementBar → Navbar → `<main>{children}</main>` → Footer
- [x] T015 [US6] Create 404 page with brand-consistent "Page Not Found" message and "Return to Home" CTA button using translation keys in `src/app/[locale]/not-found.tsx`

**Checkpoint**: All pages including 404 have a consistent layout shell

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, motion preferences, and build verification

- [x] T016 [P] Add `prefers-reduced-motion` checks to all Motion animations in Navbar, MobileDrawer, and AnnouncementBar — disable or reduce animations when user prefers reduced motion
- [x] T017 [P] Add proper ARIA attributes to all interactive elements — hamburger button (`aria-expanded`, `aria-label`), drawer (`role="dialog"`, `aria-modal`), dismiss button (`aria-label`), nav links (`aria-current`)
- [x] T018 [P] Verify all layout components render without horizontal overflow at 375px viewport width
- [x] T019 Run `npm run build` to verify zero TypeScript errors and zero build warnings
- [x] T020 Visual verification in browser — test all 8 scenarios from the verification plan in `plan.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — T001, T002, T003 can all run in parallel
- **Foundational (Phase 2)**: T004 depends on T001 (imports from `navigation.ts`)
- **US1 (Phase 3)**: T005 depends on T004 (uses LanguageSwitcher); T006 depends on T005
- **US2 (Phase 4)**: T007 depends on T004; T008 depends on T005 + T007
- **US3 (Phase 5)**: T009 depends on T005 + T007 (verification pass)
- **US4 (Phase 6)**: T010 depends on T001 (translations); T011 depends on T010
- **US5 (Phase 7)**: T012 depends on T001; T013 depends on T012
- **US6 (Phase 8)**: T014 depends on T006 + T011 + T013; T015 depends on T014
- **Polish (Phase 9)**: T016–T020 depend on all implementation phases

### User Story Dependencies

- **US1 (Navigation)**: Depends only on Foundational → can start first
- **US2 (Mobile Drawer)**: Depends on US1 (integrates into Navbar) → must follow US1
- **US3 (Language Switching)**: Depends on US1 + US2 → verification pass after both
- **US4 (Announcement Bar)**: Depends only on Setup → can run in parallel with US1
- **US5 (Footer)**: Depends only on Setup → can run in parallel with US1
- **US6 (Layout Shell)**: Depends on US1 + US4 + US5 → runs after all components exist

### Parallel Opportunities

- **Phase 1**: T001, T002, T003 — all different files, fully parallel
- **Phase 6 + Phase 7**: US4 (AnnouncementBar) and US5 (Footer) can run in parallel — different files, no dependencies on each other
- **Phase 9**: T016, T017, T018 — all independent cross-cutting concerns

---

## Parallel Example: Setup Phase

```bash
# All setup tasks in parallel:
Task T001: "Create navigation constants in src/lib/navigation.ts"
Task T002: "Add translation keys to messages/ar.json"
Task T003: "Add translation keys to messages/en.json"
```

## Parallel Example: US4 + US5

```bash
# AnnouncementBar and Footer in parallel:
Task T010: "Create AnnouncementBar in src/components/layout/AnnouncementBar.tsx"
Task T012: "Create Footer in src/components/layout/Footer.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T003)
2. Complete Phase 2: Foundational (T004)
3. Complete Phase 3: User Story 1 — Navbar (T005–T006)
4. **STOP and VALIDATE**: Navbar is visible and functional with scroll effect and language switching
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (Navbar) → Test → visible navigation (MVP!)
3. Add US2 (MobileDrawer) → Test → mobile navigation works
4. Add US4 + US5 (AnnouncementBar + Footer) → Test → full page chrome
5. Add US6 (Layout Shell + 404) → Test → consistent across all pages
6. Polish → Build verification → Done

---

## Notes

- Constitution prohibits unit tests — verification is via `npm run build` + visual browser testing
- All text MUST come from translation files — no hardcoded strings
- All interactive animations MUST use Motion — CSS only for non-interactive (marquee)
- Use logical CSS properties (`start`/`end`) — never hardcode `left`/`right`
- Commit after each task or logical group
