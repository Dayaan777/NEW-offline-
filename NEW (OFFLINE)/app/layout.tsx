import type { Metadata } from 'next'
import { DM_Sans, Instrument_Serif } from 'next/font/google'
import { CartProvider } from '@/context/cart-context'
import { WishlistProvider } from '@/context/wishlist-context'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import '@/app/globals.css'

// ─── Fonts ────────────────────────────────────────────────────────────────────

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-primary',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-editorial',
  display: 'swap',
})

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "OFFLINE — Footwear for the life you're actually living",
    template: '%s — OFFLINE',
  },
  description:
    "OFFLINE makes contemporary footwear for the life you're actually living. Four product contexts: Ground, Field, Floor, Track.",
  keywords: ['footwear', 'shoes', 'leather shoes', 'contemporary footwear', 'OFFLINE'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'OFFLINE',
    title: "OFFLINE — Footwear for the life you're actually living",
    description:
      'Contemporary footwear. Material-first design. No visible branding.',
  },
  robots: { index: true, follow: true },
}

// ─── Root layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <CartProvider>
          <WishlistProvider>
            {/* Fixed header — 60px height, accounted for with pt-[60px] on main */}
            <Header />

            {/* Page content — offset for fixed header */}
            <main className="min-h-[calc(100dvh-60px)] pt-[60px]">
              {children}
            </main>

            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
