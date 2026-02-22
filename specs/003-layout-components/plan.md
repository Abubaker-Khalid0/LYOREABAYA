# Implementation Plan: Layout Components

**Branch**: `003-layout-components` | **Date**: 2026-02-22 | **Spec**: [spec.md](file:///C:/Users/DELL/Documents/projects/LYORE-ABAYA/specs/003-layout-components/spec.md)
**Input**: Feature specification from `/specs/003-layout-components/spec.md`

## Summary

Build 5 shared layout components (AnnouncementBar, Navbar, MobileDrawer, Footer, LanguageSwitcher) and integrate them into the existing `layout.tsx` to create a consistent page shell across all pages including 404. All components must support RTL/LTR bilingual layout, use Motion for interactive animations, Lucide for icons, and source all text from translation files.

## Technical Context

**Language/Version**: TypeScript 5.x on Next.js 16.1.6 (App Router)
**Primary Dependencies**: next-intl ^4.8.3, motion ^12.34.3, lucide-react ^0.575.0, tailwindcss ^4, tailwindcss-rtl ^0.9.0
**Storage**: sessionStorage (announcement bar dismiss state only)
**Testing**: `npm run build` (TypeScript compilation) + visual browser verification
**Target Platform**: Web — desktop + mobile (375px minimum)
**Project Type**: Web (static luxury e-commerce, no backend)
**Performance Goals**: Lighthouse Performance ≥ 90, Accessibility ≥ 95
**Constraints**: No backend, no API routes, no CDN fonts, all text from translation JSON files
**Scale/Scope**: 5 new components, 1 modified file, 1 new 404 page

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Rule | Status | Notes |
|------|--------|-------|
| Next.js 15+ App Router only | ✅ Pass | Using App Router `[locale]` layout |
| TypeScript only | ✅ Pass | All new files are `.tsx` |
| Tailwind CSS v4 only | ✅ Pass | No inline styles |
| shadcn/ui before custom | ✅ Pass | No shadcn equivalent for these layout components; custom is justified |
| Motion for interactive animations | ✅ Pass | Navbar scroll, drawer slide-in use Motion. Marquee uses CSS (non-interactive, permitted) |
| next-intl only | ✅ Pass | Language switching via `useRouter` + `usePathname` from next-intl |
| Lucide React only | ✅ Pass | Footer social icons from lucide-react |
| Self-hosted fonts only | ✅ Pass | Already configured via `next/font` in `src/lib/fonts.ts` |
| No database/backend | ✅ Pass | sessionStorage only |
| `<Image>` component only | ✅ Pass | Logo uses `next/image` |
| No hardcoded strings | ✅ Pass | All text from `ar.json`/`en.json` |
| Logical properties (no left/right) | ✅ Pass | Using `start`/`end` Tailwind utilities + RTL plugin |
| `prefers-reduced-motion` respected | ✅ Pass | All Motion animations check media query |
| No unit tests | ✅ Pass | Constitution prohibits unit tests |

## Project Structure

### Documentation (this feature)

```text
specs/003-layout-components/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0: technical decisions
├── data-model.md        # Phase 1: entity definitions
├── quickstart.md        # Phase 1: developer reference
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx            # MODIFY — integrate layout components
│       └── not-found.tsx         # NEW — 404 page with layout shell
├── components/
│   └── layout/
│       ├── AnnouncementBar.tsx   # NEW — dismissible promo bar
│       ├── Navbar.tsx            # NEW — scroll-aware navigation
│       ├── MobileDrawer.tsx      # NEW — full-screen mobile nav
│       ├── LanguageSwitcher.tsx  # NEW — AR/EN toggle
│       └── Footer.tsx            # NEW — site footer
└── lib/
    └── navigation.ts            # NEW — shared nav links + social links constants
```

**Structure Decision**: All layout components go in `src/components/layout/` per constitution. A shared `navigation.ts` utility in `src/lib/` holds the nav links and social links constants to avoid duplication across Navbar, MobileDrawer, and Footer.

## Proposed Changes

### Component: Shared Navigation Constants

#### [NEW] [navigation.ts](file:///C:/Users/DELL/Documents/projects/LYORE-ABAYA/src/lib/navigation.ts)

Define typed arrays for navigation links and social links used across Navbar, MobileDrawer, and Footer. Contains:
- `NAV_LINKS`: Array of `{ labelKey, href }` objects for the 4 main pages
- `SOCIAL_LINKS`: Array of `{ platform, url, labelKey, icon }` objects for Instagram, TikTok, Snapchat
- `CONTACT_INFO`: WhatsApp URL, email, phone number
- TypeScript interfaces for each

---

### Component: AnnouncementBar

#### [NEW] [AnnouncementBar.tsx](file:///C:/Users/DELL/Documents/projects/LYORE-ABAYA/src/components/layout/AnnouncementBar.tsx)

Client component (`"use client"`). Features:
- Reads/writes `sessionStorage` key `lyore-announcement-dismissed` in a try-catch
- Maroon (#550000) background, white text
- Mobile: CSS marquee animation for scrolling text
- Desktop: Static centered text
- X dismiss button with Motion `AnimatePresence` collapse animation
- `prefers-reduced-motion`: disables marquee, uses static text on all viewports
- Text sourced from `useTranslations("announcement")`

---

### Component: LanguageSwitcher

#### [NEW] [LanguageSwitcher.tsx](file:///C:/Users/DELL/Documents/projects/LYORE-ABAYA/src/components/layout/LanguageSwitcher.tsx)

Client component. Features:
- Displays "AR | EN" toggle with active locale highlighted
- Uses `useRouter()` and `usePathname()` from `next-intl` to switch locale
- Compact variant for mobile drawer, standard for desktop navbar
- Props interface with optional `className` and `variant` props

---

### Component: Navbar

#### [NEW] [Navbar.tsx](file:///C:/Users/DELL/Documents/projects/LYORE-ABAYA/src/components/layout/Navbar.tsx)

Client component. Features:
- Fixed positioning at top (`sticky top-0 z-50`)
- Transparent background initially; solid `--lyore-primary` (#550000) after scrolling past 100vh
- Scroll detection via `window.scrollY > window.innerHeight` in a `useEffect` with throttled scroll listener
- Logo (SVG via `<Image>`) on `start` side, nav links on `end` side
- Desktop: horizontal nav links + LanguageSwitcher
- Mobile: hamburger icon (Lucide `Menu`) triggers MobileDrawer
- All link labels from `useTranslations("nav")`
- Motion `animate` for background color transition

---

### Component: MobileDrawer

#### [NEW] [MobileDrawer.tsx](file:///C:/Users/DELL/Documents/projects/LYORE-ABAYA/src/components/layout/MobileDrawer.tsx)

Client component. Features:
- Full-screen overlay with dark backdrop
- Content slides in from `inset-inline-start` side (RTL-aware)
- Motion `AnimatePresence` for mount/unmount animation
- Contains all nav links (vertical list) + LanguageSwitcher
- Close triggers: X button (Lucide `X`), backdrop tap, or navigation to a new page
- Auto-closes on route change using `usePathname()` in a `useEffect`
- `prefers-reduced-motion`: instant show/hide (no slide animation)
- Props: `isOpen`, `onClose`

---

### Component: Footer

#### [NEW] [Footer.tsx](file:///C:/Users/DELL/Documents/projects/LYORE-ABAYA/src/components/layout/Footer.tsx)

Server component (no client-side state). Features:
- LYORE SVG logo + brand tagline from translations
- Quick links section (Collections, Size Guide, Returns, Contact)
- Social media section with Lucide icons (Instagram, TikTok, Snapchat) — all open in new tabs
- Contact section: WhatsApp (`wa.me` link), Email (`mailto:`), Phone (`tel:`)
- Copyright line from translations
- Responsive grid layout: stacked on mobile, multi-column on desktop
- All content from `useTranslations("footer")` and `useTranslations("contact")`
- Logical CSS properties for RTL/LTR support

---

### Component: BaseLayout Integration

#### [MODIFY] [layout.tsx](file:///C:/Users/DELL/Documents/projects/LYORE-ABAYA/src/app/%5Blocale%5D/layout.tsx)

Update the existing layout to include the new components:
- Import and render `AnnouncementBar` above `Navbar` above `{children}` above `Footer`
- Maintain existing `dir`, `lang`, font classes, and `NextIntlClientProvider` wrapping
- Add `min-h-screen` and flex column layout to body for sticky footer behavior

---

### Component: 404 Page

#### [NEW] [not-found.tsx](file:///C:/Users/DELL/Documents/projects/LYORE-ABAYA/src/app/%5Blocale%5D/not-found.tsx)

A styled 404 page that inherits the BaseLayout (AnnouncementBar, Navbar, Footer). Content:
- Brand-consistent "Page Not Found" message from translations
- CTA button to return to home page
- Bilingual support via translation keys

---

### Translation Updates

#### [MODIFY] [ar.json](file:///C:/Users/DELL/Documents/projects/LYORE-ABAYA/messages/ar.json)
#### [MODIFY] [en.json](file:///C:/Users/DELL/Documents/projects/LYORE-ABAYA/messages/en.json)

Add any missing translation keys:
- `notFound.title` / `notFound.message` / `notFound.cta` — 404 page content
- `nav.returns` — Returns page link for footer quick links (if not already present)
- `announcement.dismiss` — Accessible label for dismiss button

## Verification Plan

### Build Verification

```bash
npm run build
```
- Must pass with zero TypeScript errors
- Must produce no build warnings related to layout components

### Visual Browser Verification

With `npm run dev` running, verify in the browser at `http://localhost:3000`:

1. **Arabic (default)**: Navigate to `http://localhost:3000/ar`
   - ✅ AnnouncementBar visible at top with maroon background and Arabic text
   - ✅ Navbar shows logo on RIGHT, links on LEFT (RTL)
   - ✅ Footer displays at bottom with all sections in RTL
   - ✅ Arabic fonts (Noto Naskh Arabic, Tajawal) are applied

2. **English**: Navigate to `http://localhost:3000/en`
   - ✅ AnnouncementBar shows English text
   - ✅ Navbar shows logo on LEFT, links on RIGHT (LTR)
   - ✅ Footer in LTR layout
   - ✅ English fonts (Playfair Display, Inter) are applied

3. **Language toggle**: Click "AR | EN" switcher
   - ✅ Page direction flips correctly
   - ✅ All text updates to the other language

4. **Scroll behavior**: Scroll down past the hero area on the home page
   - ✅ Navbar transitions from transparent to solid maroon after 100vh

5. **Mobile (375px)**: Resize browser to 375px width
   - ✅ Hamburger icon visible instead of nav links
   - ✅ Tapping hamburger opens full-screen drawer with slide-in animation
   - ✅ Drawer contains nav links and language switcher
   - ✅ Drawer closes on X, backdrop tap, or link click
   - ✅ Announcement bar text scrolls as marquee

6. **Dismiss announcement**: Click X on announcement bar
   - ✅ Bar collapses with animation
   - ✅ Navigate to another page — bar stays hidden
   - ✅ Close tab and reopen — bar reappears

7. **404 page**: Navigate to `http://localhost:3000/ar/nonexistent`
   - ✅ 404 page shows with Navbar and Footer
   - ✅ Has a "return to home" button

8. **Footer links**: Click each footer link
   - ✅ Social links open correct profiles in new tabs
   - ✅ Quick links navigate to correct pages
   - ✅ WhatsApp link opens `wa.me/971502507859`

## Complexity Tracking

No constitution violations — no entries needed.
