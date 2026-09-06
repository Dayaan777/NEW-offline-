'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { products } from '@/lib/data/products'
import { formatPrice } from '@/lib/utils'
import { IconX } from '@/components/icons'

interface SearchDrawerProps {
  isOpen: boolean
  onClose: () => void
}

interface CollectionItem {
  label: string
  href: string
  tags: string[]
}

const COLLECTIONS_LIST: CollectionItem[] = [
  { label: 'MEN', href: '/shop/men-tshirts', tags: ['men', 'man', 'male'] },
  { label: 'MEN TROUSERS', href: '/shop/men-pants', tags: ['men', 'trousers', 'pants'] },
  { label: 'MEN HOODIE', href: '/shop/men-hoodie', tags: ['men', 'hoodie'] },
  { label: 'MEN POLO', href: '/shop/men-polo', tags: ['men', 'polo'] },
  { label: 'WOMEN', href: '/shop/women-tshirts', tags: ['women', 'woman', 'female'] },
  { label: 'WOMEN TROUSERS', href: '/shop/women-trousers', tags: ['women', 'trousers', 'pants'] },
  { label: 'WOMEN SHIRTS', href: '/shop/women-shirts', tags: ['women', 'shirts'] },
  { label: 'SHOES', href: '/shop/shoes', tags: ['shoes', 'footwear', 'margin', 'farrow', 'croft', 'weld'] },
  { label: 'NEW RELEASES', href: '/shop/new', tags: ['new', 'releases', 'latest'] },
]

