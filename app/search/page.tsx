'use client'

import { Suspense, useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { products } from '@/lib/data/products'
import type { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { useWishlist } from '@/context/wishlist-context'
import { IconSearch, IconX, IconHeart } from '@/components/icons'

function SearchProductCard({ product }: { product: Product }) {
  const { isSaved, toggleItem } = useWishlist()
  const variant = product.variants[0]
  const wished = isSaved(product.id, variant.id)

  const wishlistItem = {
    productId: product.id,
    variantId: variant.id,
    addedAt: new Date().toISOString(),
    name: product.name,
    price: product.price,
    colorLabel: variant.colorLabel,
    image: variant.images[0],
    slug: product.slug,
    category: product.category,
  }

  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg-secondary)]">
        <Link
          href={`/shop/${product.category}/${product.slug}`}
          aria-label={`View ${product.name}`}
        >
          <img
            src={variant.images[0]?.src}
            alt={variant.images[0]?.alt || product.name}
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = '/images/products/margin/off-white/01.png'
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
        {product.isNew && (
          <span className="absolute left-3 top-3 bg-[var(--color-bg-primary)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em]">
            New
          </span>
        )}
        <button
          type="button"
          aria-label={
            wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`
          }
          onClick={() => toggleItem(wishlistItem)}
          className="absolute right-3 top-3 grid size-9 place-items-center bg-[var(--color-bg-primary)]/90 text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-accent)] hover:text-white"
        >
          <IconHeart filled={wished} className="size-4" />
        </button>
      </div>
      <div className="flex items-start justify-between gap-3 pt-4">
        <div>
          <Link
            href={`/shop/${product.category}/${product.slug}`}
            className="font-serif text-lg hover:underline"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {variant.colorLabel.split(' — ')[0]}
          </p>
        </div>
        <p className="font-mono text-sm">{formatPrice(product.price)}</p>
      </div>
    </article>
  )
}

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleQueryChange = (q: string) => {
    setQuery(q)
    const url = q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : '/search'
    router.replace(url, { scroll: false })
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products

    return products.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(q)
      const categoryMatch = p.category.toLowerCase().includes(q)
      const descMatch = p.description.toLowerCase().includes(q)
      const shortDescMatch = p.shortDescription.toLowerCase().includes(q)
      const upperMatch = p.materials?.upper?.toLowerCase().includes(q)
      const colorMatch = p.variants.some((v) =>
        v.colorLabel.toLowerCase().includes(q)
      )
      return (
        nameMatch ||
        categoryMatch ||
        descMatch ||
        shortDescMatch ||
        upperMatch ||
        colorMatch
      )
    })
  }, [query])

  const suggestions = ['Margin', 'Farrow', 'Croft', 'Weld', 'Leather', 'Suede', 'Boot']

  return (
    <div className="search-page">
      <div className="search-page__header">
        <h1 className="search-page__title">Search</h1>

        <div className="search-page__input-wrapper">
          <IconSearch className="search-page__input-icon" />
          <input
            type="search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search products by name, material, category..."
            className="search-page__input"
            autoFocus
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => handleQueryChange('')}
              className="search-page__clear-btn"
            >
              <IconX className="w-4 h-4" />
            </button>
          )}
        </div>

        <p className="search-page__meta">
          {query.trim()
            ? `Showing ${results.length} ${
                results.length === 1 ? 'result' : 'results'
              } for "${query}"`
            : `Showing all ${results.length} products`}
        </p>
      </div>

      {results.length > 0 ? (
        <div className="search-page__grid">
          {results.map((product) => (
            <SearchProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="search-page__empty">
          <h2 className="search-page__empty-title">No results found</h2>
          <p className="search-page__empty-desc">
            We couldn&apos;t find any products matching &ldquo;{query}&rdquo;. Check your spelling or try searching for a material, footwear type, or collection.
          </p>

          <div>
            <p className="search-page__suggestions-label">Popular searches</p>
            <div className="search-page__suggestions">
              {suggestions.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleQueryChange(term)}
                  className="search-page__chip"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="search-page">
          <p className="search-page__meta">Loading search...</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
