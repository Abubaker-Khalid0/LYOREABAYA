# Quickstart: Collections Page

**Feature**: 005-collections-page
**Branch**: `005-collections-page`

## Prerequisites

- Node.js 18+ installed
- Repository cloned and on `005-collections-page` branch
- Dependencies installed: `npm install`

## Quick Run

```bash
# Start dev server
npm run dev

# Visit Collections page
# English: http://localhost:3000/en/collections
# Arabic:  http://localhost:3000/ar/collections
```

## Key Files

| File | Purpose |
|------|---------|
| `src/app/[locale]/collections/page.tsx` | Page entry point (server component) |
| `src/components/sections/CollectionsContent.tsx` | Client-side filter state + layout |
| `src/components/sections/CollectionsHero.tsx` | Hero banner (image + overlay + title) |
| `src/components/sections/FilterTabs.tsx` | Category filter tabs |
| `src/components/sections/ProductGrid.tsx` | Animated product grid |
| `src/components/sections/ProductCard.tsx` | Product card (existing, reused) |
| `src/data/products.ts` | Product data source |
| `messages/ar.json` | Arabic translations |
| `messages/en.json` | English translations |

## Build Verification

```bash
npm run build
# Must complete with zero errors and zero warnings
```

## Test Scenarios

1. **Browse all products**: Visit `/en/collections` — see all 6 products
2. **Filter by category**: Click "Winter" tab — see 3 Winter products only
3. **Reset filter**: Click "All" tab — see all 6 products again
4. **Product card interaction**: Click a product card → navigates to `/en/products/[slug]`
5. **WhatsApp button**: Click WhatsApp on a card → opens WhatsApp with pre-filled message
6. **RTL/Arabic**: Visit `/ar/collections` — full RTL layout with Arabic text
7. **Mobile (375px)**: Resize to 375px — 2-column grid, scrollable filter tabs
8. **Reduced motion**: Enable `prefers-reduced-motion` in devtools — no animations
