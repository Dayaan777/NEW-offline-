'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import type { Cart, CartItem } from '@/lib/types'
import { cartItemCount, cartSubtotal } from '@/lib/utils'

// ─── State ────────────────────────────────────────────────────────────────────

interface CartState {
  cart: Cart
  isOpen: boolean
}

const EMPTY_CART: Cart = { items: [], updatedAt: new Date().toISOString() }

const initialState: CartState = {
  cart: EMPTY_CART,
  isOpen: false,
}

// ─── Actions ──────────────────────────────────────────────────────────────────

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; variantId: string; sizeEu: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; variantId: string; sizeEu: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'HYDRATE'; payload: Cart }

function cartReducer(state: CartState, action: CartAction): CartState {
  const now = new Date().toISOString()

  switch (action.type) {
    case 'HYDRATE':
      return { ...state, cart: action.payload }

    case 'ADD_ITEM': {
      const { payload } = action
      const existingIndex = state.cart.items.findIndex(
        (i) =>
          i.productId === payload.productId &&
          i.variantId === payload.variantId &&
          i.sizeEu === payload.sizeEu
      )
      let items: CartItem[]
      if (existingIndex >= 0) {
        items = state.cart.items.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + payload.quantity }
            : item
        )
      } else {
        items = [...state.cart.items, payload]
      }
      return {
        ...state,
        cart: { items, updatedAt: now },
        isOpen: true,
      }
    }

    case 'REMOVE_ITEM': {
      const { productId, variantId, sizeEu } = action.payload
      return {
        ...state,
        cart: {
          items: state.cart.items.filter(
            (i) =>
              !(i.productId === productId && i.variantId === variantId && i.sizeEu === sizeEu)
          ),
          updatedAt: now,
        },
      }
    }

    case 'UPDATE_QUANTITY': {
      const { productId, variantId, sizeEu, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { productId, variantId, sizeEu } })
      }
      return {
        ...state,
        cart: {
          items: state.cart.items.map((i) =>
            i.productId === productId && i.variantId === variantId && i.sizeEu === sizeEu
              ? { ...i, quantity }
              : i
          ),
          updatedAt: now,
        },
      }
    }

    case 'CLEAR_CART':
      return { ...state, cart: EMPTY_CART }

    case 'OPEN_CART':
      return { ...state, isOpen: true }

    case 'CLOSE_CART':
      return { ...state, isOpen: false }

    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface CartContextValue {
  cart: Cart
  isOpen: boolean
  itemCount: number
  subtotal: number
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variantId: string, sizeEu: number) => void
  updateQuantity: (productId: string, variantId: string, sizeEu: number, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'offline_cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed: Cart = JSON.parse(stored)
        dispatch({ type: 'HYDRATE', payload: parsed })
      }
    } catch {
      // Ignore parse errors — start with empty cart
    }
  }, [])

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart))
    } catch {
      // Storage full or unavailable — continue without persistence
    }
  }, [state.cart])

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }, [])

  const removeItem = useCallback((productId: string, variantId: string, sizeEu: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantId, sizeEu } })
  }, [])

  const updateQuantity = useCallback(
    (productId: string, variantId: string, sizeEu: number, quantity: number) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, variantId, sizeEu, quantity } })
    },
    []
  )

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), [])
  const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), [])
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), [])

  const value: CartContextValue = {
    cart: state.cart,
    isOpen: state.isOpen,
    itemCount: cartItemCount(state.cart.items),
    subtotal: cartSubtotal(state.cart.items),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
