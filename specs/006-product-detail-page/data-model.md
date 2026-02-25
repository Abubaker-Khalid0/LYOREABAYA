# Data Model: Product Detail Page

**Feature**: Product Detail Page  
**Date**: February 25, 2026  
**Source**: `/src/data/products.ts`

## Overview

This document defines the data structures for the Product Detail Page feature. Since this is a static site with no backend, all data lives in TypeScript files and translation JSON files.

## Entities

### Product

Represents an abaya product with all necessary attributes for display and ordering.

**Location**: `/src/data/products.ts`

**TypeScript Interface**:
```typescript
export interface Product {
  id: string;                    // Unique identifier (e.g., "prod-001")
  slug: string;                  // URL-friendly identifier (e.g., "elegant-black-abaya")
  name: {
    ar: string;                  // Arabic product name
    en: string;                  // English product name
  };
  description: {
    ar: string;                  // Arabic description (full text)
    en: string;                  // English description (full text)
  };
  price: number;                 // Price in AED (e.g., 1200)
  currency: {
    ar: string;                  // Arabic currency symbol (e.g., "د.إ")
    en: string;                  // English currency symbol (e.g., "AED")
  };
  category: {
    ar: string;                  // Arabic category (e.g., "مجموعة الشتاء")
    en: string;                  // English category (e.g., "Winter Collection")
  };
  sizes: string[];               // Available sizes (e.g., ["S", "M", "L", "XL"])
  colors: Color[];               // Available colors (see Color interface)
  images: string[];              // Image paths (e.g., ["/images/products/prod-001-1.webp"])
  featured: boolean;             // Whether product appears in featured section
  collectionTags?: string[];     // Optional style/collection tags (e.g., ["Ramadan", "Classic"])
  whatsappMessage: {
    ar: string;                  // Pre-filled Arabic WhatsApp message template
    en: string;                  // Pre-filled English WhatsApp message template
  };
}
```

**Validation Rules**:
- `id`: Must be unique across all products
- `slug`: Must be unique, lowercase, kebab-case, URL-safe
- `name`: Both ar and en required, non-empty
- `description`: Both ar and en required, non-empty
- `price`: Must be positive number
- `sizes`: Can be empty array (product has no size options)
- `colors`: Can be empty array (product has no color options)
- `images`: Must have at least 1 image path; first image is primary
- `collectionTags`: Optional array for semantic grouping

**State Transitions**: N/A (static data, no state changes)

**Relationships**:
- Product → Color (one-to-many)
- Product → RelatedProduct (many-to-many via category/collectionTags)

---

### Color

Represents a color option for a product.

**TypeScript Interface**:
```typescript
export interface Color {
  name: string;                  // Color name (e.g., "Black", "Navy")
  hex: string;                   // Hex color code (e.g., "#000000")
}
```

**Validation Rules**:
- `name`: Non-empty string
- `hex`: Valid 6-digit hex color code with # prefix (e.g., "#RRGGBB")

**State Transitions**: N/A (static data)

**Relationships**:
- Color → Product (many-to-one)

---

### WhatsAppMessage

Represents a pre-filled WhatsApp message for ordering or inquiry.

**TypeScript Interface**:
```typescript
export interface WhatsAppMessage {
  recipientNumber: string;       // Business WhatsApp number (e.g., "971502507859")
  messageText: string;           // Pre-filled message with product details
  language: 'ar' | 'en';         // Message language
}
```

**Validation Rules**:
- `recipientNumber`: Must be valid international phone number (digits only, no + or spaces)
- `messageText`: Non-empty string with product details interpolated
- `language`: Must be either 'ar' or 'en'

**State Transitions**: N/A (generated dynamically from product data)

**Relationships**:
- WhatsAppMessage → Product (many-to-one)

---

## Translation Keys

**Location**: `/messages/ar.json` and `/messages/en.json`

### Product Detail Page Translations

```json
{
  "product": {
    "selectSize": "اختاري المقاس / Select Size",
    "selectColor": "اختاري اللون / Select Color",
    "orderNow": "اطلبي الآن / Order Now",
    "inquire": "استفسري عبر واتساب / Inquire via WhatsApp",
    "outOfStock": "نفذت الكمية / Out of Stock",
    "relatedProducts": "قد يعجبك أيضاً / You May Also Like",
    "errorSelectSize": "الرجاء اختيار المقاس / Please select a size",
    "errorSelectColor": "الرجاء اختيار اللون / Please select a color",
    "whatsappFallbackTitle": "تواصلي معنا / Contact Us",
    "whatsappFallbackMessage": "لم نتمكن من فتح واتساب. يمكنك التواصل معنا عبر: / Unable to open WhatsApp. You can contact us via:",
    "copyMessage": "نسخ الرسالة / Copy Message",
    "phone": "هاتف / Phone",
    "email": "بريد إلكتروني / Email",
    "instagram": "إنستغرام / Instagram"
  }
}
```

