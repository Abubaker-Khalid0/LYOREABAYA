# Quickstart: i18n & Content Foundation

**Branch**: `002-i18n-content-foundation` | **Date**: 2026-02-21

## Prerequisites

- Node.js 18+ installed
- Project cloned and on branch `002-i18n-content-foundation`
- Dependencies installed (`npm install`)

## Development Server

```bash
npm run dev
```

Open in browser:
- Arabic (default): http://localhost:3000/ar/
- English: http://localhost:3000/en/

## Key Files Modified in This Phase

| File | Action | Purpose |
|------|--------|---------|
| `messages/ar.json` | MODIFY | All Arabic translation strings |
| `messages/en.json` | MODIFY | All English translation strings |
| `src/data/products.ts` | MODIFY | 6 placeholder products populated |
| `src/lib/whatsapp.ts` | NEW | WhatsApp URL generator utility |

## How to Use Translations

```typescript
import { useTranslations } from 'next-intl';

// In a component:
const t = useTranslations('nav');
// t('home')    → "الرئيسية" (AR) or "Home" (EN)
// t('contact') → "تواصلي معنا" (AR) or "Contact" (EN)
```

## How to Use Product Data

```typescript
import { products, type Product } from '@/data/products';

// Get all products
const allProducts = products;

// Filter by category
const winterProducts = products.filter(p => p.category.en === 'Winter');
const summerProducts = products.filter(p => p.category.en === 'Summer');

// Get featured products
const featured = products.filter(p => p.featured);

// Access bilingual field
const name = product.name[locale]; // 'ar' or 'en'
```

## How to Use WhatsApp Utility

```typescript
import { generateWhatsAppUrl } from '@/lib/whatsapp';

// Basic usage (name + price only)
const url = generateWhatsAppUrl({
  productName: product.name[locale],
  price: product.price,
  currency: product.currency[locale],
  locale: 'ar',
});

// Full usage (with size + color)
const url = generateWhatsAppUrl({
  productName: product.name[locale],
  price: product.price,
  currency: product.currency[locale],
  locale: 'ar',
  size: 'M',
  color: 'أسود',
});

// Returns: "https://wa.me/971502507859?text=..."
```

## Verification Checklist

1. `npm run dev` — starts without errors
2. Visit `/ar/` — page renders in Arabic, RTL direction
3. Visit `/en/` — page renders in English, LTR direction
4. No console warnings about missing translation keys
5. `npm run build` — completes with zero TypeScript errors
