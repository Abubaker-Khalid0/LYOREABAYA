# Data Model: Phase 1 — Foundation & Setup

**Date**: 2026-02-20  
**Branch**: `001-foundation-setup`

## Overview

Phase 1 is a project scaffold phase. The only data entity defined at this stage is the **Product interface** (placeholder). No database, no API, no runtime data storage — per constitution.

## Entities

### Product (TypeScript Interface — placeholder)

This is a type definition only. No actual product data is populated in Phase 1 (that happens in Phase 2).

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique product identifier |
| `slug` | `string` | URL-friendly identifier for routing `/products/[slug]` |
| `name` | `{ ar: string; en: string }` | Bilingual product name |
| `description` | `{ ar: string; en: string }` | Bilingual product description |
| `price` | `number` | Price in AED (numeric) |
| `currency` | `{ ar: string; en: string }` | Currency display label (e.g., `"د.إ"` / `"AED"`) |
| `category` | `{ ar: string; en: string }` | Bilingual category name |
| `sizes` | `string[]` | Available sizes (e.g., `["S", "M", "L", "XL", "XXL"]`) |
| `colors` | `{ name: string; hex: string }[]` | Available colors with display name and hex code |
| `images` | `string[]` | Array of image paths (portrait 3:4 aspect ratio) |
| `featured` | `boolean` | Whether product appears in featured section |
| `whatsappMessage` | `{ ar: string; en: string }` | Pre-filled WhatsApp message template |

### Locale (Runtime Concept)

| Value | Direction | Heading Font | Body Font |
|-------|-----------|-------------|-----------|
| `ar` | RTL | Noto Naskh Arabic | Tajawal |
| `en` | LTR | Playfair Display | Inter |

### Design Tokens (CSS Custom Properties)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#550000` | Deep Maroon |
| `--color-secondary` | `#6B1C23` | Maroon variant |
| `--color-accent` | `#C9A96E` | Champagne Gold |
| `--color-background` | `#FAF7F4` | Warm Off-White |
| `--color-surface` | `#FFFFFF` | Pure White |
| `--color-text` | `#0A0A0A` | Near Black |

## Relationships

- A **Product** has multiple `sizes` and `colors`
- A **Product** references a `category` (string label, not a separate entity in MVP)
- A **Locale** determines which sub-key (`ar`/`en`) is displayed for bilingual Product fields
- **Design Tokens** are globally available and do not have entity relationships

## Notes

- No contracts directory needed for Phase 1 — constitution PROHIBITS API routes
- Product data lives in `/src/data/products.ts` as a TypeScript array (populated in Phase 2)
- No state transitions — products are static read-only data
