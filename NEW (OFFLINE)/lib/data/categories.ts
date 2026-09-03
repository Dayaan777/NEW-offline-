import type { Category } from '@/lib/types'

export const categories: Category[] = [
  {
    id: 'ground',
    name: 'Ground',
    slug: 'ground',
    description: 'The everyday shoe. Reach for it without thinking.',
    longDescription:
      'Designed for the default day — walking, working, existing. Unstructured enough to wear immediately, considered enough to last.',
  },
  {
    id: 'field',
    name: 'Field',
    slug: 'field',
    description: 'When the day takes you further than expected.',
    longDescription:
      'Built for the space between city and not-city. Structured, weather-resistant, and resoleable. For days that ask more of your shoes.',
  },
  {
    id: 'floor',
    name: 'Floor',
    slug: 'floor',
    description: 'When you want to still be wearing a shoe.',
    longDescription:
      'More than a house shoe, less than a full shoe. For the studio, the home office, the slow morning. The shoe for being present indoors.',
  },
  {
    id: 'track',
    name: 'Track',
    slug: 'track',
    description: 'Movement without performance claims.',
    longDescription:
      'A movement shoe, not a training shoe. Designed around daily motion rather than athletic achievement. Clean silhouette, functional construction.',
  },
]

export const getCategoryById = (id: string): Category | undefined =>
  categories.find((c) => c.id === id)

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug)
