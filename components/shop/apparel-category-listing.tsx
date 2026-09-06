'use client'

import Link from 'next/link'
import type { ApparelCategory } from '@/lib/data/categories'
import { getApparelCategoriesByGender } from '@/lib/data/categories'

const CATEGORY_IMAGES: Record<string, string> = {
  'men-tshirts': '/images/mega/men-tshirt.jpg',
  'men-polo': '/images/mega/men-polo.jpg',
  'men-hoodie': '/images/mega/men-hoodie.jpg',
  'men-jersey': '/images/mega/men-hoodie.jpg',
  'men-shirts': '/images/mega/men-polo.jpg',
  'men-pants': '/images/mega/men-tshirt.jpg',
  'women-tshirts': '/images/mega/women-shirt.jpg',
  'women-polo': '/images/mega/women-shirt.jpg',
  'women-jersey': '/images/mega/women-shirt.jpg',
  'women-shirts': '/images/mega/women-shirt.jpg',
  'women-hoodie': '/images/mega/men-hoodie.jpg',
  'women-trousers': '/images/mega/women-shirt.jpg',
}

export function ApparelCategoryListing({ category }: { category: ApparelCategory }) {
  const relatedCategories = getApparelCategoriesByGender(category.gender).filter(
    (c) => c.id !== category.id
  )

  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
      {/* Page header */}
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          OFFLINE / {category.gender === 'men' ? 'Men' : 'Women'}
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-none tracking-tight md:text-7xl">
          {category.name}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
          {category.longDescription}
        </p>
      </header>

      {/* Coming soon state */}
      <div className="mt-20 border border-border">
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="aspect-[4/3] overflow-hidden bg-muted md:aspect-auto md:min-h-[480px]">
            <img
              src={CATEGORY_IMAGES[category.id] || '/images/mega/men-tshirt.jpg'}
              alt={category.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center px-10 py-16 md:px-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Coming soon
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-4xl">
              {category.gender === 'men' ? "Men's" : "Women's"} {category.name}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              We are expanding the OFFLINE range to include clothing. The first{' '}
              {category.gender === 'men' ? "men's" : "women's"} {category.name.toLowerCase()} pieces
              will be available soon. Clean design, quality materials, no excess.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex h-11 items-center border border-foreground px-6 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors hover:bg-foreground hover:text-background"
              >
                Shop Footwear
              </Link>
              <Link
                href={`/shop/${category.gender === 'men' ? 'men-tshirts' : 'women-tshirts'}`}
                className="inline-flex h-11 items-center px-6 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
              >
                View all {category.gender === 'men' ? 'Men' : 'Women'} ↗
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related categories */}
      {relatedCategories.length > 0 && (
        <section className="mt-20">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Also in {category.gender === 'men' ? 'Men' : 'Women'}
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {relatedCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop/${cat.slug}`}
                className="group flex flex-col gap-3"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={CATEGORY_IMAGES[cat.id] || '/images/mega/men-tshirt.jpg'}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-sm tracking-[0.02em] text-foreground group-hover:underline">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
