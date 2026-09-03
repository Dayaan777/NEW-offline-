import type { Product } from '@/lib/types'

// Helper: standard EU size run used across most products
const standardSizes = (availableEU: number[]) =>
  [38, 39, 40, 41, 42, 43, 44, 45, 46].map((eu) => ({
    eu,
    us: eu - 32,   // approximate EU→US men's
    uk: eu - 33,   // approximate EU→UK
    available: availableEU.includes(eu),
    lowStock: [41, 42].includes(eu) && availableEU.includes(eu) ? true : undefined,
  }))

export const products: Product[] = [
  // ─── MARGIN — Ground ──────────────────────────────────────────────────────
  {
    id: 'margin',
    slug: 'margin',
    name: 'Margin',
    category: 'ground',
    price: 29500, // $295.00
    shortDescription:
      'A low-profile leather sneaker. Clean lines, no visible branding. For the default day.',
    description:
      'The Margin is the shoe you reach for without thinking. Full-grain vegetable-tanned leather upper in a minimal, slightly rounded silhouette. No decorative hardware. No external branding. Blake stitched to a flat leather midsole and crepe rubber outsole. Interior stamp only.',
    materials: {
      upper: 'Full-grain vegetable-tanned leather',
      lining: 'Leather sock lining',
      insole: 'Leather-covered cushioned insole',
      outsole: 'Natural crepe rubber',
      origin: 'Leather sourced in Portugal',
    },
    construction: 'Blake stitched. The sole is directly stitched to the upper through the insole — a clean, low-profile construction with good ground feel.',
    fit: 'True to size. The Margin has a medium width last.',
    breakIn: 'The leather upper will soften and conform to your foot over 2–3 weeks of regular wear. It will be better at six months than on day one.',
    care: 'Wipe with a damp cloth. Condition with a neutral leather cream every 4–6 weeks depending on use. Avoid prolonged exposure to standing water.',
    isNew: true,
    featured: true,
    variants: [
      {
        id: 'margin-off-white',
        color: 'off-white',
        colorLabel: 'Off-white — vegetable-tanned leather',
        colorHex: '#EDE9E0',
        sizes: standardSizes([38, 39, 40, 41, 42, 43, 44, 45]),
        images: [
          { src: '/images/products/margin/off-white/01.jpg', alt: 'Margin in off-white, on foot' },
          { src: '/images/products/margin/off-white/02.jpg', alt: 'Margin in off-white, profile' },
          { src: '/images/products/margin/off-white/03.jpg', alt: 'Margin in off-white, sole detail' },
          { src: '/images/products/margin/off-white/04.jpg', alt: 'Margin in off-white, leather texture close-up' },
          { src: '/images/products/margin/off-white/05.jpg', alt: 'Margin in off-white, interior stamp' },
        ],
      },
      {
        id: 'margin-slate',
        color: 'slate',
        colorLabel: 'Slate — full-grain leather',
        colorHex: '#6B7280',
        sizes: standardSizes([38, 39, 40, 41, 42, 43, 44, 45, 46]),
        images: [
          { src: '/images/products/margin/slate/01.jpg', alt: 'Margin in slate, on foot' },
          { src: '/images/products/margin/slate/02.jpg', alt: 'Margin in slate, profile' },
          { src: '/images/products/margin/slate/03.jpg', alt: 'Margin in slate, sole detail' },
          { src: '/images/products/margin/slate/04.jpg', alt: 'Margin in slate, leather texture close-up' },
          { src: '/images/products/margin/slate/05.jpg', alt: 'Margin in slate, interior stamp' },
        ],
      },
      {
        id: 'margin-umber',
        color: 'umber',
        colorLabel: 'Dark umber — full-grain leather',
        colorHex: '#5C3D2E',
        sizes: standardSizes([39, 40, 41, 42, 43, 44]),
        images: [
          { src: '/images/products/margin/umber/01.jpg', alt: 'Margin in dark umber, on foot' },
          { src: '/images/products/margin/umber/02.jpg', alt: 'Margin in dark umber, profile' },
          { src: '/images/products/margin/umber/03.jpg', alt: 'Margin in dark umber, sole detail' },
          { src: '/images/products/margin/umber/04.jpg', alt: 'Margin in dark umber, leather texture close-up' },
          { src: '/images/products/margin/umber/05.jpg', alt: 'Margin in dark umber, interior stamp' },
        ],
      },
    ],
  },

  // ─── FARROW — Field ───────────────────────────────────────────────────────
  {
    id: 'farrow',
    slug: 'farrow',
    name: 'Farrow',
    category: 'field',
    price: 39500, // $395.00
    shortDescription:
      'An ankle-height utility boot. Waxed leather, Goodyear welted, resoleable. Designed to look better at six months than at six days.',
    description:
      'The Farrow is built for the space between city and outdoors. Waxed calf leather upper, Goodyear welted to a commando-style rubber lug sole. Unlined heel for breathability, structured leather toe. Water-resistant by construction. Resoleable for the long term.',
    materials: {
      upper: 'Waxed calf leather',
      lining: 'Full leather lining',
      insole: 'Cork-filled leather insole',
      outsole: 'Commando rubber lug sole',
      origin: 'Manufactured in England',
    },
    construction: 'Goodyear welted. The upper, insole, and outsole are joined by a welt stitch — a construction that allows the sole to be replaced. The most durable method of shoe construction.',
    fit: 'True to size. The Farrow has a medium-to-wide last. If between sizes, size down.',
    breakIn: 'The waxed leather and cork insole will take 3–4 weeks to fully conform to your foot. The cork insole molds to your footbed over time. Wear them for short periods initially.',
    care: 'Re-wax every 3–4 months or when the leather begins to look dry. Use a matching wax polish or a neutral wax. The boot is water-resistant, not waterproof — avoid submersion.',
    featured: true,
    variants: [
      {
        id: 'farrow-olive',
        color: 'olive',
        colorLabel: 'Dark olive — waxed calf leather',
        colorHex: '#4A5240',
        sizes: standardSizes([39, 40, 41, 42, 43, 44, 45, 46]),
        images: [
          { src: '/images/products/farrow/olive/01.jpg', alt: 'Farrow in dark olive, on foot' },
          { src: '/images/products/farrow/olive/02.jpg', alt: 'Farrow in dark olive, profile' },
          { src: '/images/products/farrow/olive/03.jpg', alt: 'Farrow in dark olive, sole detail' },
          { src: '/images/products/farrow/olive/04.jpg', alt: 'Farrow in dark olive, welt close-up' },
          { src: '/images/products/farrow/olive/05.jpg', alt: 'Farrow in dark olive, interior' },
        ],
      },
      {
        id: 'farrow-bark',
        color: 'bark',
        colorLabel: 'Bark — waxed calf leather',
        colorHex: '#8B6347',
        sizes: standardSizes([38, 39, 40, 41, 42, 43, 44, 45]),
        images: [
          { src: '/images/products/farrow/bark/01.jpg', alt: 'Farrow in bark, on foot' },
          { src: '/images/products/farrow/bark/02.jpg', alt: 'Farrow in bark, profile' },
          { src: '/images/products/farrow/bark/03.jpg', alt: 'Farrow in bark, sole detail' },
          { src: '/images/products/farrow/bark/04.jpg', alt: 'Farrow in bark, welt close-up' },
          { src: '/images/products/farrow/bark/05.jpg', alt: 'Farrow in bark, interior' },
        ],
      },
      {
        id: 'farrow-black',
        color: 'black',
        colorLabel: 'Black — waxed calf leather',
        colorHex: '#1C1916',
        sizes: standardSizes([38, 39, 40, 41, 42, 43, 44, 45, 46]),
        images: [
          { src: '/images/products/farrow/black/01.jpg', alt: 'Farrow in black, on foot' },
          { src: '/images/products/farrow/black/02.jpg', alt: 'Farrow in black, profile' },
          { src: '/images/products/farrow/black/03.jpg', alt: 'Farrow in black, sole detail' },
          { src: '/images/products/farrow/black/04.jpg', alt: 'Farrow in black, welt close-up' },
          { src: '/images/products/farrow/black/05.jpg', alt: 'Farrow in black, interior' },
        ],
      },
    ],
  },

  // ─── CROFT — Floor ────────────────────────────────────────────────────────
  {
    id: 'croft',
    slug: 'croft',
    name: 'Croft',
    category: 'floor',
    price: 18500, // $185.00
    shortDescription:
      'A low-profile slip-on. Suede upper, flexible crepe sole. For the morning, the studio, the in-between.',
    description:
      'The Croft is not a house shoe. It is the shoe for moments when you want to still be wearing a shoe. A mule construction with an open back, padded leather insole, and flexible crepe rubber outsole. The suede upper is unlined for a close, warm feel.',
    materials: {
      upper: 'Nubuck suede',
      insole: 'Padded leather-covered insole',
      outsole: 'Natural crepe rubber',
      origin: 'Manufactured in Portugal',
    },
    construction: 'Cemented construction with a hand-lasted toe. Flexible and lightweight — designed for indoor movement.',
    fit: 'Size up if between sizes. The open back means a secure fit around the vamp is important.',
    care: 'Brush with a suede brush to restore the nap. Use a suede protector spray before first wear. Avoid water — suede does not recover well from saturation.',
    variants: [
      {
        id: 'croft-natural',
        color: 'natural',
        colorLabel: 'Natural — nubuck suede',
        colorHex: '#C9B99A',
        sizes: standardSizes([38, 39, 40, 41, 42, 43, 44]),
        images: [
          { src: '/images/products/croft/natural/01.jpg', alt: 'Croft in natural, on foot' },
          { src: '/images/products/croft/natural/02.jpg', alt: 'Croft in natural, profile' },
          { src: '/images/products/croft/natural/03.jpg', alt: 'Croft in natural, suede texture close-up' },
          { src: '/images/products/croft/natural/04.jpg', alt: 'Croft in natural, sole detail' },
        ],
      },
      {
        id: 'croft-charcoal',
        color: 'charcoal',
        colorLabel: 'Charcoal — nubuck suede',
        colorHex: '#3D3D3D',
        sizes: standardSizes([38, 39, 40, 41, 42, 43, 44, 45]),
        images: [
          { src: '/images/products/croft/charcoal/01.jpg', alt: 'Croft in charcoal, on foot' },
          { src: '/images/products/croft/charcoal/02.jpg', alt: 'Croft in charcoal, profile' },
          { src: '/images/products/croft/charcoal/03.jpg', alt: 'Croft in charcoal, suede texture close-up' },
          { src: '/images/products/croft/charcoal/04.jpg', alt: 'Croft in charcoal, sole detail' },
        ],
      },
      {
        id: 'croft-warm-grey',
        color: 'warm-grey',
        colorLabel: 'Warm grey — nubuck suede',
        colorHex: '#9E9890',
        sizes: standardSizes([39, 40, 41, 42, 43]),
        images: [
          { src: '/images/products/croft/warm-grey/01.jpg', alt: 'Croft in warm grey, on foot' },
          { src: '/images/products/croft/warm-grey/02.jpg', alt: 'Croft in warm grey, profile' },
          { src: '/images/products/croft/warm-grey/03.jpg', alt: 'Croft in warm grey, suede texture close-up' },
          { src: '/images/products/croft/warm-grey/04.jpg', alt: 'Croft in warm grey, sole detail' },
        ],
      },
    ],
  },

  // ─── WELD — Track ─────────────────────────────────────────────────────────
  {
    id: 'weld',
    slug: 'weld',
    name: 'Weld',
    category: 'track',
    price: 26000, // $260.00
    shortDescription:
      'A low runner built for daily movement. Mesh upper, leather overlays, thick rubber cupsole. Not a performance shoe.',
    description:
      'The Weld is a movement shoe, not a training shoe. A low runner silhouette referencing factory and workshop footwear more than sports science. Breathable mesh upper with leather overlays at the heel and toe. Padded collar, clean minimal lacing, thick vulcanized rubber cupsole.',
    materials: {
      upper: 'Technical mesh with full-grain leather overlays',
      lining: 'Textile lining',
      insole: 'Removable cushioned insole',
      outsole: 'Vulcanized rubber cupsole',
    },
    construction: 'Direct-vulcanized rubber cupsole. The upper and sole are bonded under heat — a durable, flexible construction suited to high-flex movement.',
    fit: 'True to size. Slightly wider in the toe box than the Margin.',
    care: 'Clean mesh with a soft brush and mild soap solution. Wipe leather overlays with a damp cloth. Air dry — do not machine wash.',
    isNew: true,
    featured: true,
    variants: [
      {
        id: 'weld-black-bone',
        color: 'black-bone',
        colorLabel: 'Black / bone — mesh and leather',
        colorHex: '#1C1916',
        sizes: standardSizes([38, 39, 40, 41, 42, 43, 44, 45, 46]),
        images: [
          { src: '/images/products/weld/black-bone/01.jpg', alt: 'Weld in black/bone, on foot' },
          { src: '/images/products/weld/black-bone/02.jpg', alt: 'Weld in black/bone, profile' },
          { src: '/images/products/weld/black-bone/03.jpg', alt: 'Weld in black/bone, sole detail' },
          { src: '/images/products/weld/black-bone/04.jpg', alt: 'Weld in black/bone, mesh texture close-up' },
        ],
      },
      {
        id: 'weld-stone-umber',
        color: 'stone-umber',
        colorLabel: 'Stone / umber — mesh and leather',
        colorHex: '#9E9890',
        sizes: standardSizes([38, 39, 40, 41, 42, 43, 44, 45]),
        images: [
          { src: '/images/products/weld/stone-umber/01.jpg', alt: 'Weld in stone/umber, on foot' },
          { src: '/images/products/weld/stone-umber/02.jpg', alt: 'Weld in stone/umber, profile' },
          { src: '/images/products/weld/stone-umber/03.jpg', alt: 'Weld in stone/umber, sole detail' },
          { src: '/images/products/weld/stone-umber/04.jpg', alt: 'Weld in stone/umber, mesh texture close-up' },
        ],
      },
      {
        id: 'weld-white-concrete',
        color: 'white-concrete',
        colorLabel: 'White / concrete — mesh and leather',
        colorHex: '#F6F3EE',
        sizes: standardSizes([39, 40, 41, 42, 43, 44, 45]),
        images: [
          { src: '/images/products/weld/white-concrete/01.jpg', alt: 'Weld in white/concrete, on foot' },
          { src: '/images/products/weld/white-concrete/02.jpg', alt: 'Weld in white/concrete, profile' },
          { src: '/images/products/weld/white-concrete/03.jpg', alt: 'Weld in white/concrete, sole detail' },
          { src: '/images/products/weld/white-concrete/04.jpg', alt: 'Weld in white/concrete, mesh texture close-up' },
        ],
      },
    ],
  },
]

// ─── Lookup helpers ──────────────────────────────────────────────────────────

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug)

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id)

export const getVariantById = (product: Product, variantId: string) =>
  product.variants.find((v) => v.id === variantId)

export const getDefaultVariant = (product: Product) => product.variants[0]
