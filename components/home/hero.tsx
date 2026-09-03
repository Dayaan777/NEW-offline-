'use client'

import Image from 'next/image'

export function HomeHero() {
  return (
    <section aria-label="Campaign hero" className="relative aspect-[2/3] w-full overflow-hidden bg-[var(--color-bg-inverse)] md:aspect-[3/2] md:min-h-0 md:max-h-[760px]">
      <picture>
        <source media="(max-width: 767px)" srcSet="/images/mobile-anniversary-banner.jpg" />
        <source media="(min-width: 768px)" srcSet="/images/desktop-hero-fitted-elegance.jpg" />
        <Image
          src="/images/offline-hero-latest.png"
          alt="A man and woman in navy tailored suits facing each other, with the text 'A New Era of Fitted Elegance'"
          fill
          priority
          className="object-fill md:object-cover md:object-[center_50%]"
          sizes="100vw"
        />
      </picture>
      <div className="absolute inset-0 bg-black/5" aria-hidden="true" />
    </section>
  )
}
