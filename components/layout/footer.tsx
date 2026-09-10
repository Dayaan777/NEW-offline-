import Link from 'next/link'
import { NewsletterForm } from '@/components/layout/newsletter-form'

const FOOTER_ABOUT = [
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Shipping & Handling', href: '/support/shipping' },
  { label: 'Returns & Exchange', href: '/support/returns' },
  { label: "Men's & Women's Size Chart", href: '/support/sizing' },
  { label: 'Our Journal', href: '/journal' },
]

const FOOTER_SUPPORT = [
  { label: 'Size Guide', href: '/support/sizing' },
  { label: 'Shipping', href: '/support/shipping' },
  { label: 'Returns', href: '/support/returns' },
  { label: 'FAQ', href: '/support/faq' },
  { label: 'Contact', href: '/support/contact' },
]

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'tiktok' },
] as const

type SocialIconName = (typeof SOCIAL_LINKS)[number]['icon']

function SocialIcon({ name }: { name: SocialIconName }) {
  const sharedProps = {
    className: 'h-4 w-4',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true,
  }

  switch (name) {
    case 'facebook':
      return (
        <svg {...sharedProps}>
          <path d="M13.5 21v-8h2.75l.4-3h-3.15V8.1c0-.87.24-1.46 1.5-1.46h1.8V3.96c-.31-.04-1.37-.13-2.6-.13-2.57 0-4.33 1.57-4.33 4.46V10H7.1v3h2.77v8h3.63Z" />
        </svg>
      )

    case 'instagram':
      return (
        <svg
          {...sharedProps}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect
            x="3.5"
            y="3.5"
            width="17"
            height="17"
            rx="4"
          />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.7"
            r="1"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      )

    case 'linkedin':
      return (
        <svg {...sharedProps}>
          <path d="M5.2 8.1A2.1 2.1 0 1 0 5.2 4a2.1 2.1 0 0 0 0 4.1ZM3.4 20h3.6v-9.7H3.4V20Zm5.8 0h3.6v-5.4c0-1.42.27-2.8 2.03-2.8 1.73 0 1.75 1.62 1.75 2.9V20h3.6v-6c0-2.95-.64-5.21-4.1-5.21-1.67 0-2.79.92-3.25 1.79h-.05v-1.53H9.2V20Z" />
        </svg>
      )

    case 'youtube':
      return (
        <svg {...sharedProps}>
          <path d="M21.6 7.2a2.9 2.9 0 0 0-2.04-2.05C17.76 4.67 12 4.67 12 4.67s-5.76 0-7.56.48A2.9 2.9 0 0 0 2.4 7.2 30 30 0 0 0 1.92 12c0 1.6.18 3.2.48 4.8a2.9 2.9 0 0 0 2.04 2.05c1.8.48 7.56.48 7.56.48s5.76 0 7.56-.48a2.9 2.9 0 0 0 2.04-2.05c.3-1.6.48-3.2.48-4.8s-.18-3.2-.48-4.8ZM10 15.33V8.67L15.33 12 10 15.33Z" />
        </svg>
      )

    case 'tiktok':
      return (
        <svg {...sharedProps}>
          <path d="M15.4 3h3.04c.2 1.54 1.08 2.88 2.56 3.55v3.12a8.4 8.4 0 0 1-2.55-.78v5.22a5.9 5.9 0 1 1-5.9-5.9c.22 0 .44.02.65.05v3.15a2.8 2.8 0 1 0 2.2 2.7V3Z" />
        </svg>
      )
  }
}

const footerLink =
  'inline-flex min-h-8 items-center text-[14px] leading-7 text-[var(--color-text-inverse-muted)] transition-colors duration-150 hover:text-[var(--color-text-inverse)] hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-text-inverse)]'

const footerHeading =
  'text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-inverse)]'

const footerHeadingStyle = {
  marginBottom: 'clamp(2.25rem, 3.5vw, 3.5rem)',
} as const

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)]"
      aria-label="Site footer"
    >
      {/* Main footer content */}
      <div className="container" style={{ paddingTop: 'clamp(4.5rem, 7vw, 6rem)', paddingBottom: 'clamp(3rem, 5vw, 4rem)' }}>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-8">

          {/* About Us */}
          <div>
            <p className={footerHeading} style={footerHeadingStyle}>
              About Us
            </p>

            <ul className="space-y-3">
              {FOOTER_ABOUT.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={footerLink}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sign Up and Save */}
          <div>
            <p className={footerHeading} style={footerHeadingStyle}>
              Sign Up and Save
            </p>

            <NewsletterForm />

            <nav
              aria-label="Social media"
              className="mt-10 flex items-center gap-5"
            >
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in new tab)`}
                  className="text-[var(--color-text-inverse-muted)] transition-colors duration-150 hover:text-[var(--color-text-inverse)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-text-inverse)]"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </nav>
          </div>

          {/* Customer Service */}
          <div>
            <p className={footerHeading} style={footerHeadingStyle}>
              Customer Service
            </p>

            <div className="space-y-3 text-[14px] leading-7 text-[var(--color-text-inverse-muted)]">

              <p>
                <Link
                  href="/support/contact"
                  className="underline underline-offset-4 hover:text-[var(--color-text-inverse)]"
                >
                  Email
                </Link>

                <span
                  className="px-1.5"
                  aria-hidden="true"
                >
                  |
                </span>

                <Link
                  href="/support/contact"
                  className="underline underline-offset-4 hover:text-[var(--color-text-inverse)]"
                >
                  WhatsApp
                </Link>
              </p>

              <ul className="space-y-[10px] pt-[2px]">
                {FOOTER_SUPPORT.slice(1, 4).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={footerLink}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="pt-[2px]">
                Monday to Saturday
              </p>

              <p>
                10am to 7pm
              </p>

            </div>
          </div>

          {/* Stores Location */}
          <div>
            <p className={footerHeading} style={footerHeadingStyle}>
              Stores Location
            </p>

            <div className="space-y-3 text-[14px] leading-7 text-[var(--color-text-inverse-muted)]">
              <p>
                Online Store
              </p>

              <Link
                href="/shop"
                className={footerLink}
              >
                Explore the collection
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex w-full justify-center border-t border-[var(--color-border-inverse)] pt-6 pb-2 text-center">
          <p className="text-[12px] text-[var(--color-text-inverse-muted)]">
            © {year}, OFFLINE. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
