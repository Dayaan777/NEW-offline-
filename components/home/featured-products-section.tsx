'use client'

import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/lib/data/products'
import { useState } from 'react'
import { useWishlist } from '@/context/wishlist-context'
import type { Product, WishlistItem } from '@/lib/types'

const FEATURED = ['margin', 'farrow', 'croft', 'weld']

const FEATURED_IMAGES: Record<string, string> = {
  margin: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_uay5yruay5yruay5-b37btlmghwNMRA8HtpdBh5DbBkaeC7.jpg',
  farrow: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_809pib809pib809p-7H6hyiKS8lb5nSdOdM99xVJN0ygmL5.jpg',
  croft: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_o90p22o90p22o90p-hwjkTH7LWN5RLTW3K3wx1XB76qv8Ac.jpg',
  weld: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a06b94c8-d66e-4a7e-b098-6e80b01cdc01-itmDs9Ytcp8HBq25cn4RPFIOkK1zQR.jpg',
}

const imageFor = (slug: string) => FEATURED_IMAGES[slug] ?? `/images/products/${slug}/featured.png`

export function FeaturedProductsSection() {
  const { isSaved, toggleItem } = useWishlist()
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({})
  const featured = FEATURED.map((slug) => products.find((product) => product.slug === slug)).filter((product): product is Product => Boolean(product))

  return (
    <section aria-labelledby="featured-products-heading" className="bg-[var(--color-bg-primary)]">
      <div className="container py-16 md:py-28">
        <header className="mx-auto mb-12 flex w-full max-w-none flex-col items-center gap-4 text-center md:mb-16">
          <h2
            id="featured-products-heading"
            className="font-[family-name:var(--font-editorial)] text-3xl font-normal uppercase tracking-[0.06em] text-[var(--color-text-primary)] sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-none"
          >
            Featured Collection
          </h2>
          <Link
            href="/shop"
            className="group/viewall relative font-[family-name:var(--font-montserrat)] text-[0.68rem] font-medium uppercase tracking-[0.3em] text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text-primary)]"
          >
            View All
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[var(--color-text-primary)] transition-transform duration-300 ease-out group-hover/viewall:scale-x-100"
            />
          </Link>
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
                    <Image src={imageFor(product.slug)} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 50vw, 25vw" />
                  </Link>
                  <button type="button" onClick={() => toggleItem(item)} aria-pressed={saved} aria-label={`${saved ? 'Remove' : 'Save'} ${product.name}`} className="absolute right-3 top-3 flex size-8 items-center justify-center bg-[var(--color-bg-primary)]/90 text-[var(--color-text-primary)] hover:bg-[var(--color-accent)] hover:text-white">{saved ? '−' : '+'}</button>
                </div>
                <div className="mt-7 text-center">
                  <h3 className="font-[family-name:var(--font-montserrat)] text-[0.62rem] font-light uppercase tracking-[0.24em] text-[var(--color-text-primary)]"><Link href={href} className="font-[family-name:var(--font-montserrat)] text-base">{product.name}</Link></h3>
                  <p className="mt-1.5 text-[0.66rem] font-normal tracking-[0.12em] text-[var(--color-text-primary)] font-[family-name:var(--font-montserrat)] text-[10px]">Rs.{Math.round(product.price / 100).toLocaleString('en-IN')}</p>
                  <div className="mt-5 flex justify-center gap-2" aria-label={`Available sizes for ${product.name}`}>
                    {['S', 'M', 'L', 'XL'].map((size) => {
                      const available = availableSizes.length > 0 && (size === 'S' || size === 'M' || size === 'L' || size === 'XL')
                      const selected = selectedSizes[product.id] === size
                      return <button key={size} type="button" disabled={!available} onClick={() => setSelectedSizes((current) => ({ ...current, [product.id]: size }))} aria-pressed={selected} aria-label={`${available ? 'Select' : 'Unavailable'} size ${size}`} className={`flex size-8 items-center justify-center border text-[0.62rem] transition-colors font-[family-name:var(--font-montserrat)] ${selected ? 'border-[var(--color-text-primary)] bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]' : available ? 'border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]' : 'cursor-not-allowed border-[var(--color-border-subtle)] text-[var(--color-text-muted)]/40'}`}>{size}</button>
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
