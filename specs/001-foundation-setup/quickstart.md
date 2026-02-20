# Quickstart: Phase 1 — Foundation & Setup

**Branch**: `001-foundation-setup`

## Prerequisites

- Node.js ≥ 18.x
- npm ≥ 9.x
- Git

## Setup Steps

### 1. Clone and checkout

```bash
git checkout 001-foundation-setup
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

### 4. Verify

| Check | How to verify |
|-------|---------------|
| App starts | Browser opens `http://localhost:3000` without errors |
| Arabic RTL | Navigate to `/ar/` — page has `dir="rtl"` |
| English LTR | Navigate to `/en/` — page has `dir="ltr"` |
| Design tokens | Inspect any element — CSS variables `--color-primary` through `--color-text` are available |
| Arabic fonts | Inspect heading text on `/ar/` — font-family includes "Noto Naskh Arabic" |
| English fonts | Inspect heading text on `/en/` — font-family includes "Playfair Display" |
| No CDN fonts | Network tab shows no requests to `fonts.googleapis.com` |
| Mobile | Resize to 375px width — no horizontal scrollbar |

## Project Structure (after Phase 1)

```text
lyore-abaya/
├── messages/
│   ├── ar.json
│   └── en.json
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── sections/
│   ├── data/
│   │   └── products.ts
│   └── lib/
│       └── utils.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Key Files

| File | Purpose |
|------|---------|
| `src/app/[locale]/layout.tsx` | Root layout — sets `dir`, fonts, design tokens |
| `src/app/[locale]/page.tsx` | Home page placeholder |
| `src/data/products.ts` | Product type interface (empty array) |
| `messages/ar.json` | Arabic translation strings (placeholder) |
| `messages/en.json` | English translation strings (placeholder) |
| `src/lib/utils.ts` | shadcn utility (cn function) |
