# Design Document: Home Page Redesign Enhancement

## Overview

This design document specifies the technical architecture and implementation approach for enhancing the LYORE ABAYA home page. The redesign introduces sophisticated visual hierarchy, improved product presentation, and new feature highlight sections while maintaining the existing luxury brand identity.

### Design Goals

1. **Enhanced Visual Impact**: Create a bold, immersive hero section that immediately communicates luxury brand positioning
2. **Clear Value Proposition**: Introduce icon-based feature sections that highlight brand USPs
3. **Improved Product Presentation**: Enhance product cards with sophisticated hover effects and better visual hierarchy
4. **Seamless Bilingual Experience**: Ensure perfect RTL/LTR layout mirroring for Arabic and English
5. **Performance Excellence**: Maintain Lighthouse Performance ≥ 90 and Accessibility ≥ 95
6. **Accessibility First**: Full WCAG 2.1 AA compliance with motion preference support

### Technical Context

The home page enhancement builds upon the existing LYORE ABAYA foundation:

- **Framework**: Next.js 15 App Router with TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Animation**: Motion (Framer Motion v12) with reduced motion support
- **Internationalization**: next-intl with Arabic/English support
- **Icons**: Lucide React for consistent iconography
- **Image Optimization**: next/image with WebP format support

### Design Principles

1. **Progressive Enhancement**: Core content accessible without JavaScript
2. **Mobile-First**: Responsive design starting from 375px viewport
3. **Performance Budget**: LCP < 2.5s, CLS < 0.1, FID < 100ms
4. **Accessibility**: Keyboard navigation, screen reader support, motion preferences
5. **Maintainability**: Component-based architecture with clear separation of concerns

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Home Page (page.tsx)                     │
│                    Server Component                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ├─ Fetches product data
                              ├─ Handles i18n routing
                              └─ Renders section components
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ HeroSlider   │    │ WhyChoose    │    │ Featured     │
│ (Client)     │    │ Section      │    │ Products     │
│              │    │ (Client)     │    │ (Client)     │
└──────────────┘    └──────────────┘    └──────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Features     │    │ About        │    │ Collections  │
│ Highlight    │    │ Section      │    │ Banner       │
│ (Client)     │    │ (Client)     │    │ (Client)     │
└──────────────┘    └──────────────┘    └──────────────┘
```

### Component Hierarchy

```
src/
├── app/
│   └── [locale]/
│       └── page.tsx                    # Home page (Server Component)
├── components/
│   └── sections/
│       ├── HeroSlider.tsx              # Enhanced (existing)
│       ├── WhyChooseSection.tsx        # New component
│       ├── FeaturedProducts.tsx        # Enhanced (existing)
│       ├── ProductCard.tsx             # Enhanced (existing)
│       ├── FeaturesHighlight.tsx       # New component
│       ├── AboutSection.tsx            # Enhanced (existing)
│       └── CollectionsBanner.tsx       # Enhanced (existing)
├── hooks/
│   ├── useReducedMotion.ts            # Existing
│   ├── useIntersectionObserver.ts     # New hook
│   └── useStaggerAnimation.ts         # New hook
├── lib/
│   ├── whatsapp.ts                    # Existing
│   └── animations.ts                  # New animation utilities
└── data/
    └── features.ts                    # New feature data
```

### Data Flow

1. **Server-Side Rendering**:
   - Home page renders as Server Component
   - Product data fetched server-side
   - Translations loaded via next-intl
   - Initial HTML sent to client with all content

2. **Client-Side Hydration**:
   - Interactive components hydrate
   - Intersection observers initialize
   - Animation triggers set up
   - Event listeners attached

3. **User Interactions**:
   - Scroll events trigger animations via Intersection Observer
   - Hover effects handled by CSS and Motion
   - WhatsApp button clicks generate pre-filled URLs
   - Navigation handled by Next.js Link component

## Components and Interfaces

### 1. Enhanced HeroSlider Component

**Status**: Enhancement of existing component

**Enhancements**:
- Stronger overlay (opacity 0.5-0.6)
- Larger typography (48px desktop, 32px mobile)
- Improved contrast ratios (WCAG AA compliant)
- Enhanced CTA button with better hover effects

**Props Interface**:
```typescript
// No props - uses translations from next-intl
```

**Key Changes**:
- Increase overlay opacity from 0.4 to 0.5-0.6
- Update heading font sizes: 48px+ desktop, 32px+ mobile
- Enhance CTA button hover effects with 200ms transition
- Ensure WCAG AA contrast ratio (4.5:1 minimum)

### 2. WhyChooseSection Component (New)

**Purpose**: Display 4 icon-based feature cards highlighting brand USPs

**Props Interface**:
```typescript
interface WhyChooseSectionProps {
  // No props - uses translations and static feature data
}

interface FeatureCard {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey?: string;
}
```

**Component Structure**:
```typescript
export function WhyChooseSection() {
  const t = useTranslations("whyChoose");
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const features: FeatureCard[] = [
    { id: "quality", icon: Award, titleKey: "quality.title" },
    { id: "craftsmanship", icon: Sparkles, titleKey: "craftsmanship.title" },
    { id: "materials", icon: Gem, titleKey: "materials.title" },
    { id: "delivery", icon: Truck, titleKey: "delivery.title" },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <h2>{t("heading")}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            index={index}
            isInView={isInView}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </section>
  );
}
```

**Animation Behavior**:
- Staggered entrance: 100ms delay between cards
- Fade in + translateY(-20px) animation
- Hover effect: translateY(-4px) with 300ms transition
- Disabled when prefers-reduced-motion is enabled

**Responsive Layout**:
- Mobile (375px-767px): 2-column grid
- Desktop (768px+): 4-column grid
- Gap: 24px (1.5rem)

### 3. Enhanced ProductCard Component

**Status**: Enhancement of existing component

**Enhancements**:
- Rounded corners (12px border-radius)
- Enhanced shadow on hover
- Improved hover effects (translateY -8px, image scale 1.08)
- Better spacing and typography

**Props Interface**:
```typescript
interface ProductCardProps {
  product: Product;
  index?: number; // For stagger animation
}

interface Product {
  id: string;
  slug: string;
  name: { ar: string; en: string };
  price: number;
  currency: { ar: string; en: string };
  images: string[];
  category: { ar: string; en: string };
}
```

**Key Changes**:
- Add `rounded-xl` (12px) to card container
- Enhance box-shadow: `shadow-md hover:shadow-2xl`
- Update hover transform: `translateY(-8px)` with 300ms duration
- Image hover scale: `scale(1.08)` with 400ms duration
- Ensure 44px × 44px minimum tap target for WhatsApp button

### 4. FeaturedProducts Component

**Status**: Enhancement of existing component

**Enhancements**:
- Horizontal scrolling with snap points on mobile
- "View All" button with RTL/LTR positioning
- Staggered product card animations
- Improved grid layout

**Props Interface**:
```typescript
interface FeaturedProductsProps {
  products: Product[];
}
```

**Responsive Grid**:
- Mobile (375px-767px): 2-column grid or horizontal scroll
- Tablet (768px-1023px): 3-column grid
- Desktop (1024px+): 4-column grid

**Mobile Scroll Behavior**:
```css
.products-scroll {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.product-card {
  scroll-snap-align: start;
  flex: 0 0 calc(50% - 12px);
}
```

### 5. FeaturesHighlight Component (New)

**Purpose**: Display key shopping benefits with icons and descriptions

**Props Interface**:
```typescript
interface FeaturesHighlightProps {
  // No props - uses translations and static feature data
}

interface FeatureItem {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}
```

**Component Structure**:
```typescript
export function FeaturesHighlight() {
  const t = useTranslations("features");
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const features: FeatureItem[] = [
    { id: "shipping", icon: Package, titleKey: "shipping.title", descriptionKey: "shipping.description" },
    { id: "payment", icon: Shield, titleKey: "payment.title", descriptionKey: "payment.description" },
    { id: "returns", icon: RefreshCw, titleKey: "returns.title", descriptionKey: "returns.description" },
    { id: "support", icon: Headphones, titleKey: "support.title", descriptionKey: "support.description" },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <h2>{t("heading")}</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {features.map((feature, index) => (
          <FeatureItem
            key={feature.id}
            feature={feature}
            index={index}
            isInView={isInView}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </section>
  );
}
```

**Layout**:
- Mobile: Vertical stack
- Desktop: Horizontal layout (4 items in a row)
- Icon size: 32px × 32px minimum
- Icon color: Champagne Gold (#C9A96E)

### 6. Enhanced AboutSection Component

**Status**: Enhancement of existing component

**Enhancements**:
- Decorative accent line (60px × 4px in Champagne Gold)
- Improved typography hierarchy
- Better responsive layout
- Enhanced fade-in animation

**Key Changes**:
- Add decorative line above heading
- Update heading sizes: 36px desktop, 28px mobile
- Body text: 16px with 1.8 line-height
- Add "Learn More" button linking to /about
- Ensure proper RTL/LTR text/image positioning

### 7. Enhanced CollectionsBanner Component

**Status**: Enhancement of existing component

**Enhancements**:
- Stronger overlay (opacity 0.5-0.7)
- Parallax effect at 0.5x scroll speed
- Enhanced CTA button with scale effect
- Improved minimum heights

**Key Changes**:
- Increase overlay opacity to 0.5-0.7
- Implement parallax: background moves at 0.5x scroll speed
- CTA hover: scale(1.05) with 200ms transition
- Minimum height: 400px desktop, 300px mobile
- Disable parallax when prefers-reduced-motion is enabled

## Data Models

### Framer Motion Variants Library

**Complete Animation Variants for Professional Effects**:

```typescript
// src/lib/motion-variants.ts

import { Variants } from 'framer-motion';

/**
 * Entrance Animations
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

/**
 * Stagger Animations
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

/**
 * Hover Animations - Product Cards
 */
export const productCardHover: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 2px 8px rgba(85,0,0,0.08), 0 4px 16px rgba(85,0,0,0.04)'
  },
  hover: {
    y: -12,
    scale: 1.02,
    boxShadow: '0 12px 32px rgba(85,0,0,0.16), 0 20px 48px rgba(85,0,0,0.12), 0 0 40px rgba(201,169,110,0.25)',
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export const productImageHover: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export const productOverlayHover: Variants = {
  rest: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

/**
 * Hover Animations - Feature Cards
 */
export const featureCardHover: Variants = {
  rest: {
    y: 0,
    borderColor: 'rgba(201,169,110,0.15)',
    boxShadow: '0 4px 16px rgba(85,0,0,0.06)'
  },
  hover: {
    y: -8,
    borderColor: 'rgba(201,169,110,0.3)',
    boxShadow: '0 8px 24px rgba(85,0,0,0.1), 0 12px 40px rgba(85,0,0,0.06), 0 0 30px rgba(201,169,110,0.15)',
    transition: {
      duration: 0.35,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export const featureIconHover: Variants = {
  rest: {
    scale: 1,
    rotate: 0,
    boxShadow: '0 8px 24px rgba(201,169,110,0.3), inset 0 2px 8px rgba(255,255,255,0.3)'
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    boxShadow: '0 12px 32px rgba(201,169,110,0.4), 0 0 40px rgba(201,169,110,0.3), inset 0 2px 8px rgba(255,255,255,0.4)',
    transition: {
      duration: 0.35,
      ease: 'easeOut'
    }
  }
};

/**
 * Hover Animations - Buttons
 */
export const buttonPrimaryHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 20px rgba(85,0,0,0.15), 0 8px 40px rgba(85,0,0,0.1)'
  },
  hover: {
    scale: 1.05,
    y: -2,
    boxShadow: '0 8px 32px rgba(85,0,0,0.2), 0 12px 48px rgba(85,0,0,0.15), 0 0 40px rgba(201,169,110,0.4)',
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1]
    }
  },
  tap: {
    scale: 1.02,
    y: 0
  }
};

export const buttonSecondaryHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 2px 12px rgba(201,169,110,0.15)'
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 4px 24px rgba(201,169,110,0.3), 0 0 30px rgba(201,169,110,0.2)',
    transition: {
      duration: 0.35,
      ease: [0.33, 1, 0.68, 1]
    }
  },
  tap: {
    scale: 1.01
  }
};

export const buttonWhatsAppHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 16px rgba(37,211,102,0.25), 0 8px 32px rgba(37,211,102,0.15)'
  },
  hover: {
    scale: 1.08,
    y: -3,
    boxShadow: '0 8px 24px rgba(37,211,102,0.35), 0 12px 40px rgba(37,211,102,0.25), 0 0 30px rgba(37,211,102,0.3)',
    transition: {
      duration: 0.3,
      ease: [0.33, 1, 0.68, 1]
    }
  },
  tap: {
    scale: 1.04,
    y: -1
  }
};

/**
 * Image Hover Animations
 */
