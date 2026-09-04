'use client'

import { DesktopHeroCarousel } from '@/components/home/desktop-hero-carousel'
import { MobileHeroCarousel } from '@/components/home/mobile-hero-carousel'

export function HomeHero() {
  return (
    <section aria-label="Campaign hero" className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-bg-inverse)] md:aspect-[3/2] md:min-h-0 md:max-h-[760px]">
      <div className="absolute inset-0 md:hidden">
        <MobileHeroCarousel />
      </div>
      <div className="absolute inset-0 hidden md:block">
        <DesktopHeroCarousel />
      </div>
      <div className="absolute inset-0 bg-black/5 md:block" aria-hidden="true" />
    </section>
  )
}
