# Tasks: Product Detail Page

**Input**: Design documents from `/specs/006-product-detail-page/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Data model updates, translation keys, and placeholder assets needed before any component work

- [x] T001 Add `collectionTags?: string[]` field to `Product` interface in `src/data/products.ts`
- [x] T002 Add `collectionTags` values to all existing products in `src/data/products.ts` (e.g., "Classic", "Formal", "Casual", "Ramadan")
- [x] T003 [P] Add product detail page translation keys to `messages/en.json` (product.selectSize, product.selectColor, product.orderNow, product.inquire, product.outOfStock, product.relatedProducts, product.errorSelectSize, product.errorSelectColor, product.whatsappFallbackTitle, product.whatsappFallbackMessage, product.copyMessage, product.phone, product.email, product.instagram, product.inquireNow, product.viewDetails)
- [x] T004 [P] Add product detail page translation keys to `messages/ar.json` (matching all keys from T003 in Arabic)
- [x] T005 [P] Create placeholder product image at `public/images/placeholder-product.svg` (brand logo on warm off-white background, 3:4 aspect ratio)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Utility functions and shared helpers that multiple components depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Update `src/lib/whatsapp.ts` to add `generateOrderMessage(product, size, color, locale)` function that returns a pre-filled WhatsApp URL with formatted message (Arabic/English)
- [x] T007 Update `src/lib/whatsapp.ts` to add `generateInquiryMessage(productName, locale)` function that returns a WhatsApp URL with inquiry message
- [x] T008 [P] Update `src/lib/whatsapp.ts` to add `openWhatsApp(url)` wrapper function with try-catch that returns `{ success: boolean }` for failure detection
- [x] T009 [P] Create related products utility function `getRelatedProducts(currentProduct, allProducts, count)` in `src/lib/products.ts` implementing the multi-tier fallback: same category → matching collectionTags → featured → newest, excluding current product, limited to `count` results

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 — View Product Details (Priority: P1) 🎯 MVP

**Goal**: Customers can navigate to any product via URL and see full product details (name, price, description, category badge) in their selected language

**Independent Test**: Navigate to `/en/products/winter-elegance-abaya` and `/ar/products/winter-elegance-abaya` — verify product name, price (gold #C9A96E), description, and category badge (maroon #550000) render correctly in both LTR and RTL

### Implementation for User Story 1

- [x] T010 [US1] Create product detail page at `src/app/[locale]/products/[slug]/page.tsx` with `generateStaticParams()` for all slugs, `notFound()` for invalid slugs, and `generateMetadata()` for SEO (title, description, og:image, og:title)
- [x] T011 [US1] Create `ProductInfo` component at `src/components/sections/ProductInfo.tsx` displaying: product name (bilingual), price in gold (#C9A96E), category badge (maroon bg), and full description — accept `product` and `locale` props with typed Props interface
- [x] T012 [US1] Wire `ProductInfo` into the product detail page layout with a responsive grid (`grid-cols-1 lg:grid-cols-2` with gap) and add Motion fade-in entrance animation (respecting `prefers-reduced-motion`)

**Checkpoint**: Product detail page renders with basic product information in both AR and EN

---

## Phase 4: User Story 2 — Browse Product Images (Priority: P1)

**Goal**: Customers can view all product images in a gallery with thumbnail navigation and full-screen lightbox

**Independent Test**: Navigate to any product detail page — verify main image displays, thumbnails show below, clicking thumbnail changes main image with fade, clicking main opens lightbox, ESC/click-outside closes lightbox

### Implementation for User Story 2

- [x] T013 [P] [US2] Create `ProductImageGallery` component at `src/components/sections/ProductImageGallery.tsx` with: main image display (3:4 aspect ratio, Next.js `<Image>`), thumbnail row below, `useState` for selected image index, fade animation on image change via Motion, skeleton loader while images load, placeholder fallback for missing images
- [x] T014 [US2] Add lightbox functionality to `ProductImageGallery` using shadcn Dialog component — open on main image click, close on ESC / click outside / close button, display image in full-screen mode
- [x] T015 [US2] Add scrollable horizontal thumbnail row (for products with >5 images), hover zoom effect (scale 1.05) on main image, and keyboard navigation (arrow keys for thumbnails, ESC for lightbox)
- [x] T016 [US2] Wire `ProductImageGallery` into the product detail page layout (left column in LTR, right column in RTL using logical properties)

**Checkpoint**: Image gallery fully functional with lightbox, fade transitions, and keyboard navigation

---

## Phase 5: User Story 3 — Select Size and Color (Priority: P1)

**Goal**: Customers can select a preferred size and color with clear visual feedback and out-of-stock indication

**Independent Test**: On any product page, verify: all sizes shown as selectable tiles, clicking size highlights it (maroon bg), colors shown as circular swatches, clicking color adds border, out-of-stock sizes grayed out with strikethrough

### Implementation for User Story 3

- [x] T017 [US3] Add size selector to `ProductInfo` component in `src/components/sections/ProductInfo.tsx` — display size tiles from product.sizes, `useState` for selectedSize, maroon highlight on selection, gray-out + strikethrough for out-of-stock sizes, auto-select if only one size, "Select Size" label from translations
- [x] T018 [US3] Add color selector to `ProductInfo` component — display circular color swatches from product.colors showing actual hex value, `useState` for selectedColor, border indicator on selection, auto-select if only one color, "Select Color" label from translations
- [x] T019 [US3] Add inline validation error display below size and color selectors — show "Please select a size" / "Please select a color" in red text when validation fails, use `aria-live="polite"` for screen reader announcements, clear error when selection is made

**Checkpoint**: Size and color selection fully functional with validation and accessibility

---

## Phase 6: User Story 4 — Order via WhatsApp (Priority: P1)

**Goal**: Customers can order via WhatsApp with a pre-filled message containing product name, price, selected size, and color

**Independent Test**: Select size and color, click "Order Now" — verify WhatsApp opens with correctly formatted message in the active language. Click without selections — verify inline errors appear. Click "Inquire" — verify simpler message opens

### Implementation for User Story 4

- [x] T020 [US4] Create `WhatsAppOrderButton` component at `src/components/sections/WhatsAppOrderButton.tsx` — primary full-width maroon button ("Order Now"), validates size/color before opening WhatsApp, uses `generateOrderMessage()` from `src/lib/whatsapp.ts`, calls `openWhatsApp()` with failure detection
- [x] T021 [US4] Add secondary inquiry button to `WhatsAppOrderButton` component — outlined style, "Inquire via WhatsApp" label, uses `generateInquiryMessage()`, no size/color validation required
- [x] T022 [US4] Create `WhatsAppFallbackModal` component at `src/components/sections/WhatsAppFallbackModal.tsx` using shadcn Dialog — displayed when `openWhatsApp()` fails, shows: phone number (tel: link), Instagram link, email (mailto: link), and "Copy message" button using Clipboard API, all labels from translations
- [x] T023 [US4] Wire `WhatsAppOrderButton` into `ProductInfo` component, passing selectedSize, selectedColor, product, and locale props — ensure validation triggers inline errors (from T019) when size/color not selected

**Checkpoint**: Full WhatsApp ordering flow working with validation, formatted messages, and fallback modal

---

## Phase 7: User Story 5 — Quick WhatsApp Inquiry via FAB (Priority: P2)

**Goal**: A floating WhatsApp button visible on all pages, with product-specific pre-filled messages on product detail pages

**Independent Test**: On product page — verify FAB in bottom-right (bottom-left RTL) with pulse animation, clicking opens WhatsApp with product name. On home/collections — verify FAB visible with generic inquiry message. Verify no overlap with interactive elements on mobile

### Implementation for User Story 5

- [x] T024 [US5] Create `WhatsAppFAB` component at `src/components/sections/WhatsAppFAB.tsx` — fixed position bottom-end, WhatsApp green background, Lucide MessageCircle or custom WhatsApp icon, "Inquire Now" text label from translations, pulse animation via Motion (respecting `prefers-reduced-motion`), accepts optional `productName` prop for product-specific messages
- [x] T025 [US5] Add `WhatsAppFAB` to the base layout at `src/app/[locale]/layout.tsx` so it appears on all pages, and pass `productName` prop on product detail pages via context or conditional rendering
- [x] T026 [US5] Add mobile-specific positioning and z-index to ensure FAB does not overlap with Navbar, Footer, or WhatsApp order buttons on product pages — test at 375px width

**Checkpoint**: WhatsApp FAB visible and functional on all pages with correct product context

---

## Phase 8: User Story 6 — Discover Related Products (Priority: P2)

**Goal**: Customers see 3 related products at the bottom of the product detail page, navigable via ProductCard links

**Independent Test**: Navigate to any product page, scroll to bottom — verify "You May Also Like" section with 3 ProductCard components from same category. If <3 in category, verify fallback to collectionTags → featured → newest

### Implementation for User Story 6

- [x] T027 [US6] Create `RelatedProducts` component at `src/components/sections/RelatedProducts.tsx` — uses `getRelatedProducts()` from `src/lib/products.ts`, renders section heading from translations ("You May Also Like" / "قد يعجبك أيضاً"), displays 3 ProductCard components in responsive grid (1 col mobile → 3 cols desktop), stagger reveal animation via Motion
- [x] T028 [US6] Wire `RelatedProducts` into product detail page at `src/app/[locale]/products/[slug]/page.tsx` — pass current product and locale, render below the main product info section with margin/spacing

**Checkpoint**: Related products section fully functional with multi-tier fallback and animations

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final quality pass — accessibility, performance, RTL verification, and build validation

- [x] T029 [P] Add ARIA labels to all interactive elements: WhatsApp buttons (`aria-label`), image gallery thumbnails (`aria-label`), lightbox close button, size/color selectors, FAB button — verify with screen reader
- [x] T030 [P] Verify `prefers-reduced-motion` is respected in all Motion animations: image gallery fade, lightbox open/close, FAB pulse, related products stagger, product info entrance — disable animations when preference set
- [x] T031 Verify RTL/LTR layout on all components: product info text alignment, image gallery position, button order, FAB position (bottom-left in RTL), inline error position, related products grid — test both `/ar/` and `/en/` routes
- [x] T032 Verify no horizontal overflow on mobile at 375px width — check product detail page, image gallery, thumbnails, size/color selectors, related products grid
- [x] T033 Run `npm run build` — ensure zero TypeScript errors and zero build warnings
- [x] T034 Run quickstart.md manual testing checklist — navigate to product pages, test all interactive flows in both languages
- [x] T035 [P] Verify SEO metadata renders correctly: check `<title>`, `<meta description>`, `og:image`, `og:title` on product detail pages in both locales

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion (needs updated Product type) — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — MVP, must complete first
- **US2 (Phase 4)**: Depends on Phase 2 — can run in parallel with US1 (different files)
- **US3 (Phase 5)**: Depends on US1 (modifies ProductInfo component from T011)
- **US4 (Phase 6)**: Depends on US3 (needs size/color state and validation from T017-T019)
- **US5 (Phase 7)**: Depends on Phase 2 — can run in parallel with US1-US4 (different files)
- **US6 (Phase 8)**: Depends on Phase 2 — can run in parallel with US1-US4 (different files, uses existing ProductCard)
- **Polish (Phase 9)**: Depends on all user stories being complete

### User Story Dependencies

```
Phase 1 (Setup)
  ↓
