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
 * Product data — single source of truth for all products.
 * 6 products: 3 Winter (شتوي) + 3 Summer (صيفي).
 */
export const products: Product[] = [
    // ─── Winter Collection (شتوي) ───────────────────────────────
    {
        id: "prod-001",
        slug: "winter-elegance-abaya",
        name: {
            ar: "عباية الأناقة الشتوية",
            en: "Winter Elegance Abaya",
        },
        description: {
            ar: "عباية فاخرة من قماش الكريب الثقيل بتطريز يدوي ذهبي على الأكمام والحواف، مثالية للمناسبات الشتوية الراقية.",
            en: "A luxurious heavy crepe abaya with hand-embroidered gold detailing on the sleeves and hems, perfect for elegant winter occasions.",
        },
        price: 780,
        currency: { ar: "د.إ", en: "AED" },
        category: { ar: "شتوي", en: "Winter" },
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Black", hex: "#000000" },
            { name: "Dark Navy", hex: "#1B1F3B" },
        ],
        images: [
            "https://images.unsplash.com/photo-1590075865003-e48277faa558?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=600&h=800&fit=crop",
        ],
        featured: true,
        whatsappMessage: {
            ar: "مرحباً، أرغب بطلب عباية الأناقة الشتوية",
            en: "Hello, I'd like to order the Winter Elegance Abaya",
        },
    },
    {
        id: "prod-002",
        slug: "winter-velvet-abaya",
        name: {
            ar: "عباية المخمل الشتوية",
            en: "Winter Velvet Abaya",
        },
        description: {
            ar: "عباية من المخمل الفاخر بقصة واسعة وأكمام مزخرفة بأحجار كريستال، تمنحك دفئاً وأناقة في الأمسيات الباردة.",
            en: "A premium velvet abaya with a flowing cut and crystal-embellished sleeves, offering warmth and sophistication for cool evenings.",
        },
        price: 890,
        currency: { ar: "د.إ", en: "AED" },
        category: { ar: "شتوي", en: "Winter" },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Burgundy", hex: "#800020" },
            { name: "Black", hex: "#000000" },
            { name: "Forest Green", hex: "#228B22" },
        ],
        images: [
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1581044777550-4cfa60707998?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1590075865003-e48277faa558?w=600&h=800&fit=crop",
        ],
        featured: false,
        whatsappMessage: {
            ar: "مرحباً، أرغب بطلب عباية المخمل الشتوية",
            en: "Hello, I'd like to order the Winter Velvet Abaya",
        },
    },
    {
        id: "prod-003",
        slug: "winter-wool-abaya",
        name: {
            ar: "عباية الصوف الفاخرة",
            en: "Luxury Wool Abaya",
        },
        description: {
            ar: "عباية من مزيج الصوف والكشمير بتصميم عصري وحزام ذهبي قابل للفصل، مثالية للإطلالات اليومية الأنيقة في الشتاء.",
            en: "A wool-cashmere blend abaya with a modern silhouette and detachable gold belt, ideal for chic everyday winter looks.",
        },
        price: 650,
        currency: { ar: "د.إ", en: "AED" },
        category: { ar: "شتوي", en: "Winter" },
        sizes: ["M", "L", "XL"],
        colors: [
            { name: "Charcoal", hex: "#36454F" },
            { name: "Camel", hex: "#C19A6B" },
        ],
        images: [
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop",
        ],
        featured: true,
        whatsappMessage: {
            ar: "مرحباً، أرغب بطلب عباية الصوف الفاخرة",
            en: "Hello, I'd like to order the Luxury Wool Abaya",
        },
    },

    // ─── Summer Collection (صيفي) ───────────────────────────────
    {
        id: "prod-004",
        slug: "summer-breeze-abaya",
        name: {
            ar: "عباية نسيم الصيف",
            en: "Summer Breeze Abaya",
        },
        description: {
            ar: "عباية خفيفة من الشيفون المطرز بزهور ناعمة، مصممة لتمنحك راحة وأناقة في أيام الصيف الحارة.",
            en: "A lightweight chiffon abaya with delicate floral embroidery, designed for comfort and grace on warm summer days.",
        },
        price: 450,
        currency: { ar: "د.إ", en: "AED" },
        category: { ar: "صيفي", en: "Summer" },
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Blush Pink", hex: "#F2D2D5" },
            { name: "White", hex: "#FFFFFF" },
            { name: "Lavender", hex: "#E6E6FA" },
        ],
        images: [
            "https://images.unsplash.com/photo-1581044777550-4cfa60707998?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1590075865003-e48277faa558?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop",
        ],
        featured: true,
        whatsappMessage: {
            ar: "مرحباً، أرغب بطلب عباية نسيم الصيف",
            en: "Hello, I'd like to order the Summer Breeze Abaya",
        },
    },
    {
        id: "prod-005",
        slug: "summer-linen-abaya",
        name: {
            ar: "عباية الكتان الصيفية",
            en: "Summer Linen Abaya",
        },
        description: {
            ar: "عباية من الكتان الطبيعي الفاخر بقصة مستقيمة وأزرار لؤلؤية على الأمام، تجمع بين البساطة والرقي.",
            en: "A premium natural linen abaya with a straight cut and pearl button front, blending simplicity with refinement.",
        },
        price: 520,
        currency: { ar: "د.إ", en: "AED" },
        category: { ar: "صيفي", en: "Summer" },
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Sand", hex: "#C2B280" },
            { name: "Ivory", hex: "#FFFFF0" },
        ],
        images: [
            "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1581044777550-4cfa60707998?w=600&h=800&fit=crop",
        ],
        featured: false,
        whatsappMessage: {
            ar: "مرحباً، أرغب بطلب عباية الكتان الصيفية",
            en: "Hello, I'd like to order the Summer Linen Abaya",
        },
    },
    {
        id: "prod-006",
        slug: "summer-silk-abaya",
        name: {
            ar: "عباية الحرير الصيفية",
            en: "Summer Silk Abaya",
        },
        description: {
            ar: "عباية من الحرير الطبيعي بلمسة لامعة وتفاصيل دانتيل على الياقة والأساور، لإطلالة صيفية ساحرة.",
            en: "A natural silk abaya with a lustrous finish and lace detailing on the collar and cuffs, for an enchanting summer look.",
        },
        price: 720,
        currency: { ar: "د.إ", en: "AED" },
        category: { ar: "صيفي", en: "Summer" },
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Champagne", hex: "#F7E7CE" },
            { name: "Black", hex: "#000000" },
            { name: "Dusty Rose", hex: "#DCAE96" },
        ],
        images: [
            "https://images.unsplash.com/photo-1590075865003-e48277faa558?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=600&h=800&fit=crop",
        ],
        featured: true,
        whatsappMessage: {
            ar: "مرحباً، أرغب بطلب عباية الحرير الصيفية",
            en: "Hello, I'd like to order the Summer Silk Abaya",
        },
    },
];
