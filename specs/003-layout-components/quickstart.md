# Quickstart: Layout Components

**Branch**: `003-layout-components` | **Date**: 2026-02-22

## Prerequisites

1. Node.js installed
2. Project dependencies installed: `npm install`
3. Dev server running: `npm run dev`
4. Phase 1 (Foundation) and Phase 2 (i18n) completed

## Key Files

| File | Purpose |
|------|---------|
| `src/components/layout/AnnouncementBar.tsx` | Dismissible promotional bar |
| `src/components/layout/Navbar.tsx` | Main navigation with scroll effect |
| `src/components/layout/MobileDrawer.tsx` | Full-screen mobile nav overlay |
| `src/components/layout/Footer.tsx` | Site footer with links and contact |
| `src/components/layout/LanguageSwitcher.tsx` | AR/EN locale toggle |
| `src/app/[locale]/layout.tsx` | Base layout (existing, to be updated) |
| `src/app/[locale]/not-found.tsx` | 404 page with layout shell |

## Design Tokens (from `globals.css`)

```css
--lyore-primary: #550000;     /* Deep Maroon — AnnouncementBar bg, Navbar solid bg */
--lyore-secondary: #6B1C23;   /* Maroon variant */
--lyore-accent: #C9A96E;      /* Champagne Gold — decorative accents */
--lyore-background: #FAF7F4;  /* Warm Off-White — page bg */
--lyore-surface: #FFFFFF;     /* Pure White — card/surface bg */
--lyore-text: #0A0A0A;        /* Near Black — body text */
```

## Font Variables

```css
--font-heading-en  /* Playfair Display */
--font-heading-ar  /* Noto Naskh Arabic */
--font-body-en     /* Inter */
--font-body-ar     /* Tajawal */
```

## Translation Keys Used

```text
announcement          — Announcement bar text
nav.home              — "Home" / "الرئيسية"
nav.collections       — "Collections" / "المجموعات"
nav.sizeGuide         — "Size Guide" / "دليل المقاسات"
nav.contact           — "Contact" / "تواصلي معنا"
footer.tagline        — Brand tagline
footer.quickLinks     — "Quick Links" section heading
footer.socialTitle    — "Follow Us" section heading
footer.contactTitle   — "Contact Us" section heading
footer.rights         — Copyright text
contact.whatsapp      — "WhatsApp"
contact.instagram     — "Instagram"
contact.tiktok        — "TikTok"
contact.snapchat      — "Snapchat"
contact.phone         — "Phone"
contact.email         — "Email"
```

## Verification

```bash
# Build check — ensure no TypeScript or build errors
npm run build

# Dev server — visual verification at http://localhost:3000/ar and /en
npm run dev
```
