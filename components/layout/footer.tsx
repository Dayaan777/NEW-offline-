import Link from 'next/link'
import { NewsletterForm } from '@/components/layout/newsletter-form'

// ─── Link data ────────────────────────────────────────────────────────────────

const FOOTER_GROUPS = [
  {
    title: 'Shop',
    items: [
      { label: 'Ground', href: '/shop/ground' },
      { label: 'Field', href: '/shop/field' },
      { label: 'Floor', href: '/shop/floor' },
      { label: 'Track', href: '/shop/track' },
      { label: 'New Arrivals', href: '/shop/new' },
    ],
  },
  {
    title: 'The Brand',
    items: [
      { label: 'About', href: '/brand' },
      { label: 'Materials', href: '/brand/materials' },
      { label: 'Journal', href: '/journal' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Size Guide', href: '/support/sizing' },
      { label: 'Shipping', href: '/support/shipping' },
      { label: 'Returns', href: '/support/returns' },
      { label: 'FAQ', href: '/support/faq' },
      { label: 'Contact', href: '/support/contact' },
    ],
  },
]

// ─── Shared styles ────────────────────────────────────────────────────────────

const footerLink =
  'group inline-flex min-h-8 items-center text-[15px] text-[var(--color-text-inverse-muted)] underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:text-[var(--color-text-inverse)] hover:decoration-[var(--color-text-inverse-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-text-inverse)]'

// ─── Component ────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)]"
      aria-label="Site footer"
    >
      <div className="container py-14 md:py-20">
        {/* Brand lead-in */}
        <div className="mb-14 flex flex-col gap-8 border-b border-[var(--color-border-inverse)] pb-12 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/"
              aria-label="OFFLINE home"
              className="inline-flex transition-opacity duration-150 hover:opacity-75 focus-visible:opacity-75 focus-visible:outline-none"
            >
              <img
                src="/images/offline-logo-current-transparent.png"
                alt="OFFLINE"
                className="h-auto w-36 object-contain md:w-44"
              />
            </Link>
            <p className="mt-6 max-w-[280px] text-[15px] leading-relaxed text-[var(--color-text-inverse-muted)]">
              New product when it&apos;s ready. Nothing else.
            </p>
          </div>

          <Link
            href="/shop"
            className="group inline-flex w-fit items-center gap-3 border-b border-[var(--color-text-inverse-muted)] pb-2 text-[14px] uppercase tracking-[0.12em] text-[var(--color-text-inverse)] transition-colors duration-150 hover:border-[var(--color-text-inverse)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-text-inverse)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-bg-inverse)]"
          >
            Explore the collection
            <span aria-hidden="true" className="text-lg leading-none transition-transform duration-150 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-8">
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="label-category mb-5 text-[var(--color-text-inverse-muted)]">
                {group.title}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={footerLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <p className="label-category mb-5 text-[var(--color-text-inverse-muted)]">
              Stay informed
            </p>
            <p className="mb-6 max-w-[240px] text-[15px] leading-relaxed text-[var(--color-text-inverse-muted)]">
              New product when it&apos;s ready.{' '}
              <span className="text-[var(--color-text-inverse)]">Nothing else.</span>
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-[var(--color-border-inverse)] pt-8 sm:flex-row sm:items-center md:mt-20">
          <p className="text-[12px] text-[var(--color-text-inverse-muted)]">
            © {year} OFFLINE. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className={footerLink.replace('text-[15px]', 'text-[12px]')}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={footerLink.replace('text-[15px]', 'text-[12px]')}>
              Terms
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="OFFLINE on Instagram (opens in new tab)"
              className={footerLink.replace('text-[15px]', 'text-[12px]')}
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
