# Feature Specification: Layout Components

**Feature Branch**: `003-layout-components`  
**Created**: 2026-02-21  
**Status**: Draft  
**Input**: User description: "Phase 3 — Layout Components: Build AnnouncementBar, Navbar, MobileDrawer, Footer, and BaseLayout shared components for the LYORE ABAYA luxury abaya e-commerce site."

## Clarifications

### Session 2026-02-21
- Q: Should the `BaseLayout` shell also be applied to the 404 (Not Found) page to ensure brand consistency during navigation errors? → A: Yes - Apply BaseLayout to the 404 page (includes Navbar, Footer, and AnnouncementBar).
- Q: At exactly what scroll position should the Navbar transition from its initial transparent state to a solid background? → A: Dynamic - Transition only after scrolling past the full height of the hero (100vh).
- Q: Should the "dismissed" state for the announcement bar be permanent (cached in `localStorage` across browser restarts) or temporary (cleared when the user closes their browser tab/session)? → A: Session - Use sessionStorage (state cleared when tab/window is closed).


## User Scenarios & Testing *(mandatory)*

### User Story 1 - Site-Wide Navigation (Priority: P1)

A visitor lands on any page of the LYORE ABAYA website and sees a consistent navigation bar at the top, allowing them to browse between Home, Collections, Size Guide, and Contact pages. On desktop, the navigation links are visible in a horizontal menu. The navbar starts transparent (overlaying the hero) and becomes solid with a background color when the user scrolls down, providing a polished luxury feel.

**Why this priority**: Navigation is the most critical layout element — without it, users cannot move between pages. It directly affects every user journey on the site.

**Independent Test**: Can be fully tested by loading any page and clicking each navigation link. Delivers core navigability across the entire site.

**Acceptance Scenarios**:

1. **Given** a user loads the Home page, **When** the page renders, **Then** a navigation bar is visible at the top with the LYORE logo and links to Home, Collections, Size Guide, and Contact.
2. **Given** the user is on the Home page at the top, **When** the navbar renders, **Then** it appears transparent over the hero section.
3. **Given** the user scrolls down past the hero section, **When** the scroll threshold is reached, **Then** the navbar transitions smoothly to a solid background using a Motion animation.
4. **Given** the site is viewed in Arabic (RTL), **When** the navbar renders, **Then** the logo appears on the right side and navigation links are positioned on the left, respecting RTL layout via logical properties.
5. **Given** the site is viewed in English (LTR), **When** the navbar renders, **Then** the logo appears on the left and navigation links on the right.
6. **Given** the user clicks a navigation link (e.g., "Collections"), **When** the link is activated, **Then** the user is navigated to the correct page.

---

### User Story 2 - Mobile Navigation Experience (Priority: P1)

A visitor on a mobile device sees a hamburger menu icon instead of the full navigation links. Tapping the hamburger opens a full-screen drawer overlay with smooth slide-in animation. The drawer contains all navigation links and a language switcher. The drawer can be closed by tapping the X button or clicking the backdrop.

**Why this priority**: Mobile users represent a large portion of the target audience (modern modest women). Mobile navigation is equally critical as desktop navigation.

**Independent Test**: Can be tested by resizing the browser to 375px width and tapping the hamburger icon. Delivers mobile navigability independently.

**Acceptance Scenarios**:

1. **Given** the viewport width is below the mobile breakpoint, **When** the navbar renders, **Then** a hamburger menu icon is displayed instead of the horizontal navigation links.
2. **Given** the hamburger icon is visible, **When** the user taps it, **Then** a full-screen overlay drawer slides in smoothly from the appropriate side (start side per locale) using a Motion animation.
3. **Given** the mobile drawer is open, **When** the user taps any navigation link, **Then** the user is navigated to the correct page and the drawer closes.
4. **Given** the mobile drawer is open, **When** the user taps the X (close) button, **Then** the drawer closes with a smooth animation.
5. **Given** the mobile drawer is open, **When** the user taps the backdrop area outside the drawer, **Then** the drawer closes.
6. **Given** the mobile drawer is open, **When** the user uses the language switcher inside the drawer, **Then** the site language and direction switch correctly.

