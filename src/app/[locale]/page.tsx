import { HeroSlider } from "@/components/sections/HeroSlider";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { AboutSection } from "@/components/sections/AboutSection";
import { CollectionsBanner } from "@/components/sections/CollectionsBanner";

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-lyore-background text-lyore-text">
            <HeroSlider />
            <FeaturedProducts />
            <AboutSection />
            <CollectionsBanner />
        </main>
    );
}
