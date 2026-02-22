# Feature Specification: Home Page

**Feature Branch**: `004-home-page`  
**Created**: 2026-02-22  
**Status**: Draft  
**Input**: User description: "Complete Home page with HeroSlider, FeaturedProducts, AboutSection, and CollectionsBanner — Phase 4 of the LYORE ABAYA implementation plan"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - First Impression via Hero Slider (Priority: P1)

A visitor lands on the LYORE ABAYA home page and is immediately greeted by a full-screen image slider showcasing the brand's luxury abayas. The slider auto-plays through three visually stunning slides, each featuring a headline, subtitle, and a call-to-action button inviting the visitor to explore the collections. The visitor can also navigate manually using dots or arrow controls.

**Why this priority**: The hero section is the very first visual impression of the brand. It establishes LYORE ABAYA's luxury identity and directly drives visitors toward browsing collections. Without a compelling hero, bounce rate increases and brand perception suffers.

**Independent Test**: Can be fully tested by loading the home page and observing the slider auto-advancing every 5 seconds, clicking navigation arrows and dots, and verifying the CTA button navigates to the collections page. Delivers immediate brand impact and a clear path to product browsing.

**Acceptance Scenarios**:

1. **Given** a visitor loads the home page, **When** the page finishes rendering, **Then** a full-screen (100vh) hero slider is displayed with the first slide's image, headline, subtitle, and CTA button visible.
2. **Given** the hero slider is visible and idle for 5 seconds, **When** the auto-play timer fires, **Then** the slider transitions to the next slide with a smooth animation and the text fades in from the bottom.
3. **Given** the slider is on any slide, **When** the visitor clicks the right arrow or next dot, **Then** the slider transitions to the next slide (or wraps to the first slide from the last).
4. **Given** the slider is on any slide, **When** the visitor clicks the left arrow or previous dot, **Then** the slider transitions to the previous slide (or wraps to the last slide from the first).
5. **Given** any CTA button is visible, **When** the visitor clicks it, **Then** they are navigated to the collections page (`/collections`).
6. **Given** the page is viewed in Arabic, **When** the hero renders, **Then** all text (headline, subtitle, CTA label) is displayed in Arabic with RTL alignment.
7. **Given** the page is viewed in English, **When** the hero renders, **Then** all text is displayed in English with LTR alignment.
8. **Given** a visitor is on a mobile device (375px width), **When** the hero slider renders, **Then** all content is legible, the image is not distorted, and navigation controls are accessible.
9. **Given** the background image is loaded, **When** the user scrolls, **Then** a parallax effect is visible on the hero background image.

---

### User Story 2 - Discovering Featured Products (Priority: P1)

After scrolling past the hero, a visitor sees a curated selection of featured abaya designs presented in a responsive grid. Each product card displays the product image, name, price, and a WhatsApp order button. The visitor can click a card to view the product's detail page or tap the WhatsApp button to initiate an order directly.

**Why this priority**: Featured products are the primary revenue driver — they expose the visitor to the product catalog immediately after the hero and provide a direct path to purchase intent via WhatsApp. This section is essential for conversion.

**Independent Test**: Can be fully tested by scrolling to the featured section, verifying 6 product cards appear in the correct grid layout, confirming each card shows product data from the data source, clicking a card to navigate to its detail page, and tapping the WhatsApp button to verify it opens WhatsApp with a pre-filled message.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls past the hero, **When** the featured products section enters the viewport, **Then** a section titled "أبرز التصاميم" (AR) or "Featured Designs" (EN) is visible with 6 product cards.
2. **Given** the featured section is visible, **When** rendered on mobile (375px), **Then** products display in a 2-column grid.
3. **Given** the featured section is visible, **When** rendered on desktop, **Then** products display in a 3-column grid.
4. **Given** the featured section enters the viewport, **When** the cards appear, **Then** they reveal with a staggered scroll animation (each card animates in sequence).
5. **Given** a product card is displayed, **When** the visitor views it, **Then** the card shows the product image (3:4 aspect ratio), product name, price in champagne gold, and a WhatsApp order button.
6. **Given** a product card, **When** the visitor hovers over the image, **Then** the image smoothly scales up (zoom effect).
7. **Given** a product card, **When** the visitor clicks the card body, **Then** they are navigated to the product detail page (`/products/[slug]`).
8. **Given** a product card, **When** the visitor clicks the WhatsApp button, **Then** WhatsApp opens with a pre-filled message containing the product name and price in the current language.
9. **Given** the page is in Arabic, **When** the featured section renders, **Then** all product names, prices (with "د.إ" currency), and labels are in Arabic with RTL layout.

