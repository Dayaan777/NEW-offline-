import Link from 'next/link'
import { NewsletterForm } from '@/components/layout/newsletter-form'

// ─── Link data ────────────────────────────────────────────────────────────────

const FOOTER_SHOP = [
  { label: 'Ground', href: '/shop/ground' },
  { label: 'Field', href: '/shop/field' },
  { label: 'Floor', href: '/shop/floor' },
  { label: 'Track', href: '/shop/track' },
  { label: 'New Arrivals', href: '/shop/new' },
]

const FOOTER_BRAND = [
  { label: 'About', href: '/brand' },
  { label: 'Materials', href: '/brand/materials' },
  { label: 'Journal', href: '/journal' },
]

const FOOTER_SUPPORT = [
  { label: 'Size Guide', href: '/support/sizing' },
  { label: 'Shipping', href: '/support/shipping' },
  { label: 'Returns', href: '/support/returns' },
  { label: 'FAQ', href: '/support/faq' },
  { label: 'Contact', href: '/support/contact' },
]

// ─── Shared link style ────────────────────────────────────────────────────────

const footerLink =
  'text-[15px] text-[var(--color-text-inverse-muted)] hover:text-[var(--color-text-inverse)] transition-colors duration-100'

// ─── Component ────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)]"
      aria-label="Site footer"
    >
      <div className="container py-16 md:py-20">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">

          {/* Shop */}
          <div>
            <p className="label-category text-[var(--color-text-inverse-muted)] mb-5">
              Shop
            </p>
            <ul className="space-y-3">
              {FOOTER_SHOP.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* The Brand */}
          <div>
            <p className="label-category text-[var(--color-text-inverse-muted)] mb-5">
              The Brand
            </p>
            <ul className="space-y-3">
              {FOOTER_BRAND.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="label-category text-[var(--color-text-inverse-muted)] mb-5">
              Support
            </p>
            <ul className="space-y-3">
              {FOOTER_SUPPORT.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <p className="label-category text-[var(--color-text-inverse-muted)] mb-5">
              Stay informed
            </p>
            <p className="text-[15px] text-[var(--color-text-inverse-muted)] mb-6 leading-relaxed max-w-[240px]">
              New product when it&apos;s ready.{' '}
              <span className="text-[var(--color-text-inverse)]">Nothing else.</span>
            </p>
            <NewsletterForm />
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border-inverse)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <p className="text-[12px] text-[var(--color-text-inverse-muted)]">
            © {year} OFFLINE. All rights reserved.
          </p>

          <div className="flex items-center gap-5 flex-wrap">
            <Link
              href="/privacy"
              className="text-[12px] text-[var(--color-text-inverse-muted)] hover:text-[var(--color-text-inverse)] transition-colors duration-100"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[12px] text-[var(--color-text-inverse-muted)] hover:text-[var(--color-text-inverse)] transition-colors duration-100"
            >
              Terms
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="OFFLINE on Instagram (opens in new tab)"
              className="text-[12px] text-[var(--color-text-inverse-muted)] hover:text-[var(--color-text-inverse)] transition-colors duration-100"
            >
              Instagram
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
