# Feature Specification: i18n & Content Foundation

**Feature Branch**: `002-i18n-content-foundation`  
**Created**: 2026-02-21  
**Status**: Draft  
**Input**: User description: "Phase 2 from implementation plan — i18n & Content Foundation: All text content ready in both languages, locale routing configured, product data layer established, and WhatsApp ordering utility built."

## Clarifications

### Session 2026-02-21

- Q: Which product categories should the 6 placeholder products use? → A: Exactly 2 client-confirmed categories only: شتوي / Winter and صيفي / Summer. No other categories permitted.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Bilingual Content Display (Priority: P1)

A visitor arrives at the website and sees all content displayed in Arabic (the default language). Every piece of text — navigation labels, hero headlines, product names, CTAs, section titles, footer content, and the announcement bar — appears in correct Arabic with proper right-to-left layout. No hardcoded English text is visible anywhere.

**Why this priority**: The site's primary audience speaks Arabic. If the translation layer is broken or incomplete, the entire website is unusable for the majority of target users. This is the foundational layer upon which every other feature depends.

**Independent Test**: Can be fully tested by loading any page in the default locale and confirming all visible text is in Arabic with proper RTL direction. Delivers a fully localized Arabic browsing experience.

**Acceptance Scenarios**:

1. **Given** a visitor opens the site without specifying a locale, **When** the home page loads, **Then** all text content appears in Arabic and the page direction is RTL
2. **Given** the Arabic locale is active, **When** a visitor navigates to any page (Home, Collections, Product Detail, Contact, Size Guide, Returns), **Then** all user-facing text is in Arabic with no English fallback text visible
3. **Given** the Arabic translation file contains all required keys, **When** the site renders, **Then** no translation key placeholders or missing-key warnings appear

---

### User Story 2 - Language Switching (Priority: P1)

A visitor who prefers English taps a language switcher and the entire site seamlessly switches to English. All text, navigation, and product information updates to English, and the page direction changes from RTL to LTR. The selected language persists as the visitor navigates between pages.

**Why this priority**: The site must serve both Arabic and English speakers. Without working language switching and locale-based routing, half the target audience is excluded.

**Independent Test**: Can be tested by switching between AR and EN on any page and verifying all text changes, layout direction flips, and navigation preserves the selected locale.

**Acceptance Scenarios**:

1. **Given** a visitor is viewing the site in Arabic, **When** they switch to English, **Then** all text content updates to English and the page direction changes to LTR
2. **Given** a visitor is viewing the site in English, **When** they switch to Arabic, **Then** all text content updates to Arabic and the page direction changes to RTL
3. **Given** a visitor selects English and navigates to another page, **When** the new page loads, **Then** the language remains English and the URL reflects the `/en/` locale prefix
4. **Given** a visitor accesses `/en/collections`, **When** the page loads, **Then** all content is in English with LTR direction
5. **Given** a visitor accesses `/ar/collections`, **When** the page loads, **Then** all content is in Arabic with RTL direction

---

### User Story 3 - Product Catalog Browsing (Priority: P1)

A customer browses the site and sees product listings with names, descriptions, prices, and categories — all displayed in her currently selected language. The product information is consistent across every page where products appear (home featured section, collections grid, product detail).

**Why this priority**: Products are the core offering. Without a structured product data layer that supports bilingual content, no product-related feature (cards, grids, detail pages, WhatsApp ordering) can function.

**Independent Test**: Can be tested by viewing the collections page and verifying that all products render with correct bilingual names, descriptions, prices, categories, sizes, colors, and images.

**Acceptance Scenarios**:

1. **Given** the product data contains 6 placeholder products, **When** the collections page loads, **Then** all 6 products display with correct name, price, and category in the active language
2. **Given** a product has a name in both Arabic and English, **When** the language is switched from AR to EN, **Then** the product name updates to the English version
3. **Given** a product has multiple sizes (S, M, L, XL, XXL), **When** viewing product details, **Then** all available sizes are displayed
4. **Given** a product has multiple color options, **When** viewing product details, **Then** all colors are shown with their names and color swatches
5. **Given** a product is marked as featured, **When** loading the home page, **Then** that product appears in the featured products section

---

### User Story 4 - WhatsApp Ordering (Priority: P2)

A customer finds a product she likes, selects her preferred size and color, and taps the "Order Now" button. This opens WhatsApp with a pre-filled message containing the product name, price, selected size, and selected color — all in the language she is currently viewing. The message is sent to the store's WhatsApp number.

**Why this priority**: WhatsApp is the sole ordering channel. Without the WhatsApp utility generating correct, pre-filled messages, customers cannot complete purchases. However, this depends on the product data layer (P1) being in place first.

**Independent Test**: Can be tested by calling the WhatsApp utility function with sample product data and verifying the generated URL opens WhatsApp with the correct pre-filled message format.

**Acceptance Scenarios**:

