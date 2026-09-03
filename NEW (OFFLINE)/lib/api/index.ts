/**
 * OFFLINE mock API layer
 *
 * All functions here simulate async data fetching so they can be
 * swapped 1-for-1 with real API calls (Shopify, custom backend, etc.)
 * without changing any component code. Callers always await these functions.
 */

import type {
  Product,
  Category,
  Collection,
  PaginatedResult,
  ProductFilters,
  SortOption,
  SearchResult,
  Order,
} from '@/lib/types'
import { products, getProductBySlug, getProductById } from '@/lib/data/products'
import { categories, getCategoryById, getCategoryBySlug } from '@/lib/data/categories'
import { collections, getCollectionBySlug } from '@/lib/data/collections'
import { mockOrders, getOrderById, getOrderByNumber } from '@/lib/data/commerce'

const SIMULATED_DELAY = 0 // set to e.g. 200 for realistic loading states in dev

const delay = (ms: number) =>
  ms > 0 ? new Promise((r) => setTimeout(r, ms)) : Promise.resolve()

// ─── Products ─────────────────────────────────────────────────────────────────

export async function fetchProducts(
  filters: ProductFilters = {},
  sort: SortOption = 'newest',
  page = 1,
  perPage = 12
): Promise<PaginatedResult<Product>> {
  await delay(SIMULATED_DELAY)

  let result = [...products]

  // Apply filters
  if (filters.category) {
    result = result.filter((p) => p.category === filters.category)
  }
  if (filters.isNew) {
    result = result.filter((p) => p.isNew === true)
  }
  if (filters.sizeEu) {
    result = result.filter((p) =>
      p.variants.some((v) =>
        v.sizes.some((s) => s.eu === filters.sizeEu && s.available)
      )
    )
  }
  if (filters.color) {
    result = result.filter((p) =>
      p.variants.some((v) => v.color === filters.color)
    )
  }

  // Apply sort
  if (sort === 'price-asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (sort === 'price-desc') {
    result.sort((a, b) => b.price - a.price)
  }
  // 'newest' keeps natural order (isNew items first in mock data)

  const total = result.length
  const totalPages = Math.ceil(total / perPage)
  const start = (page - 1) * perPage
  const items = result.slice(start, start + perPage)

  return { items, total, page, perPage, totalPages }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  await delay(SIMULATED_DELAY)
  return getProductBySlug(slug) ?? null
}

export async function fetchProductById(id: string): Promise<Product | null> {
  await delay(SIMULATED_DELAY)
  return getProductById(id) ?? null
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  await delay(SIMULATED_DELAY)
  return products.filter((p) => p.featured)
}

export async function fetchRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  await delay(SIMULATED_DELAY)
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit)
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function fetchCategories(): Promise<Category[]> {
  await delay(SIMULATED_DELAY)
  return categories
}

export async function fetchCategoryById(id: string): Promise<Category | null> {
  await delay(SIMULATED_DELAY)
  return getCategoryById(id) ?? null
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  await delay(SIMULATED_DELAY)
  return getCategoryBySlug(slug) ?? null
}

// ─── Collections ──────────────────────────────────────────────────────────────

export async function fetchCollections(): Promise<Collection[]> {
  await delay(SIMULATED_DELAY)
  return collections
}

export async function fetchCollectionBySlug(slug: string): Promise<Collection | null> {
  await delay(SIMULATED_DELAY)
  return getCollectionBySlug(slug) ?? null
}

export async function fetchCollectionProducts(
  slug: string
): Promise<Product[]> {
  await delay(SIMULATED_DELAY)
  const collection = getCollectionBySlug(slug)
  if (!collection) return []
  return collection.productIds
    .map((id) => getProductById(id))
    .filter((p): p is Product => !!p)
}

// ─── Search ───────────────────────────────────────────────────────────────────

export async function searchProducts(query: string): Promise<SearchResult> {
  await delay(SIMULATED_DELAY)

  if (!query.trim()) {
    return { products: [], query, total: 0 }
  }

  const q = query.toLowerCase().trim()
  const matched = products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.materials.upper.toLowerCase().includes(q) ||
      p.variants.some((v) => v.colorLabel.toLowerCase().includes(q))
  )

  return { products: matched, query, total: matched.length }
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function fetchOrderById(id: string): Promise<Order | null> {
  await delay(SIMULATED_DELAY)
  return getOrderById(id) ?? null
}

export async function fetchOrderByNumber(orderNumber: string): Promise<Order | null> {
  await delay(SIMULATED_DELAY)
  return getOrderByNumber(orderNumber) ?? null
}

export async function fetchOrdersByEmail(_email: string): Promise<Order[]> {
  await delay(SIMULATED_DELAY)
  // In mock: return all mock orders regardless of email
  return mockOrders
}

// ─── Simulated checkout ───────────────────────────────────────────────────────

export async function submitOrder(
  _payload: unknown
): Promise<{ success: true; orderNumber: string } | { success: false; error: string }> {
  await delay(400) // simulate network round-trip

  // Always succeeds in mock mode
  const orderNumber = `OFL-${Math.floor(1000 + Math.random() * 9000)}`
  return { success: true, orderNumber }
}
