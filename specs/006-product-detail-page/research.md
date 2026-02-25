# Research: Product Detail Page

**Feature**: Product Detail Page  
**Date**: February 25, 2026  
**Status**: Complete

## Research Questions

### 1. Image Gallery Best Practices for Luxury E-Commerce

**Decision**: Implement a thumbnail-based gallery with lightbox modal for full-screen viewing

**Rationale**:
- Industry standard for luxury fashion e-commerce (used by Net-a-Porter, Farfetch, SSENSE)
- Provides quick navigation via thumbnails while maintaining focus on main image
- Lightbox allows detailed inspection without leaving the page
- Supports mobile swipe gestures for intuitive navigation
- Maintains performance with lazy loading of thumbnails

**Alternatives Considered**:
- **Carousel-only approach**: Rejected because it hides other images and requires multiple clicks to view all angles
- **Grid view only**: Rejected because it doesn't provide a focused main image for initial impression
- **Zoom on hover**: Rejected for mobile-first approach; implemented as click-to-lightbox instead

**Implementation Approach**:
- Use shadcn Dialog component for lightbox modal
- Implement fade transitions with Motion (Framer Motion)
- Lazy load thumbnail images below the fold
- Support keyboard navigation (arrow keys, ESC)
- Respect `prefers-reduced-motion` for animations

---

### 2. Size/Color Selection UI Patterns

**Decision**: Radio button group for sizes, color swatches for colors, with inline validation errors

**Rationale**:
- Radio buttons clearly indicate single selection (standard for size selection)
- Color swatches provide visual preview of actual product colors
- Inline errors provide immediate, contextual feedback without disrupting flow
- Follows WCAG 2.1 AA accessibility guidelines
- Common pattern in luxury e-commerce (Gucci, Dior, Chanel)

**Alternatives Considered**:
- **Dropdown menus**: Rejected because they hide options and require extra clicks
- **Toggle buttons**: Considered but radio buttons are more semantically correct
- **Modal validation errors**: Rejected because they interrupt user flow

**Implementation Approach**:
- Use shadcn RadioGroup component for sizes
- Custom color swatch component with border on selection
- Display inline error messages in red text below selection area
- Gray out and strikethrough out-of-stock options
- Only validate when product has multiple options (per clarifications)

---

### 3. WhatsApp Integration Failure Handling

**Decision**: Graceful degradation with fallback modal showing alternative contact methods

**Rationale**:
- Prevents lost sales opportunities when WhatsApp fails
- Maintains professional experience even during technical failures
- Provides multiple contact channels (phone, Instagram, email)
- Optional "Copy message" button allows manual WhatsApp use
- Follows progressive enhancement principles

**Alternatives Considered**:
- **Silent failure**: Rejected because it leaves users confused with no recourse
- **Generic error message**: Rejected because it doesn't provide actionable next steps
- **Clipboard-only approach**: Rejected because it assumes users know how to manually open WhatsApp

**Implementation Approach**:
- Use shadcn Dialog component for fallback modal
- Detect WhatsApp failure via try-catch on window.open()
- Display phone number (tel: link), Instagram link, email (mailto: link)
- Implement "Copy message" button using Clipboard API
- Log failures for monitoring (console.error in development, analytics in production)

---

### 4. Related Products Algorithm

**Decision**: Multi-tier fallback algorithm prioritizing collection tags → featured → newest

**Rationale**:
- Collection/style tags provide semantic similarity (e.g., "Ramadan", "Classic")
- Featured products are curated by business for quality
- Newest items keep the recommendations fresh
- Always shows 3 products to maintain consistent layout
- Filters out current product to avoid redundancy

**Alternatives Considered**:
- **Category-only matching**: Rejected because it doesn't handle sparse categories well
- **Random selection**: Rejected because it doesn't optimize for relevance or business goals
- **Price-based similarity**: Rejected because luxury customers care more about style than price

**Implementation Approach**:
1. Query products in same category (excluding current product)
2. If < 3 results, add products with matching collection/style tags
3. If still < 3, add featured products
4. If still < 3, add newest products (by creation date or ID)
5. Limit to exactly 3 products
6. Use existing ProductCard component for consistency

---

### 5. Static Site Generation (SSG) for Product Pages

**Decision**: Use Next.js `generateStaticParams()` to pre-render all product detail pages at build time

**Rationale**:
- Instant page loads (no server-side rendering delay)
- Better SEO (fully rendered HTML for crawlers)
- Lower hosting costs (static files only)
- Aligns with "no backend" constitution requirement
- Standard approach for e-commerce sites with fixed product catalogs

**Alternatives Considered**:
- **Server-Side Rendering (SSR)**: Rejected because it requires a Node.js server and adds latency
- **Client-Side Rendering (CSR)**: Rejected because it hurts SEO and initial load performance
- **Incremental Static Regeneration (ISR)**: Rejected because product updates are infrequent and can be handled with full rebuilds

**Implementation Approach**:
```typescript
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}
```
- Generate params for all products in products.ts
- Return 404 for invalid slugs (notFound() function)
- Rebuild site when products.ts changes

---

### 6. Image Format and Optimization

