# 📋 LYORE ABAYA — Implementation Plan (MVP)
**Version:** 1.0
**Last Updated:** February 2026
**Timeline:** 2 Weeks
**File:** docs/implementation_plan.md

---

## 🎯 Project Overview

A luxury static abaya e-commerce website targeting modern modest women.
No backend. Orders routed exclusively via WhatsApp.
Bilingual: Arabic (default/RTL) + English (LTR).

---

## 📐 Confirmed Scope Decisions

| Decision | Value |
|---|---|
| Product categories | Flexible (added later via products.ts) |
| Sizes | Multiple sizes per product (S, M, L, XL, XXL) |
| Colors | Multiple colors per product |
| Price display | Shown on site + sent via WhatsApp |
| WhatsApp message | Product name + price + size (if selected) |
| WhatsApp FAB | Product pages only |
| Hero | Full-screen slider (3 slides) + CTA |
| About section | Inside Home page |
| Announcement Bar | "شحن مجاني داخل الإمارات / Free Shipping in UAE" |
| Default language | Arabic |
| Loading Screen | None |
| Priority pages | Home → Collections → Product Detail |

---

## 🏗️ Phase 1 — Foundation & Setup
**Duration:** Day 1
**Goal:** Project scaffold ready, zero bugs, runs locally

