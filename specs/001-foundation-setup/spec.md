# Feature Specification: Phase 1 — Foundation & Setup

**Feature Branch**: `001-foundation-setup`  
**Created**: 2026-02-20  
**Status**: Draft  
**Input**: User description: "Phase 1 Foundation and Setup — Project scaffold ready, zero bugs, runs locally. Initialize Next.js 15, configure Tailwind CSS v4, shadcn/ui, Motion, next-intl for AR/EN bilingual support, self-hosted fonts, RTL plugin, design system tokens, and project folder structure per Constitution."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Developer Initializes the Project (Priority: P1)

A developer clones the repository and runs the project locally. The application launches without errors and displays a default page with the correct design system tokens (colors, fonts) applied in the browser.

**Why this priority**: Without a working project scaffold, no other phase can begin. This is the absolute foundation of the entire product.

**Independent Test**: Can be fully tested by running `npm run dev` and verifying the application loads in the browser with zero console errors and correct styling.

**Acceptance Scenarios**:

1. **Given** the repository is freshly cloned and dependencies installed, **When** the developer runs `npm run dev`, **Then** the application starts without errors and a page renders in the browser.
2. **Given** the development server is running, **When** the developer opens the browser console, **Then** there are zero errors or unresolved module warnings.
3. **Given** the application is running, **When** the developer inspects the rendered page, **Then** the CSS design tokens (Primary `#550000`, Secondary `#6B1C23`, Accent `#C9A96E`, Background `#FAF7F4`, Surface `#FFFFFF`, Text `#0A0A0A`) are available as CSS custom properties.

---

### User Story 2 - Bilingual RTL/LTR Rendering (Priority: P1)

A user visits the site in Arabic and sees the page rendered right-to-left (RTL) with Arabic fonts (Noto Naskh Arabic for headings, Tajawal for body). When switching to English, the page renders left-to-right (LTR) with English fonts (Playfair Display for headings, Inter for body).

**Why this priority**: The entire website is bilingual (Arabic default + English). If RTL/LTR and font switching do not work from day one, every subsequent component built on top will have directional bugs.

**Independent Test**: Can be tested by navigating to `/ar/` and `/en/` routes and verifying text direction, font rendering, and layout mirroring.

**Acceptance Scenarios**:

1. **Given** the application is running, **When** the user navigates to the Arabic route (`/ar/`), **Then** the page's `dir` attribute is set to `rtl` and content flows right-to-left.
2. **Given** the application is running, **When** the user navigates to the English route (`/en/`), **Then** the page's `dir` attribute is set to `ltr` and content flows left-to-right.
3. **Given** the Arabic route is active, **When** the browser inspects heading text, **Then** the font family applied is Noto Naskh Arabic.
4. **Given** the English route is active, **When** the browser inspects heading text, **Then** the font family applied is Playfair Display.
5. **Given** the Arabic route is active, **When** the browser inspects body text, **Then** the font family applied is Tajawal.
6. **Given** the English route is active, **When** the browser inspects body text, **Then** the font family applied is Inter.

---

### User Story 3 - Design System Tokens Are Globally Available (Priority: P2)

A developer building any component can reference the project's design tokens (colors, fonts) without defining them locally. The tokens are centrally defined and available across all pages and components.

**Why this priority**: Consistent visual identity across the entire site depends on centralized tokens. Without them, every component risks color or font drift.

**Independent Test**: Can be tested by creating a simple component that references design tokens and verifying the correct styles render.

**Acceptance Scenarios**:

1. **Given** the design system is configured, **When** a developer uses the primary color token (e.g., `var(--color-primary)` or the Tailwind equivalent), **Then** the rendered color is `#550000`.
2. **Given** the design system is configured, **When** a developer uses the accent color token, **Then** the rendered color is `#C9A96E`.
3. **Given** the design system is configured, **When** a developer uses any design token, **Then** it is available without additional imports or local definitions.

---

### User Story 4 - Project Folder Structure Matches Constitution (Priority: P2)

The project directory layout matches the mandatory file structure defined in the constitution, ensuring all developers and AI agents can locate files predictably.

**Why this priority**: A standardized folder structure prevents confusion and merge conflicts as the team adds components in later phases.

**Independent Test**: Can be tested by inspecting the directory tree and verifying it matches the constitution's mandatory layout.

**Acceptance Scenarios**:

