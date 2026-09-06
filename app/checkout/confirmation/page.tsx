'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { formatPrice } from '@/lib/utils'
import { IconCheck } from '@/components/icons'
import type { Order } from '@/lib/types'
import { mockOrders } from '@/lib/data/commerce'

export default function OrderConfirmationPage() {
  const { clearCart } = useCart()
  const clearedRef = useRef(false)

  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    // Clear cart once when entering confirmation page
    if (!clearedRef.current) {
      clearCart()
      clearedRef.current = true
    }

    try {
      const stored = localStorage.getItem('offline_latest_order')
      if (stored) {
        setOrder(JSON.parse(stored))
        return
      }
    } catch {
      // Fallback below
    }

    // Default fallback order if opened directly
    setOrder(mockOrders[0])
  }, [clearCart])

  if (!order) return null

  return (
    <div className="checkout-page">
      <div className="checkout-page__confirmation">
        <div className="checkout-page__confirmation-icon">
          <IconCheck className="w-8 h-8 text-[var(--color-success)]" />
        </div>

        <span className="checkout-page__confirmation-number">
          Order {order.orderNumber}
        </span>

        <h1 className="checkout-page__confirmation-title">
          Thank you for your order
        </h1>

        <p className="checkout-page__confirmation-msg">
          We&apos;ve received your order and are preparing it for shipment. A confirmation email
          has been sent to your address.
        </p>

        <div className="checkout-page__confirmation-details">
          <div className="checkout-page__section">
            <h2 className="checkout-page__section-title">Order summary</h2>
            <div className="checkout-page__summary-list">
              {order.items.map((item) => (
                <div
                  key={`${item.productId}-${item.sizeEu}`}
                  className="checkout-page__summary-item"
                >
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
          </div>

          <div className="checkout-page__input-row checkout-page__input-row--2col">
            <div>
              <h3 className="checkout-page__label">Shipping address</h3>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {order.shippingAddress.fullName}
                <br />
                {order.shippingAddress.address1}
                {order.shippingAddress.address2 ? `, ${order.shippingAddress.address2}` : ''}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.postalCode}
              </p>
            </div>

            <div>
              <h3 className="checkout-page__label">Delivery status</h3>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Estimated delivery: {order.estimatedDelivery}
                <br />
                Method: {order.deliveryMethod === 'express' ? 'Express Delivery' : 'Standard Delivery'}
              </p>
            </div>
          </div>

          <div className="checkout-page__summary-rows">
            <div className="checkout-page__summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="checkout-page__summary-row">
              <span>Shipping</span>
              <span>
                {order.shippingCost === 0 ? 'Free' : formatPrice(order.shippingCost)}
              </span>
            </div>
            <div className="checkout-page__summary-total">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <Link href="/shop" className="checkout-page__btn max-w-sm">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
