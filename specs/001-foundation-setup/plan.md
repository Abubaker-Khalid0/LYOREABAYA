# Implementation Plan: Phase 1 — Foundation & Setup

**Branch**: `001-foundation-setup` | **Date**: 2026-02-20 | **Spec**: [spec.md](file:///c:/Users/DELL/Documents/projects/LYORE-ABAYA/specs/001-foundation-setup/spec.md)  
**Input**: Feature specification from `/specs/001-foundation-setup/spec.md`

## Summary

Scaffold the LYORE ABAYA project from scratch: initialize Next.js 15 (App Router + TypeScript + Tailwind v4), install all mandated dependencies (shadcn/ui, Motion, next-intl, Lucide React), configure bilingual AR/EN routing with RTL/LTR support, self-host four fonts via `next/font`, define design system color tokens as CSS custom properties, and create the mandatory folder structure per constitution. The result is a zero-error development server with correct directional layout and design tokens globally available.

## Technical Context

**Language/Version**: TypeScript (Next.js 15, App Router)  
**Primary Dependencies**: Tailwind CSS v4, shadcn/ui, Motion (Framer Motion v12), next-intl, Lucide React  
**Storage**: N/A (no backend, no database — static site)  
**Testing**: Manual browser verification (constitution PROHIBITS unit tests)  
**Target Platform**: Web (static export for Hostinger), minimum viewport 375px  
**Project Type**: Web application (Next.js frontend only)  
**Performance Goals**: Lighthouse Performance ≥ 90, Accessibility ≥ 95 (Phase 8 target — Phase 1 target is zero errors)  
**Constraints**: No backend, no API routes, no CDN fonts, no `<img>` tags, all text from translation files  
**Scale/Scope**: 6 pages total (Home, Collections, Product Detail, Contact, Size Guide, Returns)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Rule | Status | Notes |
|------|--------|-------|
| Next.js 15 App Router | ✅ Pass | `create-next-app` with `--app` flag |
| TypeScript only | ✅ Pass | `--typescript` flag, no `.js` files |
| Tailwind CSS v4 | ✅ Pass | `--tailwind` flag + RTL plugin |
| shadcn/ui | ✅ Pass | `npx shadcn@latest init` |
| Motion (Framer Motion v12) | ✅ Pass | `npm install motion` |
| next-intl | ✅ Pass | Middleware-based locale routing |
| Lucide React only | ✅ Pass | No other icon libraries |
| Self-hosted fonts | ✅ Pass | `next/font/google` (build-time download) |
| No backend | ✅ Pass | No API routes, no database |
| Exact color palette | ✅ Pass | CSS custom properties with constitution values |
| Mandatory file structure | ✅ Pass | All directories created per constitution |
| No unit tests | ✅ Pass | Manual verification only |
| Logical properties | ✅ Pass | `start`/`end` instead of `left`/`right` |

**Gate result**: ✅ All rules pass. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-foundation-setup/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 research output
├── data-model.md        # Phase 1 data model
├── quickstart.md        # Developer quickstart guide
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (via /speckit.tasks)
```

### Source Code (repository root)

```text
lyore-abaya/
├── messages/
│   ├── ar.json                    # Arabic translations (placeholder)
│   └── en.json                    # English translations (placeholder)
├── public/
│   └── images/                    # Static assets directory
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── layout.tsx         # Root layout (dir, fonts, tokens)
│   │       └── page.tsx           # Home page placeholder
│   ├── components/
│   │   ├── ui/                    # shadcn components
│   │   ├── layout/                # Navbar, Footer, etc. (empty)
│   │   └── sections/              # Hero, ProductGrid, etc. (empty)
│   ├── data/
│   │   └── products.ts            # Product interface + empty array
│   └── lib/
│       └── utils.ts               # shadcn cn() utility
├── i18n/
│   ├── request.ts                 # next-intl request config
│   └── routing.ts                 # next-intl routing config
├── middleware.ts                   # next-intl locale middleware
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind + RTL plugin config
├── tsconfig.json
└── package.json
```

**Structure Decision**: Single Next.js web application with `src/` directory. No backend, no API routes. Constitution-mandated directory layout with `components/ui/`, `components/layout/`, `components/sections/`, `data/`, and `lib/` subdirectories.

## Implementation Steps

### Step 1: Initialize Next.js Project

```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --use-npm
```

> [!IMPORTANT]
> Initialize in current directory (`.`) since the repo already exists. Use `--use-npm` for consistency.

### Step 2: Install Dependencies

```bash
npm install motion next-intl lucide-react
npm install -D tailwindcss-rtl
```

### Step 3: Initialize shadcn/ui

```bash
npx shadcn@latest init
```

Configure to place components in `src/components/ui/`.

### Step 4: Configure Tailwind with RTL Plugin

Update `tailwind.config.ts` to:
- Add `tailwindcss-rtl` plugin
- Extend theme with design system color tokens referencing CSS custom properties

### Step 5: Define Design System CSS Custom Properties

In the global CSS file (`src/app/globals.css`), define:

```css
:root {
  --color-primary: #550000;
  --color-secondary: #6B1C23;
  --color-accent: #C9A96E;
  --color-background: #FAF7F4;
  --color-surface: #FFFFFF;
  --color-text: #0A0A0A;
}
```

### Step 6: Configure Self-Hosted Fonts

In a shared font configuration file, use `next/font/google` to load:
- Playfair Display (EN headings)
- Inter (EN body)
- Noto Naskh Arabic (AR headings)
- Tajawal (AR body)

Apply per-locale font classes in the root layout based on active locale.

### Step 7: Configure next-intl for AR/EN Routing

- Create `i18n/routing.ts` with locales `['ar', 'en']`, default `'ar'`
- Create `i18n/request.ts` for message loading
- Create `middleware.ts` for locale detection and redirect
- Update `next.config.ts` with `createNextIntlPlugin`

### Step 8: Create Root Layout (`src/app/[locale]/layout.tsx`)

- Set `dir="rtl"` or `dir="ltr"` based on locale
- Apply correct font classes per locale
- Set `lang` attribute per locale
- Import global CSS with design tokens

### Step 9: Create Placeholder Home Page (`src/app/[locale]/page.tsx`)

- Simple page using translated text from `messages/*.json`
- Demonstrates i18n working
- Shows design tokens in action (background color, text color)

### Step 10: Create Mandatory Directory Structure

Create empty directories with `.gitkeep` files:
- `src/components/layout/`
- `src/components/sections/`
- `src/data/`
- `public/images/`

### Step 11: Create Placeholder Data Files

- `messages/ar.json` — sample Arabic translations
- `messages/en.json` — sample English translations
- `src/data/products.ts` — `Product` interface + empty typed array

## Complexity Tracking

> No constitution violations. No complexity justifications needed.

## Verification Plan

### Automated Checks

**Command**: `npm run dev`
- **Expected**: Server starts on `http://localhost:3000` without compilation errors
- **How to run**: Execute `npm run dev` in project root terminal

**Command**: `npm run build`
- **Expected**: Production build completes with zero errors
- **How to run**: Execute `npm run build` in project root terminal

### Browser Verification (Manual)

All verification is manual via browser inspection since constitution prohibits unit tests.

| # | Check | Steps | Expected Result |
|---|-------|-------|-----------------|
| 1 | App loads | Open `http://localhost:3000` | Page renders, auto-redirects to `/ar/` |
| 2 | Arabic RTL | Navigate to `/ar/` → inspect `<html>` element | `dir="rtl"` and `lang="ar"` attributes present |
| 3 | English LTR | Navigate to `/en/` → inspect `<html>` element | `dir="ltr"` and `lang="en"` attributes present |
| 4 | Arabic fonts | On `/ar/` → inspect heading → computed styles | `font-family` contains "Noto Naskh Arabic" |
| 5 | English fonts | On `/en/` → inspect heading → computed styles | `font-family` contains "Playfair Display" |
| 6 | Design tokens | Inspect any element → computed `:root` styles | All 6 `--color-*` variables present with correct hex values |
| 7 | No CDN fonts | Open Network tab → filter "fonts.googleapis" | Zero requests to Google Fonts CDN |
| 8 | Mobile viewport | Resize browser to 375px width | No horizontal scrollbar appears |
| 9 | Console clean | Open browser console on both `/ar/` and `/en/` | Zero errors or warnings |
| 10 | Folder structure | Run `ls -R src/` in terminal | All mandatory directories exist |
