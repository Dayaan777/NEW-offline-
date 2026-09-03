'use client'

import Image from 'next/image'

export function HomeHero() {
  return (
    <section aria-label="Campaign hero" className="relative aspect-[3/2] max-h-[760px] w-full overflow-hidden bg-[var(--color-bg-inverse)]">
      <Image
        src="/images/offline-hero-latest.png"
        alt="Black and red folded fabric in dramatic light"
        fill
        priority
        className="object-cover object-[center_68%] md:object-[center_62%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/5" aria-hidden="true" />
    </section>
  )
}
