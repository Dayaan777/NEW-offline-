'use client'

import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/lib/data/products'
import { useState } from 'react'
import { useWishlist } from '@/context/wishlist-context'
import type { Product, WishlistItem } from '@/lib/types'

const FEATURED = ['margin', 'farrow', 'croft', 'weld']
const imageFor = (slug: string) => `/images/products/${slug}/featured.png`

export function FeaturedProductsSection() {
  const { isSaved, toggleItem } = useWishlist()
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({})
  const featured = FEATURED.map((slug) => products.find((product) => product.slug === slug)).filter((product): product is Product => Boolean(product))

  return (
    <section aria-labelledby="featured-products-heading" className="bg-[var(--color-bg-primary)]">
      <div className="container py-16 md:py-24">
        <header className="mx-auto mb-12 max-w-xl text-center md:mb-16">
          <h2 id="featured-products-heading" className="text-[1.65rem] font-light tracking-[-0.02em] text-[var(--color-text-primary)] md:text-[2.15rem]">Featured Collection</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--color-text-secondary)]">Essential silhouettes selected for everyday movement.</p>
          <Link href="/shop" className="mt-6 inline-flex border border-[var(--color-border-default)] px-5 py-3 text-[0.65rem] font-medium tracking-[0.24em] text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)]">VIEW ALL</Link>
        </header>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
          {featured.map((product) => {
            const variant = product.variants[0]
            const href = `/shop/${product.category}/${product.slug}`
            const saved = isSaved(product.id, variant.id)
            const item: WishlistItem = { productId: product.id, variantId: variant.id, addedAt: new Date().toISOString(), name: product.name, price: product.price, colorLabel: variant.colorLabel, image: variant.images[0], slug: product.slug, category: product.category }
            const availableSizes = variant.sizes.filter((size) => size.available).slice(0, 5)
            return (
              <article key={product.id} className="group min-w-0">
                <div className="relative">
                  <Link href={href} className="relative block aspect-[4/5] overflow-hidden bg-[var(--color-bg-tertiary)]" aria-label={`View ${product.name}`}>
                    <Image src={imageFor(product.slug)} alt={`${product.name} footwear`} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 50vw, 25vw" />
                  </Link>
                  <button type="button" onClick={() => toggleItem(item)} aria-pressed={saved} aria-label={`${saved ? 'Remove' : 'Save'} ${product.name}`} className="absolute right-3 top-3 flex size-8 items-center justify-center bg-[var(--color-bg-primary)]/90 text-[var(--color-text-primary)] hover:bg-[var(--color-accent)] hover:text-white">{saved ? '−' : '+'}</button>
                </div>
                <div className="pt-4 text-center">
                  <h3 className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--color-text-primary)]"><Link href={href}>{product.name}</Link></h3>
                  <p className="mt-2 text-[0.78rem] tracking-[0.08em] text-[var(--color-accent)]">Rs.{Math.round(product.price / 100).toLocaleString('en-IN')}</p>
                  <div className="mt-4 flex justify-center gap-2" aria-label={`Available sizes for ${product.name}`}>
                    {['S', 'M', 'L', 'XL'].map((size) => {
                      const available = availableSizes.length > 0 && (size === 'S' || size === 'M' || size === 'L' || size === 'XL')
                      const selected = selectedSizes[product.id] === size
                      return <button key={size} type="button" disabled={!available} onClick={() => setSelectedSizes((current) => ({ ...current, [product.id]: size }))} aria-pressed={selected} aria-label={`${available ? 'Select' : 'Unavailable'} size ${size}`} className={`flex size-8 items-center justify-center border text-[0.62rem] transition-colors ${selected ? 'border-[var(--color-text-primary)] bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]' : available ? 'border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]' : 'cursor-not-allowed border-[var(--color-border-subtle)] text-[var(--color-text-muted)]/40'}`}>{size}</button>
                    })}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
