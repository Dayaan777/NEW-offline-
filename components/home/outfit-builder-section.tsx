'use client'

import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import { Check, Plus, ShoppingBag, X } from 'lucide-react'
import { products } from '@/lib/data/products'
import { useCart } from '@/context/cart-context'
import type { Product } from '@/lib/types'

const tabs = [
  { id: 't-shirts', label: 'T-Shirts', category: 'ground' as const },
  { id: 'shirts', label: 'Shirts', category: 'field' as const },
  { id: 'jersey', label: 'Jersey', category: 'track' as const },
  { id: 'pants', label: 'Pants', category: 'floor' as const },
  { id: 'outerwear', label: 'Outerwear', category: 'ground' as const },
]

const formatPrice = (price: number) => `Rs.${Math.round(price / 100).toLocaleString('en-IN')}`

function ProductOption({ product, selected, onSelect }: { product: Product; selected: boolean; onSelect: () => void }) {
  const variant = product.variants[0]
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group flex w-full items-center gap-3 border p-2 text-left transition-colors ${selected ? 'border-foreground bg-foreground text-background' : 'border-border bg-background hover:border-foreground'}`}
    >
      <span className="relative size-14 shrink-0 overflow-hidden bg-muted">
        <Image src={variant.images[0].src} alt="" fill sizes="56px" className="object-cover" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs uppercase tracking-[0.16em]">{product.name}</span>
        <span className={`mt-1 block text-xs ${selected ? 'text-background/70' : 'text-muted-foreground'}`}>{formatPrice(product.price)}</span>
      </span>
      <span className="shrink-0">{selected ? <Check className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}</span>
    </button>
  )
}

export function OutfitBuilderSection() {
  const { addItem, openCart } = useCart()
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const [selected, setSelected] = useState<Product[]>([])
  const [tryOnImage, setTryOnImage] = useState('/images/shop-the-look-placeholder.png')
  const [isGenerating, setIsGenerating] = useState(false)
  const [tryOnError, setTryOnError] = useState<string | null>(null)
  const generationId = useRef(0)
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0]
  const options = useMemo(() => products.filter((product) => product.category === active.category).slice(0, 4), [active.category])

  const toggleProduct = async (product: Product) => {
    const isSelected = selected.some((item) => item.id === product.id)
    setSelected((current) => isSelected ? current.filter((item) => item.id !== product.id) : [...current, product])
    const requestId = ++generationId.current
    if (isSelected) return

    setIsGenerating(true)
    setTryOnError(null)
    try {
      const [personResponse, garmentResponse] = await Promise.all([
        fetch('/images/shop-the-look-placeholder.png'),
        fetch(product.variants[0].images[0].src),
      ])
      const formData = new FormData()
      formData.append('personImage', await personResponse.blob(), 'model.png')
      formData.append('garmentImage', await garmentResponse.blob(), 'garment.jpg')
      const response = await fetch('/api/virtual-tryon', { method: 'POST', body: formData })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'Virtual try-on failed.')
      if (requestId === generationId.current) setTryOnImage(data.imageUrl)
    } catch (error) {
      if (requestId === generationId.current) {
        setTryOnError(error instanceof Error ? error.message : 'Virtual try-on failed.')
      }
    } finally {
      if (requestId === generationId.current) setIsGenerating(false)
    }
  }

  const addOutfit = () => {
    selected.forEach((product) => {
      const variant = product.variants[0]
      const size = variant.sizes.find((item) => item.available)
      if (!size) return
      addItem({ productId: product.id, variantId: variant.id, sizeEu: size.eu, quantity: 1, name: product.name, price: product.price, colorLabel: variant.colorLabel, image: variant.images[0], slug: product.slug, category: product.category })
    })
    if (selected.length) openCart()
  }

  return (
    <section aria-labelledby="outfit-builder-title" className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
      <div className="mb-8 flex flex-col gap-3 text-center md:mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Build your edit</p>
        <h2 id="outfit-builder-title" className="font-serif text-3xl text-balance md:text-5xl">Outfit Builder</h2>
        <p className="mx-auto max-w-xl text-sm leading-6 text-muted-foreground">Start with a piece, then layer your look. Choose what belongs together.</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <div className="relative min-h-[520px] overflow-hidden bg-muted md:min-h-[680px]">
          <Image src={tryOnImage} alt="Model wearing an editable outfit" fill sizes="(max-width: 1024px) 100vw, 55vw" className={`object-cover transition-opacity duration-500 ${isGenerating ? 'opacity-50' : 'opacity-100'}`} unoptimized={tryOnImage.startsWith('http')} />
          {isGenerating && <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px]"><span className="bg-background/90 px-4 py-3 text-xs uppercase tracking-[0.2em]">Generating try-on...</span></div>}
          <div className="absolute bottom-4 left-4 bg-background/90 px-4 py-3 text-xs uppercase tracking-[0.2em] backdrop-blur-sm">Your outfit · {selected.length} {selected.length === 1 ? 'piece' : 'pieces'}</div>
          {tryOnError && <p role="status" className="absolute bottom-4 right-4 max-w-xs bg-background/95 px-4 py-3 text-xs leading-5 text-destructive">{tryOnError}</p>}
        </div>
        <div className="flex min-h-[520px] flex-col border border-border bg-background p-4 md:p-6">
          <div className="flex gap-5 overflow-x-auto border-b border-border pb-4" role="tablist" aria-label="Outfit categories">
            {tabs.map((tab) => <button key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} className={`shrink-0 border-b pb-2 text-xs uppercase tracking-[0.16em] transition-colors ${activeTab === tab.id ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>{tab.label}</button>)}
          </div>
          <div className="grid flex-1 content-start gap-2 py-5 sm:grid-cols-2">
            {options.map((product) => <ProductOption key={product.id} product={product} selected={selected.some((item) => item.id === product.id)} onSelect={() => toggleProduct(product)} />)}
          </div>
          <div className="border-t border-border pt-5">
            <div className="mb-4 flex items-center justify-between"><h3 className="text-xs uppercase tracking-[0.2em]">Your selection</h3><span className="text-xs text-muted-foreground">{selected.length} items</span></div>
            {selected.length === 0 ? <p className="mb-5 text-sm leading-6 text-muted-foreground">Select pieces above to start building your outfit.</p> : <ul className="mb-5 space-y-2">{selected.map((product) => <li key={product.id} className="flex items-center gap-3"><span className="relative size-10 shrink-0 overflow-hidden bg-muted"><Image src={product.variants[0].images[0].src} alt="" fill sizes="40px" className="object-cover" /></span><span className="min-w-0 flex-1 truncate text-xs uppercase tracking-[0.12em]">{product.name}</span><span className="text-xs">{formatPrice(product.price)}</span><button type="button" onClick={() => toggleProduct(product)} aria-label={`Remove ${product.name}`} className="text-muted-foreground hover:text-foreground"><X className="size-4" /></button></li>)}</ul>}
            <button type="button" disabled={!selected.length} onClick={addOutfit} className="flex w-full items-center justify-center gap-2 bg-foreground px-4 py-3 text-xs uppercase tracking-[0.2em] text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-40"><ShoppingBag className="size-4" aria-hidden="true" />Add outfit to cart</button>
          </div>
        </div>
      </div>
    </section>
  )
}
