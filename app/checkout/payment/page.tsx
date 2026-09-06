'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { CheckoutSteps } from '@/components/checkout/checkout-steps'
import { CheckoutSummary } from '@/components/checkout/checkout-summary'
import { DELIVERY_OPTIONS } from '@/lib/data/commerce'
import type { Order } from '@/lib/types'

export default function CheckoutPaymentPage() {
  const router = useRouter()
  const { cart, subtotal } = useCart()

  const [shippingData, setShippingData] = useState({
    email: 'alex.kim@example.com',
    fullName: 'Alex Kim',
    address1: 'Main Boulevard, Gulberg III',
    address2: '',
    city: 'Lahore',
    state: 'Punjab',
    postalCode: '54000',
    country: 'PK',
    phone: '',
    deliveryMethod: 'standard',
  })

  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem('offline_checkout_shipping')
      if (saved) {
        setShippingData((prev) => ({ ...prev, ...JSON.parse(saved) }))
      }
    } catch {
      // Fall back to default
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}
    if (!paymentData.cardName.trim()) newErrors.cardName = 'Name on card is required'
    if (!paymentData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
    if (!paymentData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required'
    if (!paymentData.cardCvv.trim()) newErrors.cardCvv = 'CVV is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const deliveryOption =
      DELIVERY_OPTIONS.find((d) => d.id === shippingData.deliveryMethod) ??
      DELIVERY_OPTIONS[0]
    const shippingCost = deliveryOption.price
    const grandTotal = subtotal + shippingCost

    const orderNumber = `OFL-${Math.floor(1000 + Math.random() * 9000)}`

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      status: 'confirmed',
      items: cart.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        sizeEu: item.sizeEu,
        colorLabel: item.colorLabel,
        image: item.image,
        slug: item.slug,
      })),
      shippingAddress: {
        fullName: shippingData.fullName || 'Alex Kim',
        address1: shippingData.address1 || '14 Weston Street',
        address2: shippingData.address2,
        city: shippingData.city || 'London',
        state: shippingData.state || 'England',
        postalCode: shippingData.postalCode || 'SE1 3ER',
        country: shippingData.country || 'GB',
        phone: shippingData.phone,
      },
      deliveryMethod: (shippingData.deliveryMethod as 'standard' | 'express') || 'standard',
      subtotal,
      shippingCost,
      total: grandTotal,
      createdAt: new Date().toISOString(),
      estimatedDelivery:
        shippingData.deliveryMethod === 'express' ? '1–2 business days' : '3–5 business days',
    }

    try {
      localStorage.setItem('offline_latest_order', JSON.stringify(newOrder))
    } catch {
      // Storage fallback
    }

    router.push('/checkout/confirmation')
  }

  if (cart.items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="cart-page__empty">
          <p className="cart-page__empty-text">
            Your cart is empty. Add something before checking out.
          </p>
          <Link href="/shop" className="cart-page__empty-cta">
            Browse the collection
          </Link>
        </div>
      </div>
    )
  }

  const deliveryLabel =
    DELIVERY_OPTIONS.find((d) => d.id === shippingData.deliveryMethod)?.label ??
    'Standard Delivery'

  return (
    <div className="checkout-page">
      <div className="checkout-page__header">
        <h1 className="checkout-page__title">Checkout</h1>
        <CheckoutSteps currentStep="payment" />
      </div>

      <div className="checkout-page__layout">
        <form onSubmit={handlePlaceOrder} className="checkout-page__form">
          {/* Shipping Review Box */}
          <section className="checkout-page__section">
            <h2 className="checkout-page__section-title">Shipping summary</h2>
            <div className="checkout-page__review-box">
              <div className="checkout-page__review-row">
                <span className="checkout-page__review-label">Contact</span>
                <span className="checkout-page__review-value">{shippingData.email}</span>
                <Link href="/checkout/shipping" className="checkout-page__review-edit">
                  Edit
                </Link>
              </div>
              <div className="checkout-page__review-row">
                <span className="checkout-page__review-label">Ship to</span>
                <span className="checkout-page__review-value">
                  {shippingData.fullName}, {shippingData.address1}
                  {shippingData.address2 ? `, ${shippingData.address2}` : ''},{' '}
                  {shippingData.city}, {shippingData.postalCode}
                </span>
                <Link href="/checkout/shipping" className="checkout-page__review-edit">
                  Edit
                </Link>
              </div>
              <div className="checkout-page__review-row">
                <span className="checkout-page__review-label">Method</span>
                <span className="checkout-page__review-value">{deliveryLabel}</span>
                <Link href="/checkout/shipping" className="checkout-page__review-edit">
                  Edit
                </Link>
              </div>
            </div>
          </section>

          {/* Payment Details */}
          <section className="checkout-page__section">
            <h2 className="checkout-page__section-title">Payment details</h2>

            <div className="checkout-page__input-group">
              <label htmlFor="cardName" className="checkout-page__label">
                Name on card *
              </label>
              <input
                id="cardName"
                name="cardName"
                type="text"
                required
                value={paymentData.cardName}
                onChange={handleChange}
                placeholder="Alex Kim"
                className="checkout-page__input"
              />
              {errors.cardName && (
                <span className="text-xs text-[var(--color-error)]">{errors.cardName}</span>
              )}
            </div>

            <div className="checkout-page__input-group">
              <label htmlFor="cardNumber" className="checkout-page__label">
                Card number *
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                required
                maxLength={19}
                value={paymentData.cardNumber}
                onChange={handleChange}
                placeholder="4532 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 8892"
                className="checkout-page__input"
              />
              {errors.cardNumber && (
                <span className="text-xs text-[var(--color-error)]">{errors.cardNumber}</span>
              )}
            </div>

            <div className="checkout-page__input-row checkout-page__input-row--2col">
              <div className="checkout-page__input-group">
                <label htmlFor="cardExpiry" className="checkout-page__label">
                  Expiry date *
                </label>
                <input
                  id="cardExpiry"
                  name="cardExpiry"
                  type="text"
                  required
                  maxLength={5}
                  value={paymentData.cardExpiry}
                  onChange={handleChange}
                  placeholder="MM / YY"
                  className="checkout-page__input"
                />
                {errors.cardExpiry && (
                  <span className="text-xs text-[var(--color-error)]">{errors.cardExpiry}</span>
                )}
              </div>

              <div className="checkout-page__input-group">
                <label htmlFor="cardCvv" className="checkout-page__label">
                  Security code (CVV) *
                </label>
                <input
                  id="cardCvv"
                  name="cardCvv"
                  type="text"
                  required
                  maxLength={4}
                  value={paymentData.cardCvv}
                  onChange={handleChange}
                  placeholder="123"
                  className="checkout-page__input"
                />
                {errors.cardCvv && (
                  <span className="text-xs text-[var(--color-error)]">{errors.cardCvv}</span>
                )}
              </div>
            </div>
          </section>

          <button type="submit" id="place-order-btn" className="checkout-page__btn">
            Place Order
          </button>
        </form>

        <CheckoutSummary deliveryMethodId={shippingData.deliveryMethod} />
      </div>
    </div>
  )
}
