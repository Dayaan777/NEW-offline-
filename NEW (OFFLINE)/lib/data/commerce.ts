import type {
  DeliveryOption,
  Order,
  OrderStatus,
} from '@/lib/types'

// ─── Delivery options ────────────────────────────────────────────────────────

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 'standard',
    label: 'Standard Delivery',
    description: '3–5 business days',
    price: 0,
    estimatedDays: '3–5 business days',
  },
  {
    id: 'express',
    label: 'Express Delivery',
    description: '1–2 business days',
    price: 1500, // $15.00
    estimatedDays: '1–2 business days',
  },
]

// ─── Order status labels ──────────────────────────────────────────────────────

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Order received',
  confirmed: 'Order confirmed',
  processing: 'Preparing your order',
  shipped: 'On its way',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

// ─── Mock orders (simulated post-checkout) ────────────────────────────────────

export const mockOrders: Order[] = [
  {
    id: 'order-4021',
    orderNumber: 'OFL-4021',
    status: 'shipped',
    items: [
      {
        productId: 'margin',
        name: 'Margin',
        price: 29500,
        quantity: 1,
        sizeEu: 42,
        colorLabel: 'Slate — full-grain leather',
        image: {
          src: '/images/products/margin/slate/01.jpg',
          alt: 'Margin in slate, on foot',
        },
        slug: 'margin',
      },
    ],
    shippingAddress: {
      fullName: 'Alex Kim',
      address1: '14 Weston Street',
      city: 'London',
      state: 'England',
      postalCode: 'SE1 3ER',
      country: 'GB',
    },
    deliveryMethod: 'standard',
    subtotal: 29500,
    shippingCost: 0,
    total: 29500,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: 'September 3–6',
    trackingNumber: 'RM123456789GB',
    carrier: 'Royal Mail',
  },
]

export const getOrderByNumber = (orderNumber: string): Order | undefined =>
  mockOrders.find((o) => o.orderNumber === orderNumber)

export const getOrderById = (id: string): Order | undefined =>
  mockOrders.find((o) => o.id === id)
