'use client'

import Image from 'next/image'
import Link from 'next/link'
import { categories } from '@/lib/data/categories'
import { products } from '@/lib/data/products'
import { useWishlist } from '@/context/wishlist-context'
import type { CategoryId, Product, WishlistItem } from '@/lib/types'

const FEATURED = ['margin', 'farrow', 'croft', 'weld']
const imageFor = (slug: string) => slug === 'margin' ? '/images/products/margin/off-white/01.png' : `/images/products/${slug}/editorial.png`

export function FeaturedProductsSection() {
  const { isSaved, toggleItem } = useWishlist()
  const featured = FEATURED.map((slug) => products.find((product) => product.slug === slug)).filter((product): product is Product => Boolean(product))

  return (
    <section aria-labelledby="featured-products-heading" className="bg-[var(--color-bg-primary)]">
      <div className="container py-12 md:py-16">
        <div className="mb-7 flex items-end justify-between border-b border-[var(--color-border-subtle)] pb-5">
          <h2 id="featured-products-heading" className="text-[1.35rem] font-light tracking-[-0.02em] text-[var(--color-text-primary)] md:text-[1.75rem]">Featured products</h2>
          <Link href="/shop" className="border-b border-[var(--color-text-primary)] pb-1 text-[0.7rem] font-medium tracking-[0.18em] text-[var(--color-text-primary)]">VIEW ALL</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">
          {featured.map((product) => {
            const variant = product.variants[0]
            const href = `/shop/${product.category}/${product.slug}`
            const category = categories.find((item) => item.id === product.category as CategoryId)
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
                <div className="pt-4">
                  <Link href={`/shop/${product.category}`} className="label-category text-[var(--color-text-muted)]">{category?.name ?? product.category}</Link>
                  <div className="mt-2 flex items-start justify-between gap-2"><h3 className="text-[1rem] font-light text-[var(--color-text-primary)] md:text-[1.15rem]"><Link href={href}>{product.name}</Link></h3><span className="text-[0.8rem] text-[var(--color-accent)]">${Math.round(product.price / 100).toLocaleString('en-US')}</span></div>
                  <div className="mt-4 flex flex-wrap gap-1.5" aria-label={`Available sizes for ${product.name}`}>
                    {availableSizes.map((size) => <button key={size.eu} type="button" aria-label={`Select EU size ${size.eu}`} className="min-w-8 border border-[var(--color-border-default)] px-1.5 py-1 text-[0.65rem] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]">{size.eu}</button>)}
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
