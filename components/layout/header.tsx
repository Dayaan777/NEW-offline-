'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'
import {
  IconSearch,
  IconHeart,
  IconUser,
  IconBag,
  IconMenu,
  IconX,
  IconChevronDown,
} from '@/components/icons'

// ─── Nav data ─────────────────────────────────────────────────────────────────

type MegaId = 'men' | 'women'

type MegaColumn = {
  title: string
  items: { label: string; href: string }[]
}

type MegaFeatured = {
  name: string
  price: number
  originalPrice?: number
  image: string
  href: string
}

type MegaMenu = { columns: MegaColumn[]; featured: MegaFeatured[] }

type NavLink =
  | { label: string; type: 'mega'; id: MegaId; mega: MegaMenu; href?: never }
  | { label: string; type: 'link'; href: string; id?: never; mega?: never }

const MEGA_MENUS: Record<MegaId, MegaMenu> = {
  men: {
    columns: [
      {
        title: 'SHOP',
        items: [
          { label: 'Ground', href: '/shop/ground' },
          { label: 'Field', href: '/shop/field' },
          { label: 'Floor', href: '/shop/floor' },
          { label: 'Track', href: '/shop/track' },
          { label: 'View all', href: '/shop' },
        ],
      },
      {
        title: 'COLLECTIONS',
        items: [
          { label: 'New releases', href: '/shop/new' },
          { label: 'Best sellers', href: '/shop' },
          { label: 'The brand', href: '/brand' },
          { label: 'View all', href: '/shop' },
        ],
      },
    ],
    featured: [
      { name: 'Farrow', price: 39500, image: '/images/products/farrow/editorial.png', href: '/product/farrow' },
      { name: 'Margin — Off-white', price: 29500, image: '/images/products/margin/off-white/01.png', href: '/product/margin' },
    ],
  },
  women: {
    columns: [
      {
        title: 'SHOP',
        items: [
          { label: 'Ground', href: '/shop/ground' },
          { label: 'Field', href: '/shop/field' },
          { label: 'Floor', href: '/shop/floor' },
          { label: 'Track', href: '/shop/track' },
          { label: 'View all', href: '/shop' },
        ],
      },
      {
        title: 'COLLECTIONS',
        items: [
          { label: 'New releases', href: '/shop/new' },
          { label: 'Best sellers', href: '/shop' },
          { label: 'The brand', href: '/brand' },
          { label: 'View all', href: '/shop' },
        ],
      },
    ],
    featured: [
      { name: 'Croft', price: 18500, image: '/images/products/croft/editorial.png', href: '/product/croft' },
      { name: 'Weld', price: 26000, image: '/images/products/weld/editorial.png', href: '/product/weld' },
    ],
  },
}

const NAV_LINKS: NavLink[] = [
  { label: 'MEN', type: 'mega', id: 'men', mega: MEGA_MENUS.men },
  { label: 'WOMEN', type: 'mega', id: 'women', mega: MEGA_MENUS.women },
  { label: 'HOME', type: 'link', href: '/shop' },
  { label: 'SHOES', type: 'link', href: '/shop/floor' },
  { label: 'NEW RELEASES', type: 'link', href: '/shop/new' },
]

