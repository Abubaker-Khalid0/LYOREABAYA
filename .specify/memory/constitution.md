<!--
  === Sync Impact Report ===
  Version change: 0.0.0 → 1.0.0 (MAJOR — initial ratification)

  Modified Principles: N/A (first version)

  Added Sections:
    - I. Mandatory Tech Stack
    - II. No-Backend Rules
    - III. Design System — Non-Negotiable Colors
    - IV. Typography Rules
    - V. Layout & Responsiveness
    - VI. WhatsApp Integration Rules
    - VII. Image Rules
    - VIII. Performance Rules
    - IX. Code Quality Rules
    - X. File Structure — Mandatory
    - XI. Prohibited Actions
    - Additional Constraints (project identity, fonts, i18n)
    - Development Workflow (code review, quality gates)

  Removed Sections: N/A (first version)

  Templates requiring updates:
    - plan-template.md   — ✅ compatible (Constitution Check section aligns)
    - spec-template.md   — ✅ compatible (requirements section aligns)
    - tasks-template.md  — ✅ compatible (no test-first mandate; tests excluded per constitution)

  Follow-up TODOs: None
  ===========================
-->

# LYORE ABAYA Constitution

## Core Principles

### I. Mandatory Tech Stack

All agents and contributors MUST use exclusively the following technologies.
Deviations are forbidden unless explicitly approved in writing.

- **Framework**: Next.js 15 (App Router) — Pages Router is PROHIBITED
- **Language**: TypeScript — plain JavaScript files are PROHIBITED
- **Styling**: Tailwind CSS v4 — inline styles and CDN usage are PROHIBITED
- **Components**: shadcn/ui — existing shadcn components MUST be used before building custom ones
- **Animation**: Motion (Framer Motion v12) — CSS-only animations for interactive elements are PROHIBITED
- **i18n**: next-intl — custom translation solutions are PROHIBITED
- **Icons**: Lucide React ONLY — Font Awesome, Material Symbols, and all other icon libraries are PROHIBITED
- **Fonts**: Self-hosted via `next/font` — Google Fonts CDN links are PROHIBITED

### II. No-Backend Rules

This project is a static luxury e-commerce website with NO backend.

- NO database of any kind (no Supabase, no Firebase, no Prisma)
- NO server actions that write data
- NO authentication or user accounts
- NO shopping cart or checkout system
- ALL product data MUST live in `/src/data/products.ts` (TypeScript array)
- ALL translations MUST live in `/messages/ar.json` and `/messages/en.json`

### III. Design System — Non-Negotiable Colors

Every component MUST adhere to this exact color palette.
No other colors are permitted unless explicitly approved.

| Token       | Hex       | Usage            |
|-------------|-----------|------------------|
| Primary     | `#550000` | Deep Maroon      |
| Secondary   | `#6B1C23` | Maroon variant   |
| Accent      | `#C9A96E` | Champagne Gold   |
| Background  | `#FAF7F4` | Warm Off-White   |
| Surface     | `#FFFFFF` | Pure White       |
| Text        | `#0A0A0A` | Near Black       |

### IV. Typography Rules

Font assignments are mandatory and MUST be self-hosted via `next/font/google`.
Font CDN links in HTML are PROHIBITED.

| Context       | Font                | Style                 |
|---------------|---------------------|-----------------------|
| Headings (EN) | Playfair Display    | Serif, elegant        |
| Body (EN)     | Inter               | Clean, readable       |
| Headings (AR) | Noto Naskh Arabic   | Elegant Arabic serif  |
| Body (AR)     | Tajawal             | Clean Arabic sans     |

### V. Layout & Responsiveness

- Mobile-first design — ALL components MUST work on 375px width minimum
- Breakpoints MUST follow Tailwind defaults (`sm`/`md`/`lg`/`xl`/`2xl`)
- Arabic (RTL) and English (LTR) MUST be fully supported
- RTL/LTR switching MUST be handled via next-intl + Tailwind RTL plugin ONLY
- Hardcoded `left`/`right` is PROHIBITED — use `start`/`end` logical properties

### VI. WhatsApp Integration Rules

All purchase intent MUST route through WhatsApp. There is no cart or checkout.

