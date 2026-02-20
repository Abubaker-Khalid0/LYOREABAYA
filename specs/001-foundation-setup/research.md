# Research: Phase 1 — Foundation & Setup

**Date**: 2026-02-20  
**Branch**: `001-foundation-setup`  
**Status**: Complete — all unknowns resolved

## R-001: Next.js 15 App Router Initialization

- **Decision**: Use `npx create-next-app@latest` with `--typescript --tailwind --app --src-dir --import-alias "@/*"` flags
- **Rationale**: Constitution mandates Next.js 15 App Router + TypeScript + Tailwind. The `--src-dir` flag creates `src/` directory matching constitution's file structure. `--import-alias "@/*"` enables clean imports.
- **Alternatives considered**:
  - Manual setup (rejected: slower, error-prone, no benefit over official scaffolding)
  - Pages Router (rejected: PROHIBITED by constitution)

## R-002: Tailwind CSS v4 + RTL Plugin

- **Decision**: Use `tailwindcss-rtl` plugin for bidirectional layout support
- **Rationale**: Constitution mandates Tailwind CSS v4 and RTL support via Tailwind RTL plugin. Logical properties (`start`/`end`) replace hardcoded `left`/`right`.
- **Alternatives considered**:
  - Manual CSS logical properties only (rejected: Tailwind RTL plugin provides utility classes aligned with Tailwind workflow)
  - `tailwindcss-logical` (rejected: `tailwindcss-rtl` is the established convention for RTL-first projects)

## R-003: shadcn/ui Initialization

- **Decision**: Run `npx shadcn@latest init` to scaffold shadcn/ui into `/src/components/ui/`
- **Rationale**: Constitution mandates shadcn/ui components before custom ones. Default init places components in `src/components/ui/` matching constitution.
- **Alternatives considered**:
  - Full component library like MUI or Chakra (rejected: PROHIBITED by constitution)
  - No component library (rejected: constitution mandates shadcn/ui)

## R-004: Motion (Framer Motion v12)

- **Decision**: Install via `npm install motion`
- **Rationale**: Constitution mandates Motion for all interactive animations. CSS-only animations for interactive elements are PROHIBITED.
- **Alternatives considered**:
  - CSS animations (rejected: PROHIBITED by constitution for interactive elements)
  - GSAP (rejected: not in mandated stack)

## R-005: next-intl Configuration for AR/EN

- **Decision**: Use next-intl with middleware-based locale routing. Default locale: `ar`. Supported locales: `['ar', 'en']`. Routes: `/ar/*` and `/en/*`.
- **Rationale**: Constitution mandates next-intl as the ONLY i18n solution. Custom translation solutions are PROHIBITED. Arabic is the default language per implementation plan.
- **Alternatives considered**:
  - react-i18next (rejected: PROHIBITED by constitution)
  - Custom translation system (rejected: PROHIBITED by constitution)

## R-006: Self-Hosted Fonts via next/font

- **Decision**: Use `next/font/google` to self-host four fonts at build time:
  - Playfair Display (EN headings)
  - Inter (EN body)
  - Noto Naskh Arabic (AR headings)
  - Tajawal (AR body)
- **Rationale**: Constitution mandates self-hosting via `next/font`. Google Fonts CDN links are PROHIBITED. `next/font/google` downloads fonts at build time and serves them locally — no runtime CDN requests.
- **Alternatives considered**:
  - Google Fonts CDN `<link>` (rejected: PROHIBITED by constitution)
  - Manual font file hosting (rejected: `next/font/google` handles this automatically with better optimization)

## R-007: Design System Color Tokens

- **Decision**: Define CSS custom properties in the global CSS file and extend Tailwind theme to reference them.
- **Rationale**: Constitution specifies exact hex values for 6 tokens. Defining as CSS custom properties ensures global availability. Extending Tailwind theme allows usage via utility classes.
- **Alternatives considered**:
  - Tailwind-only config without CSS variables (rejected: CSS variables provide runtime access for non-Tailwind contexts)
  - CSS-in-JS tokens (rejected: not in mandated stack)

## R-008: Project Folder Structure

- **Decision**: Create all mandatory directories from constitution after `create-next-app` scaffolds the base project.
- **Rationale**: `create-next-app` creates `src/app/` and `src/lib/` but not `src/components/layout/`, `src/components/sections/`, `src/data/`, or `messages/`. These must be created manually with placeholder files.
- **Alternatives considered**:
  - Single flat directory (rejected: PROHIBITED by constitution's mandatory structure)