### Tasks
- [ ] 1.1 Initialize Next.js 15 with App Router + TypeScript
```bash
npx create-next-app@latest lyore-abaya \
  --typescript --tailwind --app --src-dir \
  --import-alias "@/*"
 1.2 Install & configure Tailwind CSS v4

 1.3 Install shadcn/ui and initialize

bash
npx shadcn@latest init
 1.4 Install Motion (Framer Motion v12)

bash
npm install motion
 1.5 Install and configure next-intl for AR/EN

 1.6 Install Lucide React icons

 1.7 Configure self-hosted fonts via next/font:

Playfair Display (EN headings)

Inter (EN body)

Noto Naskh Arabic (AR headings)

Tajawal (AR body)

 1.8 Set up Tailwind RTL plugin

 1.9 Define CSS variables for Design System:

--color-primary: #550000

--color-secondary: #6B1C23

--color-accent: #C9A96E

--color-background: #FAF7F4

--color-surface: #FFFFFF

--color-text: #0A0A0A

 1.10 Create project folder structure as per Constitution

✅ Phase 1 Exit Criteria
npm run dev runs without errors

Arabic RTL renders correctly

English LTR renders correctly

Design tokens available globally

🌐 Phase 2 — i18n & Content Foundation
Duration: Day 2
Goal: All text content ready in both languages

Tasks
 2.1 Create /messages/ar.json with all Arabic strings

 2.2 Create /messages/en.json with all English strings

 2.3 Configure next-intl middleware for locale routing:

/ar/ → Arabic (default)

/en/ → English

 2.4 Create src/data/products.ts with product type definition:

typescript
export interface Product {
  id: string;
  slug: string;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  price: number;
  currency: { ar: string; en: string };
  category: { ar: string; en: string };
  sizes: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  featured: boolean;
  whatsappMessage: { ar: string; en: string };
}
 2.5 Add 6 placeholder products with Unsplash images

 2.6 Create src/lib/whatsapp.ts utility:

typescript
// Generates pre-filled WhatsApp URL
// Input: product name, price, size, locale
// Output: https://wa.me/971502507859?text=...
Content — Arabic Strings (Suggested)
json
{
  "announcement": "✨ شحن مجاني داخل الإمارات على جميع الطلبات",
  "nav.home": "الرئيسية",
  "nav.collections": "المجموعات",
  "nav.sizeGuide": "دليل المقاسات",
  "nav.contact": "تواصلي معنا",
  "hero.slide1.title": "أناقة لا حدود لها",
  "hero.slide1.subtitle": "عبايات فاخرة تُعبّر عن هويتك",
  "hero.slide1.cta": "اكتشفي المجموعة",
  "hero.slide2.title": "تصاميم حصرية",
  "hero.slide2.subtitle": "لكل مناسبة عباية تليق بها",
  "hero.slide2.cta": "تسوقي الآن",
  "hero.slide3.title": "LYORE ABAYA",
  "hero.slide3.subtitle": "حيث تلتقي الأناقة بالاحتشام",
  "hero.slide3.cta": "اكتشفي قصتنا",
  "product.orderNow": "اطلبي الآن",
  "product.inquire": "استفسري عبر واتساب",
  "product.selectSize": "اختاري المقاس",
  "product.selectColor": "اختاري اللون",
  "product.currency": "د.إ",
  "about.title": "قصة LYORE",
  "about.body": "نؤمن أن الأناقة والاحتشام وجهان لعملة واحدة. كل عباية نصنعها تحكي قصة امرأة واثقة من نفسها.",
  "footer.rights": "جميع الحقوق محفوظة © LYORE ABAYA 2026"
}
✅ Phase 2 Exit Criteria
Language switcher changes site direction correctly

All placeholder products render from products.ts

WhatsApp URL generates correctly with product info

🧩 Phase 3 — Layout Components
Duration: Day 3
Goal: Navbar, Footer, and shared layout complete

Components to Build
3.1 AnnouncementBar.tsx
Marquee/scrolling text on mobile

Static centered text on desktop

Maroon background #550000 + white text

Dismissible with X button (saved in localStorage)

3.2 Navbar.tsx
Logo (SVG) on the left (EN) / right (AR)

Navigation links: Home, Collections, Size Guide, Contact

Language switcher (AR | EN toggle)

Mobile hamburger menu

Transparent on hero → solid on scroll (Motion animation)

3.3 MobileDrawer.tsx
Full-screen overlay drawer

Smooth slide-in animation via Motion

All nav links + language switcher inside

Close on backdrop click or X button

3.4 Footer.tsx
Logo + brand tagline

Quick links (Collections, Size Guide, Returns, Contact)

Social media icons: Instagram, TikTok, Snapchat (Lucide)

WhatsApp + Email + Phone contact info

Copyright line

3.5 BaseLayout.tsx (app/[locale]/layout.tsx)
Wraps all pages

Includes: AnnouncementBar + Navbar + children + Footer

Sets dir="rtl" or dir="ltr" based on locale

Applies correct font family per locale

✅ Phase 3 Exit Criteria
Navbar scrolls correctly (transparent → solid)

Mobile drawer opens/closes smoothly

Footer renders all social links

RTL/LTR layout switches correctly

🏠 Phase 4 — Home Page
Duration: Day 4–5
Goal: Complete Home page with all sections

Sections to Build (in order)
4.1 HeroSlider.tsx — PRIORITY
Full-screen (100vh) image slider

3 slides with title + subtitle + CTA button

Auto-play every 5 seconds

Manual navigation (dots + arrows)

Motion animations: text fades in from bottom on slide change

Parallax effect on background image

CTA button → links to /collections

4.2 FeaturedProducts.tsx
Section title: "أبرز التصاميم / Featured Designs"

Grid: 2 cols mobile → 3 cols desktop

Shows 6 products where featured: true

Each card uses ProductCard component

Stagger reveal animation on scroll (Motion + viewport)

4.3 AboutSection.tsx
Split layout: text left + image right (flipped in RTL)

Brand story text from translations.json

Decorative gold accent line #C9A96E

Fade-in animation on scroll

4.4 CollectionsBanner.tsx
Full-width banner image

Overlay text: "اكتشفي كل المجموعات"

CTA button → /collections

Parallax scroll effect

✅ Phase 4 Exit Criteria
Hero slider auto-plays and manual navigation works

6 featured products display correctly

All animations trigger on scroll

Page renders correctly in AR and EN

👗 Phase 5 — Collections Page
Duration: Day 6
Goal: Complete product listing with filtering

Components to Build
5.1 CollectionsPage (app/[locale]/collections/page.tsx)
Page hero: short banner with title

Filter tabs by category (dynamic from products.ts)

"All" tab always first

Products grid below filters

5.2 ProductGrid.tsx
Responsive grid: 2 cols mobile → 3 cols → 4 cols xl

Stagger animation when filter changes (Motion AnimatePresence)

"No products found" empty state

5.3 ProductCard.tsx — CORE COMPONENT
text
┌─────────────────────┐
│   [Product Image]   │  ← aspect-ratio 3:4, hover zoom
│   [Category Badge]  │  ← top corner, maroon bg
├─────────────────────┤
│  اسم العباية        │  ← Playfair/Naskh font
│  XXX د.إ            │  ← Champagne gold color
│  [اطلبي الآن  🟢]  │  ← WhatsApp button
└─────────────────────┘
Image hover: scale(1.08) smooth zoom

Clicking card → navigates to /products/[slug]

WhatsApp button → opens WhatsApp directly

5.4 FilterTabs.tsx
Horizontal scrollable on mobile

Active tab: maroon bg + white text

Inactive: transparent + border

Smooth indicator animation (Motion layout)

✅ Phase 5 Exit Criteria
All products display from products.ts

Filter by category works with animation

Each product card links to correct slug

WhatsApp button on card sends correct message

🔍 Phase 6 — Product Detail Page
Duration: Day 7–8
Goal: Complete individual product page

Components to Build
6.1 ProductDetailPage (app/[locale]/products/[slug]/page.tsx)
generateStaticParams() for all product slugs

404 redirect if slug not found

6.2 ProductImageGallery.tsx
text
┌──────────────────────────────┐
│                              │
│       [Main Image]           │  ← large, zoomable on click
│                              │
└──────────────────────────────┘
[ thumb1 ] [ thumb2 ] [ thumb3 ]  ← thumbnails below
Click thumbnail → main image changes with fade animation

Lightbox on click (shadcn Dialog component)

6.3 ProductInfo.tsx
Product name (AR/EN)

Price in gold color

Category badge

Description text

Size selector (shadcn RadioGroup):

Sizes: XS, S, M, L, XL, XXL

Out of stock = grayed out + strikethrough

Color selector (color circles with border on select)

WhatsApp Order Button (PRIMARY — full width, maroon)

WhatsApp Inquiry Button (SECONDARY — outlined)

6.4 WhatsAppOrderButton.tsx
typescript
// Pre-filled message format (Arabic):
"مرحباً، أريد طلب عباية:
🏷️ الاسم: [اسم المنتج]
💰 السعر: [XXX د.إ]
📏 المقاس: [المقاس المختار]
🎨 اللون: [اللون المختار]"
6.5 WhatsAppFAB.tsx
Fixed bottom-right (bottom-left in RTL) button

WhatsApp green icon + "استفسري الآن" text

Pulse animation to draw attention

Only visible on product pages

Opens WhatsApp with product name pre-filled

6.6 RelatedProducts.tsx
"قد يعجبك أيضاً" section

Shows 3 products from same category

Uses ProductCard component

✅ Phase 6 Exit Criteria
Every product has its own URL /products/[slug]

Size + color selection updates WhatsApp message

WhatsApp FAB visible and functional

Related products show correctly

Lightbox opens on image click

📄 Phase 7 — Secondary Pages
Duration: Day 9
Goal: Remaining 3 pages complete

7.1 Contact Page
WhatsApp card (primary) → opens chat

Phone card → tel: link

Email card → mailto: link

Instagram card → instagram.com/lyoreabaya

TikTok card → tiktok.com/@lyoreabaya

Snapchat card → snapchat.com/add/lyoreabaya

7.2 Size Guide Page
Measurement guide illustration (how to measure)

Size table:

المقاس	الطول	الصدر	الخصر
XS	148–153	84–88	68–72
S	153–158	88–92	72–76
M	158–163	92–96	76–80
L	163–168	96–102	80–86
XL	168–173	102–108	86–92
XXL	173–178	108–116	92–100
CTA: "مش متأكدة من مقاسك؟ تواصلي معنا عبر واتساب"

7.3 Returns & Shipping Page
Free shipping banner

Shipping policy details

Returns policy details

WhatsApp CTA for return requests

Phase 7 Exit Criteria
All social links open correctly

Size table renders in RTL correctly

All pages have consistent Navbar + Footer

Phase 8 — Performance & Polish
Duration: Day 10–11
Goal: Production-ready quality

Tasks
 8.1 Convert all Unsplash placeholders to WebP (once real images ready)

 8.2 Add prefers-reduced-motion check to all animations

 8.3 Add proper meta tags for SEO (per page):

title, description, og:image, og:title

Arabic: lang="ar", English: lang="en"

 8.4 Add robots.txt and sitemap.xml

 8.5 Fix any Lighthouse issues (target: Performance ≥ 90)

 8.6 Test all WhatsApp links on real mobile device

 8.7 Test RTL/LTR switch on all 6 pages

 8.8 Test on: iPhone Safari, Android Chrome, Desktop Chrome/Firefox

 8.9 Replace PNG logo with SVG version

✅ Phase 8 Exit Criteria
Lighthouse Performance ≥ 90

Lighthouse Accessibility ≥ 95

Zero console errors

WhatsApp links tested on real device

Both languages tested on all pages

🚀 Phase 9 — Deployment
Duration: Day 12
Goal: Live on Hostinger

Tasks
 9.1 Build production bundle: npm run build

 9.2 Fix any build errors (TypeScript, missing images, etc.)

 9.3 Configure Hostinger for Next.js deployment:

Use Node.js hosting (not static)

Or export as static: output: 'export' in next.config.ts

 9.4 Upload build to Hostinger via FTP or Git

 9.5 Connect custom domain

 9.6 Enable SSL (HTTPS)

 9.7 Test live site on mobile + desktop

 9.8 Share live URL with client

⚠️ Important Hostinger Note
Next.js App Router requires Node.js server.
On Hostinger, use Node.js hosting plan OR add to next.config.ts:

typescript
// For fully static export (no server needed):
const nextConfig = {
  output: 'export',
  trailingSlash: true,
}
Static export = no server needed, works on any hosting.

📅 2-Week Timeline
Day	Phase	Deliverable
Day 1	Phase 1	Project setup complete
Day 2	Phase 2	i18n + data layer ready
Day 3	Phase 3	Navbar + Footer + Layout
Day 4–5	Phase 4	Home page complete
Day 6	Phase 5	Collections page complete
Day 7–8	Phase 6	Product detail page complete
Day 9	Phase 7	Secondary pages complete
Day 10–11	Phase 8	Performance + polish
Day 12	Phase 9	Live on Hostinger 🚀
🚫 Out of Scope (MVP)
No shopping cart or checkout

No payment integration

No user accounts or login

No CMS dashboard (products managed via products.ts)

No blog or editorial content

No loading screen animation

No product reviews or ratings

No wishlist functionality

📁 Final File Structure
text
lyore-abaya/
├── docs/
│   ├── constitution.md
│   └── implementation_plan.md       ← this file
├── messages/
│   ├── ar.json
│   └── en.json
├── public/
│   ├── logo.svg
│   └── images/
│       └── hero/
│           ├── slide-1.webp
│           ├── slide-2.webp
│           └── slide-3.webp
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── collections/page.tsx
│   │       ├── products/[slug]/page.tsx
│   │       ├── contact/page.tsx
│   │       ├── size-guide/page.tsx
│   │       └── returns/page.tsx
│   ├── components/
│   │   ├── ui/                      ← shadcn components
│   │   ├── layout/
│   │   │   ├── AnnouncementBar.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileDrawer.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── HeroSlider.tsx
│   │       ├── FeaturedProducts.tsx
│   │       ├── AboutSection.tsx
│   │       ├── CollectionsBanner.tsx
│   │       ├── ProductGrid.tsx
│   │       ├── ProductCard.tsx
│   │       ├── FilterTabs.tsx
│   │       ├── ProductImageGallery.tsx
│   │       ├── ProductInfo.tsx
│   │       ├── WhatsAppOrderButton.tsx
│   │       ├── WhatsAppFAB.tsx
│   │       └── RelatedProducts.tsx
│   ├── data/
│   │   └── products.ts
│   └── lib/
│       ├── utils.ts
│       └── whatsapp.ts
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
Generated for LYORE ABAYA MVP — February 2026
Constitution Version: 1.0
Stack: Next.js 15 + TypeScript + Tailwind v4 + shadcn/ui + Motion