---

### User Story 3 - Learning the Brand Story (Priority: P2)

A visitor scrolls to the About section and reads the LYORE ABAYA brand story. The section presents brand messaging alongside a complementary image in a split layout, reinforcing the luxury identity.

**Why this priority**: The brand story builds emotional connection and trust with the visitor. It differentiates LYORE ABAYA from competitors and supports the overall luxury positioning. While not directly transactional, it increases brand loyalty and time on page.

**Independent Test**: Can be fully tested by scrolling to the About section, verifying the split layout renders (text + image), confirming all text comes from translation files, and observing the fade-in animation on scroll.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls past the featured products, **When** the About section enters the viewport, **Then** a split layout is displayed: text on one side and an image on the other, with a decorative gold accent line.
2. **Given** the page is in English (LTR), **When** the About section renders, **Then** text appears on the left and the image on the right.
3. **Given** the page is in Arabic (RTL), **When** the About section renders, **Then** the layout is mirrored (text on the right, image on the left).
4. **Given** the About section enters the viewport, **When** it becomes visible, **Then** the content fades in with a smooth scroll-triggered animation.
5. **Given** any locale, **When** the About section renders, **Then** the brand story text matches the translation file content for that locale.

---

### User Story 4 - Navigating to Full Collections (Priority: P2)

At the bottom of the home page (before the footer), a visitor sees a full-width banner inviting them to explore all collections. Clicking the CTA navigates to the collections page.

**Why this priority**: This section provides a secondary conversion point and a clear navigation path for visitors who scroll to the bottom without selecting a featured product. It ensures every visitor has an opportunity to browse the full catalog.

**Independent Test**: Can be fully tested by scrolling to the bottom of the home page, verifying the full-width banner image renders with overlay text and CTA button, clicking the CTA to confirm navigation to the collections page, and observing the parallax scroll effect.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls past the About section, **When** the collections banner enters the viewport, **Then** a full-width banner image with overlay text ("اكتشفي كل المجموعات" in AR / equivalent in EN) and a CTA button is displayed.
2. **Given** the banner is visible, **When** the visitor scrolls, **Then** a parallax effect is visible on the banner background image.
3. **Given** the CTA button is visible, **When** the visitor clicks it, **Then** they are navigated to the collections page (`/collections`).
4. **Given** a mobile viewport, **When** the banner renders, **Then** the overlay text and CTA button are legible and accessible (minimum 44px tap target).

---

### Edge Cases