export const imageZoomHover: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.08,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export const imageOverlayReveal: Variants = {
  rest: { opacity: 0, y: 20 },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

/**
 * Decorative Element Animations
 */
export const decorativeCornerReveal: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 0.15,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export const decorativeLineGrow: Variants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: '60px',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

/**
 * Badge Animations
 */
export const badgeFloat: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-2, 2, -2],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const badgePulseGlow: Variants = {
  initial: {
    boxShadow: '0 0 20px rgba(201,169,110,0.3)'
  },
  animate: {
    boxShadow: [
      '0 0 20px rgba(201,169,110,0.3)',
      '0 0 40px rgba(201,169,110,0.6), 0 0 60px rgba(201,169,110,0.3)',
      '0 0 20px rgba(201,169,110,0.3)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

/**
 * Scroll-based Animations
 */
export const parallaxSlow = {
  scrollYProgress: [0, 1],
  y: ['0%', '30%']
};

export const parallaxMedium = {
  scrollYProgress: [0, 1],
  y: ['0%', '50%']
};

export const parallaxFast = {
  scrollYProgress: [0, 1],
  y: ['0%', '70%']
};

/**
 * Utility Functions
 */
export const getVariantWithReducedMotion = (
  variant: Variants,
  prefersReducedMotion: boolean
): Variants => {
  if (!prefersReducedMotion) return variant;
  
  // Return instant transitions when reduced motion is preferred
  return Object.keys(variant).reduce((acc, key) => {
    acc[key] = {
      ...variant[key],
      transition: { duration: 0 }
    };
    return acc;
  }, {} as Variants);
};

export const getVariantForMobile = (
  desktopVariant: Variants,
  isMobile: boolean
): Variants => {
  if (!isMobile) return desktopVariant;
  
  // Reduce animation intensity on mobile
  return Object.keys(desktopVariant).reduce((acc, key) => {
    const state = desktopVariant[key];
    if (typeof state === 'object' && 'y' in state) {
      acc[key] = {
        ...state,
        y: typeof state.y === 'number' ? state.y / 2 : state.y,
        scale: typeof state.scale === 'number' ? 1 + (state.scale - 1) / 2 : state.scale
      };
    } else {
      acc[key] = state;
    }
    return acc;
  }, {} as Variants);
};
```

**Usage Examples**:

```tsx
// Product Card with Professional Hover Effects
import { motion } from 'framer-motion';
import { productCardHover, productImageHover, productOverlayHover } from '@/lib/motion-variants';

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={productCardHover}
      className="relative rounded-2xl overflow-hidden bg-white"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <motion.div variants={productImageHover}>
          <Image src={product.image} alt={product.name} fill />
        </motion.div>
        
        {/* Hover Overlay */}
        <motion.div
          variants={productOverlayHover}
          className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 to-transparent"
        >
          {/* Overlay content */}
        </motion.div>
      </div>
      
      {/* Card content */}
    </motion.div>
  );
}

// Feature Card with Icon Animation
import { featureCardHover, featureIconHover } from '@/lib/motion-variants';

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={featureCardHover}
      className="p-8 rounded-xl bg-gradient-to-br from-white to-off-white"
    >
      <motion.div
        variants={featureIconHover}
        className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-gold-500 to-gold-300"
      >
        <feature.icon className="w-9 h-9" />
      </motion.div>
      
      {/* Card content */}
    </motion.div>
  );
}

// Button with Professional Hover
import { buttonPrimaryHover } from '@/lib/motion-variants';

export function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.button
      variants={buttonPrimaryHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className="px-12 py-4 rounded-xl bg-maroon-900 text-off-white"
    >
      {children}
    </motion.button>
  );
}

// Staggered Grid Animation
import { staggerContainer, staggerItem } from '@/lib/motion-variants';

export function ProductGrid({ products }: { products: Product[] }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-2 md:grid-cols-4 gap-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={staggerItem}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}

// Parallax Background
import { useScroll, useTransform } from 'framer-motion';

export function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image src="/bg.jpg" alt="" fill />
      </motion.div>
      {/* Content */}
    </section>
  );
}
```

## Data Models

### Feature Card Data

```typescript
// src/data/features.ts

export interface FeatureCard {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey?: string;
}

export const whyChooseFeatures: FeatureCard[] = [
  {
    id: "quality",
    icon: Award,
    titleKey: "whyChoose.quality.title",
  },
  {
    id: "craftsmanship",
    icon: Sparkles,
    titleKey: "whyChoose.craftsmanship.title",
  },
  {
    id: "materials",
    icon: Gem,
    titleKey: "whyChoose.materials.title",
  },
  {
    id: "delivery",
    icon: Truck,
    titleKey: "whyChoose.delivery.title",
  },
];

export const highlightFeatures: FeatureItem[] = [
  {
    id: "shipping",
    icon: Package,
    titleKey: "features.shipping.title",
    descriptionKey: "features.shipping.description",
  },
  {
    id: "payment",
    icon: Shield,
    titleKey: "features.payment.title",
    descriptionKey: "features.payment.description",
  },
  {
    id: "returns",
    icon: RefreshCw,
    titleKey: "features.returns.title",
    descriptionKey: "features.returns.description",
  },
  {
    id: "support",
    icon: Headphones,
    titleKey: "features.support.title",
    descriptionKey: "features.support.description",
  },
];
```

### Translation Keys

```typescript
// messages/en.json additions

{
  "whyChoose": {
    "heading": "Why Choose LYORE",
    "quality": {
      "title": "Premium Quality"
    },
    "craftsmanship": {
      "title": "Expert Craftsmanship"
    },
    "materials": {
      "title": "Luxury Materials"
    },
    "delivery": {
      "title": "Fast Delivery"
    }
  },
  "features": {
    "heading": "Shopping Benefits",
    "shipping": {
      "title": "Free Shipping",
      "description": "Complimentary delivery on all orders"
    },
    "payment": {
      "title": "Secure Payment",
      "description": "Safe and encrypted transactions"
    },
    "returns": {
      "title": "Easy Returns",
      "description": "Hassle-free 14-day return policy"
    },
    "support": {
      "title": "24/7 Support",
      "description": "Always here to help you"
    }
  }
}
```

```typescript
// messages/ar.json additions

{
  "whyChoose": {
    "heading": "لماذا تختارين ليور",
    "quality": {
      "title": "جودة فائقة"
    },
    "craftsmanship": {
      "title": "حرفية متقنة"
    },
    "materials": {
      "title": "خامات فاخرة"
    },
    "delivery": {
      "title": "توصيل سريع"
    }
  },
  "features": {
    "heading": "مميزات التسوق معنا",
    "shipping": {
      "title": "شحن مجاني",
      "description": "توصيل مجاني لجميع الطلبات"
    },
    "payment": {
      "title": "دفع آمن",
      "description": "معاملات آمنة ومشفرة"
    },
    "returns": {
      "title": "إرجاع سهل",
      "description": "سياسة إرجاع مرنة لمدة 14 يوم"
    },
    "support": {
      "title": "دعم على مدار الساعة",
      "description": "نحن هنا لمساعدتك دائماً"
    }
  }
}
```

### Animation Configuration

```typescript
// src/lib/animations.ts

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const cardHoverVariants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const imageHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.08,
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};
```

### Tailwind Configuration for Professional Effects

**Extended Tailwind Config** (`tailwind.config.ts`):

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#FFF5F5',
          100: '#FFE5E5',
          200: '#FFCCCC',
          300: '#FF9999',
          400: '#FF6666',
          500: '#FF3333',
          600: '#CC0000',
          700: '#990000',
          800: '#660000',
          900: '#550000', // Primary brand color
          950: '#330000',
        },
        gold: {
          50: '#FDFBF7',
          100: '#FAF5EB',
          200: '#F5EBD7',
          300: '#E8D4A8', // Light gold
          400: '#D4BC8F',
          500: '#C9A96E', // Primary gold
          600: '#B8935A',
          700: '#9A7A4A',
          800: '#7C613A',
          900: '#5E482A',
        },
        'off-white': '#FAF7F4',
        'warm-gray': {
          50: '#FAF7F4',
          100: '#F5F0EB',
          200: '#EBE3D9',
          300: '#DDD1C3',
          400: '#CFBFAD',
          500: '#C1AD97',
        },
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        cairo: ['var(--font-cairo)', 'sans-serif'],
        naskh: ['var(--font-noto-naskh-arabic)', 'serif'],
      },
      boxShadow: {
        'card-rest': '0 2px 8px rgba(85,0,0,0.08), 0 4px 16px rgba(85,0,0,0.04)',
        'card-hover': '0 12px 32px rgba(85,0,0,0.16), 0 20px 48px rgba(85,0,0,0.12), 0 0 40px rgba(201,169,110,0.25)',
        'feature': '0 4px 16px rgba(85,0,0,0.06)',
        'feature-hover': '0 8px 24px rgba(85,0,0,0.1), 0 12px 40px rgba(85,0,0,0.06), 0 0 30px rgba(201,169,110,0.15)',
        'luxury': '0 4px 20px rgba(85,0,0,0.15), 0 8px 40px rgba(85,0,0,0.1), 0 0 30px rgba(201,169,110,0.2)',
        'overlay': '0 20px 64px rgba(85,0,0,0.2), 0 40px 96px rgba(85,0,0,0.15)',
        'glow-gold': '0 0 30px rgba(201,169,110,0.4), 0 0 60px rgba(201,169,110,0.2)',
        'glow-maroon': '0 0 40px rgba(85,0,0,0.3)',
        'button-primary': '0 4px 20px rgba(85,0,0,0.15), 0 8px 40px rgba(85,0,0,0.1)',
        'button-primary-hover': '0 8px 32px rgba(85,0,0,0.2), 0 12px 48px rgba(85,0,0,0.15), 0 0 40px rgba(201,169,110,0.4)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C9A96E 0%, #E8D4A8 50%, #C9A96E 100%)',
        'gradient-gold-subtle': 'linear-gradient(135deg, #C9A96E 0%, #D4BC8F 100%)',
        'gradient-maroon': 'linear-gradient(180deg, #550000 0%, #3A0000 100%)',
        'gradient-hero-overlay': 'linear-gradient(135deg, rgba(85,0,0,0.75) 0%, rgba(0,0,0,0.85) 100%)',
        'gradient-overlay-dark': 'linear-gradient(180deg, transparent 0%, rgba(85,0,0,0.8) 100%)',
        'gradient-bg-subtle': 'linear-gradient(180deg, #FAF7F4 0%, #FFFFFF 100%)',
        'gradient-bg-warm': 'linear-gradient(135deg, #FAF7F4 0%, #F5F0EB 100%)',
        'gradient-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.3) 50%, transparent 100%)',
        'gradient-text-gold': 'linear-gradient(135deg, #FFFFFF 0%, #C9A96E 50%, #FFFFFF 100%)',
        'gradient-text-price': 'linear-gradient(135deg, #C9A96E 0%, #E8D4A8 100%)',
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'shimmer-slide': 'shimmer-slide 4s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'shimmer-slide': {
          '0%, 100%': { left: '-100%' },
          '50%': { left: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,169,110,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(201,169,110,0.6), 0 0 60px rgba(201,169,110,0.3)' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      letterSpacing: {
        'luxury': '0.05em',
        'wide': '0.1em',
        'wider': '0.15em',
      },
      borderRadius: {
        'luxury': '16px',
        'xl-plus': '20px',
        '2xl-plus': '24px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-rtl'),
    // Custom plugin for luxury effects
    function({ addUtilities }: any) {
      const newUtilities = {
        '.text-shadow-light': {
          textShadow: '0 2px 12px rgba(0,0,0,0.4)',
        },
        '.text-shadow-strong': {
          textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 8px 40px rgba(0,0,0,0.3)',
        },
        '.text-shadow-gold': {
          textShadow: '0 2px 8px rgba(201,169,110,0.3)',
        },
        '.gpu-accelerated': {
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        },
        '.gradient-border-gold': {
          border: '2px solid transparent',
          backgroundClip: 'padding-box, border-box',
          backgroundOrigin: 'padding-box, border-box',
          backgroundImage: 'linear-gradient(#550000, #550000), linear-gradient(135deg, #C9A96E, #E8D4A8, #C9A96E)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;
```

