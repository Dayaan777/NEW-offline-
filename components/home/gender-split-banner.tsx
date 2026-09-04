'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const sides = [
  {
    label: 'MEN',
    href: '/collections/men',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_40eds040eds040ed-E60vOuys9wb5jI2jvob1ku2of1dMnV.jpg',
    position: 'object-center',
  },
  {
    label: 'WOMEN',
    href: '/collections/women',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_gsg2udgsg2udgsg200-JPHDQ9QfHSYSjn6PQ8N0J6jDzRONBb.jpg',
    position: 'object-center',
  },
]

export function GenderSplitBanner() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section aria-label="Shop by category" className="grid grid-cols-1 gap-1 bg-background md:grid-cols-2">
      {sides.map((side, index) => (
        <Link
          key={side.label}
          href={side.href}
          className="group relative block aspect-[4/5] overflow-hidden bg-muted md:aspect-[3/4]"
          onMouseEnter={() => setActive(index)}
          onMouseLeave={() => setActive(null)}
        >
          <Image
            src={side.image}
            alt={`${side.label} collection`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover transition duration-700 ease-out ${side.position} ${active !== null && active !== index ? 'scale-100 grayscale opacity-60' : 'scale-100 group-hover:scale-105'}`}
          />
          <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <span className="mb-3 text-[0.65rem] font-medium tracking-[0.3em]">SHOP THE COLLECTION</span>
            <span className="text-4xl font-light tracking-[-0.04em] md:text-6xl">{side.label}</span>
            <span className="mt-6 border-b border-white/80 pb-1 text-[0.7rem] font-medium tracking-[0.22em]">EXPLORE</span>
          </div>
        </Link>
      ))}
    </section>
  )
}
