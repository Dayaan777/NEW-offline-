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
import { CartDrawer } from '@/components/cart/cart-drawer'
import { SearchDrawer } from '@/components/search/search-drawer'

// ─── Nav data ─────────────────────────────────────────────────────────────────

interface MegaLinkItem {
  label: string
  href: string
  isHighlight?: boolean
  isSpecialPrice?: boolean
}

interface MegaColumn {
  title?: string
  items: MegaLinkItem[]
}

interface MegaMenuData {
  columns: MegaColumn[]
}

const MEN_MEGA_DATA: MegaMenuData = {
  columns: [
    {
      items: [
        { label: 'NEW ARRIVALS', href: '/shop/new', isHighlight: true },
        { label: 'SPECIAL PRICE', href: '/shop', isSpecialPrice: true },
        { label: 'BEST SELLERS', href: '/shop/shoes', isHighlight: true },
      ],
    },
    {
      title: 'CLOTHING',
      items: [
        { label: 'Tees', href: '/shop/men-tshirts' },
        { label: 'Polos', href: '/shop/men-polo' },
        { label: 'Summer Knits', href: '/shop/men-polo' },
        { label: 'Shirts', href: '/shop/men-shirts' },
        { label: 'Sweaters', href: '/shop/men-hoodie' },
        { label: 'Sweatshirts / Hoodies', href: '/shop/men-hoodie' },
        { label: 'Jeans', href: '/shop/men-pants' },
        { label: 'Cargo Pants', href: '/shop/men-pants' },
        { label: 'Trousers / Chinos', href: '/shop/men-pants' },
        { label: 'Joggers', href: '/shop/men-pants' },
        { label: 'Shorts', href: '/shop/men-pants' },
        { label: 'Co-ords', href: '/shop/men-tshirts' },
      ],
    },
    {
      title: 'ACCESSORIES',
      items: [
        { label: 'Shoes', href: '/shop/shoes' },
        { label: 'Jewellery', href: '/shop/shoes' },
        { label: 'Caps / Hats', href: '/shop/shoes' },
        { label: 'Sunglasses', href: '/shop/shoes' },
        { label: 'Perfumes', href: '/shop/shoes' },
        { label: 'Bags', href: '/shop/shoes' },
        { label: 'Belts', href: '/shop/shoes' },
        { label: 'Wallets', href: '/shop/shoes' },
        { label: 'Socks', href: '/shop/shoes' },
        { label: 'Underwears / Vests', href: '/shop/shoes' },
      ],
    },
    {
      title: 'HIGHLIGHTS',
      items: [
        { label: 'NEW RELEASES', href: '/shop/new', isHighlight: true },
        { label: 'THE BRAND', href: '/brand', isHighlight: true },
        { label: 'SUMMER ’26', href: '/shop/new', isHighlight: true },
        { label: 'ALL PRODUCTS', href: '/shop', isHighlight: true },
      ],
    },
  ],
}

