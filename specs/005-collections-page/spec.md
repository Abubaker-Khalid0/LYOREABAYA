# Feature Specification: Collections Page

**Feature Branch**: `005-collections-page`  
**Created**: 2026-02-22  
**Status**: Draft  
**Input**: User description: "Collections page with product listing, category filtering, and product cards — Phase 5 of the LYORE ABAYA implementation plan"

## Clarifications

### Session 2026-02-22

- Q: What visual treatment should the Collections page hero banner have? → A: Full-width background image with dark overlay and centered localized title text.
- Q: In what order should products be displayed in the grid? → A: Data source order — products render in the sequence defined in `products.ts`, giving the brand owner full control.
- Q: Should the selected category filter persist when navigating back from a product detail page? → A: No — filter resets to "All" every time the user returns to the Collections page.
- Q: Should product cards show color swatches or size indicators? → A: No — cards are minimal (image, name, price, category badge, WhatsApp button only). Color and size selection is reserved for the product detail page.
- Q: What height should the Collections hero banner be? → A: Medium (~40vh) — balanced visual impact without pushing products too far down on mobile.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse All Products (Priority: P1)

A customer lands on the Collections page and wants to browse the full product catalog. She sees a full-width hero banner featuring a background image with a dark overlay and centered localized title, followed by all available products displayed in a responsive grid. Each product shows its image, name, category, price, and a WhatsApp order button. The page renders correctly in both Arabic (RTL) and English (LTR) layouts.

**Why this priority**: This is the core purpose of the Collections page — displaying all products is the fundamental requirement without which the page has no value.

**Independent Test**: Navigate to `/[locale]/collections` and verify all products from the data source render as cards with image, name, price, category, and WhatsApp button.

**Acceptance Scenarios**:

1. **Given** the user navigates to the Collections page, **When** the page loads, **Then** all products from the data source are displayed in a responsive grid (2 columns on mobile, 3 on tablet, 4 on extra-large screens).
2. **Given** a product exists in the catalog, **When** the page renders, **Then** each product card shows the product image (3:4 aspect ratio), localized name, price in champagne gold, category badge in maroon, and a WhatsApp order button.
3. **Given** the user views the page in Arabic, **When** the layout renders, **Then** the entire page layout is right-to-left, text uses Arabic fonts (Noto Naskh Arabic for headings, Tajawal for body), and content is localized.
4. **Given** the user views the page in English, **When** the layout renders, **Then** the page is left-to-right, text uses English fonts (Playfair Display for headings, Inter for body), and content is localized.

---

### User Story 2 - Filter Products by Category (Priority: P1)

A customer wants to narrow down the product catalog by category. She taps horizontal filter tabs at the top of the product grid to select a specific category (e.g., "Winter", "Summer"). The products animate out and the matching products animate in. An "All" tab is always available as the first option to reset the filter.

**Why this priority**: Category filtering is essential for usability once there are multiple product types — it enables customers to quickly find relevant products, directly impacting conversion.

**Independent Test**: Click various category filter tabs and verify the grid updates to show only matching products, with the "All" tab restoring the full catalog.

**Acceptance Scenarios**:

1. **Given** the Collections page is loaded, **When** the user views the filter tabs, **Then** the "All" tab is displayed first, followed by category tabs dynamically generated from the product data.
2. **Given** the "All" tab is active, **When** the user taps a specific category tab, **Then** only products matching that category are displayed, with a smooth animation transition.
3. **Given** a category filter is active, **When** the user taps the "All" tab, **Then** all products are displayed again with a smooth animation transition.
4. **Given** a category has no products, **When** the user taps that category tab, **Then** an appropriate "No products found" empty state is shown.
5. **Given** the user is on mobile, **When** there are more categories than the screen width allows, **Then** the filter tabs are horizontally scrollable.

---

### User Story 3 - Interact with a Product Card (Priority: P1)

A customer sees a product she likes in the grid and wants to either learn more or order it immediately. She can tap the product card to navigate to the product detail page, or tap the WhatsApp button directly on the card to open a pre-filled WhatsApp chat.

**Why this priority**: Product card interaction is the primary conversion point — it bridges browsing and purchasing intent, which is the core business goal (routing orders through WhatsApp).

**Independent Test**: Tap a product image/name to verify navigation to `/[locale]/products/[slug]`, and tap the WhatsApp button to verify it opens WhatsApp with a pre-filled message containing the product name and price in the correct language.

**Acceptance Scenarios**:

1. **Given** a product card is displayed, **When** the user taps anywhere on the card except the WhatsApp button, **Then** the user is navigated to `/[locale]/products/[slug]` for that product.
2. **Given** a product card is displayed, **When** the user hovers over the product image (desktop), **Then** the image smoothly zooms to scale 1.08.
3. **Given** a product card is displayed, **When** the user taps the WhatsApp order button, **Then** WhatsApp opens with a pre-filled message containing the product name and price in the user's current language.
4. **Given** the user is browsing in Arabic, **When** the WhatsApp button text is rendered, **Then** it displays the localized label (e.g., "اطلبي الآن") and the pre-filled message is in Arabic.

---

### User Story 4 - Scroll-Triggered Animations (Priority: P2)

A customer scrolls down the Collections page and products appear with staggered entrance animations as they enter the viewport. When switching between category filters, outgoing products animate out and incoming products animate in.

**Why this priority**: Animations enhance the luxury feel of the brand and create a premium user experience, but the page is fully functional without them.

