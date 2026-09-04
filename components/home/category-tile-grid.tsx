import Image from 'next/image'
import Link from 'next/link'

interface CategoryTile {
  name: string
  image: string
  href: string
}

const categories: CategoryTile[] = [
  {
    name: 'T-SHIRTS',
    image: '/images/categories/tshirts.png',
    href: '/collections/t-shirts',
  },
  {
    name: 'POLO',
    image: '/images/categories/polo.png',
    href: '/collections/polo',
  },
  {
    name: 'JERSEY',
    image: '/images/categories/jersey.png',
    href: '/collections/jersey',
  },
  {
    name: 'SHIRTS',
    image: '/images/categories/shirts.png',
    href: '/collections/shirts',
  },
  {
    name: 'HOODIE',
    image: '/images/categories/hoodie.png',
    href: '/collections/hoodie',
  },
]

export function CategoryTileGrid() {
  return (
    <section className="w-full bg-background py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 md:gap-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative block aspect-[3/4] w-full overflow-hidden bg-muted"
            >
              <Image
                src={category.image || '/placeholder.svg'}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="px-2 text-center text-sm font-bold tracking-wide text-white drop-shadow-sm md:text-base">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
