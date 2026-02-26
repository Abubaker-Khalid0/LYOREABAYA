/**
 * Product utility functions.
 * Provides related product matching with multi-tier fallback algorithm.
 */

import type { Product } from "@/data/products";

/**
 * Returns up to `count` related products for a given product using
 * a multi-tier fallback algorithm:
 *
 * 1. Same category (excluding current product)
 * 2. Matching collectionTags
 * 3. Featured products
 * 4. Newest products (by array position — last items are newest)
 *
 * The current product is always filtered out.
 *
 * @param currentProduct  The product being viewed
 * @param allProducts     Full product catalog
 * @param count           Maximum number of related products (default: 3)
 */
export function getRelatedProducts(
    currentProduct: Product,
    allProducts: Product[],
    count: number = 3,
): Product[] {
    // Filter out the current product once
    const candidates = allProducts.filter((p) => p.id !== currentProduct.id);

    // Collect related products (avoiding duplicates)
    const related: Product[] = [];
    const addedIds = new Set<string>();

    const addProduct = (product: Product): boolean => {
        if (addedIds.has(product.id) || related.length >= count) return false;
        addedIds.add(product.id);
        related.push(product);
        return true;
    };

    // Tier 1: Same category
    const currentCategoryEn = currentProduct.category.en.toLowerCase();
    const sameCategoryProducts = candidates.filter(
        (p) => p.category.en.toLowerCase() === currentCategoryEn,
    );
    for (const product of sameCategoryProducts) {
        if (related.length >= count) break;
        addProduct(product);
    }

    // Tier 2: Matching collectionTags
    if (related.length < count && currentProduct.collectionTags?.length) {
        const currentTags = new Set(
            currentProduct.collectionTags.map((t) => t.toLowerCase()),
        );

        // Score candidates by number of matching tags (more matches = higher priority)
        const taggedCandidates = candidates
            .filter((p) => p.collectionTags?.length)
            .map((p) => ({
                product: p,
                matchCount: p.collectionTags!.filter((t) =>
                    currentTags.has(t.toLowerCase()),
                ).length,
            }))
            .filter((entry) => entry.matchCount > 0)
            .sort((a, b) => b.matchCount - a.matchCount);

        for (const { product } of taggedCandidates) {
            if (related.length >= count) break;
            addProduct(product);
        }
    }

    // Tier 3: Featured products
    if (related.length < count) {
        const featuredProducts = candidates.filter((p) => p.featured);
        for (const product of featuredProducts) {
            if (related.length >= count) break;
            addProduct(product);
        }
    }

    // Tier 4: Newest products (last items in array are assumed newest)
    if (related.length < count) {
        const newestFirst = [...candidates].reverse();
        for (const product of newestFirst) {
            if (related.length >= count) break;
            addProduct(product);
        }
    }

    return related;
}