export function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Lock body scroll and focus input on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const timer = setTimeout(() => inputRef.current?.focus(), 120)
      return () => clearTimeout(timer)
    } else {
      document.body.style.overflow = ''
      setQuery('')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const q = query.trim()
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`)
    } else {
      router.push('/search')
    }
    onClose()
  }

  // Filter collections (ONLY when query is non-empty)
  const matchingCollections = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return COLLECTIONS_LIST.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.tags.some((t) => t.includes(q) || q.includes(t))
    )
  }, [query])

  // Suggested terms (ONLY when query is non-empty)
  const suggestedTerms = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []

    const termsSet = new Set<string>()

    COLLECTIONS_LIST.forEach((col) => {
      if (col.label.toLowerCase().includes(q)) {
        termsSet.add(col.label)
      }
    })

    products.forEach((p) => {
      if (p.name.toLowerCase().includes(q)) {
        termsSet.add(p.name)
      }
      p.variants.forEach((v) => {
        if (v.colorLabel.toLowerCase().includes(q)) {
          termsSet.add(`${p.name} ${v.color}`)
        }
      })
    })

    if (termsSet.size === 0) {
      termsSet.add(`${query.trim().toUpperCase()} TROUSERS`)
      termsSet.add(`BOXY FIT ${query.trim().toUpperCase()}`)
    }

    return Array.from(termsSet).slice(0, 4)
  }, [query])

  // Filter products (ONLY when query is non-empty)
  const matchingProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(q)
      const categoryMatch = p.category.toLowerCase().includes(q)
      const descMatch = p.description.toLowerCase().includes(q)
      const shortDescMatch = p.shortDescription.toLowerCase().includes(q)
      const colorMatch = p.variants.some((v) => v.colorLabel.toLowerCase().includes(q))
      return nameMatch || categoryMatch || descMatch || shortDescMatch || colorMatch
    })
  }, [query])

  // Helper to render term with highlighted query keyword
  const renderHighlightedTerm = (term: string, currentQuery: string) => {
    const q = currentQuery.trim()
    if (!q) return <span className="text-neutral-800 text-xs uppercase tracking-wider">{term}</span>

    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = term.split(regex)

    return (
      <span className="text-xs uppercase tracking-wider block text-left">
        {parts.map((part, i) =>
          part.toLowerCase() === q.toLowerCase() ? (
            <span key={i} className="inline-block bg-neutral-200 text-neutral-900 px-1 py-0.5 rounded font-medium text-[11px] mr-1">
              {part.toUpperCase()}
            </span>
          ) : (
            <span key={i} className="text-neutral-800 font-normal">
              {part}
            </span>
          )
        )}
      </span>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`search-drawer__backdrop${isOpen ? ' search-drawer__backdrop--open' : ''}`}
      />

      {/* Drawer Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        tabIndex={-1}
        className={`search-drawer__panel${isOpen ? ' search-drawer__panel--open' : ''}`}
      >
        {/* Top Header */}
        <div className="search-drawer__header">
          <h2 className="search-drawer__title">
            Search
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="search-drawer__close"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Live Search Input Box */}
        <div className="search-drawer__input-container">
          <form onSubmit={handleSearchSubmit} className="search-drawer__form">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder=""
              className="search-drawer__input"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear input"
                className="search-drawer__clear-btn"
              >
                <IconX className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>

        {/* Content Body */}
        <div className="search-drawer__body">
          {!query.trim() ? (
            <div className="search-drawer__empty-state">
              <p className="text-xs uppercase tracking-widest text-neutral-400">
                Type to search
              </p>
            </div>
          ) : (
            <>
              {/* Suggested Search Terms */}
              {suggestedTerms.length > 0 && (
                <div className="flex flex-col gap-3">
                  {suggestedTerms.map((term, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setQuery(term.toLowerCase())}
                      className="search-drawer__suggestion-btn"
                    >
                      {renderHighlightedTerm(term, query)}
                    </button>
                  ))}
                </div>
              )}

              {/* Divider 1 */}
              {suggestedTerms.length > 0 && (matchingCollections.length > 0 || matchingProducts.length > 0) && (
                <hr className="search-drawer__divider" />
              )}

              {/* Collections Section */}
              {matchingCollections.length > 0 && (
                <div>
                  <span className="search-drawer__eyebrow">
                    COLLECTIONS
                  </span>
                  <ul className="search-drawer__collection-list">
                    {matchingCollections.map((col) => (
                      <li key={col.label}>
                        <Link
                          href={col.href}
                          onClick={onClose}
                          className="search-drawer__collection-link"
                        >
                          {col.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Divider 2 */}
              {matchingCollections.length > 0 && matchingProducts.length > 0 && (
                <hr className="search-drawer__divider" />
              )}

              {/* Products Section */}
              <div>
                <span className="search-drawer__eyebrow">
                  PRODUCTS
                </span>
                {matchingProducts.length > 0 ? (
                  <div className="search-drawer__products-list">
                    {matchingProducts.map((product) => {
                      const variant = product.variants[0]
                      const thumbnailSrc = variant?.images[0]?.src || '/images/products/margin/off-white/01.png'
                      const origPrice = product.originalPrice || Math.round(product.price * 1.25)
                      return (
                        <Link
                          key={product.id}
                          href={`/shop/${product.category}/${product.slug}`}
                          onClick={onClose}
                          className="search-drawer__product-card"
                        >
                          <div className="search-drawer__product-thumb">
                            <img
                              src={thumbnailSrc}
                              alt={product.name}
                              className="search-drawer__product-img"
                              onError={(e) => {
                                e.currentTarget.onerror = null
                                e.currentTarget.src = '/images/products/margin/off-white/01.png'
                              }}
                            />
                          </div>
                          <div className="search-drawer__product-info">
                            <p className="search-drawer__product-name">
                              {product.name}
                            </p>
                            <div className="search-drawer__product-price-row">
                              <span className="search-drawer__product-price">
                                {formatPrice(product.price)}
                              </span>
                              <span className="search-drawer__product-price-orig">
                                {formatPrice(origPrice)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-400">No products found matching &quot;{query}&quot;</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Button — Always visible at bottom */}
        <div className="search-drawer__footer">
          <button
            type="button"
            onClick={() => handleSearchSubmit()}
            className="search-drawer__submit-btn"
          >
            {query.trim() ? `Search for "${query.trim()}"` : 'Search all products'}
          </button>
        </div>
      </aside>
    </>
  )
}