const WOMEN_MEGA_DATA: MegaMenuData = {
  columns: [
    {
      items: [
        { label: 'NEW ARRIVALS', href: '/shop/new', isHighlight: true },
        { label: 'SPECIAL PRICE', href: '/shop', isSpecialPrice: true },
        { label: 'BEST SELLERS', href: '/shop/shoes', isHighlight: true },
      ],
    },
    {
      title: 'CLOTHING',
      items: [
        { label: 'Tees', href: '/shop/women-tshirts' },
        { label: 'Polos', href: '/shop/women-polo' },
        { label: 'Summer Knits', href: '/shop/women-polo' },
        { label: 'Shirts', href: '/shop/women-shirts' },
        { label: 'Sweaters', href: '/shop/women-hoodie' },
        { label: 'Sweatshirts / Hoodies', href: '/shop/women-hoodie' },
        { label: 'Jeans', href: '/shop/women-trousers' },
        { label: 'Cargo Pants', href: '/shop/women-trousers' },
        { label: 'Trousers / Chinos', href: '/shop/women-trousers' },
        { label: 'Joggers', href: '/shop/women-trousers' },
        { label: 'Shorts', href: '/shop/women-trousers' },
        { label: 'Co-ords', href: '/shop/women-tshirts' },
      ],
    },
    {
      title: 'ACCESSORIES',
      items: [
        { label: 'Shoes', href: '/shop/shoes' },
        { label: 'Jewellery', href: '/shop/shoes' },
        { label: 'Caps / Hats', href: '/shop/shoes' },
        { label: 'Sunglasses', href: '/shop/shoes' },
        { label: 'Perfumes', href: '/shop/shoes' },
        { label: 'Bags', href: '/shop/shoes' },
        { label: 'Belts', href: '/shop/shoes' },
        { label: 'Wallets', href: '/shop/shoes' },
        { label: 'Socks', href: '/shop/shoes' },
        { label: 'Underwears / Vests', href: '/shop/shoes' },
      ],
    },
    {
      title: 'HIGHLIGHTS',
      items: [
        { label: 'NEW RELEASES', href: '/shop/new', isHighlight: true },
        { label: 'THE BRAND', href: '/brand', isHighlight: true },
        { label: 'SUMMER ’26', href: '/shop/new', isHighlight: true },
        { label: 'ALL PRODUCTS', href: '/shop', isHighlight: true },
      ],
    },
  ],
}