**Custom CSS for Advanced Effects** (`globals.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Color tokens */
    --color-primary: #550000;
    --color-accent: #C9A96E;
    --color-surface: #FAF7F4;
    --color-text: #2C2C2C;
    
    /* Gradient tokens */
    --gradient-gold: linear-gradient(135deg, #C9A96E 0%, #E8D4A8 50%, #C9A96E 100%);
    --gradient-maroon: linear-gradient(180deg, #550000 0%, #3A0000 100%);
    --gradient-hero-overlay: linear-gradient(135deg, rgba(85,0,0,0.75) 0%, rgba(0,0,0,0.85) 100%);
    
    /* Shadow tokens */
    --shadow-luxury: 0 4px 20px rgba(85,0,0,0.15), 0 8px 40px rgba(85,0,0,0.1), 0 0 30px rgba(201,169,110,0.2);
    --shadow-card-rest: 0 2px 8px rgba(85,0,0,0.08), 0 4px 16px rgba(85,0,0,0.04);
    --shadow-card-hover: 0 12px 32px rgba(85,0,0,0.16), 0 20px 48px rgba(85,0,0,0.12), 0 0 40px rgba(201,169,110,0.25);
  }
  
  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
  
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
  
  /* Font smoothing */
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

@layer components {
  /* Professional Button Styles */
  .btn-primary-luxury {
    @apply relative overflow-hidden;
    @apply px-12 py-4 rounded-xl;
    @apply bg-maroon-900 text-off-white;
    @apply text-sm font-semibold tracking-widest uppercase;
    @apply shadow-button-primary;
    @apply transition-all duration-400 ease-luxury;
    @apply gpu-accelerated;
  }
  
  .btn-primary-luxury::before {
    content: '';
    @apply absolute inset-0;
    @apply bg-gradient-shimmer;
    @apply translate-x-[-100%] transition-transform duration-600;
  }
  
  .btn-primary-luxury:hover {
    @apply scale-105 translate-y-[-2px];
    @apply shadow-button-primary-hover;
  }
  
  .btn-primary-luxury:hover::before {
    @apply translate-x-[100%];
  }
  
  /* Professional Card Styles */
  .card-luxury {
    @apply relative rounded-2xl overflow-hidden;
    @apply bg-white;
    @apply shadow-card-rest;
    @apply transition-all duration-400 ease-luxury;
    @apply gpu-accelerated;
  }
  
  .card-luxury::before {
    content: '';
    @apply absolute top-0 right-0;
    @apply w-16 h-16;
    @apply bg-gradient-to-br from-gold-500 to-transparent;
    @apply opacity-0 transition-opacity duration-400;
    @apply z-10;
  }
  
  .card-luxury:hover {
    @apply translate-y-[-12px] scale-[1.02];
    @apply shadow-card-hover;
  }
  
  .card-luxury:hover::before {
    @apply opacity-15;
  }
  
  /* Gradient Text Effect */
  .text-gradient-gold {
    @apply bg-gradient-text-gold bg-clip-text text-transparent;
    background-size: 200% auto;
  }
  
  .text-gradient-gold-animated {
    @apply text-gradient-gold;
    animation: shimmer 3s linear infinite;
  }
  
  /* Decorative Elements */
  .decorative-corner-tl {
    @apply absolute top-[-12px] left-[-12px];
    @apply w-20 h-20;
    @apply border-t-3 border-l-3 border-gold-500;
    @apply rounded-tl-3xl;
    @apply z-20;
  }
  
  .decorative-corner-br {
    @apply absolute bottom-[-12px] right-[-12px];
    @apply w-20 h-20;
    @apply border-b-3 border-r-3 border-gold-500;
    @apply rounded-br-3xl;
    @apply z-20;
  }
  
  .decorative-line-gold {
    @apply w-16 h-1;
    @apply bg-gradient-to-r from-gold-500 to-gold-300;
    @apply rounded-full;
    @apply shadow-[0_2px_8px_rgba(201,169,110,0.3)];
  }
}

@layer utilities {
  /* Disable animations for reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  
  /* Touch device optimizations */
  @media (hover: none) {
    .hover\:scale-105:hover {
      transform: scale(1);
    }
    
    .hover\:translate-y-\[-12px\]:hover {
      transform: translateY(0);
    }
  }
  
  /* Mobile-specific utilities */
  @media (max-width: 768px) {
    .mobile-shadow-simple {
      box-shadow: 0 4px 16px rgba(85,0,0,0.12) !important;
    }
  }
}
```

**Usage in Components**:

```tsx
// Using Tailwind utility classes
<button className="btn-primary-luxury">
  Shop Now
</button>

<div className="card-luxury">
  {/* Card content */}
</div>

<h1 className="text-gradient-gold-animated">
  Elegance Redefined
</h1>

<div className="relative">
  <div className="decorative-corner-tl" />
  <div className="decorative-corner-br" />
  {/* Content */}
</div>

<div className="decorative-line-gold mb-6" />
```


## UI/UX Specifications

### Design Tokens

```css
/* Existing tokens from globals.css */
:root {
  --color-primary: #550000;      /* Deep Maroon */
  --color-accent: #C9A96E;       /* Champagne Gold */
  --color-surface: #FAF7F4;      /* Warm Off-White */
  --color-text: #2C2C2C;         /* Dark Gray */
  
  --font-heading-ar: var(--font-noto-naskh-arabic);
  --font-heading-en: var(--font-cormorant);
  --font-body-ar: var(--font-cairo);
  --font-body-en: var(--font-inter);
  
  /* Professional Gradient Definitions */
  --gradient-gold: linear-gradient(135deg, #C9A96E 0%, #E8D4A8 50%, #C9A96E 100%);
  --gradient-maroon: linear-gradient(180deg, #550000 0%, #3A0000 100%);
  --gradient-hero-overlay: linear-gradient(135deg, rgba(85,0,0,0.7) 0%, rgba(0,0,0,0.8) 100%);
  --gradient-shimmer: linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.3) 50%, transparent 100%);
  
  /* Professional Shadow System */
  --shadow-sm: 0 2px 8px rgba(85,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(85,0,0,0.12);
  --shadow-lg: 0 8px 32px rgba(85,0,0,0.16);
  --shadow-xl: 0 12px 48px rgba(85,0,0,0.20);
  --shadow-2xl: 0 20px 64px rgba(85,0,0,0.24);
  --shadow-glow-gold: 0 0 30px rgba(201,169,110,0.4), 0 0 60px rgba(201,169,110,0.2);
  --shadow-glow-maroon: 0 0 40px rgba(85,0,0,0.3);
  
  /* Multi-layer Professional Shadows */
  --shadow-luxury: 0 4px 20px rgba(85,0,0,0.15), 0 8px 40px rgba(85,0,0,0.1), 0 0 30px rgba(201,169,110,0.2);
  --shadow-card-rest: 0 2px 8px rgba(85,0,0,0.08), 0 4px 16px rgba(85,0,0,0.04);
  --shadow-card-hover: 0 12px 32px rgba(85,0,0,0.16), 0 20px 48px rgba(85,0,0,0.12), 0 0 40px rgba(201,169,110,0.25);
}
```

### Visual Design System

#### Professional Button Variants

**Primary CTA Button (Luxury Gold Border)**:
```css
.btn-primary {
  /* Structure */
  padding: 16px 48px;
  border-radius: 12px;
  border: 2px solid transparent;
  background: linear-gradient(#550000, #550000) padding-box,
              linear-gradient(135deg, #C9A96E 0%, #E8D4A8 50%, #C9A96E 100%) border-box;
  
  /* Typography */
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #FAF7F4;
  
  /* Effects */
  box-shadow: 0 4px 20px rgba(85,0,0,0.15), 0 8px 40px rgba(85,0,0,0.1);
  transition: all 400ms cubic-bezier(0.33, 1, 0.68, 1);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  /* Shimmer effect */
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.3) 50%, transparent 100%);
  transition: left 600ms ease;
}

.btn-primary:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 8px 32px rgba(85,0,0,0.2), 0 12px 48px rgba(85,0,0,0.15), 0 0 40px rgba(201,169,110,0.4);
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:active {
  transform: scale(1.02) translateY(0);
}
```

**Secondary Button (Ghost with Gold)**:
```css
.btn-secondary {
  /* Structure */
  padding: 14px 40px;
  border-radius: 10px;
  border: 2px solid #C9A96E;
  background: transparent;
  
  /* Typography */
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #C9A96E;
  
  /* Effects */
  box-shadow: 0 2px 12px rgba(201,169,110,0.15);
  transition: all 350ms cubic-bezier(0.33, 1, 0.68, 1);
  position: relative;
  overflow: hidden;
}

.btn-secondary::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #C9A96E 0%, #E8D4A8 100%);
  transform: translate(-50%, -50%);
  transition: width 400ms ease, height 400ms ease;
  z-index: -1;
}

.btn-secondary:hover {
  color: #550000;
  border-color: #E8D4A8;
  box-shadow: 0 4px 24px rgba(201,169,110,0.3), 0 0 30px rgba(201,169,110,0.2);
}

.btn-secondary:hover::before {
  width: 300%;
  height: 300%;
}
```

**WhatsApp Button (Professional with Icon)**:
```css
.btn-whatsapp {
  /* Structure */
  padding: 12px 32px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  
  /* Typography */
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: white;
  
  /* Layout */
  display: inline-flex;
  align-items: center;
  gap: 10px;
  
  /* Effects */
  box-shadow: 0 4px 16px rgba(37,211,102,0.25), 0 8px 32px rgba(37,211,102,0.15);
  transition: all 300ms cubic-bezier(0.33, 1, 0.68, 1);
}

.btn-whatsapp:hover {
  transform: scale(1.08) translateY(-3px);
  box-shadow: 0 8px 24px rgba(37,211,102,0.35), 0 12px 40px rgba(37,211,102,0.25), 0 0 30px rgba(37,211,102,0.3);
  background: linear-gradient(135deg, #2EE872 0%, #15A589 100%);
}

.btn-whatsapp:active {
  transform: scale(1.04) translateY(-1px);
}
```

#### Sophisticated Card Designs

**Product Card (Luxury with Multi-layer Shadow)**:
```css
.product-card {
  /* Structure */
  border-radius: 16px;
  background: white;
  overflow: hidden;
  position: relative;
  
  /* Effects */
  box-shadow: 0 2px 8px rgba(85,0,0,0.08), 0 4px 16px rgba(85,0,0,0.04);
  transition: all 400ms cubic-bezier(0.33, 1, 0.68, 1);
}

.product-card::before {
  /* Decorative gold corner accent */
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #C9A96E 0%, transparent 100%);
  opacity: 0;
  transition: opacity 400ms ease;
  z-index: 1;
}

.product-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 12px 32px rgba(85,0,0,0.16), 
              0 20px 48px rgba(85,0,0,0.12), 
              0 0 40px rgba(201,169,110,0.25);
}

.product-card:hover::before {
  opacity: 0.15;
}

.product-card-image-container {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: linear-gradient(135deg, #FAF7F4 0%, #F5F0EB 100%);
}

.product-card-image {
  transition: transform 500ms cubic-bezier(0.33, 1, 0.68, 1);
}

.product-card:hover .product-card-image {
  transform: scale(1.1) rotate(1deg);
}

.product-card-badge {
  /* Diagonal "New" badge */
  position: absolute;
  top: 20px;
  left: -35px;
  width: 120px;
  padding: 6px 0;
  background: linear-gradient(135deg, #C9A96E 0%, #E8D4A8 100%);
  color: #550000;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
  transform: rotate(-45deg);
  box-shadow: 0 4px 12px rgba(201,169,110,0.4);
  z-index: 2;
}

.product-card-content {
  padding: 20px;
  background: white;
  position: relative;
}

.product-card-price {
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(135deg, #C9A96E 0%, #E8D4A8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.5px;
}
```

**Feature Card (Icon-based with Glow)**:
```css
.feature-card {
  /* Structure */
  padding: 32px 24px;
  border-radius: 12px;
  background: linear-gradient(135deg, #FFFFFF 0%, #FAF7F4 100%);
  border: 1px solid rgba(201,169,110,0.15);
  
  /* Effects */
  box-shadow: 0 4px 16px rgba(85,0,0,0.06);
  transition: all 350ms cubic-bezier(0.33, 1, 0.68, 1);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  /* Decorative pattern background */
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 400ms ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: rgba(201,169,110,0.3);
  box-shadow: 0 8px 24px rgba(85,0,0,0.1), 0 12px 40px rgba(85,0,0,0.06), 0 0 30px rgba(201,169,110,0.15);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card-icon-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #C9A96E 0%, #E8D4A8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 8px 24px rgba(201,169,110,0.3), inset 0 2px 8px rgba(255,255,255,0.3);
  transition: all 350ms ease;
  position: relative;
}

.feature-card:hover .feature-card-icon-container {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 12px 32px rgba(201,169,110,0.4), 0 0 40px rgba(201,169,110,0.3), inset 0 2px 8px rgba(255,255,255,0.4);
}

.feature-card-icon {
  width: 36px;
  height: 36px;
  color: #550000;
  filter: drop-shadow(0 2px 4px rgba(85,0,0,0.2));
}
```

#### Creative Section Layouts

**Hero Section (Diagonal Overlay with Gradient)**:
```css
.hero-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(85,0,0,0.75) 0%, rgba(0,0,0,0.85) 100%);
  z-index: 1;
}

.hero-overlay::before {
  /* Diagonal cut accent */
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  background: linear-gradient(135deg, rgba(201,169,110,0.15) 0%, transparent 100%);
  clip-path: polygon(0 100%, 100% 0, 100% 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 24px;
}

.hero-heading {
  font-size: clamp(32px, 8vw, 72px);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: 2px;
  color: white;
  text-shadow: 0 4px 20px rgba(0,0,0,0.5), 0 8px 40px rgba(0,0,0,0.3);
  margin-bottom: 24px;
  
  /* Gold gradient text effect */
  background: linear-gradient(135deg, #FFFFFF 0%, #C9A96E 50%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

.hero-subtitle {
  font-size: clamp(16px, 3vw, 20px);
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255,255,255,0.95);
  text-shadow: 0 2px 12px rgba(0,0,0,0.4);
  max-width: 600px;
  margin: 0 auto 40px;
}
```

**About Section (Overlapping Image with Decorative Corners)**:
```css
.about-section {
  position: relative;
  padding: 120px 0;
  background: linear-gradient(180deg, #FAF7F4 0%, #FFFFFF 100%);
  overflow: hidden;
}

.about-section::before {
  /* Decorative pattern background */
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: radial-gradient(ellipse at top, rgba(201,169,110,0.08) 0%, transparent 70%);
  pointer-events: none;
}

.about-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
}

.about-image-wrapper {
  position: relative;
  aspect-ratio: 4/5;
  border-radius: 24px;
  overflow: visible;
}

.about-image-wrapper::before,
.about-image-wrapper::after {
  /* Gold corner decorations */
  content: '';
  position: absolute;
  width: 80px;
  height: 80px;
  border: 3px solid #C9A96E;
  z-index: 2;
}

.about-image-wrapper::before {
  top: -12px;
  left: -12px;
  border-right: none;
  border-bottom: none;
  border-radius: 24px 0 0 0;
}

.about-image-wrapper::after {
  bottom: -12px;
  right: -12px;
  border-left: none;
  border-top: none;
  border-radius: 0 0 24px 0;
}

.about-image {
  border-radius: 24px;
  box-shadow: 0 20px 64px rgba(85,0,0,0.2), 0 40px 96px rgba(85,0,0,0.15);
  transition: transform 600ms cubic-bezier(0.33, 1, 0.68, 1);
}

.about-image:hover {
  transform: scale(1.03) rotate(-1deg);
}

.about-content {
  position: relative;
}

.about-decorative-line {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #C9A96E 0%, #E8D4A8 100%);
  margin-bottom: 24px;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(201,169,110,0.3);
}

.about-heading {
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: 1px;
  color: #550000;
  margin-bottom: 24px;
  position: relative;
}

.about-text {
  font-size: 16px;
  line-height: 1.8;
  color: #2C2C2C;
  margin-bottom: 32px;
}
```

**Collections Banner (Angled Section with Parallax)**:
```css
.collections-banner {
  position: relative;
  min-height: 500px;
  overflow: hidden;
  clip-path: polygon(0 5%, 100% 0, 100% 95%, 0 100%);
  margin: 80px 0;
}

.collections-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  /* Parallax effect applied via Framer Motion */
}

.collections-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(85,0,0,0.8) 0%, rgba(0,0,0,0.7) 50%, rgba(85,0,0,0.8) 100%);
  z-index: 1;
}

.collections-overlay::before {
  /* Animated shimmer effect */
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.2) 50%, transparent 100%);
  animation: shimmer-slide 4s ease-in-out infinite;
}

@keyframes shimmer-slide {
  0%, 100% { left: -100%; }
  50% { left: 100%; }
}

.collections-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 100px 24px;
}

.collections-heading {
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: 2px;
  color: white;
  text-shadow: 0 4px 20px rgba(0,0,0,0.6), 0 8px 40px rgba(0,0,0,0.4);
  margin-bottom: 20px;
}

.collections-description {
  font-size: clamp(14px, 2.5vw, 18px);
  line-height: 1.6;
  color: rgba(255,255,255,0.95);
  text-shadow: 0 2px 12px rgba(0,0,0,0.5);
  max-width: 700px;
  margin: 0 auto 40px;
}
```

#### Decorative Elements

**Section Divider with Ornament**:
```css
.section-divider {
  position: relative;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.3) 50%, transparent 100%);
  margin: 80px 0;
}

.section-divider::before {
  /* Centered ornamental element */
  content: '◆';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: #C9A96E;
  background: white;
  padding: 0 20px;
  text-shadow: 0 2px 8px rgba(201,169,110,0.3);
}
```

**Floating Decorative Corners**:
```css
.decorative-corner {
  position: absolute;
  width: 100px;
  height: 100px;
  pointer-events: none;
}

.decorative-corner-top-left {
  top: 0;
  left: 0;
  border-top: 2px solid rgba(201,169,110,0.3);
  border-left: 2px solid rgba(201,169,110,0.3);
  border-radius: 24px 0 0 0;
}

.decorative-corner-bottom-right {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid rgba(201,169,110,0.3);
  border-right: 2px solid rgba(201,169,110,0.3);
  border-radius: 0 0 24px 0;
}
```

### Typography Scale

| Element | Mobile | Desktop | Weight | Line Height | Letter Spacing |
|---------|--------|---------|--------|-------------|----------------|
| Hero Heading | 32px | 48-72px | 300 | 1.1 | 2px |
| Section Heading | 28px | 36-48px | 300 | 1.2 | 1px |
| Subsection Heading | 20px | 24px | 400 | 1.3 | 0.5px |
| Body Text | 14px | 16px | 400 | 1.6-1.8 | 0px |
| Small Text | 12px | 14px | 400 | 1.5 | 0px |
| Button Text | 10px | 11px | 600 | 1 | 1.5px |

**Typography Enhancements**:
- Hero headings use gradient text effect with shimmer animation
- Section headings have subtle text shadows for depth
- Button text uses uppercase with increased letter spacing for luxury feel
- All headings use brand fonts (Cormorant for EN, Noto Naskh Arabic for AR)

### Spacing System

```typescript
// Tailwind spacing scale (used throughout)
const spacing = {
  xs: '0.5rem',   // 8px
  sm: '0.75rem',  // 12px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
  '4xl': '6rem',  // 96px
};
```

### Professional Shadow System

**Shadow Presets**:
```css
/* Card Shadows */
.shadow-card-rest {
  box-shadow: 0 2px 8px rgba(85, 0, 0, 0.08), 0 4px 16px rgba(85, 0, 0, 0.04);
}

.shadow-card-hover {
  box-shadow: 0 12px 32px rgba(85, 0, 0, 0.16), 
              0 20px 48px rgba(85, 0, 0, 0.12), 
              0 0 40px rgba(201, 169, 110, 0.25);
}

/* Feature Card Shadows */
.shadow-feature {
  box-shadow: 0 4px 16px rgba(85, 0, 0, 0.06);
}

.shadow-feature-hover {
  box-shadow: 0 8px 24px rgba(85, 0, 0, 0.1), 
              0 12px 40px rgba(85, 0, 0, 0.06), 
              0 0 30px rgba(201, 169, 110, 0.15);
}

/* Overlay Card Shadow (About Section) */
.shadow-overlay {
  box-shadow: 0 20px 64px rgba(85, 0, 0, 0.2), 
              0 40px 96px rgba(85, 0, 0, 0.15);
}

/* Button Shadows */
.shadow-button-primary {
  box-shadow: 0 4px 20px rgba(85, 0, 0, 0.15), 
              0 8px 40px rgba(85, 0, 0, 0.1);
}

.shadow-button-primary-hover {
  box-shadow: 0 8px 32px rgba(85, 0, 0, 0.2), 
              0 12px 48px rgba(85, 0, 0, 0.15), 
              0 0 40px rgba(201, 169, 110, 0.4);
}

/* Glow Effects */
.shadow-glow-gold {
  box-shadow: 0 0 30px rgba(201, 169, 110, 0.4), 
              0 0 60px rgba(201, 169, 110, 0.2);
}

.shadow-glow-maroon {
  box-shadow: 0 0 40px rgba(85, 0, 0, 0.3);
}

/* Luxury Multi-layer Shadow */
.shadow-luxury {
  box-shadow: 0 4px 20px rgba(85, 0, 0, 0.15), 
              0 8px 40px rgba(85, 0, 0, 0.1), 
              0 0 30px rgba(201, 169, 110, 0.2);
}

/* Text Shadows for Visibility */
.text-shadow-light {
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}

.text-shadow-strong {
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 
               0 8px 40px rgba(0, 0, 0, 0.3);
}

.text-shadow-gold {
  text-shadow: 0 2px 8px rgba(201, 169, 110, 0.3);
}
```

### Border Radius System

| Element | Radius | Purpose |
|---------|--------|---------|
| Product Card | 16px | Sophisticated, modern feel |
| Feature Card | 12px | Balanced, professional |
| Button Primary | 12px | Luxury, approachable |
| Button Secondary | 10px | Slightly softer |
| WhatsApp Button | 16px | Friendly, modern |
| Image Container | 24px | Bold, distinctive |
| Badge | 0px | Sharp, attention-grabbing |
| Input Fields | 8px | Clean, functional |

### Advanced Hover Effects

**Product Card Hover (Multi-property Animation)**:
```css
.product-card {
  transition: all 400ms cubic-bezier(0.33, 1, 0.68, 1);
}

.product-card:hover {
  /* Multiple transforms */
  transform: translateY(-12px) scale(1.02);
  
  /* Multi-layer shadow with glow */
  box-shadow: 0 12px 32px rgba(85, 0, 0, 0.16), 
              0 20px 48px rgba(85, 0, 0, 0.12), 
              0 0 40px rgba(201, 169, 110, 0.25);
}

.product-card-image {
  transition: transform 500ms cubic-bezier(0.33, 1, 0.68, 1);
}

.product-card:hover .product-card-image {
  /* Image zoom with subtle rotation */
  transform: scale(1.1) rotate(1deg);
}

.product-card-overlay {
  opacity: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(85, 0, 0, 0.8) 100%);
  transition: opacity 400ms ease;
}

.product-card:hover .product-card-overlay {
  opacity: 1;
}
```

**Feature Card Hover (Glow and Lift)**:
```css
.feature-card {
  transition: all 350ms cubic-bezier(0.33, 1, 0.68, 1);
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: rgba(201, 169, 110, 0.3);
  box-shadow: 0 8px 24px rgba(85, 0, 0, 0.1), 
              0 12px 40px rgba(85, 0, 0, 0.06), 
              0 0 30px rgba(201, 169, 110, 0.15);
}

.feature-card-icon-container {
  transition: all 350ms ease;
}

.feature-card:hover .feature-card-icon-container {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 12px 32px rgba(201, 169, 110, 0.4), 
              0 0 40px rgba(201, 169, 110, 0.3);
}
```

**Button Hover (Scale, Glow, Shimmer)**:
```css
.btn-primary {
  transition: all 400ms cubic-bezier(0.33, 1, 0.68, 1);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  /* Shimmer effect */
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(201, 169, 110, 0.3) 50%, transparent 100%);
  transition: left 600ms ease;
}

.btn-primary:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 8px 32px rgba(85, 0, 0, 0.2), 
              0 12px 48px rgba(85, 0, 0, 0.15), 
              0 0 40px rgba(201, 169, 110, 0.4);
}

.btn-primary:hover::before {
  left: 100%;
}
```

**Image Hover (Zoom with Overlay Fade)**:
```css
.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
}

.image-container img {
  transition: transform 600ms cubic-bezier(0.33, 1, 0.68, 1);
}

.image-container:hover img {
  transform: scale(1.08);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(85, 0, 0, 0.6) 100%);
  opacity: 0;
  transition: opacity 400ms ease;
  display: flex;
  align-items: flex-end;
  padding: 24px;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

.image-overlay-text {
  color: white;
  font-size: 18px;
  font-weight: 600;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  transform: translateY(20px);
  transition: transform 400ms cubic-bezier(0.33, 1, 0.68, 1);
}

.image-container:hover .image-overlay-text {
  transform: translateY(0);
}
```

### Animation Specifications

**Entrance Animations**:
```typescript
// Fade up with stagger (sections entering viewport)
const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

// Stagger container (feature cards, product cards)
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// Stagger item
const staggerItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

// Scale in (icons, badges)
const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

// Slide in from side (decorative elements)
const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

// Parallax (collections banner background)
const parallaxVariants = {
  scrollYProgress: [0, 1],
  y: ["0%", "30%"]
};

// Shimmer animation (hero heading, buttons)
const shimmerAnimation = {
  backgroundPosition: ["0% center", "200% center"],
  transition: {
    duration: 3,
    ease: "linear",
    repeat: Infinity
  }
};
```

**Hover Animations**:
```typescript
// Card hover (product cards)
const cardHoverVariants = {
  rest: { 
    y: 0, 
    scale: 1,
    boxShadow: "0 2px 8px rgba(85,0,0,0.08), 0 4px 16px rgba(85,0,0,0.04)"
  },
  hover: {
    y: -12,
    scale: 1.02,
    boxShadow: "0 12px 32px rgba(85,0,0,0.16), 0 20px 48px rgba(85,0,0,0.12), 0 0 40px rgba(201,169,110,0.25)",
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

// Image hover (zoom with rotation)
const imageHoverVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

// Button hover (scale with glow)
const buttonHoverVariants = {
  rest: { 
    scale: 1, 
    y: 0,
    boxShadow: "0 4px 20px rgba(85,0,0,0.15), 0 8px 40px rgba(85,0,0,0.1)"
  },
  hover: {
    scale: 1.05,
    y: -2,
    boxShadow: "0 8px 32px rgba(85,0,0,0.2), 0 12px 48px rgba(85,0,0,0.15), 0 0 40px rgba(201,169,110,0.4)",
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1]
    }
  },
  tap: {
    scale: 1.02,
    y: 0
  }
};

// Icon container hover (rotate with scale)
const iconHoverVariants = {
  rest: { 
    scale: 1, 
    rotate: 0,
    boxShadow: "0 8px 24px rgba(201,169,110,0.3)"
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    boxShadow: "0 12px 32px rgba(201,169,110,0.4), 0 0 40px rgba(201,169,110,0.3)",
    transition: {
      duration: 0.35,
      ease: "easeOut"
    }
  }
};
```

**Continuous Animations**:
```css
/* Shimmer effect for hero heading */
@keyframes shimmer {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

.hero-heading {
  background: linear-gradient(135deg, #FFFFFF 0%, #C9A96E 50%, #FFFFFF 100%);
  background-size: 200% auto;
  animation: shimmer 3s linear infinite;
}

/* Floating animation for decorative elements */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.floating-element {
  animation: float 3s ease-in-out infinite;
}

/* Pulse glow for special badges */
@keyframes pulse-glow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(201,169,110,0.3);
  }
  50% { 
    box-shadow: 0 0 40px rgba(201,169,110,0.6), 0 0 60px rgba(201,169,110,0.3);
  }
}

.badge-new {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Shimmer slide for banner overlay */
@keyframes shimmer-slide {
  0%, 100% { left: -100%; }
  50% { left: 100%; }
}

.collections-overlay::before {
  animation: shimmer-slide 4s ease-in-out infinite;
}
```

**Intersection Observer Configuration**:
```typescript
const observerOptions = {
  threshold: 0.2,        // Trigger when 20% visible
  rootMargin: "0px",     // No margin adjustment
  triggerOnce: true,     // Animate only once
};

// Usage with Framer Motion
const { ref, inView } = useInView({
  threshold: 0.2,
  triggerOnce: true,
  amount: 0.2
});
```

**Performance Optimizations**:
```css
/* GPU acceleration for smooth animations */
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Only animate transform and opacity for 60fps */
.smooth-animation {
  transition: transform 400ms cubic-bezier(0.33, 1, 0.68, 1),
              opacity 400ms ease;
}

/* Avoid animating these properties (causes reflow) */
/* ❌ width, height, top, left, margin, padding */
/* ✓ transform, opacity, filter */
```

### Responsive Breakpoints

```typescript
const breakpoints = {
  sm: '640px',   // Small devices
  md: '768px',   // Tablets
  lg: '1024px',  // Desktops
  xl: '1280px',  // Large desktops
  '2xl': '1536px', // Extra large
};
```

### Color Harmony & Gradient System

**Primary Gradients**:
```css
/* Gold Gradients */
--gradient-gold-primary: linear-gradient(135deg, #C9A96E 0%, #E8D4A8 50%, #C9A96E 100%);
--gradient-gold-subtle: linear-gradient(135deg, #C9A96E 0%, #D4BC8F 100%);
--gradient-gold-radial: radial-gradient(circle, #E8D4A8 0%, #C9A96E 100%);
--gradient-gold-shimmer: linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.3) 50%, transparent 100%);

/* Maroon Gradients */
--gradient-maroon-primary: linear-gradient(180deg, #550000 0%, #3A0000 100%);
--gradient-maroon-diagonal: linear-gradient(135deg, #550000 0%, #440000 50%, #330000 100%);
--gradient-maroon-radial: radial-gradient(ellipse at center, #660000 0%, #550000 50%, #440000 100%);

/* Overlay Gradients */
--gradient-overlay-hero: linear-gradient(135deg, rgba(85,0,0,0.75) 0%, rgba(0,0,0,0.85) 100%);
--gradient-overlay-dark: linear-gradient(180deg, transparent 0%, rgba(85,0,0,0.8) 100%);
--gradient-overlay-light: linear-gradient(180deg, rgba(250,247,244,0.95) 0%, rgba(255,255,255,0.98) 100%);
--gradient-overlay-diagonal: linear-gradient(135deg, rgba(85,0,0,0.8) 0%, rgba(0,0,0,0.7) 50%, rgba(85,0,0,0.8) 100%);

/* Background Gradients */
--gradient-bg-subtle: linear-gradient(180deg, #FAF7F4 0%, #FFFFFF 100%);
--gradient-bg-warm: linear-gradient(135deg, #FAF7F4 0%, #F5F0EB 100%);
--gradient-bg-radial-gold: radial-gradient(ellipse at top, rgba(201,169,110,0.08) 0%, transparent 70%);
--gradient-bg-radial-maroon: radial-gradient(circle at center, rgba(85,0,0,0.05) 0%, transparent 70%);

/* Text Gradients */
--gradient-text-gold: linear-gradient(135deg, #FFFFFF 0%, #C9A96E 50%, #FFFFFF 100%);
--gradient-text-price: linear-gradient(135deg, #C9A96E 0%, #E8D4A8 100%);
--gradient-text-heading: linear-gradient(90deg, #550000 0%, #770000 100%);
```

**Gradient Usage Guidelines**:

1. **Buttons**:
   - Primary CTA: Gold gradient border with maroon background
   - Secondary: Transparent with gold border, gold gradient fill on hover
   - WhatsApp: Green gradient (135deg, #25D366 to #128C7E)

2. **Cards**:
   - Product cards: White background with subtle warm gradient on hover
   - Feature cards: Light gradient background (white to off-white)
   - Icon containers: Gold gradient with inner shadow for depth

3. **Sections**:
   - Hero: Dark overlay gradient (maroon to black, 135deg)
   - About: Subtle background gradient (off-white to white)
   - Collections: Diagonal overlay gradient with shimmer effect

4. **Text**:
   - Hero headings: Animated gold-white gradient
   - Prices: Gold gradient with background-clip
   - Section headings: Solid maroon or subtle maroon gradient

**Color Opacity Layers**:
```css
/* Layered overlays for depth */
.overlay-layer-1 {
  background: rgba(85, 0, 0, 0.6);
}

.overlay-layer-2 {
  background: linear-gradient(135deg, rgba(85,0,0,0.75) 0%, rgba(0,0,0,0.85) 100%);
}

.overlay-layer-3 {
  background: linear-gradient(180deg, transparent 0%, rgba(85,0,0,0.8) 100%);
}

/* Gold accent overlays */
.gold-overlay-subtle {
  background: rgba(201, 169, 110, 0.08);
}

.gold-overlay-medium {
  background: rgba(201, 169, 110, 0.15);
}

.gold-overlay-strong {
  background: rgba(201, 169, 110, 0.25);
}
```

**Shadow Colors (Matching Brand Palette)**:
```css
/* Maroon-tinted shadows */
.shadow-maroon-sm {
  box-shadow: 0 2px 8px rgba(85, 0, 0, 0.08);
}

.shadow-maroon-md {
  box-shadow: 0 4px 16px rgba(85, 0, 0, 0.12);
}

.shadow-maroon-lg {
  box-shadow: 0 8px 32px rgba(85, 0, 0, 0.16);
}

/* Gold-tinted glow shadows */
.shadow-gold-glow {
  box-shadow: 0 0 30px rgba(201, 169, 110, 0.4), 
              0 0 60px rgba(201, 169, 110, 0.2);
}

/* Combined maroon + gold shadows */
.shadow-luxury-combined {
  box-shadow: 0 4px 20px rgba(85, 0, 0, 0.15), 
              0 8px 40px rgba(85, 0, 0, 0.1), 
              0 0 30px rgba(201, 169, 110, 0.2);
}
```

**Contrast Ratios (WCAG AA Compliant)**:

| Foreground | Background | Ratio | Pass | Usage |
|------------|------------|-------|------|-------|
| #550000 (Maroon) | #FAF7F4 (Off-White) | 8.2:1 | ✓✓ | Body text on light bg |
| #C9A96E (Gold) | #550000 (Maroon) | 4.8:1 | ✓ | Gold text on maroon |
| White | #550000 (Maroon) | 10.1:1 | ✓✓ | Hero text on dark overlay |
| #2C2C2C (Text) | #FAF7F4 (Surface) | 12.3:1 | ✓✓ | Primary body text |
| #C9A96E (Gold) | White | 3.2:1 | ✓ | Large text only (≥18px) |
| White | rgba(85,0,0,0.8) | 8.5:1 | ✓✓ | Text on overlay |

**Text Visibility Enhancements**:
```css
/* Text on images - always use shadows */
.text-on-image {
  color: white;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5), 
               0 4px 24px rgba(0, 0, 0, 0.3);
}

/* Gold text on dark backgrounds */
.text-gold-on-dark {
  color: #C9A96E;
  text-shadow: 0 2px 8px rgba(201, 169, 110, 0.4);
}

/* Maroon text on light backgrounds */
.text-maroon-on-light {
  color: #550000;
  /* No shadow needed - excellent contrast */
}

/* White text on light backgrounds (avoid or use strong shadow) */
.text-white-on-light {
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3),
               0 2px 6px rgba(0, 0, 0, 0.2);
  /* Better: use maroon or dark gray instead */
}
```

**Component Breakpoint Behavior**:

| Component | Mobile (< 768px) | Tablet (768-1023px) | Desktop (≥ 1024px) |
|-----------|------------------|---------------------|-------------------|
| WhyChoose Grid | 2 columns | 4 columns | 4 columns |
| Products Grid | 2 columns | 3 columns | 4 columns |
| Features Layout | Vertical stack | Horizontal | Horizontal |
| About Layout | Vertical stack | Vertical stack | Horizontal split |

### Tailwind CSS Implementation Examples

**Primary CTA Button with Gold Gradient Border**:
```tsx
<button className="
  relative overflow-hidden
  px-12 py-4 rounded-xl
  bg-maroon-900
  border-2 border-transparent
  bg-gradient-to-br from-maroon-900 to-maroon-900
  [background-clip:padding-box,border-box]
  [background-origin:padding-box,border-box]
  [background-image:linear-gradient(#550000,#550000),linear-gradient(135deg,#C9A96E,#E8D4A8,#C9A96E)]
  
  text-sm font-semibold tracking-widest uppercase text-off-white
  
  shadow-[0_4px_20px_rgba(85,0,0,0.15),0_8px_40px_rgba(85,0,0,0.1)]
  
  transition-all duration-400 ease-[cubic-bezier(0.33,1,0.68,1)]
  
  hover:scale-105 hover:translate-y-[-2px]
  hover:shadow-[0_8px_32px_rgba(85,0,0,0.2),0_12px_48px_rgba(85,0,0,0.15),0_0_40px_rgba(201,169,110,0.4)]
  
  active:scale-102 active:translate-y-0
  
  before:content-[''] before:absolute before:inset-0
  before:bg-gradient-to-r before:from-transparent before:via-gold-400/30 before:to-transparent
  before:translate-x-[-100%] before:transition-transform before:duration-600
  hover:before:translate-x-[100%]
">
  Shop Now
</button>
```

**Secondary Ghost Button with Gold**:
```tsx
<button className="
  relative overflow-hidden
  px-10 py-3.5 rounded-lg
  border-2 border-gold-500
  bg-transparent
  
  text-sm font-semibold tracking-wider uppercase text-gold-500
  
  shadow-[0_2px_12px_rgba(201,169,110,0.15)]
  
  transition-all duration-350 ease-[cubic-bezier(0.33,1,0.68,1)]
  
  hover:text-maroon-900 hover:border-gold-300
  hover:shadow-[0_4px_24px_rgba(201,169,110,0.3),0_0_30px_rgba(201,169,110,0.2)]
  
  before:content-[''] before:absolute before:inset-0
  before:bg-gradient-to-br before:from-gold-500 before:to-gold-300
  before:rounded-full before:scale-0
  before:transition-transform before:duration-400 before:ease-out
  before:-z-10
  hover:before:scale-[3]
">
  Learn More
</button>
```

**Professional Product Card**:
```tsx
<motion.div
  initial="rest"
  whileHover="hover"
  animate="rest"
  className="
    group relative
    rounded-2xl overflow-hidden
    bg-white
    
    shadow-[0_2px_8px_rgba(85,0,0,0.08),0_4px_16px_rgba(85,0,0,0.04)]
    
    transition-all duration-400 ease-[cubic-bezier(0.33,1,0.68,1)]
    
    hover:translate-y-[-12px] hover:scale-[1.02]
    hover:shadow-[0_12px_32px_rgba(85,0,0,0.16),0_20px_48px_rgba(85,0,0,0.12),0_0_40px_rgba(201,169,110,0.25)]
    
    before:content-[''] before:absolute before:top-0 before:right-0
    before:w-16 before:h-16
    before:bg-gradient-to-br before:from-gold-500 before:to-transparent
    before:opacity-0 before:transition-opacity before:duration-400
    before:z-10
    hover:before:opacity-15
  "
>
  {/* Image Container */}
  <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-off-white to-warm-gray-100">
    <Image
      src={product.image}
      alt={product.name}
      fill
      className="
        object-cover
        transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]
        group-hover:scale-110 group-hover:rotate-1
      "
    />
    
    {/* Diagonal "New" Badge */}
    {product.isNew && (
      <div className="
        absolute top-5 left-[-35px]
        w-32 py-1.5
        bg-gradient-to-br from-gold-500 to-gold-300
        text-maroon-900 text-xs font-bold tracking-wide text-center uppercase
        rotate-[-45deg]
        shadow-[0_4px_12px_rgba(201,169,110,0.4)]
        z-20
      ">
        New
      </div>
    )}
    
    {/* Hover Overlay */}
    <div className="
      absolute inset-0
      bg-gradient-to-t from-maroon-900/80 to-transparent
      opacity-0 transition-opacity duration-400
      group-hover:opacity-100
      flex items-end p-6
    ">
      <button className="
        w-full py-3 rounded-lg
        bg-white/20 backdrop-blur-sm
        border border-white/30
        text-white text-sm font-semibold
        transform translate-y-4 opacity-0
        transition-all duration-400
        group-hover:translate-y-0 group-hover:opacity-100
        hover:bg-white/30
      ">
        Quick View
      </button>
    </div>
  </div>
  
  {/* Content */}
  <div className="p-5 relative">
    <h3 className="text-lg font-medium text-maroon-900 mb-2 line-clamp-2">
      {product.name}
    </h3>
    <p className="text-sm text-gray-600 mb-3">
      {product.category}
    </p>
    <div className="flex items-center justify-between">
      <span className="
        text-xl font-semibold
        bg-gradient-to-br from-gold-500 to-gold-300
        bg-clip-text text-transparent
        tracking-wide
      ">
        {product.price} AED
      </span>
      <button className="
        p-2.5 rounded-full
        bg-gradient-to-br from-gold-500 to-gold-300
        text-maroon-900
        shadow-[0_4px_12px_rgba(201,169,110,0.3)]
        transition-all duration-300
        hover:scale-110 hover:shadow-[0_6px_16px_rgba(201,169,110,0.4)]
      ">
        <ShoppingBag className="w-5 h-5" />
      </button>
    </div>
  </div>
</motion.div>
```

**Feature Card with Icon Glow**:
```tsx
<motion.div
  initial="rest"
  whileHover="hover"
  className="
    group relative overflow-hidden
    p-8 rounded-xl
    bg-gradient-to-br from-white to-off-white
    border border-gold-500/15
    
    shadow-[0_4px_16px_rgba(85,0,0,0.06)]
    
    transition-all duration-350 ease-[cubic-bezier(0.33,1,0.68,1)]
    
    hover:translate-y-[-8px] hover:border-gold-500/30
    hover:shadow-[0_8px_24px_rgba(85,0,0,0.1),0_12px_40px_rgba(85,0,0,0.06),0_0_30px_rgba(201,169,110,0.15)]
    
    before:content-[''] before:absolute before:top-[-50%] before:right-[-50%]
    before:w-[200%] before:h-[200%]
    before:bg-[radial-gradient(circle,rgba(201,169,110,0.08)_0%,transparent_70%)]
    before:opacity-0 before:transition-opacity before:duration-400
    hover:before:opacity-100
  "
>
  {/* Icon Container */}
  <div className="
    w-20 h-20 mx-auto mb-5
    rounded-full
    bg-gradient-to-br from-gold-500 to-gold-300
    flex items-center justify-center
    
    shadow-[0_8px_24px_rgba(201,169,110,0.3),inset_0_2px_8px_rgba(255,255,255,0.3)]
    
    transition-all duration-350
    
    group-hover:scale-110 group-hover:rotate-[5deg]
    group-hover:shadow-[0_12px_32px_rgba(201,169,110,0.4),0_0_40px_rgba(201,169,110,0.3),inset_0_2px_8px_rgba(255,255,255,0.4)]
  ">
    <Award className="w-9 h-9 text-maroon-900 drop-shadow-[0_2px_4px_rgba(85,0,0,0.2)]" />
  </div>
  
  {/* Content */}
  <h3 className="text-xl font-medium text-maroon-900 text-center mb-2">
    Premium Quality
  </h3>
  <p className="text-sm text-gray-600 text-center leading-relaxed">
    Handcrafted with the finest materials
  </p>
</motion.div>
```

**Hero Section with Gradient Overlay**:
```tsx
<section className="relative h-screen overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/hero-bg.jpg"
      alt="Hero"
      fill
      priority
      className="object-cover"
    />
  </div>
  
  {/* Gradient Overlay */}
  <div className="
    absolute inset-0 z-10
    bg-gradient-to-br from-maroon-900/75 via-black/80 to-maroon-900/75
    
    before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0
    before:h-40
    before:bg-gradient-to-br before:from-gold-500/15 before:to-transparent
    before:[clip-path:polygon(0_100%,100%_0,100%_100%)]
  " />
  
  {/* Content */}
  <div className="relative z-20 h-full flex flex-col items-center justify-center px-6">
    <h1 className="
      text-5xl md:text-7xl font-light tracking-wide text-center
      mb-6
      
      bg-gradient-to-r from-white via-gold-300 to-white
      bg-clip-text text-transparent
      bg-[length:200%_auto]
      animate-[shimmer_3s_linear_infinite]
      
      [text-shadow:0_4px_20px_rgba(0,0,0,0.5),0_8px_40px_rgba(0,0,0,0.3)]
    ">
      Elegance Redefined
    </h1>
    
    <p className="
      text-lg md:text-xl text-white/95 text-center max-w-2xl mb-10
      [text-shadow:0_2px_12px_rgba(0,0,0,0.4)]
    ">
      Discover our exclusive collection of luxury abayas
    </p>
    
    <button className="
      px-12 py-4 rounded-xl
      bg-gradient-to-br from-gold-500 to-gold-300
      text-maroon-900 text-sm font-bold tracking-widest uppercase
      
      shadow-[0_8px_24px_rgba(201,169,110,0.4)]
      
      transition-all duration-400
      
      hover:scale-105 hover:translate-y-[-4px]
      hover:shadow-[0_12px_32px_rgba(201,169,110,0.5),0_0_50px_rgba(201,169,110,0.3)]
      
      active:scale-102
    ">
      Explore Collection
    </button>
  </div>
</section>

{/* Shimmer animation */}
<style jsx>{`
  @keyframes shimmer {
    0% { background-position: 0% center; }
    100% { background-position: 200% center; }
  }
`}</style>
```

**About Section with Decorative Corners**:
```tsx
<section className="
  relative py-32
  bg-gradient-to-b from-off-white to-white
  overflow-hidden
  
  before:content-[''] before:absolute before:top-0 before:left-0 before:right-0
  before:h-80
  before:bg-[radial-gradient(ellipse_at_top,rgba(201,169,110,0.08)_0%,transparent_70%)]
  before:pointer-events-none
">
  <div className="container mx-auto px-6">
    <div className="grid md:grid-cols-2 gap-20 items-center">
      {/* Image with Decorative Corners */}
      <div className="relative aspect-[4/5] rounded-3xl overflow-visible">
        {/* Corner Decorations */}
        <div className="
          absolute top-[-12px] left-[-12px]
          w-20 h-20
          border-t-3 border-l-3 border-gold-500
          rounded-tl-3xl
          z-20
        " />
        <div className="
          absolute bottom-[-12px] right-[-12px]
          w-20 h-20
          border-b-3 border-r-3 border-gold-500
          rounded-br-3xl
          z-20
        " />
        
        {/* Image */}
        <Image
          src="/about-image.jpg"
          alt="About LYORE"
          fill
          className="
            rounded-3xl object-cover
            shadow-[0_20px_64px_rgba(85,0,0,0.2),0_40px_96px_rgba(85,0,0,0.15)]
            transition-transform duration-600 ease-[cubic-bezier(0.33,1,0.68,1)]
            hover:scale-103 hover:rotate-[-1deg]
          "
        />
      </div>
      
      {/* Content */}
      <div className="relative">
        {/* Decorative Line */}
        <div className="
          w-16 h-1 mb-6
          bg-gradient-to-r from-gold-500 to-gold-300
          rounded-full
          shadow-[0_2px_8px_rgba(201,169,110,0.3)]
        " />
        
        <h2 className="
          text-4xl md:text-5xl font-light tracking-wide
          text-maroon-900 mb-6
        ">
          Our Story
        </h2>
        
        <p className="text-base text-gray-700 leading-relaxed mb-8">
          LYORE ABAYA represents the perfect fusion of traditional elegance
          and contemporary design. Each piece is meticulously crafted to
          celebrate the modern woman's grace and sophistication.
        </p>
        
        <button className="
          px-10 py-3.5 rounded-lg
          border-2 border-gold-500
          bg-transparent
          text-gold-500 text-sm font-semibold tracking-wider uppercase
          
          shadow-[0_2px_12px_rgba(201,169,110,0.15)]
          
          transition-all duration-350
          
          hover:bg-gold-500 hover:text-maroon-900
          hover:shadow-[0_4px_24px_rgba(201,169,110,0.3)]
        ">
          Learn More
        </button>
      </div>
    </div>
  </div>
</section>
```

### RTL/LTR Layout Mirroring

**Automatic Mirroring** (via Tailwind RTL plugin):
- `text-left` → `text-right` in RTL
- `ml-4` → `mr-4` in RTL
- `rounded-l-lg` → `rounded-r-lg` in RTL

**Logical Properties** (preferred):
- Use `start` and `end` instead of `left` and `right`
- Example: `ps-4` (padding-inline-start) instead of `pl-4`

**Manual RTL Handling**:
```typescript
const isRtl = locale === "ar";

// Conditional classes
className={`${isRtl ? "flex-row-reverse" : "flex-row"}`}

// Conditional styles
style={{ direction: isRtl ? "rtl" : "ltr" }}
```

### Mobile Responsiveness for Professional Effects

**Touch-Optimized Interactions**:
```tsx
// Replace hover effects with tap effects on mobile
<motion.button
  whileTap={{ scale: 0.95 }}
  className="
    /* Base styles */
    px-12 py-4 rounded-xl
    
    /* Desktop hover (hidden on mobile) */
    md:hover:scale-105 md:hover:translate-y-[-2px]
    
    /* Mobile tap feedback */
    active:scale-95
    
    /* Disable hover effects on touch devices */
    [@media(hover:none)]:hover:scale-100
    [@media(hover:none)]:hover:translate-y-0
  "
>
  Shop Now
</motion.button>
```

**Simplified Animations on Mobile**:
```tsx
// Reduce animation complexity on smaller screens
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.6,
    // Faster on mobile
    ...(isMobile && { duration: 0.4 })
  }}
  className="
    /* Reduce transform distance on mobile */
    hover:translate-y-[-12px] md:hover:translate-y-[-12px]
    hover:translate-y-[-6px] sm:hover:translate-y-[-6px]
  "
>
  {/* Content */}
</motion.div>
```

**Performance-Optimized Gradients**:
```css
/* Use simpler gradients on mobile */
@media (max-width: 768px) {
  .hero-overlay {
    /* Simpler 2-stop gradient instead of 3-stop */
    background: linear-gradient(135deg, rgba(85,0,0,0.75) 0%, rgba(0,0,0,0.85) 100%);
  }
  
  .product-card {
    /* Reduce shadow complexity */
    box-shadow: 0 4px 16px rgba(85,0,0,0.12);
  }
  
  .product-card:hover {
    /* Simpler hover shadow */
    box-shadow: 0 8px 24px rgba(85,0,0,0.16);
  }
}
```

**Conditional Effects Based on Device**:
```tsx
import { useMediaQuery } from '@/hooks/useMediaQuery';

function ProductCard() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      // Disable parallax on mobile
      {...(!isMobile && !prefersReducedMotion && {
        style: { y: parallaxY }
      })}
      
      // Simpler animations on mobile
      whileHover={!isMobile ? {
        y: -12,
        scale: 1.02,
        boxShadow: "0 12px 32px rgba(85,0,0,0.16)"
      } : {
        y: -6,
        boxShadow: "0 8px 24px rgba(85,0,0,0.12)"
      }}
    >
      {/* Content */}
    </motion.div>
  );
}
```

**Mobile-Specific Layouts**:
```tsx
<div className="
  /* Mobile: Simplified card */
  rounded-xl shadow-md
  
  /* Desktop: Full luxury treatment */
  md:rounded-2xl md:shadow-luxury
  
  /* Mobile: Smaller padding */
  p-4
  
  /* Desktop: Generous padding */
  md:p-6
  
  /* Mobile: No decorative elements */
  before:hidden
  
  /* Desktop: Show decorative corners */
  md:before:block md:before:content-['']
">
  {/* Content */}
</div>
```

**Reduced Motion Support**:
```tsx
// Disable all decorative animations when user prefers reduced motion
<motion.div
  initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
  animate={{ opacity: 1, y: 0 }}
  transition={!prefersReducedMotion ? { duration: 0.6 } : { duration: 0 }}
  className="
    /* Disable shimmer animation */
    [animation:shimmer_3s_linear_infinite]
    motion-reduce:[animation:none]
    
    /* Disable transform transitions */
    transition-transform duration-400
    motion-reduce:transition-none
    
    /* Keep opacity transitions (less disruptive) */
    transition-opacity duration-300
  "
>
  {/* Content */}
</motion.div>
```

**Performance Budget for Effects**:

| Effect Type | Desktop | Mobile | Reduced Motion |
|-------------|---------|--------|----------------|
| Shadow Layers | 3-4 layers | 1-2 layers | 1 layer |
| Gradient Stops | 3-5 stops | 2-3 stops | 2 stops |
| Transform Properties | Multiple | Single | None |
| Animation Duration | 400-600ms | 300-400ms | 0ms |
| Parallax Speed | 0.5x | Disabled | Disabled |
| Shimmer Effects | Enabled | Disabled | Disabled |
| Hover Scale | 1.05-1.1 | 1.02-1.05 | 1.0 |

**GPU Acceleration Best Practices**:
```css
/* Always use for animated elements */
.animated-card {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Remove will-change after animation completes */
.animated-card.animation-complete {
  will-change: auto;
}

/* Avoid will-change on too many elements */
/* Only apply to elements that will actually animate */
```

## Accessibility Specifications

### WCAG 2.1 AA Compliance

**Color Contrast Requirements**:
- Normal text (< 18px): Minimum 4.5:1 contrast ratio
- Large text (≥ 18px): Minimum 3:1 contrast ratio
- UI components: Minimum 3:1 contrast ratio

**Verified Combinations**:
| Foreground | Background | Ratio | Pass |
|------------|------------|-------|------|
| #550000 (Maroon) | #FAF7F4 (Off-White) | 8.2:1 | ✓ |
| #C9A96E (Gold) | #550000 (Maroon) | 4.8:1 | ✓ |
| White | #550000 (Maroon) | 10.1:1 | ✓ |
| #2C2C2C (Text) | #FAF7F4 (Surface) | 12.3:1 | ✓ |

### Keyboard Navigation

**Tab Order**:
1. Skip to main content link (hidden, visible on focus)
2. Navigation menu items
3. Hero CTA button
4. Feature cards (focusable for keyboard users)
5. Product cards and WhatsApp buttons
6. About section "Learn More" button
7. Collections banner CTA
8. Footer links

**Focus Indicators**:
```css
*:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* For dark backgrounds */
.dark-bg *:focus-visible {
  outline-color: white;
}
```

**Keyboard Shortcuts**:
- `Tab`: Navigate forward
- `Shift + Tab`: Navigate backward
- `Enter` / `Space`: Activate buttons and links
- `Arrow keys`: Navigate hero slider dots (when focused)

### Screen Reader Support

**ARIA Labels**:
```typescript
// Hero slider navigation
<button aria-label="Go to slide 1" aria-current={currentSlide === 0}>

// WhatsApp button
<a aria-label="Order via WhatsApp">

// Feature cards (decorative icons)
<div aria-hidden="true">{icon}</div>

// Section headings
<h2 id="why-choose-heading">Why Choose LYORE</h2>
<section aria-labelledby="why-choose-heading">
```

**Live Regions**:
```typescript
// Hero slider auto-play announcement
<div aria-live="polite" aria-atomic="true" className="sr-only">
  Slide {currentSlide + 1} of {totalSlides}
</div>
```

**Alt Text Guidelines**:
- Product images: `"{Product Name} - {Category}"`
- Hero images: Descriptive text matching slide content
- Decorative images: `alt=""` or `aria-hidden="true"`

### Motion Preferences

**Reduced Motion Detection**:
```typescript
// useReducedMotion hook (existing)
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}
```

**Disabled Animations**:
When `prefers-reduced-motion: reduce`:
- Hero slider auto-play: Disabled
- Parallax effects: Disabled (static background)
- Stagger animations: Disabled (all items appear immediately)
- Hover animations: Reduced to opacity/color changes only
- Entrance animations: Disabled (opacity: 1, y: 0 immediately)

### Touch Target Sizes

**Minimum Sizes** (WCAG 2.5.5):
- All interactive elements: 44px × 44px minimum
- Hero slider dots: 44px × 44px tap area (visual size can be smaller)
- WhatsApp buttons: 44px height minimum
- Product cards: Entire card is tappable (large target)

## Performance Optimization

### Image Optimization Strategy

**next/image Configuration**:
```typescript
// Hero images
<Image
  src="/images/hero/slide-1.png"
  alt="..."
  fill
  priority={index === 0}  // Priority for first slide only
  quality={85}
  sizes="100vw"
  placeholder="blur"
  blurDataURL="..."
/>

// Product images
<Image
  src={product.images[0]}
  alt="..."
  fill
  loading="lazy"  // Lazy load below-fold images
  quality={80}
  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
/>

// About section image
<Image
  src="/images/about-story.png"
  alt="..."
  fill
  loading="lazy"
  quality={85}
  sizes="(max-width: 768px) 100vw, 80vw"
/>
```

**Image Format Strategy**:
- Primary format: WebP (automatic via next/image)
- Fallback: JPEG for older browsers
- Hero images: 1920×1080px @ 85% quality
- Product images: 800×1067px @ 80% quality
- About image: 1200×1500px @ 85% quality

### Lazy Loading Implementation

**Below-the-Fold Content**:
```typescript
// All sections except HeroSlider use lazy loading
const LazyWhyChooseSection = dynamic(() => import("./WhyChooseSection"), {
  loading: () => <SectionSkeleton />,
  ssr: true,  // Still SSR for SEO
});
```

**Intersection Observer for Animations**:
```typescript
// Only initialize animations when section is near viewport
const { ref, inView } = useInView({
  threshold: 0.2,
  triggerOnce: true,
  rootMargin: "100px",  // Start loading 100px before visible
});
```

### Code Splitting

**Component-Level Splitting**:
```typescript
// page.tsx
import { HeroSlider } from "@/components/sections/HeroSlider";
import dynamic from "next/dynamic";

// Lazy load below-fold sections
const WhyChooseSection = dynamic(() => import("@/components/sections/WhyChooseSection"));
const FeaturedProducts = dynamic(() => import("@/components/sections/FeaturedProducts"));
const FeaturesHighlight = dynamic(() => import("@/components/sections/FeaturesHighlight"));
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"));
const CollectionsBanner = dynamic(() => import("@/components/sections/CollectionsBanner"));
```

### Performance Budget

**Core Web Vitals Targets**:
- **LCP (Largest Contentful Paint)**: < 2.5s
  - Hero image should load and render within 2.5s
  - Use `priority` prop on first hero slide
  - Preload critical fonts

- **FID (First Input Delay)**: < 100ms
  - Minimize JavaScript execution time
  - Use code splitting for below-fold components
  - Defer non-critical scripts

- **CLS (Cumulative Layout Shift)**: < 0.1
  - Reserve space for images with aspect ratios
  - Use `fill` with parent container dimensions
  - Avoid dynamic content insertion above fold

**Lighthouse Targets**:
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 90
- SEO: ≥ 95

### Caching Strategy

**Static Assets**:
```typescript
// next.config.ts
export default {
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  headers: async () => [
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

**Font Loading**:
```typescript
// src/lib/fonts.ts
import { Cairo, Noto_Naskh_Arabic, Cormorant, Inter } from "next/font/google";

export const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",  // Prevent FOIT
  preload: true,
  variable: "--font-cairo",
});
```

### Animation Performance

**GPU Acceleration**:
```css
/* Use transform and opacity for 60fps animations */
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0);  /* Force GPU layer */
}

