'use client'

import Image from 'next/image'

export function HomeHero() {
  return (
    <section aria-label="Campaign hero" className="relative aspect-[10/11] w-full overflow-hidden bg-[var(--color-bg-inverse)] md:aspect-[3/2] md:min-h-0 md:max-h-[760px]">
      <Image
        src="/images/offline-hero-latest.png"
        alt="Black and red folded fabric in dramatic light"
        fill
        priority
        className="object-fill md:object-cover md:object-[center_62%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/5" aria-hidden="true" />
    </section>
  )
}
