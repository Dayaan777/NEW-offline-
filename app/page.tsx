import { HomeHero } from '@/components/home/hero'
import { ContextsSection } from '@/components/home/contexts-section'
import { FeaturedProductsSection } from '@/components/home/featured-products-section'
import { MaterialsSection } from '@/components/home/materials-section'
import { EditorialSection } from '@/components/home/editorial-section'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { CategoryTileGrid } from '@/components/home/category-tile-grid'
import { GenderSplitBanner } from '@/components/home/gender-split-banner'

export default function HomePage() {
  return (
    <main className="flex flex-col gap-16 md:gap-24">
      <HomeHero />
      <CategoryTileGrid />
      <GenderSplitBanner />
      <FeaturedProductsSection />
      <ContextsSection />
      <MaterialsSection />
      <EditorialSection />
      <FinalCtaSection />
    </main>
  )
}
