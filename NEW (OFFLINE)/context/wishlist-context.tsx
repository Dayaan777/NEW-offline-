'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import type { Wishlist, WishlistItem } from '@/lib/types'

// ─── State ────────────────────────────────────────────────────────────────────

const EMPTY_WISHLIST: Wishlist = { items: [] }

// ─── Actions ──────────────────────────────────────────────────────────────────

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; variantId: string } }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'HYDRATE'; payload: Wishlist }

function wishlistReducer(state: Wishlist, action: WishlistAction): Wishlist {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload

    case 'ADD_ITEM': {
      const alreadySaved = state.items.some(
        (i) =>
          i.productId === action.payload.productId &&
          i.variantId === action.payload.variantId
      )
      if (alreadySaved) return state
      return { items: [...state.items, action.payload] }
    }

    case 'REMOVE_ITEM': {
      const { productId, variantId } = action.payload
      return {
        items: state.items.filter(
          (i) => !(i.productId === productId && i.variantId === variantId)
        ),
      }
    }

    case 'CLEAR_WISHLIST':
      return EMPTY_WISHLIST

    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface WishlistContextValue {
  wishlist: Wishlist
  itemCount: number
  isSaved: (productId: string, variantId: string) => boolean
  addItem: (item: WishlistItem) => void
  removeItem: (productId: string, variantId: string) => void
  toggleItem: (item: WishlistItem) => void
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'offline_wishlist'

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, EMPTY_WISHLIST)

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed: Wishlist = JSON.parse(stored)
        dispatch({ type: 'HYDRATE', payload: parsed })
      }
    } catch {
      // Ignore parse errors
    }
  }, [])

  // Persist to localStorage whenever wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist))
    } catch {
      // Storage unavailable — continue without persistence
    }
  }, [wishlist])

  const isSaved = useCallback(
    (productId: string, variantId: string) =>
      wishlist.items.some(
        (i) => i.productId === productId && i.variantId === variantId
      ),
    [wishlist.items]
  )

  const addItem = useCallback((item: WishlistItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }, [])

  const removeItem = useCallback((productId: string, variantId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantId } })
  }, [])

  const toggleItem = useCallback(
    (item: WishlistItem) => {
      if (isSaved(item.productId, item.variantId)) {
        dispatch({ type: 'REMOVE_ITEM', payload: { productId: item.productId, variantId: item.variantId } })
      } else {
        dispatch({ type: 'ADD_ITEM', payload: item })
      }
    },
    [isSaved]
  )

  const clearWishlist = useCallback(() => dispatch({ type: 'CLEAR_WISHLIST' }), [])

  const value: WishlistContextValue = {
    wishlist,
    itemCount: wishlist.items.length,
    isSaved,
    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
  }

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider')
  return ctx
}
