import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ProductInfo } from '@/components/sections/ProductInfo';
import { ProductImageGallery } from '@/components/sections/ProductImageGallery';
import { RelatedProducts } from '@/components/sections/RelatedProducts';

interface Props {
    params: Promise<{ slug: string; locale: "ar" | "en" }>;
}

// Generate static routes for all products at build time (T010 / SSG)
export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

// Generate unique SEO metadata for each product page (T010)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const product = products.find(p => p.slug === slug);

    if (!product) {
        return {
            title: 'Product Not Found | LYORE ABAYA',
        };
    }

    return {
        title: `${product.name[locale]} | LYORE ABAYA`,
        description: product.description[locale],
        openGraph: {
            title: product.name[locale],
            description: product.description[locale],
            images: [product.images[0] ?? '/images/placeholder-product.svg'],
            type: 'website',
            siteName: 'LYORE ABAYA',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name[locale],
            description: product.description[locale],
            images: [product.images[0] ?? '/images/placeholder-product.svg'],
        }
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const { slug, locale } = await params;
    const product = products.find(p => p.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-7xl px-4 md:px-8 pt-32 pb-24 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                {/* Left Column (LTR) / Right Column (RTL): Image Gallery */}
                <div className="w-full flex items-start justify-center">
                    <ProductImageGallery
                        images={product.images}
                        productName={product.name[locale]}
                    />
                </div>

                {/* Right Column (LTR) / Left Column (RTL): Product Details (T012) */}
                <div className="flex flex-col h-full lg:py-6">
                    <ProductInfo product={product} locale={locale} />
                </div>

            </div>

            {/* Related Products (T028 / US6) */}
            <RelatedProducts
                currentProduct={product}
                allProducts={products}
                locale={locale}
            />
        </main>
    );
}