**Decision**: WebP format, 1200x1600px (3:4 aspect ratio), max 500KB per image

**Rationale**:
- WebP provides 25-35% better compression than JPEG at same quality
- 1200x1600px is sufficient for high-DPI displays (2x scaling = 2400x3200 effective)
- 3:4 aspect ratio matches fashion photography standards
- 500KB limit balances quality with performance (3-4 images = ~2MB total)
- Supported by all modern browsers (95%+ global support)

**Alternatives Considered**:
- **AVIF format**: Rejected due to limited browser support (80% vs 95% for WebP)
- **Higher resolution (1920x2560)**: Rejected due to file size concerns (would exceed 500KB easily)
- **Lower resolution (800x1067)**: Rejected because it looks pixelated on high-DPI displays

**Implementation Approach**:
- Use Next.js Image component with automatic optimization
- Set `quality={85}` for good balance
- Implement lazy loading for thumbnails
- Provide placeholder image (SVG) for missing images
- Log warnings for non-compliant images (but still display them)

---

### 7. RTL/LTR Layout Considerations

**Decision**: Use Tailwind logical properties (start/end) and next-intl direction detection

**Rationale**:
- Logical properties automatically flip for RTL (start → right in RTL, left in LTR)
- next-intl provides `dir` attribute on html element
- Tailwind RTL plugin handles directional utilities
- Avoids manual conditional logic for every layout decision
- Follows web standards (CSS Logical Properties spec)

**Alternatives Considered**:
- **Manual conditional classes**: Rejected because it's error-prone and verbose
- **Separate RTL/LTR components**: Rejected because it duplicates code
- **CSS transforms (scaleX(-1))**: Rejected because it flips text and images incorrectly

**Implementation Approach**:
- Use `start-*` and `end-*` instead of `left-*` and `right-*`
- Use `ms-*` and `me-*` for margin-start/margin-end
- Use `ps-*` and `pe-*` for padding-start/padding-end
- Test all components in both Arabic and English
- Verify FAB positioning (bottom-right in LTR, bottom-left in RTL)

---

### 8. Animation Performance

**Decision**: Use Motion (Framer Motion) with GPU-accelerated properties (opacity, transform) only

**Rationale**:
- GPU-accelerated properties avoid layout thrashing
- Motion provides declarative API with automatic optimization
- Respects `prefers-reduced-motion` automatically
- Smooth 60fps animations on mobile devices
- Follows constitution requirement (CSS-only animations prohibited for interactive elements)

**Alternatives Considered**:
- **CSS transitions**: Rejected per constitution (Motion required for interactive elements)
- **React Spring**: Rejected because Motion is mandated in constitution
- **GSAP**: Rejected because it's not in the approved tech stack

**Implementation Approach**:
- Use `opacity` and `transform` (translateY, scale) only
- Set `transition={{ duration: 0.3, ease: "easeOut" }}`
- Implement `useReducedMotion` hook check
- Disable animations when `prefersReducedMotion === true`
- Test on low-end mobile devices (throttle CPU in DevTools)

---

### 9. Accessibility (WCAG 2.1 AA Compliance)

**Decision**: Implement semantic HTML, ARIA labels, keyboard navigation, and focus management

**Rationale**:
- Required for Lighthouse Accessibility score ≥ 95
- Legal requirement in many jurisdictions
- Improves usability for all users (not just screen reader users)
- Aligns with luxury brand values (inclusive, thoughtful design)

**Key Requirements**:
- Semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- ARIA labels for icon-only buttons
- Keyboard navigation (Tab, Enter, ESC, Arrow keys)
- Focus visible indicators
- Color contrast ratio ≥ 4.5:1 for text
- Alt text for all images
- Form validation errors announced to screen readers

**Implementation Approach**:
- Use shadcn components (built with accessibility in mind)
- Add `aria-label` to WhatsApp FAB and icon buttons
- Implement keyboard handlers for image gallery (arrow keys, ESC)
- Use `aria-live="polite"` for validation errors
- Test with screen reader (NVDA on Windows, VoiceOver on Mac)
- Run axe DevTools audit

---

### 10. SEO Optimization

**Decision**: Generate unique metadata for each product page with Open Graph tags

**Rationale**:
- Improves search engine ranking for product pages
- Enables rich previews when shared on social media
- Increases click-through rate from search results
- Standard practice for e-commerce sites

**Implementation Approach**:
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = products.find(p => p.slug === params.slug);
  
  return {
    title: `${product.name[locale]} | LYORE ABAYA`,
    description: product.description[locale],
    openGraph: {
      title: product.name[locale],
      description: product.description[locale],
      images: [product.images[0]],
      type: 'product',
    },
  };
}
```
- Use product name and description from translations
- Set first product image as og:image
- Include product price in structured data (optional)
- Set canonical URL to prevent duplicate content issues

---

## Summary

All research questions have been resolved with clear decisions, rationale, and implementation approaches. No blocking unknowns remain. The technical approach aligns with the constitution requirements and industry best practices for luxury e-commerce.

**Next Phase**: Proceed to Phase 1 (Design & Contracts) to create data-model.md and quickstart.md.

