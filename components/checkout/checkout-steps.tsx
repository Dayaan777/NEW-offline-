import Link from 'next/link'

interface CheckoutStepsProps {
  currentStep: 'shipping' | 'payment' | 'confirmation'
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { id: 'shipping', label: '1. Shipping', href: '/checkout/shipping' },
    { id: 'payment', label: '2. Payment', href: '/checkout/payment' },
    { id: 'confirmation', label: '3. Confirmation', href: '#' },
  ]

  return (
    <nav aria-label="Checkout progress" className="checkout-page__steps">
      {steps.map((step, idx) => {
        const isCurrent = step.id === currentStep
        const isPast =
          (currentStep === 'payment' && step.id === 'shipping') ||
          (currentStep === 'confirmation' && step.id !== 'confirmation')

        return (
          <div key={step.id} className="flex items-center gap-3">
            {isPast ? (
              <Link href={step.href} className="checkout-page__step checkout-page__step--completed">
                {step.label}
              </Link>
            ) : (
              <span
                className={`checkout-page__step ${
                  isCurrent ? 'checkout-page__step--active' : ''
                }`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {step.label}
              </span>
            )}
            {idx < steps.length - 1 && (
              <span className="checkout-page__step-sep" aria-hidden="true">
                /
              </span>
            )}
          </div>
        )
      })}
    </nav>
  )
}