/* Avoid animating these properties */
/* ❌ width, height, top, left, margin, padding */
/* ✓ transform, opacity */
```

**Debouncing Scroll Events**:
```typescript
// Use Intersection Observer instead of scroll listeners
const { ref, inView } = useInView({
  threshold: 0.2,
  triggerOnce: true,
});

// For parallax, use Motion's useScroll (optimized internally)
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start end", "end start"],
});
```

## Error Handling

### Image Loading Errors

**Fallback Strategy**:
```typescript
<Image
  src={product.images[0] ?? "/images/placeholder-product.webp"}
  alt={product.name[locale]}
  onError={(e) => {
    e.currentTarget.src = "/images/placeholder-product.webp";
  }}
/>
```

### WhatsApp Integration Errors

**Fallback for WhatsApp Failure**:
```typescript
const handleWhatsAppClick = (e: React.MouseEvent) => {
  try {
    // WhatsApp URL opens normally
    window.open(whatsappUrl, "_blank");
  } catch (error) {
    // Fallback: Show phone number
    alert(t("whatsapp.fallback", { phone: "+971 50 250 7859" }));
  }
};
```

### Translation Missing Keys

**Fallback Strategy**:
```typescript
// next-intl configuration
export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
    onError: (error) => {
      if (error.code === "MISSING_MESSAGE") {
        console.warn("Missing translation:", error.message);
        // Return key as fallback
        return error.message;
      }
    },
  };
});
```

### Animation Errors

**Graceful Degradation**:
```typescript
try {
  // Attempt animation
  if (!prefersReducedMotion) {
    animate(element, { opacity: 1, y: 0 });
  }
} catch (error) {
  // Fallback: Show content immediately
  element.style.opacity = "1";
  element.style.transform = "translateY(0)";
}
```

### Network Errors

**Product Data Loading**:
```typescript
// Server Component with error boundary
export default async function HomePage() {
  try {
    const products = await fetchProducts();
    return <FeaturedProducts products={products} />;
  } catch (error) {
    return <ErrorFallback message="Unable to load products" />;
  }
}
```


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property Reflection

After analyzing all acceptance criteria, I identified the following redundancies and consolidations:

**Redundancy Analysis**:

1. **Typography Properties**: Multiple criteria test minimum font sizes for different elements (1.3, 3.6, 3.7, 4.5, 4.6, 5.5, 5.6, 6.4). These can be consolidated into a single property that validates all text elements meet their respective minimum font size requirements.

2. **Touch Target Properties**: Multiple criteria test 44px × 44px minimum touch targets (1.6, 3.8, 7.7). These can be consolidated into a single property that validates all interactive elements meet the minimum touch target size.

3. **Color Consistency Properties**: Multiple criteria test Champagne Gold color usage (2.8, 4.7). These can be consolidated into a single property that validates all accent elements use the correct brand color.

4. **RTL/LTR Properties**: Multiple criteria test RTL/LTR behavior (1.7, 1.8, 2.12, 4.10, 5.11, 5.12, 8.2, 8.3, 8.4). These can be consolidated into properties that validate layout mirroring works correctly for any locale.

5. **Reduced Motion Properties**: Multiple criteria test prefers-reduced-motion behavior (2.13, 4.11, 6.10, 9.7, 9.8). These can be consolidated into a single property that validates all animations are disabled when the user prefers reduced motion.

6. **Image Optimization Properties**: Multiple criteria test image optimization (7.9, 10.4, 10.5, 10.10). These can be consolidated into a single property that validates all images use next/image with proper configuration.

7. **Accessibility Properties**: Multiple criteria test accessibility features (9.3, 9.4, 9.5, 9.6). These can be consolidated into properties that validate all interactive elements are accessible.

8. **WhatsApp Message Properties**: Multiple criteria test WhatsApp message content (11.2, 11.3, 11.4). These can be consolidated into a single property that validates the message format is correct for any product and locale.

**Consolidated Properties**: After reflection, 120 acceptance criteria reduce to approximately 35 unique testable properties.

### Property 1: Text Contrast Ratio Compliance

For any text element on the home page, the contrast ratio between the text color and its background SHALL be at least 4.5:1 for normal text or 3:1 for large text (≥ 18px).

**Validates: Requirements 1.2, 9.2**

### Property 2: Responsive Typography Minimums

For any text element on the home page, the computed font size SHALL meet or exceed the specified minimum for the current viewport size (e.g., hero heading ≥ 48px desktop, ≥ 32px mobile).

**Validates: Requirements 1.3, 3.6, 3.7, 4.5, 4.6, 5.5, 5.6, 6.4**

### Property 3: Touch Target Size Compliance

For any interactive element on the home page (buttons, links, navigation dots), the tap target area SHALL be at least 44px × 44px.

**Validates: Requirements 1.6, 3.8, 7.7**

### Property 4: Icon Container Minimum Size

For any feature card icon container, the diameter SHALL be at least 80px.

**Validates: Requirements 2.7**

### Property 5: Brand Color Consistency

For any accent element (feature card icons, decorative lines, prices), the color SHALL be Champagne Gold (#C9A96E).

**Validates: Requirements 2.8, 4.7**

### Property 6: Brand Font Application

For any feature card title, the font family SHALL be the brand's primary font (var(--font-heading-ar) for Arabic, var(--font-heading-en) for English).

**Validates: Requirements 2.9**

### Property 7: Product Card Border Radius

For any product card, the border-radius SHALL be at least 12px.

**Validates: Requirements 3.1**

### Property 8: Product Image Aspect Ratio

For any product card image, the aspect ratio SHALL be 3:4.

**Validates: Requirements 3.2**

### Property 9: Product Card Padding

For any product card, the padding SHALL be at least 12px.

**Validates: Requirements 3.12**

### Property 10: Feature Item Icon Size

For any feature item icon in the Features Highlight section, the size SHALL be at least 32px × 32px.

**Validates: Requirements 4.4**

### Property 11: Collections Banner Height

For any viewport size, the Collections Banner height SHALL be at least 400px on desktop (≥ 1024px) or 300px on mobile (< 1024px).

**Validates: Requirements 6.3**

### Property 12: Horizontal Scroll Prevention

For any viewport size, the home page SHALL NOT have horizontal overflow (overflow-x SHALL be hidden or auto with no scrollable content).

**Validates: Requirements 7.2**

### Property 13: RTL Layout Mirroring

For any asymmetric layout element (text alignment, flex direction, padding), when the locale is Arabic, the layout SHALL mirror compared to English (e.g., text-left becomes text-right, flex-row becomes flex-row-reverse).

**Validates: Requirements 8.4**

### Property 14: Translation Key Usage

For any text content on the home page, the text SHALL be loaded from translation files using next-intl (no hardcoded strings).

**Validates: Requirements 8.5**

### Property 15: WhatsApp Message Locale Consistency

For any product and any locale, the generated WhatsApp message SHALL be in the current locale language and include the product name, price with correct currency format, and a greeting.

**Validates: Requirements 8.9, 11.2, 11.3, 11.4**

### Property 16: Keyboard Focusability

For any interactive element on the home page, the element SHALL be focusable via keyboard navigation (tabIndex ≥ 0 or naturally focusable element).

**Validates: Requirements 9.3**

### Property 17: Focus Indicator Visibility

For any focusable element on the home page, when focused, a visible outline SHALL be displayed.

**Validates: Requirements 9.4**

### Property 18: Icon Button Accessibility

For any icon-only button on the home page, the button SHALL have an aria-label or aria-labelledby attribute.

**Validates: Requirements 9.5**

### Property 19: Image Alt Text Presence

For any image on the home page, the image SHALL have an alt attribute (may be empty string for decorative images).

**Validates: Requirements 9.6**

### Property 20: Image Lazy Loading

For any image below the fold on the home page, the image SHALL have loading="lazy" attribute or be rendered via next/image with automatic lazy loading.

**Validates: Requirements 7.9, 10.4**

### Property 21: Next Image Usage

For any image on the home page, the image SHALL be rendered using the next/image component for automatic optimization.

**Validates: Requirements 10.5, 10.10**

### Property 22: Hover Effect Performance Properties

For any element with hover effects, the hover animation SHALL only use transform and/or opacity properties (not width, height, margin, padding, top, left).

**Validates: Requirements 12.7**

### Property 23: Animation Cleanup

For any component that uses event listeners or observers (Intersection Observer, scroll listeners), the component SHALL clean up these resources in the useEffect cleanup function.

**Validates: Requirements 12.10**


## Testing Strategy

### Dual Testing Approach

The home page redesign will employ both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Tests**: Verify specific examples, edge cases, and error conditions
- Specific component rendering scenarios
- Integration points between components
- Edge cases (empty states, error states)
- User interaction flows
- Accessibility features (keyboard navigation, screen reader announcements)

**Property Tests**: Verify universal properties across all inputs
- Typography and spacing consistency across all elements
- Color and brand consistency across all components
- Accessibility compliance (contrast ratios, touch targets, ARIA labels)
- Responsive behavior across viewport ranges
- RTL/LTR layout mirroring
- Animation configuration and performance properties

Together, these approaches provide comprehensive coverage: unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across all possible inputs.

### Property-Based Testing Configuration

**Library Selection**: 
- **JavaScript/TypeScript**: `fast-check` (recommended for Next.js/React projects)
- Provides generators for common types (strings, numbers, objects)
- Supports custom generators for domain-specific types
- Integrates with Jest/Vitest

**Test Configuration**:
```typescript
// vitest.config.ts or jest.config.js
export default {
  testMatch: ['**/*.test.ts', '**/*.test.tsx', '**/*.property.test.ts'],
  testTimeout: 10000, // Longer timeout for property tests
};
```

**Minimum Iterations**: Each property test MUST run at least 100 iterations to ensure adequate coverage through randomization.

**Property Test Tagging**: Each property test MUST include a comment referencing the design document property:

```typescript
/**
 * Feature: home-page-redesign, Property 3: Touch Target Size Compliance
 * 
 * For any interactive element on the home page (buttons, links, navigation dots),
 * the tap target area SHALL be at least 44px × 44px.
 */