---

### User Story 3 - Language Switching (Priority: P1)

A visitor who speaks both Arabic and English can toggle the site language between Arabic (RTL) and English (LTR) using a toggle/switch in the navbar (desktop) or mobile drawer (mobile). Switching languages updates the entire page direction, fonts, and all text content without a full page reload.

**Why this priority**: Bilingual support is a core project requirement. The site's default is Arabic, but English-speaking users must be able to switch seamlessly.

**Independent Test**: Can be tested by clicking the language toggle and verifying the page direction changes, fonts update, and all text content switches language.

**Acceptance Scenarios**:

1. **Given** the site is loaded in Arabic, **When** the user clicks the language toggle (AR | EN), **Then** the site switches to English with LTR direction, English fonts (Playfair Display for headings, Inter for body), and English text content.
2. **Given** the site is in English, **When** the user clicks the language toggle, **Then** the site switches back to Arabic with RTL direction, Arabic fonts (Noto Naskh Arabic for headings, Tajawal for body), and Arabic text.
3. **Given** the user switches language, **When** the page updates, **Then** all navigation links, footer text, and announcement bar content update to the selected language.

---

### User Story 4 - Announcement Bar Visibility (Priority: P2)

A visitor sees a prominent announcement bar at the very top of every page displaying "✨ شحن مجاني داخل الإمارات على جميع الطلبات" (Arabic) or the English equivalent. On mobile, the text scrolls in a marquee style. On desktop, the text is static and centered. The user can dismiss the bar by clicking the X button, and it remains dismissed across page navigations during the session.

**Why this priority**: The free shipping announcement drives purchase intent but is not blocking for navigation or core browsing.

**Independent Test**: Can be tested by loading any page, verifying the bar appears, dismissing it, and navigating to another page to confirm it stays dismissed.

**Acceptance Scenarios**:

