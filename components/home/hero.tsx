'use client'

import Image from 'next/image'
import { MobileHeroCarousel } from '@/components/home/mobile-hero-carousel'

export function HomeHero() {
  return (
    <section aria-label="Campaign hero" className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-bg-inverse)] md:aspect-[3/2] md:min-h-0 md:max-h-[760px]">
      <div className="absolute inset-0 md:hidden">
        <MobileHeroCarousel />
      </div>
      <picture className="hidden md:block">
        <source media="(min-width: 768px)" srcSet="/images/desktop-hero-fitted-elegance.jpg" />
        <Image
          src="/images/desktop-hero-fitted-elegance.jpg"
          alt="A man and woman in navy tailored suits facing each other, with the text 'A New Era of Fitted Elegance'"
          fill
          priority
          className="object-cover object-[center_50%]"
          sizes="100vw"
        />
      </picture>
      <div className="absolute inset-0 bg-black/5 md:block" aria-hidden="true" />
    </section>
  )
}
