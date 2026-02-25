# Data Model: Collections Page

**Feature**: 005-collections-page
**Date**: 2026-02-22

## Entities

### Product (existing — no changes)

Source: `src/data/products.ts`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique product identifier |
| `slug` | `string` | URL-safe identifier for routing |
| `name` | `BilingualText` | Localized product name (`ar`/`en`) |
| `description` | `BilingualText` | Localized product description |
| `price` | `number` | Numeric price (no currency symbol) |
| `currency` | `BilingualText` | Currency display label (`د.إ` / `AED`) |
| `category` | `BilingualText` | Product category (`ar`/`en`) |
| `sizes` | `string[]` | Available sizes |
| `colors` | `ProductColor[]` | Available colors (`name` + `hex`) |
| `images` | `string[]` | Product image URLs |
| `featured` | `boolean` | Whether product appears in Featured section |
| `whatsappMessage` | `BilingualText` | Pre-filled WhatsApp message |

### BilingualText (existing — no changes)

| Field | Type | Description |
|-------|------|-------------|
| `ar` | `string` | Arabic text |
| `en` | `string` | English text |

### ProductColor (existing — no changes)

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Color display name |
| `hex` | `string` | Hex color code |

## Derived Data (computed at render time)

### Category List

**Source**: Extracted dynamically from `products.category[locale]` using `Set()`.

**Shape**: `string[]` — e.g., `["Winter", "Summer"]` (EN) or `["شتوي", "صيفي"]` (AR).

**Usage**: Drives the filter tabs. "All" label is added from translation key `collections.filterAll`, always first.

### Filtered Products

**Source**: `products.filter(p => activeCategory === "all" || p.category[locale] === activeCategory)`

**Shape**: `Product[]` — subset of all products matching the active category filter.

## Data Flow

```text
products.ts (static)
    ↓
CollectionsContent.tsx (client component)
    ├── Extract unique categories → FilterTabs
    ├── Filter by activeCategory → ProductGrid
    └── activeCategory state (useState, default: "all")
         ↓ resets on page navigation (no persistence)
```

## No New Entities Required

This feature operates entirely on the existing `Product` data model. Category is a derived concept (extracted from product.category), not a standalone entity. No database, no API, no new data files needed.
