import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { NewsletterForm } from '@/components/layout/newsletter-form'

const ABOUT_LINKS = [
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Shipping & Handling', href: '/support/shipping' },
  { label: 'Returns & Exchange', href: '/support/returns' },
  { label: 'Men & Women Size Chart', href: '/support/sizing' },
  { label: 'Boys & Girls Size Chart', href: '/support/sizing/kids' },
  { label: 'Our Blogs', href: '/journal' },
]

const SOCIAL_LINKS = [
  { label: 'Facebook', mark: 'f', href: 'https://facebook.com' },
  { label: 'Instagram', mark: '◎', href: 'https://instagram.com' },
  { label: 'LinkedIn', mark: 'in', href: 'https://linkedin.com' },
  { label: 'YouTube', mark: '▶', href: 'https://youtube.com' },
  { label: 'TikTok', mark: '♪', href: 'https://tiktok.com' },
]

const footerLink = 'text-[13px] leading-6 text-neutral-600 transition-colors hover:text-neutral-900'
const sectionHeading = 'h-5 whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.12em] text-neutral-900'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-300 bg-[#F4F1EA] text-neutral-600" aria-label="Site footer">
      <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-9 md:py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-4 lg:gap-16">
          <section aria-labelledby="footer-about">
            <h2 id="footer-about" className={sectionHeading}>About Us</h2>
            <ul className="mt-6 space-y-2">
              {ABOUT_LINKS.map((item) => (
                <li key={item.href}><Link href={item.href} className={footerLink}>{item.label}</Link></li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-signup">
            <h2 id="footer-signup" className={sectionHeading}>Sign Up and Save</h2>
            <NewsletterForm />
            <nav aria-label="Social media" className="mt-7 flex items-center gap-5">
              {SOCIAL_LINKS.map(({ label, href, mark }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in new tab)`} className="text-neutral-700 transition-colors hover:text-black">
                  <span aria-hidden="true" className="text-[16px] font-bold leading-none">{mark}</span>
                </a>
              ))}
            </nav>
          </section>

          <section aria-labelledby="footer-service">
            <h2 id="footer-service" className={sectionHeading}>Customer Service</h2>
            <div className="mt-6 space-y-2 text-[13px] leading-5 text-neutral-300">
              <p><a href="mailto:info@ismailsclothing.com" className="text-neutral-300 underline underline-offset-2 transition-colors hover:text-white">Email</a><span className="px-2">|</span><a href="https://wa.me/924232301095" className="text-neutral-300 underline underline-offset-2 transition-colors hover:text-white">Whatsapp</a></p>
              <p>Contact us at <a href="tel:+924232301095" className="text-neutral-300 underline underline-offset-2 transition-colors hover:text-white">042 32301095</a></p>
              <p className="pt-1">Office Timing<br />10am to 7pm<br />Monday to Saturday</p>
            </div>
          </section>

          <section aria-labelledby="footer-stores">
            <h2 id="footer-stores" className={sectionHeading}>Stores Location</h2>
            <Link href="/stores" className={`${footerLink} mt-6 inline-block`}>Stores Location</Link>
          </section>
        </div>
      </div>

      <div className="border-t border-neutral-300 px-5 py-4 text-[12px] tracking-[0.02em] text-neutral-600">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 md:flex-row">
          <span>© {year}, Ismail&apos;s Clothing</span>
          <nav aria-label="Footer legal links" className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-neutral-900">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-neutral-900">Terms</Link>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-900">Instagram</a>
          </nav>
        </div>
      </div>

      <a href="https://wa.me/924232301095" aria-label="Contact us on WhatsApp" className="fixed bottom-4 right-5 z-40 grid h-8 w-8 place-items-center rounded-full bg-[#25D366] text-white shadow-md transition-transform hover:scale-105">
        <MessageCircle size={20} fill="currentColor" aria-hidden="true" />
      </a>
    </footer>
  )
}

