# Feature Specification: Secondary Pages

**Feature Branch**: `007-secondary-pages`
**Created**: February 26, 2026
**Status**: Draft
**Input**: User description: "Secondary Pages — Contact, Size Guide, Returns & Shipping (Phase 7 of implementation plan)"

## Clarifications

### Session 2026-02-26

- Q: What is the returns policy — return window, eligibility, and refund vs. exchange? → A: Exchange only (no refund) within 7 days of delivery
- Q: What is the estimated delivery timeframe within UAE? → A: 2–5 business days
- Q: How should the "how to measure" section on the Size Guide be presented — illustration or text? → A: Step-by-step text instructions with measurement icons (no static image asset required)
- Q: Should the Contact page WhatsApp card show a fallback modal when WhatsApp fails? → A: No — `wa.me` link opens WhatsApp Web as a natural fallback; all alternative channels are already visible on the page
- Q: Should all three secondary pages share a common hero/banner header? → A: Minimal text-only header — page title + short subtitle, no background image

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Contact the Store (Priority: P1)

A customer who wants to reach LYORE ABAYA — whether to ask a question, negotiate a custom order, or follow on social media — navigates to the Contact page and finds all available contact channels clearly presented with actionable links.

**Why this priority**: Contact is the primary conversion support for a WhatsApp-first business. If a customer cannot reach the store, potential sales are lost. This is a mandatory trust-building page for luxury e-commerce.

**Independent Test**: Navigate to `/ar/contact` and `/en/contact`. Verify that all six contact cards (WhatsApp, Phone, Email, Instagram, TikTok, Snapchat) render with correct links, correct labels in both languages, and that clicking each card opens the correct destination.

**Acceptance Scenarios**:

1. **Given** a customer navigates to the Contact page, **When** the page loads, **Then** they see a minimal text-only page header with a title ("تواصلي معنا" / "Contact Us") and a short subtitle — no background image
2. **Given** a customer navigates to the Contact page, **When** the page loads, **Then** they see six contact channel cards: WhatsApp, Phone, Email, Instagram, TikTok, and Snapchat
3. **Given** a customer clicks the WhatsApp card, **When** WhatsApp opens, **Then** a pre-filled message is sent to +971502507859 with a generic greeting in the customer's current language
4. **Given** a customer clicks the Phone card, **When** the link is activated, **Then** their device initiates a call to +971502507859 via `tel:` protocol
5. **Given** a customer clicks the Email card, **When** the link is activated, **Then** their mail client opens a new message addressed to info@lyoreabaya.com via `mailto:` protocol
6. **Given** a customer clicks the Instagram card, **When** the link opens, **Then** they are taken to instagram.com/lyoreabaya in a new tab
7. **Given** a customer clicks the TikTok card, **When** the link opens, **Then** they are taken to tiktok.com/@lyoreabaya in a new tab
8. **Given** a customer clicks the Snapchat card, **When** the link opens, **Then** they are taken to snapchat.com/add/lyoreabaya in a new tab
9. **Given** a customer views the Contact page in Arabic, **When** the page renders, **Then** all labels and headings appear in Arabic with RTL layout
10. **Given** a customer views the Contact page in English, **When** the page renders, **Then** all labels and headings appear in English with LTR layout

---

### User Story 2 - Find the Right Size (Priority: P1)

A customer unsure of their abaya size visits the Size Guide page to look up their measurements against a sizing chart and understand how to measure themselves correctly before placing a WhatsApp order.

**Why this priority**: Sizing uncertainty is the top reason customers hesitate before ordering clothing online. Providing a clear size guide reduces order errors, minimizes back-and-forth with the store, and increases conversion confidence — especially critical for a no-return WhatsApp-only ordering model.

**Independent Test**: Navigate to `/ar/size-guide` and `/en/size-guide`. Verify that: (1) a text-only page header with title and subtitle is shown, (2) a size table with all 6 sizes (XS–XXL) is visible with height, chest, and waist columns, (3) a "How to Measure" section with icon-accompanied steps is present, (4) a WhatsApp CTA appears below the table, and (5) the table renders correctly in both RTL and LTR layouts.

**Acceptance Scenarios**:

1. **Given** a customer navigates to the Size Guide page, **When** the page loads, **Then** they see a minimal text-only page header with a title ("دليل المقاسات" / "Size Guide") and a short subtitle — no background image
2. **Given** a customer navigates to the Size Guide page, **When** the page loads, **Then** they see a size table with the following columns: Size, Height (cm range), Chest (cm range), Waist (cm range)
3. **Given** a customer views the size table, **When** the page renders, **Then** all 6 sizes are listed: XS (148–153 cm), S (153–158 cm), M (158–163 cm), L (163–168 cm), XL (168–173 cm), XXL (173–178 cm) with their respective chest and waist measurements
4. **Given** a customer views the Size Guide, **When** the page loads, **Then** they see a "How to Measure" section with step-by-step text instructions and an icon per measurement step
5. **Given** a customer is still unsure of their size, **When** they scroll to the bottom of the page, **Then** they see a WhatsApp CTA with the text "مش متأكدة من مقاسك؟؟ تواصلي معنا عبر واتساب" (AR) / "Not sure about your size? Contact us via WhatsApp" (EN)
6. **Given** a customer clicks the WhatsApp CTA on the Size Guide, **When** WhatsApp opens, **Then** the message is pre-filled in the customer's current language asking for sizing help
7. **Given** a customer views the Size Guide in Arabic, **When** the page renders, **Then** the size table and all content display with RTL alignment and Arabic labels

