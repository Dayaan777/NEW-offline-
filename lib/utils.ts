// ─── Class name utility ───────────────────────────────────────────────────────
// Simple cn() — no external dependencies

type ClassInput = string | undefined | null | false | 0

export function cn(...classes: ClassInput[]): string {
  return classes.filter(Boolean).join(' ')
}

// ─── Price formatting ─────────────────────────────────────────────────────────

/**
 * Format a price in cents to a display string.
 * @example formatPrice(29500) → "$295"
 * @example formatPrice(29550) → "$295.50"
 */
export function formatPrice(cents: number): string {
  const dollars = cents / 100
  return dollars % 1 === 0
    ? `$${dollars.toLocaleString('en-US')}`
    : `$${dollars.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// ─── Slug utilities ───────────────────────────────────────────────────────────

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// ─── Date formatting ──────────────────────────────────────────────────────────

export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateShort(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// ─── Cart math ────────────────────────────────────────────────────────────────

export function cartSubtotal(items: { price: number; quantity: number }[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function cartItemCount(items: { quantity: number }[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

// ─── Size display ─────────────────────────────────────────────────────────────

export function formatSize(eu: number, us: number, uk: number): string {
  return `EU ${eu} / US ${us} / UK ${uk}`
}

// ─── Pluralize ────────────────────────────────────────────────────────────────

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`)
}