1. **Given** a user visits the site for the first time in a session, **When** any page loads, **Then** the announcement bar is visible at the very top with a maroon (#550000) background and white text.
2. **Given** the viewport is mobile width, **When** the announcement bar renders, **Then** the text scrolls horizontally in a marquee animation.
3. **Given** the viewport is desktop width, **When** the announcement bar renders, **Then** the text is static and centered.
4. **Given** the announcement bar is visible, **When** the user clicks the X (dismiss) button, **Then** the bar smoothly collapses and is hidden.
5. **Given** the user has dismissed the announcement bar, **When** they navigate to another page, **Then** the bar remains hidden (state persisted in sessionStorage).
6. **Given** the user closes the browser tab or starts a new session, **When** they visit the site, **Then** the announcement bar reappears.

---

### User Story 5 - Footer Information Access (Priority: P2)

A visitor scrolls to the bottom of any page and sees a comprehensive footer with the LYORE logo, brand tagline, quick links (Collections, Size Guide, Returns, Contact), social media icons (Instagram, TikTok, Snapchat), contact information (WhatsApp, Email, Phone), and a copyright line. All links are functional and open in appropriate contexts.

**Why this priority**: The footer provides secondary navigation and contact avenues. It supports the luxury brand identity but is not the primary interaction point.

**Independent Test**: Can be tested by scrolling to the bottom of any page and verifying all links, icons, and content render correctly in both languages and directions.

**Acceptance Scenarios**:

1. **Given** a user scrolls to the bottom of any page, **When** the footer renders, **Then** it displays the LYORE logo (SVG format) and brand tagline.
2. **Given** the footer is visible, **When** the user views the quick links, **Then** links for Collections, Size Guide, Returns, and Contact are present and navigate to the correct pages.
3. **Given** the footer is visible, **When** the user views the social media section, **Then** icons for Instagram, TikTok, and Snapchat are displayed using Lucide React icons.
4. **Given** the user clicks the Instagram icon, **When** the link activates, **Then** it opens `instagram.com/lyoreabaya` in a new tab.
5. **Given** the footer is visible, **When** the user views contact info, **Then** WhatsApp, Email, and Phone contact details are displayed with functional links.
6. **Given** the site is in RTL mode, **When** the footer renders, **Then** all content is correctly mirrored using logical properties (start/end instead of left/right).
5. **Given** any page is loaded, **When** the footer renders, **Then** a copyright line "© LYORE ABAYA 2026" is visible with all rights reserved text from translations.

---

### User Story 6 - Consistent Page Layout (Priority: P1)

Every page on the site, including the 404 (Not Found) error page, wraps content in a consistent layout shell that includes the AnnouncementBar at the top, the Navbar below it, the page-specific content in the middle, and the Footer at the bottom. The layout automatically applies the correct text direction (`dir="rtl"` or `dir="ltr"`) and font family based on the selected locale.

**Why this priority**: Without a consistent layout wrapper, every page would need to independently manage the announcement bar, navbar, footer, direction, and fonts, leading to inconsistency and code duplication. Applying this to 404 pages ensures a premium brand experience even when links are broken.

**Independent Test**: Can be tested by navigating between any two pages or entering a non-existent URL (to trigger 404) and verifying the announcement bar, navbar, and footer are present and identical in structure on all.

**Acceptance Scenarios**:

1. **Given** a user navigates to any page or triggers a 404 error, **When** the page renders, **Then** the AnnouncementBar, Navbar, page content, and Footer are all present in the correct order.

2. **Given** the locale is Arabic, **When** the layout renders, **Then** the root element has `dir="rtl"` and Arabic fonts (Noto Naskh Arabic, Tajawal) are applied.
3. **Given** the locale is English, **When** the layout renders, **Then** the root element has `dir="ltr"` and English fonts (Playfair Display, Inter) are applied.
4. **Given** the user switches locale, **When** the layout re-renders, **Then** direction, fonts, and all translated text within the layout shell update accordingly.

---

### Edge Cases

- What happens when the user rapidly toggles the language switcher multiple times? The system must handle debouncing or prevent race conditions in locale switching.
- What happens when the sessionStorage is full or unavailable? The announcement bar dismiss functionality must fail gracefully and simply show the bar on every page.
- What happens on extremely narrow viewports (below 320px)? All layout components must remain usable without horizontal overflow.
- What happens when the user has `prefers-reduced-motion` enabled? All Motion animations (navbar scroll transition, drawer slide-in, marquee) must be disabled or reduced per the constitution.
- What happens if the logo SVG fails to load? The brand name "LYORE ABAYA" should be displayed as fallback text.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The AnnouncementBar MUST display translated promotional text with a maroon (#550000) background and white text on every page.
- **FR-002**: The AnnouncementBar MUST use a marquee/scrolling animation on mobile viewports and static centered text on desktop viewports.
- **FR-003**: The AnnouncementBar MUST be dismissible via an X button, with dismiss state persisted in sessionStorage.
- **FR-004**: The Navbar MUST display the LYORE SVG logo and navigation links (Home, Collections, Size Guide, Contact) sourced from translation files.
- **FR-005**: The Navbar MUST position the logo on the start side and links on the end side, adapting automatically to RTL/LTR via logical CSS properties.
- **FR-006**: The Navbar MUST start transparent on the hero and transition to a solid background ONLY after the viewport has scrolled past the full height of the HeroSlider (100vh), using a Motion animation for the transition.
- **FR-007**: The Navbar MUST include a language switcher (AR | EN) that toggles between Arabic and English via next-intl.
- **FR-008**: The Navbar MUST display a hamburger menu icon on mobile viewports instead of the horizontal navigation links.
- **FR-009**: The MobileDrawer MUST open as a full-screen overlay with a smooth slide-in Motion animation when the hamburger icon is tapped.
- **FR-010**: The MobileDrawer MUST contain all navigation links and the language switcher.
- **FR-011**: The MobileDrawer MUST close when the user taps the X button, clicks the backdrop, or navigates to a new page.
- **FR-012**: The Footer MUST display the LYORE SVG logo, brand tagline, quick links, social media icons, contact information, and copyright line.
- **FR-013**: The Footer MUST use Lucide React icons exclusively for social media (Instagram, TikTok, Snapchat).
- **FR-014**: The Footer social links MUST open the correct profiles (instagram.com/lyoreabaya, tiktok.com/@lyoreabaya, snapchat.com/add/lyoreabaya) in new tabs.
- **FR-015**: The Footer contact section MUST include WhatsApp (wa.me link), Email (mailto: link), and Phone (tel: link).
- **FR-016**: The BaseLayout MUST wrap all page content with AnnouncementBar + Navbar + {children} + Footer in that order.
- **FR-017**: The BaseLayout MUST set the document direction (`dir="rtl"` or `dir="ltr"`) based on the active locale.
- **FR-018**: The BaseLayout MUST apply the correct font families based on the active locale (Playfair Display + Inter for EN, Noto Naskh Arabic + Tajawal for AR).
- **FR-019**: ALL text content within layout components MUST come from translation files (`ar.json` / `en.json`) — no hardcoded strings.
- **FR-020**: ALL layout components MUST work on viewports as narrow as 375px without horizontal overflow.
- **FR-021**: ALL interactive animations MUST use Motion (Framer Motion v12) — CSS-only animations for interactive elements are prohibited.
- **FR-022**: ALL animations MUST respect the `prefers-reduced-motion` media query.

### Key Entities

- **Locale**: The currently active language/direction setting (Arabic/RTL or English/LTR). Determines text content, font family, and document direction across all layout components.
- **AnnouncementBar State**: A boolean dismiss state persisted in sessionStorage, controlling whether the announcement bar is visible for the current session.
- **Navigation Links**: A collection of labeled route paths (Home, Collections, Size Guide, Contact) used consistently in the Navbar, MobileDrawer, and Footer.
- **Social Links**: External URLs for Instagram, TikTok, and Snapchat profiles, rendered consistently in the Footer.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can navigate between all site pages (Home, Collections, Size Guide, Contact) using the navbar within 2 seconds per navigation action.
- **SC-002**: Mobile users can open the navigation drawer and access any page link in under 3 taps (hamburger → link → page loads).
- **SC-003**: Language switching between Arabic and English completes in under 1 second with all text, direction, and fonts updating correctly.
- **SC-004**: The announcement bar dismiss action persists across navigation — dismissed once, it stays hidden for the entire session across all pages.
- **SC-005**: All layout components render correctly at 375px width minimum without horizontal scrolling or visual overflow.
- **SC-006**: Navbar scroll transition (transparent → solid) triggers exactly as the user scrolls past the 100vh hero section, with no visual jank.
- **SC-007**: RTL and LTR layouts are visually mirrored — logo and link positions swap correctly, and no hardcoded left/right positioning causes misalignment.
- **SC-008**: All footer social media links open the correct external profiles in a new tab.
- **SC-009**: Accessibility score for layout components meets or exceeds 95 as measured by Lighthouse audit.
- **SC-010**: All animations are suppressed or reduced when the user has `prefers-reduced-motion` enabled.

## Assumptions

- The LYORE SVG logo file is available at `/public/logo.svg` or will be provided before layout implementation begins.
- The next-intl middleware and locale routing (`/ar/` and `/en/`) are already configured from Phase 2.
- Translation files (`/messages/ar.json` and `/messages/en.json`) already contain the relevant strings for navigation, announcement bar, and footer content from Phase 2.
- Self-hosted fonts (Playfair Display, Inter, Noto Naskh Arabic, Tajawal) are already configured via `next/font` from Phase 1.
- The design system colors (CSS variables) are globally available from Phase 1.
- Social media profile URLs (Instagram, TikTok, Snapchat) are finalized as stated in the implementation plan.
