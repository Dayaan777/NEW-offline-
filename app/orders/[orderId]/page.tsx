'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { mockOrders, ORDER_STATUS_LABELS } from '@/lib/data/commerce'
import { formatPrice, formatDateShort } from '@/lib/utils'
import { IconCheck } from '@/components/icons'
import type { Order, OrderStatus } from '@/lib/types'

interface PageProps {
  params: Promise<{ orderId: string }>
}

export default function OrderTrackingPage({ params }: PageProps) {
  const { orderId } = use(params)
  const [order, setOrder] = useState<Order | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // 1. Check local session storage order
    try {
      const stored = localStorage.getItem('offline_latest_order')
      if (stored) {
        const parsed: Order = JSON.parse(stored)
        if (parsed.id === orderId || parsed.orderNumber === orderId) {
          setOrder(parsed)
          setLoaded(true)
          return
        }
      }
    } catch {
      // Fallback below
    }

    // 2. Search built-in mock orders
    const match = mockOrders.find(
      (o) => o.id === orderId || o.orderNumber === orderId
    )
    if (match) {
      setOrder(match)
    } else if (mockOrders.length > 0) {
      // Default fallback if arbitrary ID is passed in dev
      setOrder(mockOrders[0])
    }

    setLoaded(true)
  }, [orderId])

  if (!loaded) {
    return (
      <div className="orders-page">
        <p className="text-sm text-[var(--color-text-muted)]">Loading order details...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="orders-page">
        <Link href="/account" className="orders-page__back">
          &larr; Back to Account
        </Link>
        <div className="checkout-page__confirmation">
          <h1 className="checkout-page__confirmation-title">Order Not Found</h1>
          <p className="checkout-page__confirmation-msg">
            We couldn&apos;t find an order with ID &ldquo;{orderId}&rdquo;.
          </p>
          <Link href="/account" className="checkout-page__btn max-w-xs">
            Return to Account
          </Link>
        </div>
      </div>
    )
  }

  // Define 4 timeline steps
  const timelineSteps: { id: OrderStatus; label: string; desc: string }[] = [
    { id: 'confirmed', label: 'Placed', desc: 'Order received' },
    { id: 'processing', label: 'Processing', desc: 'Preparing package' },
    { id: 'shipped', label: 'Shipped', desc: 'On its way' },
    { id: 'delivered', label: 'Delivered', desc: 'Package arrived' },
  ]

  const getStepStatus = (stepId: OrderStatus) => {
    const statusOrder: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']
    const currentIndex = statusOrder.indexOf(order.status)
    const stepIndex = statusOrder.indexOf(stepId)

    if (stepIndex < currentIndex) return 'completed'
    if (stepIndex === currentIndex) return 'active'
    return 'upcoming'
  }

  return (
    <div className="orders-page">
      <Link href="/account" className="orders-page__back">
        &larr; Back to Account
      </Link>

      <div className="orders-page__header">
        <h1 className="orders-page__title">Track Order {order.orderNumber}</h1>
        <p className="orders-page__subtitle">
          Placed on {formatDateShort(order.createdAt)} &bull; Status: Current status is{' '}
          <strong className="text-[var(--color-text-primary)]">
            {ORDER_STATUS_LABELS[order.status] ?? order.status}
          </strong>
        </p>
      </div>

      {/* Order Status Timeline Bar */}
      <section className="orders-page__timeline-card">
        <h2 className="orders-page__timeline-title">Order Progress</h2>
        <div className="orders-page__timeline">
          {timelineSteps.map((step) => {
            const state = getStepStatus(step.id)
            return (
              <div
                key={step.id}
                className={`orders-page__timeline-step ${
                  state === 'completed'
                    ? 'orders-page__timeline-step--completed'
                    : state === 'active'
                    ? 'orders-page__timeline-step--active'
                    : ''
                }`}
              >
                <div className="orders-page__timeline-dot">
                  {state === 'completed' ? <IconCheck className="w-3.5 h-3.5" /> : null}
                  {state === 'active' ? '•' : null}
                </div>
                <span className="orders-page__timeline-label">{step.label}</span>
                <span className="orders-page__timeline-desc">{step.desc}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Order Details Grid */}
      <div className="orders-page__details-grid">
        {/* Left Column — Items List */}
        <section className="checkout-page__section">
          <h2 className="checkout-page__section-title">
            Items in this order ({order.items.length})
          </h2>

          <div className="checkout-page__summary-list max-h-none">
            {order.items.map((item) => (
              <div
                key={`${item.productId}-${item.sizeEu}`}
                className="checkout-page__summary-item py-3 border-b border-[var(--color-border-subtle)] last:border-0"
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
                  <Link
                    href={`/shop/${item.slug}`}
                    className="checkout-page__summary-item-name hover:underline"
                  >
                    {item.name}
                  </Link>
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
        </section>

        {/* Right Column — Shipping & Tracking Sidebar */}
        <aside className="checkout-page__summary">
          <h2 className="checkout-page__summary-title">Tracking & Details</h2>

          <div>
            <h3 className="checkout-page__label">Shipment Tracking</h3>
            <p className="mt-1.5 text-sm text-[var(--color-text-primary)]">
              Carrier: {order.carrier || 'TCS / Royal Mail'}
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--color-accent)]">
              Tracking #: {order.trackingNumber || 'PK984712093'}
            </p>
            <p className="mt-2 text-xs text-[var(--color-text-muted)]">
              Est. Delivery: {order.estimatedDelivery}
            </p>
          </div>

          <div className="border-t border-[var(--color-border-subtle)] pt-4">
            <h3 className="checkout-page__label">Delivery Address</h3>
            <p className="mt-1.5 text-xs text-[var(--color-text-secondary)] leading-relaxed">
              {order.shippingAddress.fullName}<br />
              {order.shippingAddress.address1}
              {order.shippingAddress.address2 ? `, ${order.shippingAddress.address2}` : ''}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country === 'PK' ? 'Pakistan' : order.shippingAddress.country}
            </p>
          </div>

          <div className="checkout-page__summary-rows">
            <div className="checkout-page__summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="checkout-page__summary-row">
              <span>Shipping</span>
              <span>{order.shippingCost === 0 ? 'Free' : formatPrice(order.shippingCost)}</span>
            </div>
            <div className="checkout-page__summary-total">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