1. **Given** the project is initialized, **When** the directory structure is inspected, **Then** it contains `src/app/[locale]/`, `src/components/ui/`, `src/components/layout/`, `src/components/sections/`, `src/data/`, and `src/lib/` directories.
2. **Given** the project is initialized, **When** a developer checks for the messages directory, **Then** `/messages/ar.json` and `/messages/en.json` placeholder files exist.
3. **Given** the project is initialized, **When** a developer looks for the product data file, **Then** `src/data/products.ts` exists (can be an empty typed array or placeholder).

---

### Edge Cases

- What happens when a user navigates to a route without a locale prefix (e.g., `/` instead of `/ar/` or `/en/`)? The system should redirect to the default locale (`/ar/`).
- What happens when a user requests an unsupported locale (e.g., `/fr/`)? The system MUST redirect to the default locale (`/ar/`). A 404 page is not shown for locale mismatches.
- What happens if a self-hosted font file fails to load? The system MUST fall back gracefully to system fonts: `serif` for heading fonts and `sans-serif` for body fonts, configured via `next/font`'s `fallback` option.
- What happens on a 375px-wide mobile viewport? All content should be visible without horizontal scrolling.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The project MUST be initialized with Next.js 15 using the App Router and TypeScript.
- **FR-002**: Tailwind CSS v4 MUST be installed and configured with the Tailwind RTL plugin for bidirectional layout support.
- **FR-003**: shadcn/ui MUST be initialized and ready for component usage, with components living in `/src/components/ui/`.
- **FR-004**: Motion (Framer Motion v12) MUST be installed and available for animation use across the project.
- **FR-005**: next-intl MUST be installed and configured with locale routing: `/ar/` for Arabic (default) and `/en/` for English.
- **FR-006**: Routes without a locale prefix MUST redirect to the default Arabic locale (`/ar/`).
- **FR-007**: The `dir` attribute on the HTML element MUST be set to `rtl` for Arabic and `ltr` for English, driven by the active locale.
- **FR-008**: Four fonts MUST be self-hosted via `next/font`: Playfair Display (EN headings), Inter (EN body), Noto Naskh Arabic (AR headings), and Tajawal (AR body).
- **FR-009**: Font CDN links in HTML are PROHIBITED; all fonts MUST be loaded through `next/font`.
- **FR-010**: Lucide React MUST be installed as the sole icon library.
- **FR-011**: CSS custom properties MUST be defined for the design system colors: `--color-primary: #550000`, `--color-secondary: #6B1C23`, `--color-accent: #C9A96E`, `--color-background: #FAF7F4`, `--color-surface: #FFFFFF`, `--color-text: #0A0A0A`.
- **FR-012**: The project folder structure MUST match the constitution's mandatory layout, including `src/app/[locale]/`, `src/components/`, `src/data/`, `src/lib/`, and `messages/`.
- **FR-013**: Placeholder translation files (`/messages/ar.json` and `/messages/en.json`) MUST exist with at least a sample key-value pair.
- **FR-014**: A placeholder `src/data/products.ts` file MUST exist with the `Product` type interface defined.
- **FR-015**: The application MUST run without errors via `npm run dev` with zero console errors.
- **FR-016**: Hardcoded `left`/`right` CSS is PROHIBITED; logical properties (`start`/`end`) MUST be used.
- **FR-017**: The minimum supported viewport width is 375px; no horizontal scrolling is permitted.

### Key Entities

- **Locale**: Represents a supported language (`ar` or `en`). Determines text direction, font family, and translation file used.
- **Design Token**: A named CSS custom property (color, font) that provides the centralized visual identity for all components.
- **Product (placeholder)**: A TypeScript interface defining the shape of product data (`id`, `slug`, `name`, `description`, `price`, `currency`, `category`, `sizes`, `colors`, `images`, `featured`, `whatsappMessage`), each with `ar`/`en` sub-keys where applicable.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `npm run dev` completes successfully and the application loads in the browser within 10 seconds on a standard development machine.
- **SC-002**: Zero errors appear in the browser console on initial page load for both `/ar/` and `/en/` routes.
- **SC-003**: Arabic pages render with `dir="rtl"` and Arabic font families; English pages render with `dir="ltr"` and English font families — verified visually and via DOM inspection.
- **SC-004**: All six design system color tokens are accessible as CSS custom properties on any rendered page.
- **SC-005**: The project directory structure contains all mandatory directories and placeholder files defined in the constitution.
- **SC-006**: Font files are self-hosted (no external CDN requests for fonts appear in the Network tab).
- **SC-007**: A 375px viewport renders the default page without horizontal scrollbar.
