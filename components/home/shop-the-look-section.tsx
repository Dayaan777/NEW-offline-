'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const hotspots = [
  { id: 'blazer', label: 'Shop the Margin blazer', product: 'margin', x: '34%', y: '40%' },
  { id: 'trouser', label: 'Shop the Farrow trouser', product: 'farrow', x: '38%', y: '73%' },
  { id: 'knit', label: 'Shop the Croft knit', product: 'croft', x: '69%', y: '37%' },
  { id: 'shoe', label: 'Shop the Weld shoe', product: 'weld', x: '73%', y: '82%' },
]

export function ShopTheLookSection() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section aria-labelledby="shop-the-look-title" className="bg-background px-5 py-16 md:px-10 md:py-24 lg:px-16 lg:py-32">
      <div className="mb-8 flex items-end justify-between gap-6 md:mb-12">
        <div>
          <p className="mb-3 text-[0.65rem] font-medium tracking-[0.28em] text-muted-foreground">EDITORIAL / 01</p>
          <h2 id="shop-the-look-title" className="text-3xl font-light tracking-[-0.04em] md:text-5xl">Shop the Look</h2>
        </div>
        <p className="hidden max-w-xs text-right text-sm leading-6 text-muted-foreground md:block">Tap a marker to explore the pieces in this edit.</p>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src="/images/shop-the-look-placeholder.png"
          alt="Editorial styling with tailored navy and ivory looks"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
        {hotspots.map((hotspot) => (
          <Link
            key={hotspot.id}
            href={`/products/${hotspot.product}`}
            aria-label={hotspot.label}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: hotspot.x, top: hotspot.y }}
            onMouseEnter={() => setActive(hotspot.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(hotspot.id)}
            onBlur={() => setActive(null)}
          >
            <span className="flex size-7 items-center justify-center rounded-full border border-white/90 bg-black/25 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110">
              <span className="size-2 rounded-full bg-white" />
            </span>
            <span className={`pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 whitespace-nowrap bg-background px-3 py-2 text-[0.62rem] font-medium tracking-[0.16em] text-foreground shadow-sm transition-opacity duration-200 ${active === hotspot.id ? 'opacity-100' : 'opacity-0'}`}>
              VIEW PIECE
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

// Temporary asset note: replace /images/shop-the-look-placeholder.png with final photography later.
export const shopTheLookImageNote = 'Temporary generated editorial asset'
void shopTheLookImageNote
