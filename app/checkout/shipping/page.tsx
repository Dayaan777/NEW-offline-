'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { formatPrice } from '@/lib/utils'
import { CheckoutSteps } from '@/components/checkout/checkout-steps'
import { CheckoutSummary } from '@/components/checkout/checkout-summary'
import { DELIVERY_OPTIONS } from '@/lib/data/commerce'

export default function CheckoutShippingPage() {
  const router = useRouter()
  const { cart } = useCart()

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'PK',
    phone: '',
    deliveryMethod: 'standard',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Load existing saved details if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('offline_checkout_shipping')
      if (saved) {
        setFormData((prev) => ({ ...prev, ...JSON.parse(saved) }))
      }
    } catch {
      // Ignore parse error
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.address1.trim()) newErrors.address1 = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State / Region is required'
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      localStorage.setItem('offline_checkout_shipping', JSON.stringify(formData))
    } catch {
      // Storage error fallback
    }

    router.push('/checkout/payment')
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

  return (
    <div className="checkout-page">
      <div className="checkout-page__header">
        <h1 className="checkout-page__title">Checkout</h1>
        <CheckoutSteps currentStep="shipping" />
      </div>

      <div className="checkout-page__layout">
        <form onSubmit={handleSubmit} className="checkout-page__form">
          {/* Contact Information */}
          <section className="checkout-page__section">
            <h2 className="checkout-page__section-title">Contact information</h2>
            <div className="checkout-page__input-group">
              <label htmlFor="email" className="checkout-page__label">
                Email address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="alex.kim@example.com"
                className="checkout-page__input"
              />
              {errors.email && (
                <span className="text-xs text-[var(--color-error)]">{errors.email}</span>
              )}
            </div>
          </section>

          {/* Shipping Address */}
          <section className="checkout-page__section">
            <h2 className="checkout-page__section-title">Shipping address</h2>

            <div className="checkout-page__input-group">
              <label htmlFor="fullName" className="checkout-page__label">
                Full name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Alex Kim"
                className="checkout-page__input"
              />
              {errors.fullName && (
                <span className="text-xs text-[var(--color-error)]">{errors.fullName}</span>
              )}
            </div>

            <div className="checkout-page__input-group">
              <label htmlFor="address1" className="checkout-page__label">
                Address line 1 *
              </label>
              <input
                id="address1"
                name="address1"
                type="text"
                required
                value={formData.address1}
                onChange={handleChange}
                placeholder="14 Weston Street"
                className="checkout-page__input"
              />
              {errors.address1 && (
                <span className="text-xs text-[var(--color-error)]">{errors.address1}</span>
              )}
            </div>

            <div className="checkout-page__input-group">
              <label htmlFor="address2" className="checkout-page__label">
                Address line 2 (optional)
              </label>
              <input
                id="address2"
                name="address2"
                type="text"
                value={formData.address2}
                onChange={handleChange}
                placeholder="Apt, suite, unit"
                className="checkout-page__input"
              />
            </div>

            <div className="checkout-page__input-row checkout-page__input-row--3col">
              <div className="checkout-page__input-group">
                <label htmlFor="city" className="checkout-page__label">
                  City *
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="London"
                  className="checkout-page__input"
                />
              </div>

              <div className="checkout-page__input-group">
                <label htmlFor="state" className="checkout-page__label">
                  State / Region *
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="England"
                  className="checkout-page__input"
                />
              </div>

              <div className="checkout-page__input-group">
                <label htmlFor="postalCode" className="checkout-page__label">
                  Postal code *
                </label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="SE1 3ER"
                  className="checkout-page__input"
                />
              </div>
            </div>

            <div className="checkout-page__input-row checkout-page__input-row--2col">
              <div className="checkout-page__input-group">
                <label htmlFor="country" className="checkout-page__label">
                  Country *
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="checkout-page__select"
                >
                  <option value="PK">Pakistan</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                  <option value="AU">Australia</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="SA">Saudi Arabia</option>
                </select>
              </div>

              <div className="checkout-page__input-group">
                <label htmlFor="phone" className="checkout-page__label">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+92 300 1234567"
                  className="checkout-page__input"
                />
              </div>
            </div>
          </section>

          {/* Delivery Method */}
          <section className="checkout-page__section">
            <h2 className="checkout-page__section-title">Delivery method</h2>
            <div className="checkout-page__delivery-list">
              {DELIVERY_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className={`checkout-page__delivery-card ${
                    formData.deliveryMethod === option.id
                      ? 'checkout-page__delivery-card--selected'
                      : ''
                  }`}
                >
                  <div className="checkout-page__delivery-info">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value={option.id}
                      checked={formData.deliveryMethod === option.id}
                      onChange={handleChange}
                      className="checkout-page__delivery-radio"
                    />
                    <div>
                      <p className="checkout-page__delivery-label">{option.label}</p>
                      <p className="checkout-page__delivery-desc">{option.description}</p>
                    </div>
                  </div>
                  <span className="checkout-page__delivery-price">
                    {option.price === 0 ? 'Free' : formatPrice(option.price)}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <button type="submit" className="checkout-page__btn">
            Continue to Payment
          </button>
        </form>

        <CheckoutSummary deliveryMethodId={formData.deliveryMethod} />
      </div>
    </div>
  )
}