---

## Data Flow

### 1. Product Detail Page Load

```
User navigates to /[locale]/products/[slug]
  ↓
Next.js matches slug to product in products.ts
  ↓
Server component renders with product data
  ↓
Client components hydrate with interactivity
  ↓
Images lazy load below fold
```

### 2. Size/Color Selection

```
User clicks size option
  ↓
Client state updates (useState)
  ↓
Visual feedback applied (border/background)
  ↓
Validation error cleared (if present)
```

### 3. WhatsApp Order Flow

```
User clicks "Order Now" button
  ↓
Validate size/color selection
  ↓
If invalid: Show inline error message
  ↓
If valid: Generate WhatsApp URL with pre-filled message
  ↓
Attempt to open WhatsApp (window.open)
  ↓
If fails: Show fallback modal with contact options
  ↓
If succeeds: User redirected to WhatsApp
```

### 4. Related Products Query

```
Get current product category and collectionTags
  ↓
Query products.ts for same category (exclude current)
  ↓
If < 3 results: Add products with matching collectionTags
  ↓
If < 3 results: Add featured products
  ↓
If < 3 results: Add newest products
  ↓
Limit to exactly 3 products
  ↓
Render using ProductCard component
```

---

## Data Volume Assumptions

- **Total Products**: ~50-100 products (initial launch)
- **Images per Product**: 3-5 images average
- **Total Image Storage**: ~10-25 MB (50 products × 5 images × 100KB avg)
- **Translation Keys**: ~50 keys for product detail page
- **Build Time**: < 30 seconds for static generation of all product pages

---

## Data Integrity

### Validation at Build Time

```typescript
// Validate all products before build
products.forEach((product) => {
  // Check required fields
  if (!product.id || !product.slug) {
    throw new Error(`Product missing id or slug: ${JSON.stringify(product)}`);
  }
  
  // Check unique slugs
  const duplicateSlugs = products.filter(p => p.slug === product.slug);
  if (duplicateSlugs.length > 1) {
    throw new Error(`Duplicate slug found: ${product.slug}`);
  }
  
  // Check images exist
  if (product.images.length === 0) {
    console.warn(`Product ${product.id} has no images`);
  }
  
  // Check image format
  product.images.forEach((img) => {
    if (!img.endsWith('.webp')) {
      console.warn(`Product ${product.id} image not WebP: ${img}`);
    }
  });
});
```

### Runtime Validation

- Size/color selection validated before WhatsApp order
- Slug validation in `generateStaticParams()` (404 for invalid slugs)
- Image loading errors handled with placeholder fallback

---

## Example Data

```typescript
export const products: Product[] = [
  {
    id: "prod-001",
    slug: "elegant-black-abaya",
    name: {
      ar: "عباية سوداء أنيقة",
      en: "Elegant Black Abaya"
    },
    description: {
      ar: "عباية فاخرة من القماش الفاخر مع تطريز يدوي دقيق",
      en: "Luxury abaya crafted from premium fabric with intricate hand embroidery"
    },
    price: 1200,
    currency: {
      ar: "د.إ",
      en: "AED"
    },
    category: {
      ar: "مجموعة الشتاء",
      en: "Winter Collection"
    },
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#000080" }
    ],
    images: [
      "/images/products/prod-001-1.webp",
      "/images/products/prod-001-2.webp",
      "/images/products/prod-001-3.webp"
    ],
    featured: true,
    collectionTags: ["Classic", "Formal"],
    whatsappMessage: {
      ar: "مرحباً، أريد طلب عباية: عباية سوداء أنيقة - 1200 د.إ",
      en: "Hello, I would like to order: Elegant Black Abaya - 1200 AED"
    }
  }
];
```

---

## Schema Changes Required

### Update to `/src/data/products.ts`

**Add new field**:
```typescript
collectionTags?: string[];  // Optional array for semantic grouping
```

**Migration**: Existing products without `collectionTags` will default to `undefined` (no breaking changes).

---

## Summary

The data model is simple and flat, with no complex relationships or state management. All data is static and lives in TypeScript files, making it easy to maintain and version control. The Product entity is the core data structure, with Color as a nested type. WhatsApp messages are generated dynamically from product data and user selections.

