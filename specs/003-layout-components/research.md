# Research: Layout Components

**Branch**: `003-layout-components` | **Date**: 2026-02-22

## Decision Log

### 1. Navbar Scroll Detection Strategy

- **Decision**: Use a scroll event listener with `window.scrollY > window.innerHeight` to detect when the user has scrolled past the hero (100vh).
- **Rationale**: The hero is always 100vh per the implementation plan. `window.innerHeight` dynamically accounts for different device heights. A `useState` + `useEffect` approach with a scroll listener is simple and avoids needing an IntersectionObserver for this case.
- **Alternatives considered**:
  - IntersectionObserver on the hero element — more elegant but adds complexity for a single threshold check.
  - Fixed pixel offset — rejected because it doesn't adapt to viewport height.

### 2. Mobile Drawer Animation Pattern

- **Decision**: Use Motion's `AnimatePresence` + `motion.div` for the drawer with a slide-in from the `inset-inline-start` side (respects RTL/LTR).
- **Rationale**: Constitution mandates Motion for all interactive animations. `AnimatePresence` handles mount/unmount animations cleanly, and `inset-inline-start` is a CSS logical property that automatically handles RTL.
- **Alternatives considered**:
  - CSS `transform: translateX()` — prohibited by constitution for interactive elements.
  - shadcn `Sheet` component — good candidate, uses Radix under the hood. Should be evaluated but custom implementation gives full control over animation behavior.

### 3. Announcement Bar Marquee on Mobile

- **Decision**: Use CSS `@keyframes` for the marquee scroll animation, not Motion.
- **Rationale**: The marquee is a continuous, non-interactive, decorative animation. The constitution prohibits CSS-only animations for **interactive elements** specifically, but allows CSS animations for decorative/non-interactive effects. A CSS marquee is more performant for continuous scrolling than a JS-driven Motion loop.
- **Alternatives considered**:
  - Motion `animate` with infinite loop — works but unnecessary GPU/JS overhead for a simple text scroll.

### 4. Language Switcher Mechanism

- **Decision**: Use `next-intl`'s `useRouter` and `usePathname` to programmatically switch locale via `router.replace(pathname, { locale: targetLocale })`.
- **Rationale**: next-intl provides built-in locale switching via its router hooks. This is the standard approach and avoids custom solutions (prohibited by constitution).
- **Alternatives considered**:
  - `<Link>` with `locale` prop — works for static links but doesn't programmatically toggle.
  - Custom cookie/header approach — prohibited (custom i18n solutions forbidden).

### 5. SessionStorage Dismiss Pattern

- **Decision**: Wrap `sessionStorage` access in a try-catch with a React `useState` hook. Default to "visible" if sessionStorage is unavailable.
- **Rationale**: Private browsing or storage-full scenarios could throw. Graceful degradation means the bar always shows (better than crashing). The spec edge case explicitly requires this.
- **Alternatives considered**:
  - React context without storage — loses persistence across page navigations within the same session.

### 6. Component Architecture: Client vs Server

- **Decision**: `AnnouncementBar`, `Navbar`, `MobileDrawer` will be client components (`"use client"`). `Footer` will be a server component with client sub-components only where interactivity is needed. `BaseLayout` (the existing `layout.tsx`) is a server component.
- **Rationale**: AnnouncementBar needs sessionStorage and dismiss state. Navbar needs scroll detection and hover state. MobileDrawer needs open/close state and animations. Footer is mostly static content with links — no interactivity beyond standard anchor tags. The existing `layout.tsx` is already a server component and should remain so.
- **Alternatives considered**:
  - All server components with client islands — would require splitting every interactive piece into separate files, increasing complexity without benefit.

### 7. Logo Fallback Strategy

- **Decision**: Use Next.js `<Image>` component with an `alt="LYORE ABAYA"` attribute. If the SVG file is missing, the alt text serves as the brand name fallback.
- **Rationale**: Constitution mandates `<Image>` for all images. The alt text naturally handles the fallback case identified in the edge cases.
- **Alternatives considered**:
  - Inline SVG — avoids `<Image>` component overhead but harder to manage and update.
  - `onError` handler to swap to text — over-engineering for an edge case.

## Dependency Verification

| Dependency | Required | Installed | Version |
|---|---|---|---|
| next | Yes | ✅ | 16.1.6 |
| next-intl | Yes | ✅ | ^4.8.3 |
| motion | Yes | ✅ | ^12.34.3 |
| lucide-react | Yes | ✅ | ^0.575.0 |
| tailwindcss | Yes | ✅ | ^4 |
| tailwindcss-rtl | Yes | ✅ | ^0.9.0 |
| radix-ui | Yes | ✅ | ^1.4.3 |

## Existing Infrastructure Confirmed

- **Fonts**: Self-hosted via `next/font` in `src/lib/fonts.ts` — all 4 fonts configured with CSS variables.
- **Design tokens**: LYORE colors in `globals.css` `:root` block as CSS custom properties.
- **i18n routing**: `src/i18n/routing.ts` with AR (default) + EN locales.
- **Middleware**: `src/middleware.ts` handles locale detection and redirects.
- **Layout**: `src/app/[locale]/layout.tsx` already sets `dir`, `lang`, font classes, and wraps children in `NextIntlClientProvider`.
- **Translations**: `messages/ar.json` and `messages/en.json` contain all required keys: `nav.*`, `footer.*`, `announcement`, `contact.*`.
