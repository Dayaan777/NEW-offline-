import type { Category } from '@/lib/types'

// ─── Footwear categories ──────────────────────────────────────────────────────

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

// ─── Apparel categories ───────────────────────────────────────────────────────

export type ApparelGender = 'men' | 'women'

export interface ApparelCategory {
  id: string
  name: string
  slug: string          // e.g. "tshirts"
  gender: ApparelGender
  description: string
  longDescription: string
}

export const apparelCategories: ApparelCategory[] = [
  // Men
  {
    id: 'men-tshirts',
    name: 'T-Shirts',
    slug: 'men-tshirts',
    gender: 'men',
    description: 'Everyday essentials in quality cotton.',
    longDescription: 'Clean crew and V-neck tees cut from heavyweight cotton. No embellishments, no visible branding. Made to be worn often.',
  },
  {
    id: 'men-polo',
    name: 'Polo',
    slug: 'men-polo',
    gender: 'men',
    description: 'The polo, reduced to its essentials.',
    longDescription: 'Pique cotton polo shirts with a clean, considered collar. Subtle enough for the office. Comfortable enough for everything else.',
  },
  {
    id: 'men-jersey',
    name: 'Jersey',
    slug: 'men-jersey',
    gender: 'men',
    description: 'Lightweight knit for the in-between days.',
    longDescription: 'Fine-knit jersey tops and long-sleeves. The layer between a t-shirt and a shirt — worn alone or under a jacket.',
  },
  {
    id: 'men-shirts',
    name: 'Shirts',
    slug: 'men-shirts',
    gender: 'men',
    description: 'Woven shirts for work and beyond.',
    longDescription: 'Oxford and poplin button-downs, relaxed-fit and minimally detailed. Cut to wear tucked or untucked without effort.',
  },
  {
    id: 'men-hoodie',
    name: 'Hoodie',
    slug: 'men-hoodie',
    gender: 'men',
    description: 'Heavy French terry, properly weighted.',
    longDescription: 'Pullover and zip hoodies in heavyweight French terry cotton. Worn enough to be comfort, considered enough to go anywhere.',
  },
  {
    id: 'men-pants',
    name: 'Pants',
    slug: 'men-pants',
    gender: 'men',
    description: 'Trousers and chinos built for the long day.',
    longDescription: 'Straight and tapered trousers in cotton twill and ripstop. Four pockets, clean finish, no unnecessary hardware.',
  },
  // Women
  {
    id: 'women-tshirts',
    name: 'T-Shirts',
    slug: 'women-tshirts',
    gender: 'women',
    description: 'Relaxed-fit tees in premium cotton.',
    longDescription: 'Oversized and relaxed crew-neck tees in heavyweight cotton. Minimal, versatile, and made to be worn constantly.',
  },
  {
    id: 'women-polo',
    name: 'Polo',
    slug: 'women-polo',
    gender: 'women',
    description: 'A considered polo for everyday wear.',
    longDescription: 'Relaxed-fit pique cotton polos with a clean collar and subtle tonal buttons. Effortlessly smart.',
  },
  {
    id: 'women-jersey',
    name: 'Jersey',
    slug: 'women-jersey',
    gender: 'women',
    description: 'Fine knit tops for layering or wearing alone.',
    longDescription: 'Lightweight jersey tops and long-sleeves. The refined alternative to a t-shirt — for days that ask a little more.',
  },
  {
    id: 'women-shirts',
    name: 'Shirts',
    slug: 'women-shirts',
    gender: 'women',
    description: 'Relaxed woven shirts in natural fibres.',
    longDescription: 'Oversized button-down shirts in cotton and linen blends. For the office, the weekend, or anywhere between.',
  },
  {
    id: 'women-hoodie',
    name: 'Hoodie',
    slug: 'women-hoodie',
    gender: 'women',
    description: 'Heavyweight French terry, shaped for you.',
    longDescription: 'Relaxed pullover hoodies in heavyweight French terry cotton. The most comfortable thing you will wear today.',
  },
  {
    id: 'women-trousers',
    name: 'Trousers',
    slug: 'women-trousers',
    gender: 'women',
    description: 'Wide-leg and straight trousers for every context.',
    longDescription: 'Wide-leg and tapered trousers in cotton twill and crisp poplin. Clean finish, confident shape.',
  },
]

export const getApparelCategoryBySlug = (slug: string): ApparelCategory | undefined =>
  apparelCategories.find((c) => c.slug === slug)

export const getApparelCategoriesByGender = (gender: ApparelGender): ApparelCategory[] =>
  apparelCategories.filter((c) => c.gender === gender)
