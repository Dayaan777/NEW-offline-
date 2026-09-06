'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import type { Product, ProductVariant, ProductSize } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'
import { IconHeart, IconCheck, IconChevronDown } from '@/components/icons'

// ─── Sub-components ───────────────────────────────────────────────────────────

function ImageGallery({
  images,
  productName,
}: {
  images: { src: string; alt: string }[]
  productName: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const fallback = '/images/products/margin/off-white/01.png'

  return (
    <div className="pdp-gallery">
      {/* Main image */}
      <div className="pdp-gallery__main">
        <img
          key={images[activeIndex]?.src}
          src={images[activeIndex]?.src ?? fallback}
          alt={images[activeIndex]?.alt ?? productName}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = fallback
          }}
          className="pdp-gallery__main-img"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="pdp-gallery__thumbs" role="list" aria-label="Product images">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="listitem"
              aria-label={img.alt}
              aria-pressed={i === activeIndex}
              onClick={() => setActiveIndex(i)}
              className={`pdp-gallery__thumb${i === activeIndex ? ' pdp-gallery__thumb--active' : ''}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = fallback
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Accordion ────────────────────────────────────────────────────────────────

function Accordion({
  label,
  children,
  defaultOpen = false,
}: {
  label: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="pdp-accordion">
      <button
        type="button"
        className="pdp-accordion__trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{label}</span>
        <IconChevronDown
          className={`pdp-accordion__icon${open ? ' pdp-accordion__icon--open' : ''}`}
        />
      </button>
      {open && <div className="pdp-accordion__body">{children}</div>}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface ProductDetailProps {
  product: Product
  categoryName: string
}

export function ProductDetail({ product, categoryName }: ProductDetailProps) {
  const { addItem } = useCart()
  const { isSaved, toggleItem } = useWishlist()

  const [activeVariant, setActiveVariant] = useState<ProductVariant>(product.variants[0])
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const wished = isSaved(product.id, activeVariant.id)

  // When color changes, reset size selection
  const handleVariantChange = useCallback((variant: ProductVariant) => {
    setActiveVariant(variant)
    setSelectedSize(null)
    setAdded(false)
  }, [])

  const handleAddToCart = useCallback(() => {
    if (!selectedSize) return
    addItem({
      productId: product.id,
      variantId: activeVariant.id,
      sizeEu: selectedSize.eu,
      quantity,
      name: product.name,
      price: product.price,
      colorLabel: activeVariant.colorLabel,
      image: activeVariant.images[0],
      slug: product.slug,
      category: product.category,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }, [addItem, product, activeVariant, selectedSize, quantity])

  const handleWishlist = useCallback(() => {
    toggleItem({
      productId: product.id,
      variantId: activeVariant.id,
      addedAt: new Date().toISOString(),
      name: product.name,
      price: product.price,
      colorLabel: activeVariant.colorLabel,
      image: activeVariant.images[0],
      slug: product.slug,
      category: product.category,
    })
  }, [toggleItem, product, activeVariant])

  const availableSizes = activeVariant.sizes.filter((s) => s.available)

  return (
    <div className="pdp">
      {/* ── Breadcrumb ── */}
      <nav className="pdp__breadcrumb" aria-label="Breadcrumb">
        <Link href="/shop" className="pdp__breadcrumb-link">Shop</Link>
        <span className="pdp__breadcrumb-sep" aria-hidden="true">/</span>
        <Link href={`/shop/${product.category}`} className="pdp__breadcrumb-link">
          {categoryName}
        </Link>
        <span className="pdp__breadcrumb-sep" aria-hidden="true">/</span>
        <span className="pdp__breadcrumb-current" aria-current="page">{product.name}</span>
      </nav>

      <div className="pdp__layout">
        {/* ── Gallery ── */}
        <section className="pdp__gallery-col" aria-label="Product images">
          <ImageGallery images={activeVariant.images} productName={product.name} />
        </section>

        {/* ── Info panel ── */}
        <div className="pdp__info">

          {/* Header */}
          <div className="pdp__header">
            <div className="pdp__meta">
              <span className="pdp__category label-category">{categoryName}</span>
              {product.isNew && <span className="pdp__badge">New</span>}
            </div>
            <h1 className="pdp__name">{product.name}</h1>
            <p className="pdp__price">{formatPrice(product.price)}</p>
          </div>

          {/* Short description */}
          <p className="pdp__short-desc">{product.shortDescription}</p>

          {/* Color selector */}
          {product.variants.length > 1 && (
            <fieldset className="pdp__fieldset">
              <legend className="pdp__legend">
                Colour
                <span className="pdp__legend-value">{activeVariant.colorLabel}</span>
              </legend>
              <div className="pdp__swatches" role="radiogroup" aria-label="Select colour">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    role="radio"
                    aria-checked={variant.id === activeVariant.id}
                    aria-label={variant.colorLabel}
                    title={variant.colorLabel}
                    onClick={() => handleVariantChange(variant)}
                    className={`pdp__swatch${variant.id === activeVariant.id ? ' pdp__swatch--active' : ''}`}
                    style={{ backgroundColor: variant.colorHex }}
                  />
                ))}
              </div>
            </fieldset>
          )}

          {/* Size selector */}
          <fieldset className="pdp__fieldset">
            <legend className="pdp__legend">
              Size (EU)
              <Link href="/support/sizing" className="pdp__size-guide">Size guide</Link>
            </legend>
            <div className="pdp__sizes" role="radiogroup" aria-label="Select size">
              {activeVariant.sizes.map((size) => (
                <button
                  key={size.eu}
                  type="button"
                  role="radio"
                  aria-checked={selectedSize?.eu === size.eu}
                  aria-disabled={!size.available}
                  disabled={!size.available}
                  title={size.available ? `EU ${size.eu} / US ${size.us} / UK ${size.uk}${size.lowStock ? ' — Low stock' : ''}` : `EU ${size.eu} — out of stock`}
                  onClick={() => size.available && setSelectedSize(size)}
                  className={[
                    'pdp__size-btn',
                    !size.available && 'pdp__size-btn--unavailable',
                    selectedSize?.eu === size.eu && 'pdp__size-btn--selected',
                    size.lowStock && size.available && 'pdp__size-btn--low',
                  ].filter(Boolean).join(' ')}
                >
                  {size.eu}
                </button>
              ))}
            </div>
            {selectedSize && (
              <p className="pdp__size-detail">
                EU {selectedSize.eu}&nbsp;/&nbsp;US {selectedSize.us}&nbsp;/&nbsp;UK {selectedSize.uk}
                {selectedSize.lowStock && <span className="pdp__low-stock"> — Low stock</span>}
              </p>
            )}
            {availableSizes.length === 0 && (
              <p className="pdp__out-of-stock">This colour is currently out of stock.</p>
            )}
          </fieldset>

          {/* Quantity */}
          <div className="pdp__qty-row">
            <span className="pdp__legend">Qty</span>
            <div className="pdp__qty">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="pdp__qty-btn"
                disabled={quantity <= 1}
              >
                −
              </button>
              <output className="pdp__qty-value" aria-live="polite">{quantity}</output>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="pdp__qty-btn"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA row */}
          <div className="pdp__cta-row">
            <button
              id="add-to-cart-btn"
              type="button"
              onClick={handleAddToCart}
              disabled={!selectedSize || availableSizes.length === 0}
              className={`pdp__atc-btn${added ? ' pdp__atc-btn--added' : ''}`}
              aria-label={
                !selectedSize
                  ? 'Select a size to add to cart'
                  : added
                  ? 'Added to cart'
                  : 'Add to cart'
              }
            >
              {added ? (
                <>
                  <IconCheck className="pdp__atc-icon" />
                  Added
                </>
              ) : !selectedSize ? (
                'Select a size'
              ) : (
                'Add to cart'
              )}
            </button>

            <button
              type="button"
              onClick={handleWishlist}
              aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
              className={`pdp__wishlist-btn${wished ? ' pdp__wishlist-btn--saved' : ''}`}
            >
              <IconHeart filled={wished} className="pdp__wishlist-icon" />
            </button>
          </div>

          {/* ── Accordion details ── */}
          <div className="pdp__details">
            <Accordion label="Description" defaultOpen>
              <p className="pdp__detail-text">{product.description}</p>
              <p className="pdp__detail-text">{product.fit}</p>
              {product.breakIn && (
                <p className="pdp__detail-text">{product.breakIn}</p>
              )}
            </Accordion>

            <Accordion label="Materials">
              {product.materials && (
                <dl className="pdp__dl">
                  {product.materials.upper && (
                    <div className="pdp__dl-row">
                      <dt>Upper</dt>
                      <dd>{product.materials.upper}</dd>
                    </div>
                  )}
                  {product.materials.lining && (
                    <div className="pdp__dl-row">
                      <dt>Lining</dt>
                      <dd>{product.materials.lining}</dd>
                    </div>
                  )}
                  {product.materials.insole && (
                    <div className="pdp__dl-row">
                      <dt>Insole</dt>
                      <dd>{product.materials.insole}</dd>
                    </div>
                  )}
                  {product.materials.outsole && (
                    <div className="pdp__dl-row">
                      <dt>Outsole</dt>
                      <dd>{product.materials.outsole}</dd>
                    </div>
                  )}
                  {product.materials.origin && (
                    <div className="pdp__dl-row">
                      <dt>Origin</dt>
                      <dd>{product.materials.origin}</dd>
                    </div>
                  )}
                </dl>
              )}
            </Accordion>

            <Accordion label="Construction">
              <p className="pdp__detail-text">{product.construction}</p>
            </Accordion>

            <Accordion label="Care">
              <p className="pdp__detail-text">{product.care}</p>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