function MegaMenuPanel({
  id,
  isOpen,
  isDarkTheme,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: {
  id: 'men' | 'women'
  isOpen: boolean
  isDarkTheme: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClose: () => void
}) {
  const data = id === 'men' ? MEN_MEGA_DATA : WOMEN_MEGA_DATA

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ left: '24px', right: '24px', top: '112px' }}
      className={`fixed z-40 max-h-[calc(100vh-125px)] overflow-y-auto border shadow-2xl rounded-sm transition-all duration-300 ease-out ${
        isDarkTheme
          ? 'bg-[#1A1714]/95 backdrop-blur-md border-[#3A342F] text-white'
          : 'bg-[var(--color-bg-primary)] border-[#D8D2CB] text-[var(--color-text-primary)]'
      } ${
        isOpen
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-2 opacity-0'
      }`}
      role="menu"
      aria-label={`${id} menu`}
    >
      {/* Outer padding: 48px top, 48px left/right */}
      <div style={{ padding: '48px 48px 40px 48px', maxWidth: '1240px', margin: '0 auto' }}>
        {/* 4-column grid with explicit gap */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '64px', alignItems: 'start' }}>
          {data.columns.map((col, colIdx) => (
            <div key={colIdx} style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Column header — 13px bold, preserves casing from data (CLOTHING, ACCESSORIES etc.) */}
              {col.title ? (
                <h3
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    lineHeight: '1',
                    marginBottom: '28px',
                    marginTop: 0,
                    color: isDarkTheme ? '#ffffff' : '#1A1714',
                    fontFamily: 'inherit',
                  }}
                >
                  {col.title}
                </h3>
              ) : (
                /* Baseline spacer: 13px line-height + 28px margin-bottom = 41px total, matching titled columns */
                <div aria-hidden="true" style={{ height: '41px', flexShrink: 0 }} />
              )}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {col.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group/megalink relative"
                      style={{
                        display: 'inline-block',
                        fontSize: '13px',
                        lineHeight: 1.4,
                        letterSpacing: item.isHighlight ? '0.1em' : '0.02em',
                        fontWeight: item.isSpecialPrice ? 700 : item.isHighlight ? 600 : 400,
                        textTransform: item.isSpecialPrice || item.isHighlight ? 'uppercase' : 'none',
                        color: item.isSpecialPrice
                          ? isDarkTheme ? '#f87171' : '#dc2626'
                          : isDarkTheme ? '#d4d0cc' : '#3D3D3D',
                        textDecoration: 'none',
                        transition: 'color 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement
                        el.style.color = item.isSpecialPrice
                          ? isDarkTheme ? '#fca5a5' : '#b91c1c'
                          : isDarkTheme ? '#ffffff' : '#7C5C3E'
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement
                        el.style.color = item.isSpecialPrice
                          ? isDarkTheme ? '#f87171' : '#dc2626'
                          : isDarkTheme ? '#d4d0cc' : '#3D3D3D'
                      }}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover/megalink:scale-x-100 group-focus-visible/megalink:scale-x-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

type MegaId = 'men' | 'women'

type NavLink =
  | { label: string; type: 'mega'; id: MegaId; href?: never }
  | { label: string; type: 'link'; href: string; id?: never }

const NAV_LINKS: NavLink[] = [
  { label: 'MEN', type: 'mega', id: 'men' },
  { label: 'WOMEN', type: 'mega', id: 'women' },
  { label: 'HOME', type: 'link', href: '/shop' },
  { label: 'SHOES', type: 'link', href: '/shop/shoes' },
  { label: 'NEW RELEASES', type: 'link', href: '/shop/new' },
]

const MOBILE_LINKS = [
  { label: 'Men', href: '/shop/men-tshirts' },
  { label: 'Women', href: '/shop/women-tshirts' },
  { label: 'Shoes', href: '/shop/shoes' },
  { label: 'New Releases', href: '/shop/new' },
  { label: 'All Products', href: '/shop' },
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

  // PDP, cart, checkout, search, wishlist, account, and orders pages have a light background — keep the gradient overlay always visible
  const isAlwaysOverlayRoute =
    /^\/shop\/[^/]+\/[^/]+/.test(pathname) ||   // PDP
    /^\/shop\/(men|women)-/.test(pathname) ||    // apparel category pages
    pathname === '/shop/shoes' ||                 // shoes overview
    pathname === '/cart' ||
    pathname.startsWith('/checkout') ||
    pathname === '/search' ||
    pathname === '/wishlist' ||
    pathname === '/account' ||
    pathname.startsWith('/orders')

  const isDarkTheme = !isScrolled && !isAlwaysOverlayRoute

  const headerRef = useRef<HTMLElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const mobileSearchRef = useRef<HTMLInputElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelMegaClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const scheduleMegaClose = useCallback(() => {
    cancelMegaClose()
    closeTimerRef.current = setTimeout(() => {
      setOpenMegaMenu(null)
    }, 180)
  }, [cancelMegaClose])

  const handleMegaOpen = useCallback(
    (id: MegaId) => {
      cancelMegaClose()
      setOpenMegaMenu(id)
    },
    [cancelMegaClose]
  )

  // Close everything on route change
  useEffect(() => {
    setIsMobileOpen(false)
    setIsSearchOpen(false)
    cancelMegaClose()
    setOpenMegaMenu(null)
    setSearchQuery('')
  }, [pathname, cancelMegaClose])

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
        cancelMegaClose()
        setOpenMegaMenu(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [cancelMegaClose])

  // Close search on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isSearchOpen) { setIsSearchOpen(false); setSearchQuery('') }
        if (isMobileOpen) setIsMobileOpen(false)
        cancelMegaClose()
        setOpenMegaMenu(null)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isSearchOpen, isMobileOpen, cancelMegaClose])

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
    cancelMegaClose()
    setOpenMegaMenu(null)
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className="group fixed inset-x-0 top-0 z-50 h-24 overflow-x-clip border-b border-transparent bg-transparent transition-colors duration-200 md:h-[112px]"
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.78),rgba(10,10,10,0.45)_55%,rgba(10,10,10,0.12)_100%)] transition-opacity duration-200 group-hover:opacity-100 ${isScrolled || isAlwaysOverlayRoute || openMegaMenu !== null ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-x-0 top-0 flex h-8 items-center border-b border-white/10 bg-[#1b1b1b] md:h-10">
          <button type="button" aria-label="Previous announcement" className="absolute left-1/2 top-1/2 hidden -translate-x-[320px] -translate-y-1/2 px-2 text-[14px] leading-none text-white/90 transition-opacity hover:opacity-60 md:block">←</button>
          <p className="absolute left-1/2 top-1/2 flex w-max -translate-x-1/2 -translate-y-1/2 items-center text-[9px] font-semibold uppercase tracking-[0.08em] text-white md:text-[11px]">SALE LIVE NOW. UP TO 50% OFF</p>
          <button type="button" aria-label="Next announcement" className="absolute left-1/2 top-1/2 hidden translate-x-[320px] -translate-y-1/2 px-2 text-[14px] leading-none text-white/90 transition-opacity hover:opacity-60 md:block">→</button>
        </div>
        <div className="h-full w-full px-5 md:px-10 lg:px-20">

          {/* ── Desktop layout ─────────────────────────────────────────────── */}
          <div className="relative hidden h-[72px] items-center md:absolute md:inset-x-12 md:top-[40px] md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4 lg:inset-x-16 lg:gap-8 [&_a]:!text-[var(--color-text-inverse)] [&_button]:!text-[var(--color-text-inverse)]">

            {/* Left — primary navigation */}
            <nav className="flex min-w-0 items-center gap-3 whitespace-nowrap lg:gap-6" aria-label="Main navigation">
              {NAV_LINKS.map((link) =>
                link.type === 'mega' ? (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => handleMegaOpen(link.id)}
                    onMouseLeave={scheduleMegaClose}
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
                    onMouseEnter={() => {
                      cancelMegaClose()
                      setOpenMegaMenu(null)
                    }}
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


            {/* Center — independent wordmark */}
            <Link href="/" aria-label="OFFLINE home" className="group justify-self-center transition-opacity duration-200 hover:opacity-80">
              <img src="/images/offline-logo-current-transparent.png" alt="OFFLINE" className="h-auto w-28 object-contain lg:w-36" />
            </Link>

            {/* Right — utility icons */}
            <div className="flex items-center justify-end gap-4 lg:gap-5">
              <button onClick={toggleSearch} aria-label="Search" className="text-[color:var(--color-text-inverse)] transition-opacity duration-100 hover:opacity-70 focus:outline-none">
                <IconSearch className="h-[18px] w-[18px]" />
              </button>
              <Link href="/account" aria-label="Account" className="text-[color:var(--color-text-inverse)] transition-opacity duration-100 hover:opacity-70">
                <IconUser className="h-[18px] w-[18px]" />
              </Link>
              <button onClick={openCart} aria-label={`Cart${itemCount > 0 ? `, ${itemCount} item${itemCount !== 1 ? 's' : ''}` : ''}`} className="text-[color:var(--color-text-inverse)] transition-opacity duration-100 hover:opacity-70 focus:outline-none">
                <span className="relative inline-flex items-center justify-center">
                  <IconBag className="h-[18px] w-[18px]" />
                  {itemCount > 0 && <span aria-hidden="true" className="absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center bg-[var(--color-accent)] px-[3px] text-[10px] font-medium leading-none text-[color:var(--color-text-inverse)]">{itemCount > 9 ? '9+' : itemCount}</span>}
                </span>
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
                aria-label="Search"
                className="flex translate-x-1 items-center justify-center text-[color:var(--color-text-inverse)] opacity-100 transition-opacity duration-100 hover:opacity-70 focus:outline-none"
              >
                <IconSearch className="h-[18px] w-[18px]" />
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
              className="flex h-full -translate-x-1 items-center justify-self-end text-[color:var(--color-text-inverse)] opacity-100 transition-opacity duration-100 hover:opacity-70 focus:outline-none"
            >
              <span className="relative inline-flex items-center justify-center">
                <IconBag className="h-[18px] w-[18px]" />
                {itemCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center bg-[var(--color-accent)] px-[3px] text-[10px] font-medium leading-none text-[color:var(--color-text-inverse)]"
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </span>
            </button>
          </div>

        </div>

        {/* Mega menu panels — outside the [&_a]:!text-inverse grid so link colors are not overridden */}
        {(['men', 'women'] as MegaId[]).map((id) => (
          <MegaMenuPanel
            key={id}
            id={id}
            isOpen={openMegaMenu === id}
            isDarkTheme={isDarkTheme}
            onMouseEnter={() => handleMegaOpen(id)}
            onMouseLeave={scheduleMegaClose}
            onClose={() => {
              cancelMegaClose()
              setOpenMegaMenu(null)
            }}
          />
        ))}
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

      {/* ── Cart drawer & Search drawer ── */}
      <CartDrawer />
      <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
