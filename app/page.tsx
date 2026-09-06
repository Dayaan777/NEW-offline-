import { HomeHero } from '@/components/home/hero'
import { FeaturedProductsSection } from '@/components/home/featured-products-section'
import { CategoryTileGrid } from '@/components/home/category-tile-grid'
import { GenderSplitBanner } from '@/components/home/gender-split-banner'

export default function HomePage() {
  return (
    <main className="flex flex-col gap-16 md:gap-24">
      <HomeHero />
      <CategoryTileGrid />
      <GenderSplitBanner />
      <FeaturedProductsSection />
    </main>
  )
}
