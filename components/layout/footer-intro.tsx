import Link from 'next/link'
import { IconArrowRight, IconCheck } from '@/components/icons'

const SERVICE_POINTS = [
  { label: 'Easy returns', href: '/support/returns' },
  { label: 'Secure checkout', href: '/checkout/payment' },
  { label: 'Shipping support', href: '/support/shipping' },
  { label: 'Material-first design', href: '/brand' },
]

const PROOF_POINTS = [
  {
    value: '04',
    label: 'product contexts',
    detail: 'Ground · Field · Floor · Track',
  },
  {
    value: '01',
    label: 'point of view',
    detail: 'Material-first, always.',
  },
  {
    value: '00',
    label: 'visible logos',
    detail: 'Quiet by intention.',
  },
]

export function FooterIntro() {
  return (
    <section
      className="relative overflow-hidden border-t border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]"
      aria-labelledby="footer-intro-title"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 18%, rgba(255,255,255,0.85), transparent 32%), radial-gradient(circle at 82% 78%, rgba(188,174,157,0.18), transparent 36%)',
        }}
      />

      <div className="container relative py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[var(--color-border-default)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
            OFFLINE / Everyday footwear
          </span>
          <h2
            id="footer-intro-title"
            className="mt-6 text-4xl font-light leading-[1.05] tracking-[-0.04em] md:text-6xl"
          >
            Made for the life you&apos;re actually living.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[var(--color-text-secondary)] md:text-base">
            Contemporary footwear. Material-first design. No visible branding.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-primary)]/80 backdrop-blur-sm md:grid-cols-3">
          {PROOF_POINTS.map((point, index) => (
            <div
              key={point.label}
              className={'px-6 py-8 text-center md:px-8 md:py-10 ' + (index > 0 ? 'border-t border-[var(--color-border-default)] md:border-l md:border-t-0' : '')}
            >
              <p className="text-4xl font-light tracking-[-0.06em] md:text-5xl">
                {point.value}
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em]">
                {point.label}
              </p>
              <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                {point.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs text-[var(--color-text-secondary)] md:text-sm">
          {SERVICE_POINTS.map((point) => (
            <Link
              key={point.label}
              href={point.href}
              className="group inline-flex items-center gap-2 transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-text-primary)]"
            >
              <IconCheck className="h-4 w-4" />
              <span>{point.label}</span>
              <IconArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
