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

type DropdownId = 'clothing' | 'collections'

type DropdownItem = { label: string; href: string } | { divider: true }

type NavLink =
  | { label: string; id: DropdownId; href?: never; dropdown: DropdownItem[] }
  | { label: string; href: string; id?: never; dropdown?: never }

const NAV_LINKS: NavLink[] = [
  { label: 'New In', href: '/shop/new' },
  {
    label: 'Clothing',
    id: 'clothing',
    dropdown: [
      { label: 'Ground', href: '/shop/ground' },
      { label: 'Field', href: '/shop/field' },
      { label: 'Floor', href: '/shop/floor' },
      { label: 'Track', href: '/shop/track' },
    ],
  },
  {
    label: 'Collections',
    id: 'collections',
    dropdown: [
      { label: 'Shop all', href: '/shop' },
      { label: 'New arrivals', href: '/shop/new' },
      { divider: true },
      { label: 'The brand', href: '/brand' },
    ],
  },
  { label: 'Accessories', href: '/shop/floor' },
  { label: 'Sale', href: '/shop/new' },
]

const MOBILE_LINKS = [
  { label: 'New In', href: '/shop/new' },
  { label: 'Clothing', href: '/shop/field' },
  { label: 'Collections', href: '/shop' },
  { label: 'Accessories', href: '/shop/floor' },
  { label: 'Sale', href: '/shop/new' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { itemCount, openCart } = useCart()
  const { itemCount: wishlistCount } = useWishlist()

  const [openDropdown, setOpenDropdown] = useState<DropdownId | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const headerRef = useRef<HTMLElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const mobileSearchRef = useRef<HTMLInputElement>(null)

  // Close everything on route change
  useEffect(() => {
    setIsMobileOpen(false)
    setIsSearchOpen(false)
    setOpenDropdown(null)
    setSearchQuery('')
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus()
  }, [isSearchOpen])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
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
        setOpenDropdown(null)
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

  const handleDropdownKey = (e: React.KeyboardEvent, id: DropdownId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpenDropdown((prev) => (prev === id ? null : id))
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen((v) => !v)
    setSearchQuery('')
    setOpenDropdown(null)
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className="absolute inset-x-0 top-10 z-50 h-[54px] overflow-x-clip border-b border-transparent bg-transparent md:h-[82px]"
      >
        <div className="absolute inset-x-0 -top-10 hidden h-10 border-b border-white/10 bg-[#1b1b1b] md:flex md:items-center">
          <button type="button" aria-label="Previous announcement" className="absolute left-1/2 top-1/2 -translate-x-[320px] -translate-y-1/2 px-2 text-[14px] leading-none text-white/90 transition-opacity hover:opacity-60">←</button>
          <p className="absolute left-1/2 top-1/2 flex w-max -translate-x-1/2 -translate-y-1/2 items-center text-[11px] font-semibold uppercase tracking-[0.08em] text-white">SALE LIVE NOW. UP TO 50% OFF</p>
          <button type="button" aria-label="Next announcement" className="absolute left-1/2 top-1/2 translate-x-[320px] -translate-y-1/2 px-2 text-[14px] leading-none text-white/90 transition-opacity hover:opacity-60">→</button>
        </div>
        <div className="h-full w-full px-5 md:px-10 lg:px-20">

          {/* ── Desktop layout ─────────────────────────────────────────────── */}
          <div className="relative hidden h-[58px] items-center md:absolute md:inset-x-0 md:top-5 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4 lg:gap-8 [&_a]:!text-[var(--color-text-inverse)] [&_button]:!text-[var(--color-text-inverse)]">

            {/* Left — primary navigation */}
            <nav className="flex min-w-0 items-center gap-3 lg:gap-7" aria-label="Main navigation">
              {NAV_LINKS.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.id!)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      aria-expanded={openDropdown === link.id}
                      aria-haspopup="true"
                      onKeyDown={(e) => handleDropdownKey(e, link.id!)}
                      className="flex items-center gap-1 text-[13px] lg:text-[15px] tracking-[0.02em] text-[color:var(--color-text-inverse)] transition-opacity duration-100 hover:opacity-70 focus:outline-none focus-visible:opacity-70"
                    >
                      {link.label}
                      <IconChevronDown className={`h-3 w-3 transition-transform duration-150 ${openDropdown === link.id ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === link.id && (
                      <div className="absolute left-1/2 top-[calc(100%+1px)] min-w-[168px] -translate-x-1/2 border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] py-2 shadow-[var(--shadow-overlay)]" role="menu">
                        {link.dropdown.map((item, i) =>
                          'divider' in item ? (
                            <div key={i} className="mx-4 my-1 h-px bg-[var(--color-border-subtle)]" role="separator" />
                          ) : (
                            <Link key={item.href} href={item.href} role="menuitem" onClick={() => setOpenDropdown(null)} className="block px-5 py-2 text-[14px] text-[var(--color-text-secondary)] transition-colors duration-100 hover:bg-[var(--color-bg-secondary)] hover:text-[color:var(--color-text-inverse)]">
                              {item.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={link.href} href={link.href!} className="text-[13px] lg:text-[15px] tracking-[0.02em] text-[color:var(--color-text-inverse)] transition-opacity duration-100 hover:opacity-70">
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Center — independent wordmark */}
            <Link href="/" aria-label="OFFLINE home" className="group justify-self-center transition-opacity duration-200 hover:opacity-80">
              <img src="/images/offline-logo-current-transparent.png" alt="OFFLINE" className="h-auto w-28 object-contain lg:w-36" />
            </Link>

            {/* Right — utility icons */}
            <div className="flex items-center justify-end gap-5">
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
                {isSearchOpen ? <IconX className="h-5 w-5" /> : <IconSearch className="h-5 w-5" />}
              </button>
              <Link href="/account" aria-label="Account" className="text-[color:var(--color-text-inverse)] transition-opacity duration-100 hover:opacity-70">
                <IconUser className="h-5 w-5" />
              </Link>
              <button onClick={openCart} aria-label={`Cart${itemCount > 0 ? `, ${itemCount} item${itemCount !== 1 ? 's' : ''}` : ''}`} className="relative text-[color:var(--color-text-inverse)] transition-opacity duration-100 hover:opacity-70 focus:outline-none">
                <IconBag className="h-5 w-5" />
                {itemCount > 0 && <span aria-hidden="true" className="absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center bg-[var(--color-accent)] px-[3px] text-[10px] font-medium leading-none text-[color:var(--color-text-inverse)]">{itemCount > 9 ? '9+' : itemCount}</span>}
              </button>
            </div>
          </div>

          {/* ── Mobile layout ──────────────────────────────────────────────── */}
          <div className="flex md:hidden items-center justify-between h-full">
            <button
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open navigation menu"
              className="text-[color:var(--color-text-inverse)] opacity-100 hover:opacity-70 transition-opacity duration-100 focus:outline-none"
            >
              <IconMenu className="w-5 h-5" />
            </button>

            <Link
              href="/"
              aria-label="OFFLINE home"
              className="transition-opacity duration-200 hover:opacity-80"
            >
              <img src="/images/offline-logo-current-transparent.png" alt="OFFLINE" className="h-auto w-24 object-contain" />
            </Link>

            <button
              onClick={openCart}
              aria-label={`Cart${itemCount > 0 ? `, ${itemCount} item${itemCount !== 1 ? 's' : ''}` : ''}`}
              className="relative text-[color:var(--color-text-inverse)] opacity-100 hover:opacity-70 transition-opacity duration-100 focus:outline-none"
            >
              <IconBag className="w-5 h-5" />
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
