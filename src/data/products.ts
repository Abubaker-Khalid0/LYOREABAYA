/**
 * Bilingual text field supporting Arabic and English.
 */
export interface BilingualText {
    ar: string;
    en: string;
}

/**
 * Product color option with display name and hex value.
 */
export interface ProductColor {
    name: string;
    hex: string;
}

/**
 * Product interface — defines the shape of all product data.
 * Populated in Phase 2; this Phase 1 placeholder defines the type only.
 */
export interface Product {
    /** Unique product identifier */
    id: string;
    /** URL-friendly identifier for routing `/products/[slug]` */
    slug: string;
    /** Bilingual product name */
    name: BilingualText;
    /** Bilingual product description */
    description: BilingualText;
    /** Price in AED (numeric) */
    price: number;
    /** Currency display label (e.g., "د.إ" / "AED") */
    currency: BilingualText;
    /** Bilingual category name */
    category: BilingualText;
    /** Available sizes (e.g., ["S", "M", "L", "XL", "XXL"]) */
    sizes: string[];
    /** Available colors with display name and hex code */
    colors: ProductColor[];
    /** Array of image paths (portrait 3:4 aspect ratio) */
    images: string[];
    /** Whether product appears in featured section */
    featured: boolean;
    /** Pre-filled WhatsApp message template */
    whatsappMessage: BilingualText;
}

/**
 * Product data array — empty placeholder for Phase 1.
 * Will be populated with actual product data in Phase 2.
 */
export const products: Product[] = [];