const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`

const MOBILE_LINKS = [
  { label: 'MEN', href: '/shop/new' },
  { label: 'WOMEN', href: '/shop/field' },
  { label: 'HOME', href: '/shop' },
  { label: 'SHOES', href: '/shop/floor' },
  { label: 'NEW RELEASES', href: '/shop/new' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { itemCount, openCart } = useCart()
  const { itemCount: wishlistCount } = useWishlist()

  const [openMegaMenu, setOpenMegaMenu] = useState<MegaId | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const mobileSearchRef = useRef<HTMLInputElement>(null)

  // Close everything on route change
  useEffect(() => {
    setIsMobileOpen(false)
    setIsSearchOpen(false)
    setOpenMegaMenu(null)
    setSearchQuery('')
  }, [pathname])

  // Track scroll position to trigger the header background
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus()
  }, [isSearchOpen])

  // Close mega menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMegaMenu(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close search on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isSearchOpen) { setIsSearchOpen(false); setSearchQuery('') }
        if (isMobileOpen) setIsMobileOpen(false)
        setOpenMegaMenu(null)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isSearchOpen, isMobileOpen])

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent, closeMobile = false) => {
      e.preventDefault()
      const q = searchQuery.trim()
      if (!q) return
      router.push(`/search?q=${encodeURIComponent(q)}`)
      setIsSearchOpen(false)
      if (closeMobile) setIsMobileOpen(false)
      setSearchQuery('')
    },
    [router, searchQuery]
  )

  const handleMegaMenuKey = (e: React.KeyboardEvent, id: MegaId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpenMegaMenu((prev) => (prev === id ? null : id))
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen((v) => !v)
    setSearchQuery('')
    setOpenMegaMenu(null)
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className="group fixed inset-x-0 top-0 z-50 h-24 overflow-x-clip border-b border-transparent bg-transparent transition-colors duration-200 md:h-[92px]"
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.78),rgba(10,10,10,0.45)_55%,rgba(10,10,10,0.12)_100%)] transition-opacity duration-200 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-x-0 top-0 flex h-8 items-center border-b border-white/10 bg-[#1b1b1b] md:h-10">
          <button type="button" aria-label="Previous announcement" className="absolute left-1/2 top-1/2 hidden -translate-x-[320px] -translate-y-1/2 px-2 text-[14px] leading-none text-white/90 transition-opacity hover:opacity-60 md:block">←</button>
          <p className="absolute left-1/2 top-1/2 flex w-max -translate-x-1/2 -translate-y-1/2 items-center text-[9px] font-semibold uppercase tracking-[0.08em] text-white md:text-[11px]">SALE LIVE NOW. UP TO 50% OFF</p>
          <button type="button" aria-label="Next announcement" className="absolute left-1/2 top-1/2 hidden translate-x-[320px] -translate-y-1/2 px-2 text-[14px] leading-none text-white/90 transition-opacity hover:opacity-60 md:block">→</button>
        </div>
        <div className="h-full w-full px-5 md:px-10 lg:px-20">

          {/* ── Desktop layout ─────────────────────────────────────────────── */}
          <div className="relative hidden h-[64px] items-center md:absolute md:inset-x-12 md:top-[40px] md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4 lg:inset-x-16 lg:gap-8 [&_a]:!text-[var(--color-text-inverse)] [&_button]:!text-[var(--color-text-inverse)]">

            {/* Left — primary navigation */}
            <nav className="flex min-w-0 items-center gap-3 whitespace-nowrap lg:gap-6" aria-label="Main navigation">
              {NAV_LINKS.map((link) =>
                link.type === 'mega' ? (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => setOpenMegaMenu(link.id)}
                    onMouseLeave={() => setOpenMegaMenu(null)}
                  >
                    <button
                      aria-expanded={openMegaMenu === link.id}
                      aria-haspopup="true"
                      onKeyDown={(e) => handleMegaMenuKey(e, link.id)}
                      className="flex items-center gap-1 text-[12px] tracking-[0.02em] text-[color:var(--color-text-inverse)] transition-opacity duration-100 hover:opacity-70 focus:outline-none focus-visible:opacity-70"
                    >
                      {link.label}
                      <IconChevronDown className={`h-3 w-3 transition-transform duration-150 ${openMegaMenu === link.id ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setOpenMegaMenu(null)}
                    className="group/navlink relative py-1 text-[12px] tracking-[0.02em] text-[color:var(--color-text-inverse)] transition-opacity duration-100 hover:opacity-90"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[color:var(--color-text-inverse)] transition-transform duration-300 ease-out group-hover/navlink:scale-x-100"
                    />
                  </Link>
                )
              )}
            </nav>

            {/* Mega menu panel — full-width, spans below the entire header */}
            {(['men', 'women'] as MegaId[]).map((id) => {
              const menu = MEGA_MENUS[id]
              return (
                <div
                  key={id}
                  onMouseEnter={() => setOpenMegaMenu(id)}
                  onMouseLeave={() => setOpenMegaMenu(null)}
                  className={`fixed inset-x-0 top-[104px] z-40 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] shadow-[var(--shadow-overlay)] transition-all duration-200 ease-out md:top-[92px] ${
                    openMegaMenu === id
                      ? 'pointer-events-auto translate-y-0 opacity-100'
                      : 'pointer-events-none -translate-y-1 opacity-0'
                  }`}
                  role="menu"
                  aria-label={`${id} menu`}
                >
                  <div className="mx-auto flex max-w-[1200px] items-start gap-16 px-10 py-10 lg:px-16">
                    <div className="flex flex-1 gap-16">
                      {menu.columns.map((col) => (
                        <div key={col.title} className="flex flex-col gap-3">
                          <span className="text-[11px] tracking-[0.08em] text-[var(--color-text-tertiary)]">{col.title}</span>
                          <ul className="flex flex-col gap-2.5">
                            {col.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  role="menuitem"
                                  onClick={() => setOpenMegaMenu(null)}
                                  className="text-[13px] tracking-[0.01em] text-[var(--color-text-secondary)] transition-colors duration-100 hover:text-[color:var(--color-text-primary)]"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-shrink-0 gap-6">
                      {menu.featured.map((product) => (
                        <Link
                          key={product.href}
                          href={product.href}
                          onClick={() => setOpenMegaMenu(null)}
                          className="group/product w-[168px] flex-shrink-0"
                        >
                          <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--color-bg-secondary)]">
                            <img
                              src={product.image || '/placeholder.svg'}
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/product:scale-105"
                            />
                          </div>
                          <p className="mt-3 text-[13px] text-[var(--color-text-primary)]">{product.name}</p>
                          <p className="mt-0.5 flex items-center gap-2 text-[13px]">
                            <span className="text-[var(--color-text-secondary)]">{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                              <span className="text-[var(--color-text-tertiary)] line-through">{formatPrice(product.originalPrice)}</span>
                            )}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Center — independent wordmark */}
            <Link href="/" aria-label="OFFLINE home" className="group justify-self-center transition-opacity duration-200 hover:opacity-80">
              <img src="/images/offline-logo-current-transparent.png" alt="OFFLINE" className="h-auto w-28 object-contain lg:w-36" />
            </Link>

            {/* Right — utility icons */}
            <div className="flex items-center justify-end gap-4 lg:gap-5">
              {isSearchOpen && (
                <form onSubmit={handleSearchSubmit} className="absolute right-32 top-1/2 flex w-[240px] -translate-y-1/2 items-center" role="search">
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search footwear..."
                    aria-label="Search"
                    className="w-full border-b border-[var(--color-text-inverse)] bg-transparent pb-1 text-[15px] text-[color:var(--color-text-inverse)] placeholder:text-[var(--color-text-inverse-muted)] focus:border-[var(--color-text-inverse)] focus:outline-none"
                  />
                </form>
              )}
              <button onClick={toggleSearch} aria-label={isSearchOpen ? 'Close search' : 'Search'} className="text-[color:var(--color-text-inverse)] transition-opacity duration-100 hover:opacity-70 focus:outline-none">
                {isSearchOpen ? <IconX className="h-5 w-5" /> : <IconSearch className="h-[18px] w-[18px]" />}
              </button>
              <Link href="/account" aria-label="Account" className="text-[color:var(--color-text-inverse)] transition-opacity duration-100 hover:opacity-70">
                <IconUser className="h-[18px] w-[18px]" />
              </Link>
              <button onClick={openCart} aria-label={`Cart${itemCount > 0 ? `, ${itemCount} item${itemCount !== 1 ? 's' : ''}` : ''}`} className="relative text-[color:var(--color-text-inverse)] transition-opacity duration-100 hover:opacity-70 focus:outline-none">
                <IconBag className="h-[18px] w-[18px]" />
                {itemCount > 0 && <span aria-hidden="true" className="absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center bg-[var(--color-accent)] px-[3px] text-[10px] font-medium leading-none text-[color:var(--color-text-inverse)]">{itemCount > 9 ? '9+' : itemCount}</span>}
              </button>
            </div>
          </div>

          {/* ── Mobile layout ──────────────────────────────────────────────── */}
          <div className="absolute inset-x-0 top-8 grid h-16 grid-cols-3 items-center px-4 md:hidden">
            <div className="flex items-center gap-5 self-stretch">
              <button
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open navigation menu"
                className="flex translate-x-1 items-center justify-center text-[color:var(--color-text-inverse)] opacity-100 transition-opacity duration-100 hover:opacity-70 focus:outline-none"
              >
                <IconMenu className="h-[18px] w-[18px]" />
              </button>
              <button
                onClick={toggleSearch}
                aria-label={isSearchOpen ? 'Close search' : 'Search'}
                className="flex translate-x-1 items-center justify-center text-[color:var(--color-text-inverse)] opacity-100 transition-opacity duration-100 hover:opacity-70 focus:outline-none"
              >
                {isSearchOpen ? <IconX className="h-[18px] w-[18px]" /> : <IconSearch className="h-[18px] w-[18px]" />}
              </button>
            </div>

            <Link
              href="/"
              aria-label="OFFLINE home"
              className="justify-self-center transition-opacity duration-200 hover:opacity-80"
            >
              <img src="/images/offline-logo-current-transparent.png" alt="OFFLINE" className="h-auto w-24 object-contain" />
            </Link>

            <button
              onClick={openCart}
              aria-label={`Cart${itemCount > 0 ? `, ${itemCount} item${itemCount !== 1 ? 's' : ''}` : ''}`}
              className="relative flex h-full -translate-x-1 items-center justify-self-end text-[color:var(--color-text-inverse)] opacity-100 transition-opacity duration-100 hover:opacity-70 focus:outline-none"
            >
              <IconBag className="h-[18px] w-[18px]" />
              {itemCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 -right-2 min-w-[16px] h-4 bg-[var(--color-accent)] text-[color:var(--color-text-inverse)] text-[10px] font-medium leading-none flex items-center justify-center px-[3px]"
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile navigation overlay ───────────────────────────────────────── */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-[var(--color-bg-inverse)] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          {/* Mobile overlay header */}
          <div className="flex items-center justify-between h-[60px] px-5 flex-shrink-0 border-b border-[var(--color-border-inverse)]">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="transition-opacity duration-200 hover:opacity-80"
            >
              <img src="/images/offline-logo-current-transparent.png" alt="OFFLINE" className="h-auto w-24 object-contain" />
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close menu"
              className="text-[color:var(--color-text-inverse)] opacity-60 hover:opacity-100 transition-opacity duration-100 focus:outline-none"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile search */}
          <div className="px-5 py-5 border-b border-[var(--color-border-inverse)] flex-shrink-0">
            <form
              onSubmit={(e) => handleSearchSubmit(e, true)}
              role="search"
              className="flex items-center gap-3"
            >
              <IconSearch className="w-4 h-4 text-[var(--color-text-inverse-muted)] flex-shrink-0" />
              <input
                ref={mobileSearchRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search footwear..."
                aria-label="Search"
                className="flex-1 bg-transparent text-[color:var(--color-text-inverse)] placeholder:text-[var(--color-text-inverse-muted)] text-[1rem] focus:outline-none"
              />
            </form>
          </div>

          {/* Mobile nav links — scrollable */}
          <nav
            className="flex-1 overflow-y-auto px-5 py-8"
            aria-label="Mobile navigation"
          >
              <ul className="flex flex-col gap-1">
                {MOBILE_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block py-2.5 text-[1.875rem] font-light leading-none text-[color:var(--color-text-inverse)] hover:opacity-60 transition-opacity duration-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
          </nav>

          {/* Mobile overlay footer — account + wishlist */}
          <div className="flex-shrink-0 px-5 py-5 border-t border-[var(--color-border-inverse)] flex items-center gap-6">
            <Link
              href="/wishlist"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2 text-[14px] text-[var(--color-text-inverse-muted)] hover:text-[color:var(--color-text-inverse)] transition-colors duration-100"
            >
              <IconHeart className="w-4 h-4" />
              Wishlist
              {wishlistCount > 0 && (
                <span className="text-[var(--color-text-inverse-muted)]">
                  ({wishlistCount})
                </span>
              )}
            </Link>
            <Link
              href="/account"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2 text-[14px] text-[var(--color-text-inverse-muted)] hover:text-[color:var(--color-text-inverse)] transition-colors duration-100"
            >
              <IconUser className="w-4 h-4" />
              Account
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
