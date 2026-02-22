# Quickstart: Home Page (004-home-page)

## Prerequisites

- Node.js 18+
- npm installed
- Repository cloned and on branch `004-home-page`

## Setup

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Visit `http://localhost:3000/ar` (Arabic/RTL) or `http://localhost:3000/en` (English/LTR).

## Key Files to Edit

| File | Action | Purpose |
|------|--------|---------|
| `src/app/[locale]/page.tsx` | **REPLACE** | Replace placeholder with Home page sections |
| `src/components/sections/HeroSlider.tsx` | **NEW** | Full-screen image slider |
| `src/components/sections/FeaturedProducts.tsx` | **NEW** | Featured products grid |
| `src/components/sections/ProductCard.tsx` | **NEW** | Reusable product card |
| `src/components/sections/AboutSection.tsx` | **NEW** | Brand story split layout |
| `src/components/sections/CollectionsBanner.tsx` | **NEW** | Full-width CTA banner |
| `src/data/products.ts` | **MODIFY** | Set all 6 products to `featured: true` |
| `messages/en.json` | **MODIFY** | Add new translation keys |
| `messages/ar.json` | **MODIFY** | Add new translation keys |

## Verification

```bash
# Build check (zero errors required)
npm run build

# Lint check
npm run lint
```

### Manual Checks

1. Open `http://localhost:3000/ar` — verify RTL layout, Arabic text, hero slider
2. Open `http://localhost:3000/en` — verify LTR layout, English text
3. Click hero CTA → should navigate to `/collections`
4. Scroll to Featured Products → verify 6 cards with stagger animation
5. Click WhatsApp button on any card → should open WhatsApp with pre-filled message
6. Click product card → should navigate to `/products/[slug]`
7. Scroll to About → verify split layout and fade-in animation
8. Scroll to Collections Banner → verify parallax effect
9. Resize to 375px width → verify no horizontal overflow
10. Enable `prefers-reduced-motion` → verify animations are disabled
