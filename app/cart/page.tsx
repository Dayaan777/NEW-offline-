'use client'

import Link from 'next/link'
import type { Metadata } from 'next'
import { useCart } from '@/context/cart-context'
import { formatPrice } from '@/lib/utils'
import { IconX } from '@/components/icons'

// ─── Cart page ────────────────────────────────────────────────────────────────

export default function CartPage() {
  const { cart, removeItem, updateQuantity, subtotal, itemCount } = useCart()

  return (
    <div className="cart-page">
      {/* ── Page header ── */}
      <div className="cart-page__header">
        <h1 className="cart-page__title">
          {itemCount === 0 ? 'Your cart' : `Your cart (${itemCount})`}
        </h1>
      </div>

      {cart.items.length === 0 ? (
        /* ── Empty state ── */
        <div className="cart-page__empty">
          <p className="cart-page__empty-text">
            Your cart is empty. Add something worth keeping.
          </p>
          <Link href="/shop" className="cart-page__empty-cta">
            Browse the collection
          </Link>
        </div>
      ) : (
        <div className="cart-page__layout">
          {/* ── Item list ── */}
          <section aria-label="Cart items" className="cart-page__items">
            {/* Column labels */}
            <div className="cart-page__col-labels" aria-hidden="true">
              <span>Product</span>
              <div className="cart-page__col-labels-main">
                <span className="cart-page__col-label-spacer"></span>
                <span className="cart-page__col-label-qty">Quantity</span>
                <span className="cart-page__col-label-total">Total</span>
              </div>
            </div>

            <ul className="cart-page__list">
              {cart.items.map((item) => (
                <li
                  key={`${item.variantId}-${item.sizeEu}`}
                  className="cart-page__item"
                >
                  {/* Image */}
                  <Link
                    href={`/shop/${item.category}/${item.slug}`}
                    aria-label={`View ${item.name}`}
                    className="cart-page__item-img-link"
                  >
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = '/images/products/margin/off-white/01.png'
                      }}
                      className="cart-page__item-img"
                    />
                  </Link>

                  {/* Info block */}
                  <div className="cart-page__item-details">
                    <div className="cart-page__item-main">
                      <div className="cart-page__item-text">
                        <Link
                          href={`/shop/${item.category}/${item.slug}`}
                          className="cart-page__item-name"
                        >
                          {item.name}
                        </Link>
                        <p className="cart-page__item-variant">
                          {item.colorLabel}
                        </p>
                        <p className="cart-page__item-size">
                          EU {item.sizeEu}
                        </p>
                        <p className="cart-page__item-unit-price">
                          {formatPrice(item.price)} each
                        </p>
                      </div>

                      {/* Qty stepper */}
                      <div
                        className="cart-page__qty"
                        aria-label={`Quantity for ${item.name}`}
                      >
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.variantId,
                              item.sizeEu,
                              item.quantity - 1
                            )
                          }
                          className="cart-page__qty-btn"
                        >
                          −
                        </button>
                        <output
                          className="cart-page__qty-val"
                          aria-live="polite"
                        >
                          {item.quantity}
                        </output>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          disabled={item.quantity >= 10}
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.variantId,
                              item.sizeEu,
                              item.quantity + 1
                            )
                          }
                          className="cart-page__qty-btn"
                        >
                          +
                        </button>
                      </div>

                      {/* Line total */}
                      <p className="cart-page__item-total">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      aria-label={`Remove ${item.name} from cart`}
                      onClick={() =>
                        removeItem(item.productId, item.variantId, item.sizeEu)
                      }
                      className="cart-page__remove"
                    >
                      <IconX className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Continue shopping */}
            <Link href="/shop" className="cart-page__continue">
              ← Continue shopping
            </Link>
          </section>

          {/* ── Order summary ── */}
          <aside className="cart-page__summary" aria-label="Order summary">
            <h2 className="cart-page__summary-title">Order summary</h2>

            <div className="cart-page__summary-rows">
              <div className="cart-page__summary-row">
                <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="cart-page__summary-row cart-page__summary-row--shipping">
                <span>Shipping</span>
                <span className="cart-page__summary-shipping-note">Calculated at checkout</span>
              </div>
            </div>

            <div className="cart-page__summary-total">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <p className="cart-page__summary-note">
              Taxes included where applicable. Free returns within 30 days.
            </p>

            <Link
              href="/checkout/shipping"
              id="cart-checkout-btn"
              className="cart-page__checkout-btn"
            >
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}