**Independent Test**: Scroll down the page and verify product cards animate in with a stagger effect. Switch filter tabs and verify AnimatePresence handles exit/enter transitions.

**Acceptance Scenarios**:

1. **Given** the user scrolls down on the Collections page, **When** product cards enter the viewport, **Then** they appear with a staggered reveal animation.
2. **Given** the user switches between category filter tabs, **When** the grid content changes, **Then** outgoing products animate out and incoming products animate in using AnimatePresence.
3. **Given** the user has `prefers-reduced-motion` enabled in their system settings, **When** animations would normally trigger, **Then** all animations are disabled or minimized to respect the accessibility preference.

---

### Edge Cases

- What happens when the product data source is empty (no products at all)?
  - The page displays a "No products found" empty state message (localized).
- What happens when a product is missing an image?
  - A placeholder or fallback image is shown while maintaining the 3:4 aspect ratio.
- What happens when a product has no category?
  - The product appears under the "All" tab but not under any specific category tab. No category badge is displayed on the card.
- How does the page handle a large number of categories?
  - Filter tabs scroll horizontally on all viewports, with the "All" tab always pinned first.
- What happens when the user navigates back from a product detail page?
  - The filter resets to "All" and all products are displayed; no filter state is persisted.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Collections page MUST display a full-width hero banner (~40vh height) with a background image, a dark overlay, and a centered localized title at the top.
- **FR-002**: The page MUST render all products from `/src/data/products.ts` in a responsive grid layout — 2 columns on mobile, 3 columns on medium screens, 4 columns on extra-large screens.
- **FR-003**: The page MUST display horizontal filter tabs generated dynamically from the product categories in the data source.
- **FR-004**: The "All" filter tab MUST always be the first tab and MUST show all products when active.
- **FR-005**: Tapping a category filter tab MUST update the product grid to show only products matching that category, with animated transitions.
- **FR-006**: Each product card MUST display the product image at 3:4 aspect ratio, localized product name, price in champagne gold (#C9A96E), a category badge in maroon (#550000), and a WhatsApp order button.
- **FR-007**: Tapping a product card (excluding the WhatsApp button) MUST navigate to `/[locale]/products/[slug]`.
- **FR-008**: The WhatsApp order button on each card MUST open WhatsApp with a pre-filled message containing the product name and price in the user's current language, using the URL format `https://wa.me/971502507859?text=MESSAGE`.
- **FR-009**: Product images MUST have a smooth zoom effect (scale 1.08) on hover (desktop).
- **FR-010**: The active filter tab MUST be visually distinguished with a maroon background and white text; inactive tabs MUST have a transparent background with a border.
- **FR-011**: Filter tabs MUST be horizontally scrollable on mobile when they exceed the screen width.
- **FR-012**: The filter tab indicator MUST animate smoothly when switching between tabs using Motion layout animations.
- **FR-013**: Product cards MUST animate in with a staggered reveal effect on scroll using Motion viewport detection.
- **FR-014**: Switching category filters MUST use AnimatePresence for smooth exit and enter transitions of product cards.
- **FR-015**: A "No products found" empty state MUST be displayed when a filtered category has no matching products or when the data source is empty.
- **FR-016**: The entire page MUST render correctly in both Arabic (RTL) and English (LTR) layouts.
- **FR-017**: All user-facing text on the page MUST come from translation files — no hardcoded strings.
- **FR-018**: All animations MUST respect the user's `prefers-reduced-motion` system setting.
- **FR-019**: Products MUST be displayed in the order defined in the data source (`products.ts`); no client-side sorting is applied.
- **FR-020**: The selected category filter MUST reset to "All" when the user navigates away from and returns to the Collections page; no filter state is persisted.
- **FR-021**: Product cards MUST NOT display color swatches, size indicators, or any selection controls; these are reserved for the product detail page.

### Key Entities

- **Product**: A luxury abaya item with localized name, description, price, currency, category, sizes, colors, images, featured flag, and pre-filled WhatsApp message. Sourced from `/src/data/products.ts`.
- **Category**: A classification for products (e.g., "Winter", "Summer"), derived dynamically from product data. Used for filter tab generation and product grouping.
- **Product Card**: The visual representation of a product within the grid — displays image, name, price, category badge, and WhatsApp CTA. Acts as both a navigation link and a conversion element.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All products from the data source are visible on the page within 2 seconds of initial load.
- **SC-002**: Filtering by category updates the displayed products within 0.5 seconds, with smooth animation transitions.
- **SC-003**: 100% of product cards correctly link to their corresponding product detail page.
- **SC-004**: 100% of WhatsApp buttons generate correct pre-filled messages with the product name and price in the user's active language.
- **SC-005**: The Collections page renders without visual broken layouts at 375px viewport width (minimum mobile).
- **SC-006**: The page renders correctly in both RTL (Arabic) and LTR (English) layouts with no misaligned elements.
- **SC-007**: The page achieves a Lighthouse Accessibility score of ≥ 95.
- **SC-008**: Users with `prefers-reduced-motion` enabled experience no disruptive animations.

## Assumptions

- Product data is already populated in `/src/data/products.ts` with categories, images, and localized content (completed in prior phases).
- The shared layout (Navbar, Footer, AnnouncementBar) is already functional from Phase 3.
- Translation keys for the Collections page are available in `/messages/ar.json` and `/messages/en.json`.
- The `ProductCard` component built here will be reusable across the site (e.g., FeaturedProducts on Home, RelatedProducts on Product Detail).
- WhatsApp utility function in `/src/lib/whatsapp.ts` is already implemented from Phase 2.
