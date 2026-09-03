// ─── Product ──────────────────────────────────────────────────────────────────

export type CategoryId = 'ground' | 'field' | 'floor' | 'track'

export interface ProductImage {
  src: string
  alt: string
}

export interface ProductSize {
  eu: number
  us: number
  uk: number
  available: boolean
  lowStock?: boolean
}

export interface ProductVariant {
  id: string
  color: string              // e.g. "slate"
  colorLabel: string         // e.g. "Slate — full-grain leather"
  colorHex: string           // for swatch display
  sizes: ProductSize[]
  images: ProductImage[]
}

export interface ProductMaterials {
  upper: string
  lining?: string
  insole: string
  outsole: string
  origin?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: CategoryId
  price: number              // in USD cents (e.g. 29500 = $295.00)
  shortDescription: string   // 1-2 sentences for cards/meta
  description: string        // full product description
  materials: ProductMaterials
  construction: string
  fit: string
  breakIn?: string           // only if applicable
  care: string
  variants: ProductVariant[]
  isNew?: boolean
  featured?: boolean
}

// ─── Category ─────────────────────────────────────────────────────────────────

export interface Category {
  id: CategoryId
  name: string               // "Ground"
  slug: string               // "ground"
  description: string        // one-line, card display
  longDescription: string    // for category page header
}

// ─── Collection ───────────────────────────────────────────────────────────────

export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  productIds: string[]
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItem {
  productId: string
  variantId: string
  sizeEu: number
  quantity: number
  // Denormalized for display without re-fetching product
  name: string
  price: number              // cents
  colorLabel: string
  image: ProductImage
  slug: string
  category: CategoryId
}

export interface Cart {
  items: CartItem[]
  updatedAt: string          // ISO timestamp
}

// ─── Wishlist ─────────────────────────────────────────────────────────────────

export interface WishlistItem {
  productId: string
  variantId: string
  addedAt: string            // ISO timestamp
  // Denormalized for display
  name: string
  price: number              // cents
  colorLabel: string
  image: ProductImage
  slug: string
  category: CategoryId
}

export interface Wishlist {
  items: WishlistItem[]
}

// ─── Search ───────────────────────────────────────────────────────────────────

export interface SearchResult {
  products: Product[]
  query: string
  total: number
}

// ─── Checkout ─────────────────────────────────────────────────────────────────

export type DeliveryMethodId = 'standard' | 'express'

export interface DeliveryOption {
  id: DeliveryMethodId
  label: string
  description: string
  price: number              // cents (0 = free)
  estimatedDays: string      // e.g. "3–5 business days"
}

export interface ShippingAddress {
  fullName: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
}

export interface CheckoutState {
  email: string
  shippingAddress: Partial<ShippingAddress>
  deliveryMethod: DeliveryMethodId
  step: 'shipping' | 'payment' | 'confirmation'
}

// ─── Order ────────────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export interface OrderItem {
  productId: string
  name: string
  price: number              // cents, price at time of purchase
  quantity: number
  sizeEu: number
  colorLabel: string
  image: ProductImage
  slug: string
}

export interface Order {
  id: string
  orderNumber: string        // human-readable, e.g. "OFL-4021"
  status: OrderStatus
  items: OrderItem[]
  shippingAddress: ShippingAddress
  deliveryMethod: DeliveryMethodId
  subtotal: number           // cents
  shippingCost: number       // cents
  total: number              // cents
  createdAt: string          // ISO timestamp
  estimatedDelivery: string  // human-readable, e.g. "September 5–8"
  trackingNumber?: string
  carrier?: string
}

// ─── Account ──────────────────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

// ─── Filter / Sort ────────────────────────────────────────────────────────────

export type SortOption = 'newest' | 'price-asc' | 'price-desc'

export interface ProductFilters {
  category?: CategoryId
  sizeEu?: number
  color?: string
  isNew?: boolean
}
