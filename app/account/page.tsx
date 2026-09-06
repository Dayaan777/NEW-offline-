'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { mockOrders, ORDER_STATUS_LABELS } from '@/lib/data/commerce'
import { formatPrice, formatDateShort } from '@/lib/utils'
import type { Order } from '@/lib/types'

export default function AccountPage() {
  const [profile, setProfile] = useState({
    firstName: 'Alex',
    lastName: 'Kim',
    email: 'alex.kim@example.com',
    phone: '+92 300 1234567',
  })

  const [orders, setOrders] = useState<Order[]>([])
  const [savedSuccess, setSavedSuccess] = useState(false)

  useEffect(() => {
    // Combine built-in mock orders + any order completed in user session
    const combined: Order[] = [...mockOrders]
    try {
      const storedOrder = localStorage.getItem('offline_latest_order')
      if (storedOrder) {
        const parsed: Order = JSON.parse(storedOrder)
        if (!combined.some((o) => o.id === parsed.id || o.orderNumber === parsed.orderNumber)) {
          combined.unshift(parsed)
        }
      }
    } catch {
      // Ignore parse error
    }
    setOrders(combined)
  }, [])

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  return (
    <div className="account-page">
      <div className="account-page__header">
        <h1 className="account-page__title">Account</h1>
        <p className="account-page__subtitle">
          Manage your personal details, saved address, and order history.
        </p>
      </div>

      <div className="account-page__layout">
        {/* Profile & Settings Section */}
        <aside className="account-page__profile-card">
          <h2 className="account-page__card-title">Personal Details</h2>

          <form onSubmit={handleProfileSubmit} className="account-page__profile-fields">
            <div className="account-page__field">
              <label htmlFor="firstName" className="account-page__field-label">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))}
                className="account-page__input"
              />
            </div>

            <div className="account-page__field">
              <label htmlFor="lastName" className="account-page__field-label">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={profile.lastName}
                onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))}
                className="account-page__input"
              />
            </div>

            <div className="account-page__field">
              <label htmlFor="accountEmail" className="account-page__field-label">
                Email Address
              </label>
              <input
                id="accountEmail"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                className="account-page__input"
              />
            </div>

            <div className="account-page__field">
              <label htmlFor="accountPhone" className="account-page__field-label">
                Phone Number
              </label>
              <input
                id="accountPhone"
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                className="account-page__input"
              />
            </div>

            <div className="account-page__field pt-2">
              <span className="account-page__field-label">Default Shipping Address</span>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Main Boulevard, Gulberg III<br />
                Lahore, Punjab 54000, Pakistan
              </p>
            </div>

            <button type="submit" className="account-page__save-btn">
              {savedSuccess ? 'Saved ✓' : 'Save Details'}
            </button>
          </form>
        </aside>

        {/* Order History Section */}
        <section className="account-page__orders-section">
          <h2 className="checkout-page__section-title">
            Order History ({orders.length})
          </h2>

          {orders.length === 0 ? (
            <p className="text-sm text-[var(--color-text-muted)]">
              You haven&apos;t placed any orders yet.
            </p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="account-page__order-card">
                <div className="account-page__order-header">
                  <div>
                    <span className="account-page__order-num">{order.orderNumber}</span>
                    <span className="ml-3 account-page__order-date">
                      Placed on {formatDateShort(order.createdAt)}
                    </span>
                  </div>
                  <span
                    className={`account-page__status-pill account-page__status-pill--${order.status}`}
                  >
                    {ORDER_STATUS_LABELS[order.status] ?? order.status}
                  </span>
                </div>

                <div className="account-page__order-items">
                  {order.items.map((item) => (
                    <div
                      key={`${item.productId}-${item.sizeEu}`}
                      className="account-page__order-item"
                    >
                      <img
                        src={item.image.src}
                        alt={item.image.alt}
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = '/images/products/margin/off-white/01.png'
                        }}
                        className="account-page__order-item-img"
                      />
                      <div className="account-page__order-item-info">
                        <p className="account-page__order-item-name">{item.name}</p>
                        <p className="account-page__order-item-meta">
                          {item.colorLabel} &middot; EU {item.sizeEu} &middot; Qty {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="account-page__order-footer">
                  <span className="account-page__order-total">
                    Total: {formatPrice(order.total)}
                  </span>
                  <Link
                    href={`/orders/${order.id}`}
                    className="account-page__track-link"
                  >
                    Track Order &rarr;
                  </Link>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  )
}
