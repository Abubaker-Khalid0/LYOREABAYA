# Quickstart: Product Detail Page

**Feature**: Product Detail Page  
**Date**: February 25, 2026  
**Audience**: Developers implementing this feature

## Prerequisites

- Next.js 15 project with App Router configured
- TypeScript enabled
- Tailwind CSS v4 installed and configured
- shadcn/ui components installed (Dialog, RadioGroup)
- Motion (Framer Motion v12) installed
- next-intl configured for Arabic/English
- Lucide React icons installed
- Product data in `/src/data/products.ts`

## Quick Start (5 minutes)

### 1. Add Collection Tags to Product Type

Update `/src/data/products.ts`:

```typescript
export interface Product {
  // ... existing fields
  collectionTags?: string[];  // NEW: Optional style/collection tags
}
```

### 2. Create Product Detail Page

Create `/src/app/[locale]/products/[slug]/page.tsx`:

```typescript
import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import { ProductImageGallery } from '@/components/sections/ProductImageGallery';
import { ProductInfo } from '@/components/sections/ProductInfo';
import { RelatedProducts } from '@/components/sections/RelatedProducts';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: { params: { slug: string; locale: string } }) {
  const product = products.find(p => p.slug === params.slug);
  
  if (!product) {
    notFound();
  }
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductImageGallery images={product.images} alt={product.name[params.locale]} />
        <ProductInfo product={product} locale={params.locale} />
      </div>
      <RelatedProducts currentProduct={product} locale={params.locale} />
    </main>
  );
}
```

### 3. Add Translation Keys

Add to `/messages/en.json` and `/messages/ar.json`:

```json
{
  "product": {
    "selectSize": "Select Size",
    "selectColor": "Select Color",
    "orderNow": "Order Now",
    "inquire": "Inquire via WhatsApp",
    "outOfStock": "Out of Stock",
    "relatedProducts": "You May Also Like",
    "errorSelectSize": "Please select a size",
    "errorSelectColor": "Please select a color"
  }
}
```

### 4. Test the Page

```bash
npm run dev
```

Navigate to: `http://localhost:3000/en/products/elegant-black-abaya`

## Component Implementation Order

Implement components in this order to minimize dependencies:

1. **ProductImageGallery** (no dependencies)
2. **WhatsAppOrderButton** (no dependencies)
3. **ProductInfo** (depends on WhatsAppOrderButton)
4. **RelatedProducts** (depends on ProductCard - already exists)
5. **WhatsAppFAB** (global component, add to layout)

## Testing Checklist

### Manual Testing

- [ ] Navigate to a product detail page via collections page
- [ ] Verify product name, price, description display correctly
- [ ] Verify category badge displays with correct styling
- [ ] Click thumbnails to change main image
- [ ] Click main image to open lightbox
- [ ] Press ESC to close lightbox
- [ ] Select a size (verify visual feedback)
- [ ] Select a color (verify visual feedback)
- [ ] Click "Order Now" without selections (verify inline errors)
- [ ] Click "Order Now" with selections (verify WhatsApp opens)
- [ ] Verify WhatsApp message contains correct product details
- [ ] Click WhatsApp FAB (verify it opens with product name)
- [ ] Scroll to bottom (verify related products section)
- [ ] Click a related product (verify navigation)
- [ ] Test on mobile (375px width)
- [ ] Test in Arabic (verify RTL layout)
- [ ] Test in English (verify LTR layout)
- [ ] Test with invalid slug (verify 404 page)
- [ ] Test with product that has no sizes (verify no validation)
- [ ] Test with product that has no colors (verify no validation)

### Lighthouse Audit

```bash
npm run build
npm run start
```

Run Lighthouse audit on product detail page:
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 95
- [ ] Best Practices ≥ 90
- [ ] SEO ≥ 90

### Accessibility Testing

- [ ] Tab through all interactive elements (verify focus visible)
- [ ] Use arrow keys in image gallery (verify keyboard navigation)
- [ ] Test with screen reader (NVDA/VoiceOver)
- [ ] Verify all images have alt text
- [ ] Verify all buttons have accessible labels
- [ ] Verify color contrast ratio ≥ 4.5:1

## Common Issues & Solutions

### Issue: Images not loading

**Solution**: Verify image paths in `products.ts` match actual files in `/public/images/products/`

### Issue: WhatsApp not opening

**Solution**: Check that business number is correct (971502507859) and URL encoding is proper

### Issue: RTL layout broken

**Solution**: Ensure using `start`/`end` logical properties instead of `left`/`right`

### Issue: Validation errors not showing

**Solution**: Verify translation keys exist in both `ar.json` and `en.json`

### Issue: Related products not showing

**Solution**: Check that products have matching categories or collectionTags

### Issue: Lightbox not closing

**Solution**: Verify Dialog component from shadcn is properly configured with `onOpenChange`

## Performance Optimization

### Image Optimization

```typescript
// Use Next.js Image component with proper sizing
<Image
  src={product.images[0]}
  alt={product.name[locale]}
  width={1200}
  height={1600}
  quality={85}
  priority={index === 0}  // Only first image
  className="object-cover"
/>
```

### Lazy Loading

```typescript
// Lazy load thumbnails
<Image
  src={thumbnail}
  alt={`Thumbnail ${index + 1}`}
  width={150}
  height={200}
  loading="lazy"  // Explicit lazy loading
  className="cursor-pointer"
/>
```

### Animation Performance

```typescript
// Use GPU-accelerated properties only
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>
  {/* Content */}
</motion.div>
```

## Deployment Checklist

- [ ] All product images converted to WebP format
- [ ] All images optimized (max 500KB per image)
- [ ] All translation keys added to both languages
- [ ] All components tested in both RTL and LTR
- [ ] Lighthouse audits pass all thresholds
- [ ] Build completes without errors (`npm run build`)
- [ ] Static export works (`output: 'export'` in next.config.ts)
- [ ] 404 page handles invalid slugs correctly
- [ ] WhatsApp integration tested on real mobile device
- [ ] Fallback modal tested (simulate WhatsApp failure)

## Development Workflow

### 1. Component Development

```bash
# Create component file
touch src/components/sections/ProductImageGallery.tsx

# Implement component with TypeScript types
# Add to product detail page
# Test in browser
```

### 2. Styling

```bash
# Use Tailwind classes
# Follow design system colors from constitution
# Test responsive breakpoints (sm, md, lg, xl)
```

### 3. Testing

```bash
# Manual testing in browser
# Test both languages
# Test on mobile viewport
# Run Lighthouse audit
```

### 4. Commit

```bash
git add .
git commit -m "feat: add ProductImageGallery component"
```

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Motion (Framer Motion) Docs](https://www.framer.com/motion/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Logical Properties](https://tailwindcss.com/docs/padding#logical-properties)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Next Steps

After completing the product detail page:

1. Run `/speckit.tasks` to generate detailed implementation tasks
2. Implement components in the order specified above
3. Test thoroughly in both languages and all viewports
4. Run Lighthouse audits and fix any issues
5. Deploy to staging for client review