Phase 2 (Foundational)
  ↓
  ├── US1 (P1: View Product Details) ─── sequential ──→ US3 (P1: Select Size/Color) → US4 (P1: WhatsApp Order)
  ├── US2 (P1: Browse Product Images) ─── parallel with US1
  ├── US5 (P2: WhatsApp FAB) ──────────── parallel with US1-US4
  └── US6 (P2: Related Products) ──────── parallel with US1-US4
  ↓
Phase 9 (Polish)
```

### Parallel Opportunities

- **Phase 1**: T003, T004, T005 can all run in parallel (different files)
- **Phase 2**: T008, T009 can run in parallel (different files)
- **After Phase 2**: US2 + US5 + US6 can run in parallel with the US1→US3→US4 chain
- **Phase 9**: T029, T030, T035 can run in parallel

---

## Parallel Example: After Phase 2 Completion

```
# Stream A (sequential chain — core product page):
T010 → T011 → T012 → T017 → T018 → T019 → T020 → T021 → T022 → T023

# Stream B (parallel — image gallery):
T013 → T014 → T015 → T016

# Stream C (parallel — WhatsApp FAB):
T024 → T025 → T026

# Stream D (parallel — related products):
T027 → T028
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T005)
2. Complete Phase 2: Foundational (T006-T009)
3. Complete Phase 3: User Story 1 (T010-T012)
4. **STOP and VALIDATE**: Navigate to product URL, verify details render in AR/EN
5. Proceed to remaining user stories

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 → Product page shows details → **MVP!**
3. Add US2 → Image gallery with lightbox
4. Add US3 → Size/color selection
5. Add US4 → WhatsApp ordering flow
6. Add US5 → WhatsApp FAB on all pages
7. Add US6 → Related products section
8. Polish → Accessibility, RTL, performance, build verification

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- No unit tests per constitution (Section XI: "NEVER write unit tests")
- All text must come from translation files — no hardcoded strings
- All images use `<Image>` component — no `<img>` tags
- Use `start`/`end` logical properties — no `left`/`right`
- All animations via Motion — CSS-only animations prohibited for interactive elements
- Total tasks: 35