---

### User Story 3 - Understand Shipping & Returns Policy (Priority: P2)

A customer who wants to know before ordering whether they can return an item or how long delivery takes navigates to the Returns & Shipping page to read the full policies clearly laid out.

**Why this priority**: Policy transparency is essential for luxury purchase confidence. Customers are less likely to order via WhatsApp without knowing the shipping and return terms upfront. This page reduces pre-sale anxiety and post-sale disputes.

**Independent Test**: Navigate to `/ar/returns` and `/en/returns`. Verify that: (1) a free shipping banner is prominently displayed, (2) the shipping policy section explains delivery timelines and coverage area, (3) the returns policy section explains the returns process, (4) a WhatsApp CTA is present for return requests, and (5) both languages render correctly.

**Acceptance Scenarios**:

1. **Given** a customer navigates to the Returns & Shipping page, **When** the page loads, **Then** they see a minimal text-only page header with a title ("الشحن والإرجاع" / "Shipping & Returns") and a short subtitle — no background image
2. **Given** a customer navigates to the Returns & Shipping page, **When** the page loads, **Then** they see a prominently displayed "Free Shipping in UAE" / "شحن مجاني داخل الإمارات" banner
3. **Given** a customer reads the page, **When** they view the shipping section, **Then** they see the UAE free shipping policy, estimated delivery timeframe, and any applicable shipping conditions
4. **Given** a customer reads the page, **When** they view the returns section, **Then** they see that exchanges are accepted within 7 days of delivery (no refunds), the eligibility conditions (unworn, tagged, original packaging), and the steps to initiate an exchange via WhatsApp
5. **Given** a customer wants to initiate an exchange, **When** they reach the WhatsApp CTA, **Then** clicking it opens WhatsApp with a pre-filled exchange request message in the customer's current language
6. **Given** a customer views the Returns page in Arabic, **When** the page renders, **Then** all content appears in Arabic with correct RTL layout and Arabic typography

---

### Edge Cases

- What happens when a customer asks for a refund instead of an exchange? → The Returns page clearly states the exchange-only policy (no refunds); the WhatsApp CTA is for exchange requests only
- What happens when a customer's device does not have WhatsApp installed on the Contact page? → The `wa.me` link opens WhatsApp Web in the browser automatically; no fallback modal is shown because all alternative contact channels (Phone, Email, Instagram, TikTok, Snapchat) are already visible on the same page
- What happens when a customer's device does not support `tel:` links (e.g., desktop)? → The phone number is still displayed as text and the tel: link is the best-effort mechanism; no special fallback is required
- What happens when the Size Guide page is viewed on a very narrow mobile screen (375px)? → The size table must be horizontally scrollable to avoid content overflow
- What happens when a customer navigates to the Size Guide from the product detail page? → Standard navigation; no special state or context needs to be passed
- What happens if the social media links change? → All links are sourced from translation files or a central constants file so they can be updated without code changes
- What happens when a customer accesses `/contact`, `/size-guide`, or `/returns` without a locale prefix? → next-intl middleware redirects to the default locale (`/ar/...`)

## Requirements *(mandatory)*

### Functional Requirements

**Contact Page**

- **FR-001**: System MUST display a Contact page accessible at `/[locale]/contact`
- **FR-002**: System MUST display six contact channel cards: WhatsApp, Phone, Email, Instagram, TikTok, and Snapchat
- **FR-003**: The WhatsApp card MUST link to `https://wa.me/971502507859` with a pre-filled greeting message in the customer's current language
- **FR-004**: The Phone card MUST link to `tel:+971502507859`
- **FR-005**: The Email card MUST link to `mailto:info@lyoreabaya.com`
- **FR-006**: The Instagram card MUST open `https://www.instagram.com/lyoreabaya` in a new tab
- **FR-007**: The TikTok card MUST open `https://www.tiktok.com/@lyoreabaya` in a new tab
- **FR-008**: The Snapchat card MUST open `https://www.snapchat.com/add/lyoreabaya` in a new tab
- **FR-009**: All external social links MUST use `target="_blank"` and `rel="noopener noreferrer"`
- **FR-010**: The Contact page MUST render correctly in both RTL (Arabic) and LTR (English) layouts
- **FR-011**: All text on the Contact page MUST come from translation files — no hardcoded strings
- **FR-011a**: The Contact page WhatsApp card MUST NOT show a fallback modal on failure; the `wa.me` link serves as its own fallback by opening WhatsApp Web, and all alternative channels are already visible on the page

