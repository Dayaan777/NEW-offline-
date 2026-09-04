'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

interface CarouselProduct {
  id: string
  name: string
  category: string
  image: string
  price: number // cents
  originalPrice: number // cents
}

const CAROUSEL_PRODUCTS: CarouselProduct[] = [
  {
    id: 'ribbed-polo',
    name: 'Ribbed Performance Polo',
    category: 'Tops',
    image: '/images/products/carousel/polo.jpg',
    price: 3450,
    originalPrice: 5900,
  },
  {
    id: 'double-monk-strap',
    name: 'Double Monk-Strap Loafer',
    category: 'Shoes',
    image: '/images/products/carousel/monk-strap-shoes.jpg',
    price: 8900,
    originalPrice: 14500,
  },
  {
    id: '24-7-joggers',
    name: '24.7 Tapered Joggers',
    category: 'Bottoms',
    image: '/images/products/carousel/joggers.jpg',
    price: 4200,
    originalPrice: 6800,
  },
  {
    id: 'zoro-jersey',
    name: 'Zoro Graphic Jersey',
    category: 'Tops',
    image: '/images/products/carousel/jersey-front.jpg',
    price: 3900,
    originalPrice: 6500,
  },
  {
    id: 'zoro-jersey-alt',
    name: 'Zoro Graphic Jersey — Away',
    category: 'Tops',
    image: '/images/products/carousel/jersey-side.jpg',
    price: 3900,
    originalPrice: 6500,
  },
]

const formatPrice = (cents: number) => `Rs.${Math.round(cents / 100).toLocaleString('en-US')},00`

export function ProductCarouselSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragScrollLeft = useRef(0)

  const updateActiveFromScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.scrollWidth / CAROUSEL_PRODUCTS.length
    const index = Math.round(track.scrollLeft / cardWidth)
    setActiveIndex(Math.min(Math.max(index, 0), CAROUSEL_PRODUCTS.length - 1))
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', updateActiveFromScroll, { passive: true })
    return () => track.removeEventListener('scroll', updateActiveFromScroll)
  }, [updateActiveFromScroll])

  const scrollToIndex = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.scrollWidth / CAROUSEL_PRODUCTS.length
    track.scrollTo({ left: cardWidth * index, behavior: 'smooth' })
  }

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return
    isDragging.current = true
    dragStartX.current = event.clientX
    dragScrollLeft.current = track.scrollLeft
    track.setPointerCapture(event.pointerId)
    track.classList.add('cursor-grabbing')
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || !isDragging.current) return
    const delta = event.clientX - dragStartX.current
    track.scrollLeft = dragScrollLeft.current - delta
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    isDragging.current = false
    track?.classList.remove('cursor-grabbing')
    try {
      track?.releasePointerCapture(event.pointerId)
    } catch {
      // no-op — pointer may already be released
    }
  }

  return (
    <section aria-labelledby="carousel-heading" className="bg-[var(--color-bg-primary)] py-12 md:py-16">
      <div className="container">
        <div className="mb-8 flex flex-col gap-2 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-category mb-3 text-[var(--color-accent)]">Anniversary Sale</p>
            <h2 id="carousel-heading" className="max-w-[480px] text-[1.75rem] font-light leading-[0.95] tracking-[-0.02em] text-[var(--color-text-primary)] md:text-[2.5rem]">
              Picks up to 40% off.
            </h2>
          </div>
          <p className="max-w-[280px] text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">
            Drag to browse. Prices drop at checkout.
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="scrollbar-hide container flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto pb-2 select-none touch-pan-y md:gap-6"
        style={{ scrollbarWidth: 'none' }}
      >
        {CAROUSEL_PRODUCTS.map((product) => {
          const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
          return (
            <article
              key={product.id}
              className="group relative flex w-[68%] shrink-0 snap-start flex-col overflow-hidden rounded-sm bg-[var(--color-bg-primary)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)] sm:w-[42%] md:w-[27%] lg:w-[22%]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-bg-tertiary)]">
                <span className="absolute left-3 top-3 z-10 bg-[var(--color-accent)] px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.04em] text-white">
                  −{discountPercent}%
                </span>
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  draggable={false}
                  className="pointer-events-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                  sizes="(max-width: 640px) 68vw, (max-width: 768px) 42vw, (max-width: 1024px) 27vw, 22vw"
                />
              </div>
              <div className="flex flex-col gap-1.5 px-1 py-4">
                <p className="label-category text-[var(--color-text-muted)]">{product.category}</p>
                <h3 className="text-[0.9375rem] font-light leading-snug text-[var(--color-text-primary)] md:text-[1rem]">{product.name}</h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-[0.9375rem] font-medium text-[var(--color-accent)]">{formatPrice(product.price)}</span>
                  <span className="text-[0.8125rem] text-[var(--color-text-muted)] line-through">{formatPrice(product.originalPrice)}</span>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="container mt-6 flex items-center justify-center gap-1.5" role="tablist" aria-label="Carousel progress">
        {CAROUSEL_PRODUCTS.map((product, index) => (
          <button
            key={product.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to ${product.name}`}
            onClick={() => scrollToIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-6 bg-[var(--color-accent)]' : 'w-1.5 bg-[var(--color-border-default)]'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
