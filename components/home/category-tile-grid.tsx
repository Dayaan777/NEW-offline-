'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CategoryTile {
  name: string
  image: string
  href: string
}

const categories: CategoryTile[] = [
  {
    name: 'T-SHIRTS',
    image: '/images/categories/tshirts.png',
    href: '/collections/t-shirts',
  },
  {
    name: 'POLO',
    image: '/images/categories/polo.png',
    href: '/collections/polo',
  },
  {
    name: 'JERSEY',
    image: '/images/categories/jersey.png',
    href: '/collections/jersey',
  },
  {
    name: 'SHIRTS',
    image: '/images/categories/shirts.png',
    href: '/collections/shirts',
  },
  {
    name: 'HOODIE',
    image: '/images/categories/hoodie.png',
    href: '/collections/hoodie',
  },
  {
    name: 'PANTS',
    image: '/images/categories/trousers.png',
    href: '/collections/trousers',
  },
]

export function CategoryTileGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="w-full border-t-4 border-white bg-background py-10 md:py-14">
      <div className="w-full">
        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6 md:gap-3"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {categories.map((category, index) => {
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index

            return (
              <Link
                key={category.name}
                href={category.href}
                className="group relative block aspect-[3/4] w-full overflow-hidden bg-muted"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <Image
                  src={category.image || '/placeholder.svg'}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 17vw"
                  className={`object-cover transition-all duration-500 ease-out ${
                    isDimmed
                      ? 'scale-100 opacity-50 blur-[1px] grayscale-[0.3]'
                      : 'opacity-100'
                  } ${hoveredIndex === index ? 'scale-105' : ''}`}
                />
                <div
                  className={`absolute inset-0 bg-black/10 transition-colors duration-500 ${
                    hoveredIndex === index ? 'bg-black/20' : ''
                  }`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`px-2 text-center text-sm font-bold tracking-wide text-white drop-shadow-sm transition-opacity duration-500 md:text-base ${
                      isDimmed ? 'opacity-60' : 'opacity-100'
                    }`}
                  >
                    {category.name}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