**Size Guide Page**

- **FR-012**: System MUST display a Size Guide page accessible at `/[locale]/size-guide`
- **FR-013**: System MUST display a size measurement table with the following data:

  | Size | Height (cm) | Chest (cm) | Waist (cm) |
  |------|-------------|------------|------------|
  | XS   | 148–153     | 84–88      | 68–72      |
  | S    | 153–158     | 88–92      | 72–76      |
  | M    | 158–163     | 92–96      | 76–80      |
  | L    | 163–168     | 96–102     | 80–86      |
  | XL   | 168–173     | 102–108    | 86–92      |
  | XXL  | 173–178     | 108–116    | 92–100     |

- **FR-014**: The size table MUST be horizontally scrollable on narrow viewports to prevent content overflow
- **FR-015**: System MUST display a "How to Measure" section with step-by-step text instructions accompanied by an icon per step (e.g., a ruler icon for height, a tape icon for chest); no static illustration image is required
- **FR-016**: System MUST display a WhatsApp CTA below the table with the text "مش متأكدة من مقاسك؟ تواصلي معنا عبر واتساب" (AR) / "Not sure about your size? Contact us via WhatsApp" (EN)
- **FR-017**: The Size Guide WhatsApp CTA MUST open WhatsApp with a pre-filled sizing inquiry message to +971502507859
- **FR-018**: The Size Guide page MUST render the size table with correct RTL column order in Arabic
- **FR-019**: All text on the Size Guide page MUST come from translation files — no hardcoded strings

**Returns & Shipping Page**

- **FR-020**: System MUST display a Returns & Shipping page accessible at `/[locale]/returns`
- **FR-021**: System MUST display a prominent "Free Shipping in UAE" / "شحن مجاني داخل الإمارات" banner at the top of the page
- **FR-022**: System MUST display a Shipping Policy section covering: UAE free shipping for all orders, estimated delivery timeframe of 2–5 business days, and any applicable shipping conditions
- **FR-023**: System MUST display a Returns Policy section stating that exchanges (not refunds) are accepted within 7 days of delivery, covering: eligibility conditions (unworn, tagged, original packaging), the 7-day exchange window, and the steps to initiate an exchange via WhatsApp
- **FR-024**: System MUST display a WhatsApp CTA for exchange requests, opening WhatsApp with a pre-filled exchange request message in the customer's current language
- **FR-025**: The Returns & Shipping page MUST render correctly in both RTL (Arabic) and LTR (English) layouts
- **FR-026**: All text on the Returns & Shipping page MUST come from translation files — no hardcoded strings

**Cross-Cutting (All Three Pages)**

- **FR-027**: All three pages MUST include the shared Navbar and Footer from the BaseLayout
- **FR-028**: All three pages MUST display the WhatsApp FAB as required by the constitution
- **FR-029**: All three pages MUST include unique SEO metadata: title and meta description in the active locale
- **FR-030**: All three pages MUST achieve a Lighthouse Accessibility score of 95+ with proper heading hierarchy, ARIA labels, and sufficient color contrast
- **FR-031**: All animations on these pages MUST respect the `prefers-reduced-motion` media query
- **FR-032**: All images on these pages MUST use the Next.js `<Image>` component — `<img>` tags are prohibited
- **FR-033**: Each page MUST include a minimal text-only header section directly below the Navbar containing: an `<h1>` page title in the active locale and a short descriptive subtitle — no background image is used

### Key Entities

- **Contact Channel**: Represents a single contact method with attributes: icon, label (bilingual), href (action URL), whether it opens externally
- **Size Entry**: Represents one row in the size table with attributes: size label (XS–XXL), height range (cm), chest range (cm), waist range (cm), bilingual column headers
- **Policy Section**: Represents a block of policy text with attributes: heading (bilingual), body content (bilingual)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All six contact channel cards on the Contact page are functional — clicking each one opens the correct destination with zero broken links
- **SC-002**: Customers can find and view the complete size table within 5 seconds of landing on the Size Guide page
- **SC-003**: The size table is readable on a 375px-wide viewport without horizontal page overflow (table scrolls independently)
- **SC-004**: The WhatsApp CTA on the Size Guide page correctly opens WhatsApp with a pre-filled sizing inquiry message 100% of the time
- **SC-005**: The Returns & Shipping page clearly communicates the free shipping policy and returns process, as measured by the presence of a free shipping banner, a shipping section, a returns section, and a WhatsApp return CTA
- **SC-006**: All three pages render correctly in both Arabic (RTL) and English (LTR) with no visual misalignments or text overflow
- **SC-007**: All three pages achieve a Lighthouse Accessibility score of 95+ with correct landmark regions, heading hierarchy, and ARIA labels on all interactive elements
- **SC-008**: All three pages load within 2 seconds on a standard connection with the Navbar and Footer fully rendered
- **SC-009**: All external social links open in a new tab without navigating away from the LYORE ABAYA website
- **SC-010**: All three pages include locale-appropriate SEO metadata (title and meta description) visible to search engines in both AR and EN
