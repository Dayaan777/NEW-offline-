'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useWishlist } from '@/context/wishlist-context'
import { useCart } from '@/context/cart-context'
import { formatPrice } from '@/lib/utils'
import { IconX, IconCheck } from '@/components/icons'
import type { WishlistItem } from '@/lib/types'

function WishlistCard({ item }: { item: WishlistItem }) {
  const { removeItem } = useWishlist()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = useCallback(() => {
    addItem({
      productId: item.productId,
      variantId: item.variantId,
      sizeEu: 42, // default standard EU size
      quantity: 1,
      name: item.name,
      price: item.price,
      colorLabel: item.colorLabel,
      image: item.image,
      slug: item.slug,
      category: item.category,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }, [addItem, item])

  return (
    <article className="wishlist-page__card">
      <div className="wishlist-page__card-img-wrapper">
        <Link
          href={`/shop/${item.category}/${item.slug}`}
          aria-label={`View ${item.name}`}
        >
          <img
            src={item.image.src}
            alt={item.image.alt || item.name}
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = '/images/products/margin/off-white/01.png'
            }}
            className="wishlist-page__card-img"
          />
        </Link>
        <button
          type="button"
          aria-label={`Remove ${item.name} from wishlist`}
          onClick={() => removeItem(item.productId, item.variantId)}
          className="wishlist-page__card-remove-btn"
          title="Remove item"
        >
          <IconX className="w-4 h-4" />
        </button>
      </div>

      <div className="wishlist-page__card-body">
        <div className="wishlist-page__card-main">
          <div>
            <Link
              href={`/shop/${item.category}/${item.slug}`}
              className="wishlist-page__card-name"
            >
              {item.name}
            </Link>
            <p className="wishlist-page__card-variant">
              {item.colorLabel.split(' — ')[0]}
            </p>
          </div>
          <span className="wishlist-page__card-price">
            {formatPrice(item.price)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`wishlist-page__atc-btn ${
            added ? 'wishlist-page__atc-btn--added' : ''
          }`}
        >
          {added ? (
            <>
              <IconCheck className="w-4 h-4" />
              Added to Cart
            </>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </article>
  )
}

export default function WishlistPage() {
  const { wishlist, itemCount } = useWishlist()

  return (
    <div className="wishlist-page">
      <div className="wishlist-page__header">
        <h1 className="wishlist-page__title">
          {itemCount === 0 ? 'Your wishlist' : `Your wishlist (${itemCount})`}
        </h1>
      </div>

      {wishlist.items.length === 0 ? (
        <div className="wishlist-page__empty">
          <p className="wishlist-page__empty-text">
            Your wishlist is empty. Save products you want to revisit later.
          </p>
          <Link href="/shop" className="wishlist-page__empty-cta">
            Browse the collection
          </Link>
        </div>
      ) : (
        <div className="wishlist-page__grid">
          {wishlist.items.map((item) => (
            <WishlistCard
              key={`${item.productId}-${item.variantId}`}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  )
}
