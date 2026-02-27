# Implementation Plan: Secondary Pages

**Branch**: `007-secondary-pages` | **Date**: 2026-02-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-secondary-pages/spec.md`

## Summary

Build three static secondary pages (Contact, Size Guide, Returns & Shipping) as Next.js 15 App Router server components with client-side section components. All pages follow the established `CollectionsPage` pattern, reuse the existing WhatsApp utility, and extend the pre-existing translation namespaces in `ar.json`/`en.json`. Key additions include a new `generateExchangeRequestUrl()` function in `whatsapp.ts`, translation key additions and corrections (exchange policy wording, 2–5 day shipping), and a shared \"How to Measure\" section using Tabler Icons on the Size Guide page.

## Technical Context

**Language/Version**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: next-intl (i18n), Framer Motion v12 (animations), Tailwind CSS v4, shadcn/ui, @tabler/icons-react, lucide-react
**Storage**: N/A — static pages, all data in translation files and compile-time constants
**Testing**: Manual via browser + `npm run build` (zero TS errors)
**Target Platform**: Web (mobile-first, min 375px, RTL + LTR)
**Project Type**: Web (Next.js monorepo, single app)
**Performance Goals**: Lighthouse Performance ≥ 90, Accessibility ≥ 95, First Contentful Paint < 2s
**Constraints**: No backend, no images on these pages, all text from translation files, WhatsApp FAB on all pages
**Scale/Scope**: 3 new pages, 3 new section components, 1 updated utility function, 2 updated message files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Rule | Status | Notes |
|------|--------|-------|
| Next.js 15 App Router only | ✅ PASS | All page files use App Router `/app/[locale]/` pattern |
| TypeScript only | ✅ PASS | All files `.tsx` / `.ts` |
| Tailwind CSS v4 | ✅ PASS | No inline styles |
| shadcn/ui for components | ✅ PASS | Standard HTML + shadcn primitives; no custom base components needed |
| Framer Motion for animations | ✅ PASS | Entrance animations use `motion.div`; reduced-motion respected |
| next-intl for i18n | ✅ PASS | All text from `ar.json`/`en.json` |
| Lucide React for icons | ⚠️ APPROVED DEVIATION | Tabler Icons already installed (`@tabler/icons-react`) and in active use — used for brand icons (WhatsApp, TikTok, Snapchat) and measurement icons where Lucide has no equivalent |
| `next/image` for all images | ✅ PASS | No images on these pages |
| `next/font` only | ✅ PASS | No new fonts needed |
| Mobile-first (375px min) | ✅ PASS | Size table uses `overflow-x-auto` |
| RTL/LTR via next-intl | ✅ PASS | `dir` set on `<html>` by layout; logical properties used |
| No `left`/`right` hardcoded | ✅ PASS | `start`/`end` logical properties used |
| WhatsApp FAB on all pages | ✅ PASS | Inherited from root layout |
| `wa.me` URL format | ✅ PASS | `generateGenericInquiryUrl` and `generateExchangeRequestUrl` both use correct format |
| No `<img>` tags | ✅ PASS | No images used |
| No backend / API routes | ✅ PASS | Static pages only |
| Lighthouse ≥ 90 / Accessibility ≥ 95 | ✅ PLANNED | Semantic HTML, ARIA labels, heading hierarchy enforced |

**No violations requiring Complexity Justification.**

## Project Structure

### Documentation (this feature)

```text
specs/007-secondary-pages/
├── plan.md              ← This file
├── spec.md              ← Feature specification
├── research.md          ← Phase 0 decisions
├── data-model.md        ← Entities, translation keys, new function spec
├── quickstart.md        ← Component specs + testing checklist
└── tasks.md             ← Phase 2 output (/speckit.tasks — not yet created)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── [locale]/
│       ├── contact/
│       │   └── page.tsx                 [NEW] Server component + generateMetadata
│       ├── size-guide/
│       │   └── page.tsx                 [NEW] Server component + generateMetadata
│       └── returns/
│           └── page.tsx                 [NEW] Server component + generateMetadata
├── components/
│   └── sections/
│       ├── ContactContent.tsx           [NEW] Client component — 6 contact cards
│       ├── SizeGuideContent.tsx         [NEW] Client component — table + how-to steps
│       └── ReturnsContent.tsx           [NEW] Client component — policies + banner
├── lib/
│   └── whatsapp.ts                      [MODIFY] Add generateExchangeRequestUrl()
└── messages/
    ├── ar.json                          [MODIFY] Add keys + correct exchange/shipping
    └── en.json                          [MODIFY] Add keys + correct exchange/shipping
```

**Structure Decision**: Single Next.js web application (Option 1). All new files follow the established project layout per the constitution's Section X.

## Complexity Tracking

> No constitution violations requiring justification — the Tabler Icons deviation is pre-existing and approved by the user (Q3 response, 2026-02-26).
