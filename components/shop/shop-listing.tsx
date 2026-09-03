'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Heart, SlidersHorizontal, X } from 'lucide-react'
import { fetchProducts } from '@/lib/api'
import type { Product, CategoryId, SortOption } from '@/lib/types'
import { useWishlist } from '@/context/wishlist-context'

const PAGE_SIZE = 12
const sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46]

function ProductCard({ product }: { product: Product }) {
  const { isSaved, toggleItem } = useWishlist()
  const variant = product.variants[0]
  const wished = isSaved(product.id, variant.id)
  const wishlistItem = { productId: product.id, variantId: variant.id, addedAt: new Date().toISOString(), name: product.name, price: product.price, colorLabel: variant.colorLabel, image: variant.images[0], slug: product.slug, category: product.category }
  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Link href={`/shop/${product.category}/${product.slug}`} aria-label={`View ${product.name}`}>
          <img src={variant.images[0]?.src} alt={variant.images[0]?.alt || product.name} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/images/products/margin/off-white/01.png' }} className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </Link>
        {product.isNew && <span className="absolute left-3 top-3 bg-background px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em]">New</span>}
        <button type="button" aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} onClick={() => toggleItem(wishlistItem)} className="absolute right-3 top-3 grid size-9 place-items-center bg-background/90 transition-colors hover:bg-primary hover:text-primary-foreground">
          <Heart className="size-4" fill={wished ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="flex items-start justify-between gap-3 pt-4">
        <div><Link href={`/shop/${product.category}/${product.slug}`} className="font-serif text-lg hover:underline">{product.name}</Link><p className="mt-1 text-sm text-muted-foreground">{variant.colorLabel.split(' — ')[0]}</p></div>
        <p className="font-mono text-sm">${(product.price / 100).toFixed(2)}</p>
      </div>
    </article>
  )
}

export function ShopListing({ products, title, description, category }: { products: Product[]; title: string; description?: string; category?: CategoryId }) {
  const [selectedSizes, setSelectedSizes] = useState<number[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [sort, setSort] = useState<SortOption>('newest')
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const colors = useMemo(() => Array.from(new Set(products.flatMap((p) => p.variants.map((v) => v.color))),), [products])
  const filtered = useMemo(() => {
    const result = products.filter((p) => (!category || p.category === category) && (!selectedSizes.length || p.variants.some((v) => v.sizes.some((s) => selectedSizes.includes(s.eu) && s.available))) && (!selectedColors.length || p.variants.some((v) => selectedColors.includes(v.color))))
    return [...result].sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)))
  }, [products, category, selectedSizes, selectedColors, sort])
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const reset = () => { setSelectedSizes([]); setSelectedColors([]); setSort('newest'); setPage(1) }
  const toggle = <T,>(value: T, values: T[], setter: (v: T[]) => void) => { setter(values.includes(value) ? values.filter((v) => v !== value) : [...values, value]); setPage(1) }

  return <main className="mx-auto max-w-7xl px-5 pb-24 pt-12 md:px-8 md:pt-20">
    <header className="max-w-2xl"><p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">OFFLINE / Shop</p><h1 className="mt-5 font-serif text-5xl leading-none tracking-tight md:text-7xl">{title}</h1>{description && <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">{description}</p>}</header>
    <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4"><button type="button" onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2 text-sm uppercase tracking-[0.12em]"><SlidersHorizontal className="size-4" /> Filter {selectedSizes.length + selectedColors.length ? `(${selectedSizes.length + selectedColors.length})` : ''}</button><div className="flex items-center gap-3"><span className="hidden text-sm text-muted-foreground sm:inline">{filtered.length} products</span><select value={sort} onChange={(e) => { setSort(e.target.value as SortOption); setPage(1) }} className="bg-transparent text-sm uppercase tracking-[0.1em] outline-none"><option value="newest">Recommended</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></div></div>
    {filtersOpen && <section aria-label="Product filters" className="flex flex-wrap gap-8 border-b border-border py-6"><fieldset><legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em]">Size (EU)</legend><div className="flex flex-wrap gap-2">{sizes.map((size) => <button key={size} type="button" onClick={() => toggle(size, selectedSizes, setSelectedSizes)} className={`grid size-9 place-items-center border text-sm ${selectedSizes.includes(size) ? 'border-primary bg-primary text-primary-foreground' : 'border-border'}`}>{size}</button>)}</div></fieldset><fieldset><legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em]">Color</legend><div className="flex flex-wrap gap-2">{colors.map((color) => <button key={color} type="button" onClick={() => toggle(color, selectedColors, setSelectedColors)} className={`border px-3 py-2 text-sm capitalize ${selectedColors.includes(color) ? 'border-primary bg-primary text-primary-foreground' : 'border-border'}`}>{color.replace('-', ' ')}</button>)}</div></fieldset>{selectedSizes.length + selectedColors.length > 0 && <button type="button" onClick={reset} className="self-end text-sm underline">Clear all</button>}</section>}
    {visible.length ? <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="py-24 text-center"><X className="mx-auto size-6" /><h2 className="mt-5 font-serif text-3xl">No products found</h2><button type="button" onClick={reset} className="mt-4 text-sm underline">Clear filters</button></div>}
    {pages > 1 && <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-2">{Array.from({ length: pages }, (_, i) => i + 1).map((number) => <button key={number} type="button" aria-current={page === number ? 'page' : undefined} onClick={() => { setPage(number); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className={`grid size-9 place-items-center text-sm ${page === number ? 'bg-primary text-primary-foreground' : 'border border-border'}`}>{number}</button>)}</nav>}
  </main>
}

export { fetchProducts }
