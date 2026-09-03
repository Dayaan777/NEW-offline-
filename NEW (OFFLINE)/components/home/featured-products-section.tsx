'use client'

import Image from 'next/image'
import Link from 'next/link'
import { categories } from '@/lib/data/categories'
import { products } from '@/lib/data/products'
import { useWishlist } from '@/context/wishlist-context'
import type { CategoryId, Product, WishlistItem } from '@/lib/types'

const FEATURED = ['margin', 'farrow', 'croft', 'weld']
const imageFor = (slug: string, fallback: string) => slug === 'margin' ? '/images/products/margin/off-white/01.png' : `/images/products/${slug}/editorial.png`

export function FeaturedProductsSection() {
  const { isSaved, toggleItem } = useWishlist()
  const featured = FEATURED.map((slug) => products.find((product) => product.slug === slug)).filter((product): product is Product => Boolean(product))

  return (
    <section aria-labelledby="featured-products-heading" className="bg-[var(--color-bg-primary)]">
      <div className="container">
        <div className="flex flex-col gap-3 border-b border-[var(--color-border-subtle)] py-8 md:flex-row md:items-end md:justify-between md:py-10">
          <div>
            <p className="label-category mb-3 text-[var(--color-text-muted)]">Featured products</p>
            <h2 id="featured-products-heading" className="max-w-[520px] text-[2rem] font-light leading-[0.95] tracking-[-0.02em] text-[var(--color-text-primary)] md:text-[3.25rem]">The four shoes in the system.</h2>
          </div>
          <p className="max-w-[280px] text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">Context explains the need. Product answers it.</p>
        </div>
        <div className="grid grid-cols-2 gap-px bg-[var(--color-border-subtle)] lg:grid-cols-4">
          {featured.map((product) => {
            const variant = product.variants[0]
            const href = `/shop/${product.category}/${product.slug}`
            const category = categories.find((item) => item.id === product.category as CategoryId)
            const saved = isSaved(product.id, variant.id)
            const item: WishlistItem = { productId: product.id, variantId: variant.id, addedAt: new Date().toISOString(), name: product.name, price: product.price, colorLabel: variant.colorLabel, image: variant.images[0], slug: product.slug, category: product.category }
            return (
              <article key={product.id} className="group flex min-w-0 flex-col bg-[var(--color-bg-primary)]">
                <Link href={href} className="relative block aspect-[4/5] overflow-hidden bg-[var(--color-bg-tertiary)]" aria-label={`View ${product.name}`}>
                  <Image src={imageFor(product.slug, variant.images[0]?.src || '/images/products/margin/off-white/01.jpg')} alt={`${product.name} footwear`} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width: 1024px) 50vw, 25vw" />
                </Link>
                <div className="flex flex-1 flex-col gap-4 px-3 py-4 md:px-5 md:py-6">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0"><Link href={`/shop/${product.category}`} className="label-category truncate text-[var(--color-text-muted)]">{category?.name ?? product.category}</Link><h3 className="mt-2 text-[1.05rem] font-light leading-none text-[var(--color-text-primary)] md:text-[1.35rem]"><Link href={href}>{product.name}</Link></h3></div>
                    <button type="button" onClick={() => toggleItem(item)} aria-pressed={saved} aria-label={`${saved ? 'Remove' : 'Save'} ${product.name}`} className="flex size-8 shrink-0 items-center justify-center border border-[var(--color-border-default)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">{saved ? '−' : '+'}</button>
                  </div>
                  <p className="line-clamp-2 text-[0.75rem] leading-relaxed text-[var(--color-text-secondary)] md:text-[0.8125rem]">{product.shortDescription}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-[var(--color-border-subtle)] pt-4"><span className="text-[0.8125rem] font-medium text-[var(--color-accent)]">${Math.round(product.price / 100).toLocaleString('en-US')}</span><span className="flex gap-1" aria-label="Available colors">{product.variants.map((color) => <span key={color.id} title={color.colorLabel} className="size-2.5 border border-[var(--color-border-default)]" style={{ backgroundColor: color.colorHex }} />)}</span></div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
