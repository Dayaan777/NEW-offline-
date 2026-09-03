import { HomeHero } from '@/components/home/hero'
import { ContextsSection } from '@/components/home/contexts-section'
import { FeaturedProductsSection } from '@/components/home/featured-products-section'
import { MaterialsSection } from '@/components/home/materials-section'
import { EditorialSection } from '@/components/home/editorial-section'
import { FinalCtaSection } from '@/components/home/final-cta-section'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeaturedProductsSection />
      <ContextsSection />
      <MaterialsSection />
      <EditorialSection />
      <FinalCtaSection />
    </>
  )
}
