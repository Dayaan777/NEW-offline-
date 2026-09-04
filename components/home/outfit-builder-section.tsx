'use client'

import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import { Check, LoaderCircle, Plus, RotateCcw, ShoppingBag, X } from 'lucide-react'
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
  const [tryOnImage, setTryOnImage] = useState<string | null>(null)
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

  const startOver = () => {
    generationId.current += 1
    setSelected([])
    setTryOnImage(null)
    setTryOnError(null)
    setIsGenerating(false)
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
      <div className="grid gap-0 overflow-hidden border border-border bg-background lg:grid-cols-[minmax(0,0.9fr)_minmax(380px,1.1fr)]">
        <div className="relative min-h-[520px] overflow-hidden border-b border-border bg-muted lg:min-h-[680px] lg:border-b-0 lg:border-r">
          {tryOnImage ? (
            <Image src={tryOnImage} alt="Model wearing your selected outfit" fill sizes="(max-width: 1024px) 100vw, 45vw" className={`object-cover transition-opacity duration-500 ${isGenerating ? 'opacity-50' : 'opacity-100'}`} unoptimized={tryOnImage.startsWith('http')} />
          ) : (
            <div className="flex min-h-[520px] items-center justify-center bg-background px-8 text-center lg:min-h-[680px]">
              <div className="max-w-xs">
                <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Fitting room</p>
                <p className="text-sm leading-6 text-muted-foreground">Select a product to see it styled on the model.</p>
              </div>
            </div>
          )}
          {isGenerating && <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px]"><span className="flex items-center gap-2 bg-background/90 px-4 py-3 text-xs uppercase tracking-[0.2em]"><LoaderCircle className="size-4 animate-spin" aria-hidden="true" />Generating</span></div>}
          {tryOnError && <p role="status" className="absolute bottom-4 left-4 right-4 bg-background/95 px-4 py-3 text-xs leading-5 text-destructive">{tryOnError}</p>}
          {selected.length > 0 && <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/95 px-4 py-4 backdrop-blur-sm md:px-5">
            <div className="mb-3 flex items-center justify-between"><p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Your picks</p><button type="button" onClick={startOver} className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"><RotateCcw className="size-3" aria-hidden="true" />Start over</button></div>
            <div className="flex items-center gap-2">
              {selected.map((product) => <button key={product.id} type="button" onClick={() => toggleProduct(product)} aria-label={`Remove ${product.name}`} className="group relative size-10 overflow-hidden rounded-full border border-border bg-muted transition-transform hover:scale-105"><Image src={product.variants[0].images[0].src} alt="" fill sizes="40px" className="object-cover" /><span className="absolute inset-0 hidden items-center justify-center bg-background/65 group-hover:flex"><X className="size-3" aria-hidden="true" /></span></button>)}
            </div>
          </div>}
        </div>
        <div className="flex min-h-[520px] flex-col bg-background p-4 md:p-6 lg:min-h-[680px]">
          <div className="mb-5 flex items-start justify-between gap-4"><div><p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Fitting room</p><h3 className="text-xl uppercase tracking-[0.12em]">Build your outfit</h3></div><span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{selected.length} {selected.length === 1 ? 'item' : 'items'}</span></div>
          <div className="flex gap-5 overflow-x-auto border-b border-border pb-4" role="tablist" aria-label="Outfit categories">
            {tabs.map((tab) => <button key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} className={`shrink-0 border-b pb-2 text-xs uppercase tracking-[0.16em] transition-colors ${activeTab === tab.id ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>{tab.label}</button>)}
          </div>
          <div className="grid flex-1 content-start gap-2 py-5 sm:grid-cols-2">
            {options.map((product) => <ProductOption key={product.id} product={product} selected={selected.some((item) => item.id === product.id)} onSelect={() => toggleProduct(product)} />)}
          </div>
          <div className="border-t border-border pt-5">
            <button type="button" disabled={!selected.length} onClick={addOutfit} className="flex w-full items-center justify-center gap-2 bg-foreground px-4 py-3 text-xs uppercase tracking-[0.2em] text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-40"><ShoppingBag className="size-4" aria-hidden="true" />Add outfit to cart</button>
          </div>
        </div>
      </div>
    </section>
  )
}
