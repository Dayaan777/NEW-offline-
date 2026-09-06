'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useCart } from '@/context/cart-context'
import { formatPrice } from '@/lib/utils'
import { IconX } from '@/components/icons'

// ─── CartDrawer ───────────────────────────────────────────────────────────────

export function CartDrawer() {
  const { cart, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart()
  const panelRef = useRef<HTMLDivElement>(null)

  // Trap body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeCart()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, closeCart])

  // Focus panel when opened for a11y
  useEffect(() => {
    if (isOpen) panelRef.current?.focus()
  }, [isOpen])

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`cart-drawer__backdrop${isOpen ? ' cart-drawer__backdrop--open' : ''}`}
      />

      {/* ── Panel ── */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
        className={`cart-drawer__panel${isOpen ? ' cart-drawer__panel--open' : ''}`}
      >
        {/* Header */}
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            Cart {itemCount > 0 && <span className="cart-drawer__count">({itemCount})</span>}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="cart-drawer__close"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {cart.items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p className="cart-drawer__empty-text">Your cart is empty.</p>
            <Link href="/shop" onClick={closeCart} className="cart-drawer__shop-link">
              Browse the collection →
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__list" aria-label="Cart items">
              {cart.items.map((item) => (
                <li
                  key={`${item.variantId}-${item.sizeEu}`}
                  className="cart-drawer__item"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/shop/${item.category}/${item.slug}`}
                    onClick={closeCart}
                    className="cart-drawer__thumb-link"
                    aria-label={`View ${item.name}`}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = '/images/products/margin/off-white/01.png'
                      }}
                      className="cart-drawer__thumb-img"
                    />
                  </Link>

                  {/* Info */}
                  <div className="cart-drawer__item-info">
                    <div className="cart-drawer__item-top">
                      <div>
                        <Link
                          href={`/shop/${item.category}/${item.slug}`}
                          onClick={closeCart}
                          className="cart-drawer__item-name"
                          tabIndex={isOpen ? 0 : -1}
                        >
                          {item.name}
                        </Link>
                        <p className="cart-drawer__item-meta">
                          {item.colorLabel.split(' — ')[0]} &middot; EU {item.sizeEu}
                        </p>
                      </div>
                      <p className="cart-drawer__item-price">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    {/* Qty + Remove */}
                    <div className="cart-drawer__item-actions">
                      <div className="cart-drawer__qty" aria-label={`Quantity for ${item.name}`}>
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateQuantity(item.productId, item.variantId, item.sizeEu, item.quantity - 1)
                          }
                          className="cart-drawer__qty-btn"
                        >
                          −
                        </button>
                        <output className="cart-drawer__qty-val" aria-live="polite">
                          {item.quantity}
                        </output>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          disabled={item.quantity >= 10}
                          onClick={() =>
                            updateQuantity(item.productId, item.variantId, item.sizeEu, item.quantity + 1)
                          }
                          className="cart-drawer__qty-btn"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${item.name} from cart`}
                        onClick={() => removeItem(item.productId, item.variantId, item.sizeEu)}
                        className="cart-drawer__remove"
                        tabIndex={isOpen ? 0 : -1}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="cart-drawer__footer">
              <div className="cart-drawer__subtotal-row">
                <span className="cart-drawer__subtotal-label">Subtotal</span>
                <span className="cart-drawer__subtotal-value">{formatPrice(subtotal)}</span>
              </div>
              <p className="cart-drawer__shipping-note">Shipping calculated at checkout.</p>
              <Link
                href="/checkout/shipping"
                onClick={closeCart}
                className="cart-drawer__checkout-btn"
                tabIndex={isOpen ? 0 : -1}
              >
                Proceed to checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="cart-drawer__view-cart"
                tabIndex={isOpen ? 0 : -1}
              >
                View full cart
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
