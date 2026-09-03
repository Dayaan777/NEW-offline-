import type { Collection } from '@/lib/types'

export const collections: Collection[] = [
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    slug: 'new',
    description: 'Recently added to the OFFLINE range.',
    productIds: ['margin', 'weld'],
  },
  {
    id: 'launch',
    name: 'The Initial Offering',
    slug: 'launch',
    description: 'Four products. One per context. The complete first range.',
    productIds: ['margin', 'farrow', 'croft', 'weld'],
  },
]

export const getCollectionBySlug = (slug: string): Collection | undefined =>
  collections.find((c) => c.slug === slug)

export const getCollectionById = (id: string): Collection | undefined =>
  collections.find((c) => c.id === id)