1. **Given** a customer is viewing a product in Arabic, **When** they tap "Order Now" with size M and color Black selected, **Then** WhatsApp opens with a pre-filled Arabic message containing the product name, price, size "M", and the selected color name
2. **Given** a customer is viewing a product in English, **When** they tap "Order Now", **Then** WhatsApp opens with a pre-filled English message containing all product details
3. **Given** a customer has not selected a size or color, **When** they tap "Order Now", **Then** WhatsApp still opens with the product name and price, omitting size and color from the message
4. **Given** any WhatsApp link is generated, **When** the link is opened, **Then** it directs to the number +971 50 250 7859

---

### Edge Cases

- What happens when a translation key is missing from one language file? The system should fall back gracefully without showing raw key names.
- How does the system handle a product with an empty description in one language? The description area should be hidden rather than showing blank space.
- What happens if a visitor accesses an invalid locale (e.g., `/fr/`)? The system should redirect to the default locale (Arabic).
- What happens when a product has no images defined? A placeholder or fallback image should be displayed.
- How does the WhatsApp utility handle special characters (quotes, ampersands) in product names? Characters must be URL-encoded properly.
- What happens when the product data file is empty (no products)? Pages should show a meaningful empty state rather than breaking.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST serve all user-facing text from translation files (`/messages/ar.json` and `/messages/en.json`) — no hardcoded text in components
- **FR-002**: System MUST support two locales: Arabic (default, RTL) at `/ar/` and English (LTR) at `/en/`
- **FR-003**: System MUST redirect the root URL (`/`) to the default Arabic locale (`/ar/`)
- **FR-004**: System MUST set the HTML `dir` attribute to `rtl` for Arabic and `ltr` for English
- **FR-005**: System MUST apply the correct font families per locale — Noto Naskh Arabic + Tajawal for Arabic; Playfair Display + Inter for English
- **FR-006**: System MUST provide a complete Arabic translation file with all keys covering: announcement bar, navigation, hero slides (3 slides with title/subtitle/CTA), product labels, about section, footer, and all page-specific content
- **FR-007**: System MUST provide a complete English translation file with all corresponding keys matching the Arabic file structure
- **FR-008**: System MUST define a Product data type with the following fields: id, slug, name (AR/EN), description (AR/EN), price, currency (AR/EN), category (AR/EN), sizes array, colors array (name + hex), images array, featured flag, and whatsappMessage (AR/EN)
- **FR-009**: System MUST include 6 placeholder products (3 شتوي / Winter, 3 صيفي / Summer) with complete bilingual data and Unsplash placeholder images
- **FR-010**: System MUST provide a WhatsApp utility that generates a correctly formatted WhatsApp URL (`https://wa.me/971502507859?text=...`) with a pre-filled message containing the product name, price, and optionally selected size and color
- **FR-011**: The WhatsApp pre-filled message MUST be in the user's currently active language
- **FR-012**: System MUST support locale-aware URL routing so that all internal navigation preserves the current locale
- **FR-013**: All placeholder products MUST be assigned to one of exactly 2 client-confirmed categories: شتوي / Winter or صيفي / Summer. No other categories are permitted. Names and descriptions MUST be realistic abaya-related content in both languages
- **FR-014**: The product price MUST be displayed with the correct currency symbol per locale (د.إ for Arabic, AED for English)

### Key Entities

- **Product**: The central data entity representing an abaya. Contains bilingual name/description/category, numeric price, arrays of available sizes and color options, gallery images, a featured flag, and bilingual WhatsApp message templates. Stored as a TypeScript array in `/src/data/products.ts`.
- **Translation Bundle**: A JSON file containing all user-facing strings for one locale. Organized by feature area (nav, hero, product, about, footer, etc.). Two bundles exist: `ar.json` (Arabic) and `en.json` (English). Located in `/messages/`.
- **Locale**: Represents a supported language/direction combination. Two locales are supported: `ar` (Arabic, RTL, default) and `en` (English, LTR). Determines URL prefix, text direction, font family, and translation bundle selection.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of user-facing text on every page is sourced from translation files — zero hardcoded strings exist in any component
- **SC-002**: Language switching between Arabic and English completes in under 1 second with all text updating correctly
- **SC-003**: All 6 placeholder products render correctly with bilingual content on collections and home pages
- **SC-004**: WhatsApp order links open the correct WhatsApp chat with a properly formatted, pre-filled message in the user's active language
- **SC-005**: Accessing the root URL (`/`) redirects to the Arabic locale within 1 second
- **SC-006**: Page direction (`dir` attribute) correctly reflects RTL for Arabic and LTR for English on every page
- **SC-007**: No translation key warnings, missing key placeholders, or fallback text are visible to users on any page in either language
- **SC-008**: All product data fields (name, description, price, sizes, colors, images, category) are populated and render without errors in both languages

## Assumptions

- Unsplash placeholder images are acceptable during development and will be replaced with real product photography before production launch
- The 6 placeholder products are split evenly across 2 client-confirmed categories (شتوي / Winter and صيفي / Summer) — no additional categories will be added for MVP
- Currency is UAE Dirham (AED / د.إ) for all products — no multi-currency support is needed
- The WhatsApp number (+971 50 250 7859) is fixed and does not change per product or page
- Product data is managed directly in a TypeScript file — no CMS or database is involved
- The site supports exactly two languages (Arabic and English) — no additional locales are planned for MVP