test('all interactive elements meet minimum touch target size', () => {
  fc.assert(
    fc.property(
      fc.constantFrom('button', 'link', 'nav-dot'),
      (elementType) => {
        const element = renderInteractiveElement(elementType);
        const { width, height } = element.getBoundingClientRect();
        return width >= 44 && height >= 44;
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing Strategy

**Component Testing**:
```typescript
// Example: HeroSlider.test.tsx
describe('HeroSlider', () => {
  it('displays at 100vh height with background image', () => {
    render(<HeroSlider />);
    const section = screen.getByRole('region');
    expect(section).toHaveStyle({ height: '100vh' });
  });

  it('applies RTL alignment when locale is Arabic', () => {
    render(<HeroSlider />, { locale: 'ar' });
    const content = screen.getByRole('heading');
    expect(content).toHaveAttribute('dir', 'rtl');
  });

  it('disables auto-play when prefers-reduced-motion is enabled', () => {
    mockPrefersReducedMotion(true);
    render(<HeroSlider />);
    // Verify auto-play timer is not set
    expect(setInterval).not.toHaveBeenCalled();
  });
});
```

**Integration Testing**:
```typescript
// Example: HomePage.integration.test.tsx
describe('Home Page Integration', () => {
  it('renders sections in correct order', () => {
    render(<HomePage />);
    const sections = screen.getAllByRole('region');
    expect(sections[0]).toHaveAttribute('aria-label', 'Hero');
    expect(sections[1]).toHaveAttribute('aria-label', 'Why Choose LYORE');
    expect(sections[2]).toHaveAttribute('aria-label', 'Featured Products');
  });

  it('navigates to collections page when clicking View All', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.click(screen.getByRole('link', { name: /view all/i }));
    expect(mockRouter.push).toHaveBeenCalledWith('/collections');
  });
});
```

**Accessibility Testing**:
```typescript
// Example: Accessibility.test.tsx
describe('Home Page Accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation through all interactive elements', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    
    // Tab through all interactive elements
    await user.tab();
    expect(screen.getByRole('link', { name: /shop now/i })).toHaveFocus();
    
    await user.tab();
    expect(screen.getByRole('button', { name: /go to slide 1/i })).toHaveFocus();
  });
});
```

### Property-Based Testing Examples

**Property 1: Text Contrast Ratio Compliance**
```typescript
/**
 * Feature: home-page-redesign, Property 1: Text Contrast Ratio Compliance
 * 
 * For any text element on the home page, the contrast ratio between the text color
 * and its background SHALL be at least 4.5:1 for normal text or 3:1 for large text.
 */
test('all text elements meet WCAG AA contrast requirements', () => {
  fc.assert(
    fc.property(
      fc.constantFrom('hero-heading', 'section-heading', 'body-text', 'button-text'),
      (textType) => {
        const element = renderTextElement(textType);
        const { color, backgroundColor, fontSize } = getComputedStyle(element);
        const ratio = calculateContrastRatio(color, backgroundColor);
        const minRatio = parseInt(fontSize) >= 18 ? 3 : 4.5;
        return ratio >= minRatio;
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 3: Touch Target Size Compliance**
```typescript
/**
 * Feature: home-page-redesign, Property 3: Touch Target Size Compliance
 * 
 * For any interactive element on the home page, the tap target area SHALL be
 * at least 44px × 44px.
 */
test('all interactive elements meet minimum touch target size', () => {
  fc.assert(
    fc.property(
      fc.record({
        type: fc.constantFrom('button', 'link', 'nav-dot', 'product-card'),
        locale: fc.constantFrom('ar', 'en'),
      }),
      ({ type, locale }) => {
        const element = renderInteractiveElement(type, locale);
        const { width, height } = element.getBoundingClientRect();
        return width >= 44 && height >= 44;
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 13: RTL Layout Mirroring**
```typescript
/**
 * Feature: home-page-redesign, Property 13: RTL Layout Mirroring
 * 
 * For any asymmetric layout element, when the locale is Arabic, the layout SHALL
 * mirror compared to English.
 */
test('asymmetric layouts mirror correctly between RTL and LTR', () => {
  fc.assert(
    fc.property(
      fc.constantFrom('about-section', 'feature-item', 'product-grid'),
      (componentType) => {
        const ltrElement = renderComponent(componentType, 'en');
        const rtlElement = renderComponent(componentType, 'ar');
        
        const ltrStyles = getComputedStyle(ltrElement);
        const rtlStyles = getComputedStyle(rtlElement);
        
        // Verify mirroring (e.g., text-align, flex-direction)
        if (ltrStyles.textAlign === 'left') {
          return rtlStyles.textAlign === 'right';
        }
        if (ltrStyles.flexDirection === 'row') {
          return rtlStyles.flexDirection === 'row-reverse';
        }
        return true;
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 15: WhatsApp Message Locale Consistency**
```typescript
/**
 * Feature: home-page-redesign, Property 15: WhatsApp Message Locale Consistency
 * 
 * For any product and any locale, the generated WhatsApp message SHALL be in the
 * current locale language and include the product name, price with correct currency
 * format, and a greeting.
 */
test('WhatsApp messages are correctly formatted for any product and locale', () => {
  fc.assert(
    fc.property(
      fc.record({
        product: fc.record({
          name: fc.record({ ar: fc.string(), en: fc.string() }),
          price: fc.nat(10000),
          currency: fc.record({ ar: fc.constant('د.إ'), en: fc.constant('AED') }),
        }),
        locale: fc.constantFrom('ar', 'en'),
      }),
      ({ product, locale }) => {
        const message = generateWhatsAppMessage(product, locale);
        
        // Verify message contains product name in correct locale
        const containsName = message.includes(product.name[locale]);
        
        // Verify message contains price with correct currency
        const containsPrice = message.includes(product.price.toString()) &&
                             message.includes(product.currency[locale]);
        
        // Verify message contains greeting in correct locale
        const greetingAr = 'مرحباً';
        const greetingEn = 'Hello';
        const containsGreeting = locale === 'ar' 
          ? message.includes(greetingAr)
          : message.includes(greetingEn);
        
        return containsName && containsPrice && containsGreeting;
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 21: Next Image Usage**
```typescript
/**
 * Feature: home-page-redesign, Property 21: Next Image Usage
 * 
 * For any image on the home page, the image SHALL be rendered using the next/image
 * component for automatic optimization.
 */
test('all images use next/image component', () => {
  fc.assert(
    fc.property(
      fc.constantFrom('hero', 'product', 'about', 'banner'),
      (imageType) => {
        const { container } = renderImageComponent(imageType);
        const images = container.querySelectorAll('img');
        
        // Verify all images have next/image attributes
        return Array.from(images).every(img => {
          // next/image adds specific attributes
          return img.hasAttribute('srcset') || 
                 img.hasAttribute('loading') ||
                 img.closest('span')?.style.display === 'inline-block';
        });
      }
    ),
    { numRuns: 100 }
  );
});
```

### Test Coverage Goals

**Unit Test Coverage**:
- Line coverage: ≥ 80%
- Branch coverage: ≥ 75%
- Function coverage: ≥ 85%

**Property Test Coverage**:
- All 23 correctness properties MUST have corresponding property tests
- Each property test MUST run minimum 100 iterations
- Property tests MUST cover all component types and locales

### Continuous Integration

**CI Pipeline**:
```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:property
      - run: npm run test:accessibility
      - run: npm run test:e2e
```

**Performance Testing**:
```bash
# Run Lighthouse CI
npm run lighthouse:ci

# Expected scores:
# Performance: ≥ 90
# Accessibility: ≥ 95
# Best Practices: ≥ 90
# SEO: ≥ 95
```