- What happens when a product in the featured section has no images? → The card should display a placeholder or fallback image maintaining the 3:4 aspect ratio.
- How does the hero slider behave when there is only one slide? → It should display the single slide without arrows or dots, and auto-play should be disabled.
- What happens when the WhatsApp button is clicked on a desktop without WhatsApp installed? → The system should fall back to WhatsApp Web in the browser.
- How do animations behave when the user has `prefers-reduced-motion` enabled? → All animations (parallax, fade-in, stagger, slider transitions) must be disabled or reduced to simple opacity changes.
- What happens if translation keys are missing for a locale? → The system should fall back gracefully, displaying the other locale's text rather than broken keys.
- How does the hero slider handle rapid clicks on navigation controls? → Transitions should debounce or queue to prevent visual glitches.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a full-screen (100vh) hero image slider with exactly 3 slides on the home page.
- **FR-002**: Each hero slide MUST display a headline, subtitle, and CTA button, all sourced from translation files.
- **FR-003**: The hero slider MUST auto-play, advancing to the next slide every 5 seconds.
- **FR-004**: The hero slider MUST support manual navigation via dot indicators and directional arrows.
- **FR-005**: Hero slide transitions MUST include text fade-in-from-bottom animation and background parallax effect.
- **FR-006**: The home page MUST display a "Featured Designs" section showing exactly 6 products where `featured: true`.
- **FR-007**: Featured products MUST render in a responsive grid: 2 columns on mobile, 3 columns on desktop.
- **FR-008**: Each product card MUST display the product image (3:4 aspect ratio), name, price (in champagne gold), and a WhatsApp order button.
- **FR-009**: Product card images MUST display a hover zoom effect (scale 1.08).
- **FR-010**: Clicking a product card MUST navigate the visitor to the corresponding product detail page (`/products/[slug]`).
- **FR-011**: Clicking the WhatsApp button on a product card MUST open WhatsApp with a pre-filled message containing the product name and price in the visitor's current language.
- **FR-012**: Featured product cards MUST reveal with a staggered scroll-triggered animation when entering the viewport.
- **FR-013**: The home page MUST include an About section with a split layout (text + image) and a decorative gold accent line (#C9A96E).
- **FR-014**: The About section text/image layout MUST mirror correctly between LTR and RTL locales.
- **FR-015**: The About section MUST display a fade-in animation triggered on scroll.
- **FR-016**: The home page MUST include a full-width collections banner with a background image, overlay text, and a CTA button linking to `/collections`.
- **FR-017**: The collections banner MUST display a parallax scroll effect on its background image.
- **FR-018**: All user-facing text on the home page MUST be sourced from translation files (no hardcoded strings).
- **FR-019**: All sections MUST render correctly in both Arabic (RTL) and English (LTR) layouts.
- **FR-020**: All interactive animations MUST respect `prefers-reduced-motion` user preferences.
- **FR-021**: All images below the hero fold MUST be lazy loaded.
- **FR-022**: The home page MUST be fully functional and visually correct on mobile devices (minimum 375px width).

### Key Entities

- **Slide**: Represents a single hero slide. Contains a background image, headline text, subtitle text, and a CTA label/link — all bilingual (AR/EN).
- **Featured Product**: A product from the product data source with `featured: true`. Contains an image, name (AR/EN), price, slug for navigation, and a pre-filled WhatsApp message (AR/EN).
- **About Content**: Brand story content consisting of a text block (AR/EN) and a complementary image, displayed in a split layout.
- **Collections Banner**: A promotional banner with a background image, overlay text (AR/EN), and a CTA linking to the collections page.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors can view and interact with the hero slider (auto-play + manual navigation) within 2 seconds of page load.
- **SC-002**: All 6 featured products are visible and correctly rendered with data from the product catalog when the visitor scrolls to the section.
- **SC-003**: Clicking any WhatsApp button on the home page opens WhatsApp with an accurate pre-filled message within 1 second.
- **SC-004**: The home page renders correctly on both Arabic (RTL) and English (LTR) with zero layout or text-direction errors.
- **SC-005**: The home page scores 90+ on Lighthouse Performance and 95+ on Lighthouse Accessibility.
- **SC-006**: All scroll-triggered animations complete smoothly at 60fps on mid-range mobile devices.
- **SC-007**: The home page is fully usable on a 375px-wide mobile viewport with no horizontal overflow.
- **SC-008**: All animations are disabled or reduced when the visitor's system has `prefers-reduced-motion` enabled.
- **SC-009**: 100% of user-facing text is served from translation files, verified by zero hardcoded strings in any component.
