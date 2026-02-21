# Research: i18n & Content Foundation

**Branch**: `002-i18n-content-foundation` | **Date**: 2026-02-21

## Research Summary

No critical unknowns were identified in the Technical Context — the constitution mandates all technology choices. This document consolidates best-practice decisions for the three implementation areas.

---

## 1. Translation File Structure (next-intl)

**Decision**: Use nested JSON with dot-separated navigation keys (e.g., `nav.home`, `hero.slide1.title`)

**Rationale**: next-intl natively supports nested JSON objects and provides the `useTranslations('namespace')` hook which scopes translations to a section. This avoids key collisions and makes files maintainable as key count grows. The existing `ar.json`/`en.json` already use nested structure (e.g., `app.title`, `tokens.heading`).

**Alternatives Considered**:
- Flat keys (`"nav.home": "..."`) — simpler but loses the ability to use `useTranslations('nav')` for scoping. Harder to maintain as key count grows.
- Separate files per page — more modular but requires custom loading logic incompatible with next-intl's single-file loader already configured in `request.ts`.

---

## 2. Product Data Approach

**Decision**: Static TypeScript array with inline data in `src/data/products.ts`. Use Unsplash `source.unsplash.com` URLs for placeholder images during development.

**Rationale**: Constitution mandates all product data lives in this single file. TypeScript provides compile-time validation of the `Product` interface. The existing file already defines `BilingualText`, `ProductColor`, and `Product` interfaces — only the empty array needs populating.

**Alternatives Considered**:
- JSON file instead of TS — loses type-safety and requires a separate type import. Constitution specifically says `.ts`.
- MDX/Markdown per product — overengineered for 6 products with no CMS.

---

## 3. WhatsApp URL Generation

**Decision**: Single pure function `generateWhatsAppUrl()` in `src/lib/whatsapp.ts` that accepts typed parameters and returns a URL string. Uses `encodeURIComponent` for message encoding.

**Rationale**: WhatsApp's Click-to-Chat API requires the format `https://wa.me/{number}?text={encodedMessage}`. The phone number is fixed per constitution. A pure function with no side effects is the simplest approach, easily callable from any component.

**Alternatives Considered**:
- React hook (`useWhatsApp`) — unnecessary complexity for a pure URL generation task with no state management.
- Server action — prohibited by constitution (no backend writes).

**Key Implementation Details**:
- WhatsApp number: `971502507859` (no + prefix, no spaces per WhatsApp API)
- Message must be UTF-8 encoded via `encodeURIComponent()`
- Arabic text with emoji renders correctly in WhatsApp — no special RTL handling needed in the URL
- Optional parameters (size, color) should be omitted from message when not provided, not sent as empty

---

## 4. Unsplash Placeholder Images

**Decision**: Use direct Unsplash URLs in the format `https://images.unsplash.com/photo-{ID}?w=600&h=800&fit=crop` for 3:4 portrait aspect ratio.

**Rationale**: The constitution allows Unsplash placeholders during development. Using dimension parameters in the URL ensures consistent 3:4 aspect ratio. These will be replaced with real WebP product photography before production.

**Alternatives Considered**:
- Download and store locally — adds unnecessary file bloat for temporary placeholders.
- Use `next/image` placeholder blur — requires local files; will be configured when real images are added.

---

## All NEEDS CLARIFICATION: Resolved ✅

No unresolved technical decisions remain. All choices align with the constitution.
