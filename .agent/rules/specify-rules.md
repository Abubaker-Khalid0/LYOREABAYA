# LYORE-ABAYA Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-02-20

## Active Technologies
- TypeScript 5.x (Next.js 15 App Router) + next-intl (i18n routing + translations), Next.js 15, Tailwind CSS v4 (002-i18n-content-foundation)
- Static TypeScript array (`/src/data/products.ts`) — no database (002-i18n-content-foundation)
- TypeScript 5.x on Next.js 16.1.6 (App Router) + next-intl ^4.8.3, motion ^12.34.3, lucide-react ^0.575.0, tailwindcss ^4, tailwindcss-rtl ^0.9.0 (003-layout-components)
- sessionStorage (announcement bar dismiss state only) (003-layout-components)
- TypeScript 5.x on Next.js 16.1.6 (App Router) + Motion v12, next-intl v4, shadcn/ui, Lucide React, Tailwind CSS v4, tailwindcss-rtl v0.9 (004-home-page)
- N/A (static site, no database per constitution) (004-home-page)
- TypeScript (Next.js 15 App Router) + Next.js 15, Tailwind CSS v4, shadcn/ui, Motion (Framer Motion v12), next-intl, Lucide React (005-collections-page)
- N/A — static site, data from `products.ts` (005-collections-page)
- [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION] + [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION] (007-secondary-pages)
- [if applicable, e.g., PostgreSQL, CoreData, files or N/A] (007-secondary-pages)
- TypeScript / Next.js 15 (App Router) + next-intl (i18n), Framer Motion v12 (animations), Tailwind CSS v4, shadcn/ui, @tabler/icons-react, lucide-react (007-secondary-pages)
- N/A — static pages, all data in translation files and compile-time constants (007-secondary-pages)

- TypeScript (Next.js 15, App Router) + Tailwind CSS v4, shadcn/ui, Motion (Framer Motion v12), next-intl, Lucide React (001-foundation-setup)

## Project Structure

```text
backend/
frontend/
tests/
```

## Commands

npm test; npm run lint

## Code Style

TypeScript (Next.js 15, App Router): Follow standard conventions

## Recent Changes
- 007-secondary-pages: Added TypeScript / Next.js 15 (App Router) + next-intl (i18n), Framer Motion v12 (animations), Tailwind CSS v4, shadcn/ui, @tabler/icons-react, lucide-react
- 007-secondary-pages: Added [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION] + [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]
- 005-collections-page: Added TypeScript (Next.js 15 App Router) + Next.js 15, Tailwind CSS v4, shadcn/ui, Motion (Framer Motion v12), next-intl, Lucide React


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
