'use client'

import { useCart } from '@/context/cart-context'
import { formatPrice } from '@/lib/utils'
import { DELIVERY_OPTIONS } from '@/lib/data/commerce'

interface CheckoutSummaryProps {
  deliveryMethodId?: string
}

export function CheckoutSummary({ deliveryMethodId = 'standard' }: CheckoutSummaryProps) {
  const { cart, subtotal, itemCount } = useCart()

  const deliveryOption =
    DELIVERY_OPTIONS.find((d) => d.id === deliveryMethodId) ?? DELIVERY_OPTIONS[0]
  const shippingCost = deliveryOption.price
  const grandTotal = subtotal + shippingCost

  return (
    <aside className="checkout-page__summary" aria-label="Order summary">
      <h2 className="checkout-page__summary-title">
        Order summary ({itemCount} {itemCount === 1 ? 'item' : 'items'})
      </h2>

      <div className="checkout-page__summary-list">
        {cart.items.map((item) => (
          <div key={`${item.variantId}-${item.sizeEu}`} className="checkout-page__summary-item">
            <img
              src={item.image.src}
              alt={item.image.alt}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = '/images/products/margin/off-white/01.png'
              }}
              className="checkout-page__summary-item-img"
            />
            <div className="checkout-page__summary-item-info">
              <span className="checkout-page__summary-item-name">{item.name}</span>
              <span className="checkout-page__summary-item-meta">
                {item.colorLabel} &middot; EU {item.sizeEu} &middot; Qty {item.quantity}
              </span>
            </div>
            <span className="checkout-page__summary-item-price">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="checkout-page__summary-rows">
        <div className="checkout-page__summary-row">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="checkout-page__summary-row">
          <span>Shipping ({deliveryOption.label})</span>
          <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
        </div>
      </div>

      <div className="checkout-page__summary-total">
        <span>Total</span>
        <span>{formatPrice(grandTotal)}</span>
      </div>
    </aside>
  )
}