- Every product page MUST have a WhatsApp CTA button
- WhatsApp message MUST be pre-filled with the product name in the user's current language
- URL format: `https://wa.me/971502507859?text=MESSAGE`
- A WhatsApp FAB (Floating Action Button) MUST appear on ALL pages
- Direct phone numbers without a WhatsApp link are PROHIBITED

### VII. Image Rules

- ALL images MUST use the Next.js `<Image>` component — `<img>` tags are PROHIBITED
- Production format: WebP ONLY — JPG and PNG are PROHIBITED in production
- Maximum size per image: 200 KB after compression
- Unsplash placeholder images are permitted ONLY during development
- Logo MUST be in SVG format — PNG logo in production is PROHIBITED
- Product image aspect ratio: 3:4 (portrait) — enforced on all cards

### VIII. Performance Rules

- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95
- Render-blocking resources are PROHIBITED
- ALL animations MUST respect `prefers-reduced-motion`
- Lazy loading is REQUIRED on ALL images below the fold
- Unused CSS or JS shipped to the client is PROHIBITED

### IX. Code Quality Rules

- Component files: PascalCase (e.g., `ProductCard.tsx`)
- Utility files: camelCase (e.g., `formatPrice.ts`)
- Magic strings are PROHIBITED — all text content MUST come from translation files
- Commented-out code in final commits is PROHIBITED
- Every component MUST have a typed `Props` interface in TypeScript
- shadcn components MUST live in `/src/components/ui/`
- Custom components MUST live in `/src/components/`

### X. File Structure — Mandatory

All code MUST follow this directory layout:

```text
src/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx              — Home
│   │   ├── collections/
│   │   │   └── page.tsx          — All products
│   │   ├── products/
│   │   │   └── [slug]/
│   │   │       └── page.tsx      — Individual product page
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── size-guide/
│   │   │   └── page.tsx
│   │   └── returns/
│   │       └── page.tsx
├── components/
│   ├── ui/                       — shadcn components only
│   ├── layout/                   — Navbar, Footer, MobileDrawer
│   └── sections/                 — HeroSection, ProductGrid, etc.
├── data/
│   └── products.ts               — Single source of truth for products
├── lib/
│   └── utils.ts                  — shadcn utility + helpers
└── messages/
    ├── ar.json                   — Arabic translations
    └── en.json                   — English translations
```

### XI. Prohibited Actions

The following actions are strictly forbidden for all AI agents:

- NEVER use Tailwind CDN
- NEVER create API routes (no `/api/` folder)
- NEVER install Redux, Zustand, or any state management library
- NEVER use `<img>` tag (always `next/image`)
- NEVER hardcode Arabic or English text in components
- NEVER create a custom translation system
- NEVER install multiple icon libraries
- NEVER use CSS animations for entrance effects (use Motion)
- NEVER create a backend or database connection
- NEVER write unit tests

## Additional Constraints

### Project Identity

- **Project Name**: LYORE ABAYA
- **Type**: Static Luxury E-Commerce Website (No Backend)
- **Purpose**: Showcase luxury abayas and route orders via WhatsApp
- **Target User**: Modern modest women (Arabic & English speaking)
- **WhatsApp Number**: +971 50 250 7859

### Internationalization

- next-intl is the ONLY permitted i18n solution
- Translation files: `/messages/ar.json` and `/messages/en.json`
- ALL user-facing text MUST be translated — hardcoded strings are PROHIBITED

## Development Workflow

### Quality Gates

- All PRs/reviews MUST verify compliance with this constitution
- Lighthouse audits MUST pass thresholds (Performance ≥ 90, Accessibility ≥ 95)
- Every component MUST render correctly in both RTL and LTR layouts
- Every product page MUST include a functioning WhatsApp CTA

### Complexity Justification

- Any deviation from the mandated tech stack MUST be documented with rationale
- New dependencies MUST be justified against existing shadcn/ui and Lucide React capabilities

## Governance

This constitution is the supreme authority for all development decisions on LYORE ABAYA.
It supersedes all other practices, guidelines, or preferences.

- **Amendments** require explicit user approval, documentation, and a migration plan
- **Version** follows semantic versioning: MAJOR (breaking rule changes), MINOR (new rules), PATCH (clarifications)
- **Compliance** is verified at every review checkpoint
- Runtime development guidance is in `README.md`

**Version**: 1.0.0 | **Ratified**: 2026-02-19 | **Last Amended**: 2026-02-19
