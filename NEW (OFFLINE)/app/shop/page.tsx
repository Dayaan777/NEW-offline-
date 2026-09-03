import { ShopListing } from '@/components/shop/shop-listing'
import { products } from '@/lib/data/products'

export default function ShopPage() {
  return <ShopListing products={products} title="The range" description="Four shoes for four contexts. Each one made to be worn often, repaired when needed, and kept for a long time." />
}
