import { notFound } from 'next/navigation'
import { ShopListing } from '@/components/shop/shop-listing'
import { products } from '@/lib/data/products'
import { getCategoryBySlug, getApparelCategoryBySlug } from '@/lib/data/categories'
import { getCollectionBySlug } from '@/lib/data/collections'
import { ApparelCategoryListing } from '@/components/shop/apparel-category-listing'


export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params

  // 1. Footwear categories (ground, field, floor, track)
  const category = getCategoryBySlug(slug)
  if (category) {
    return <ShopListing products={products} category={category.id} title={category.name} description={category.longDescription} />
  }

  // 2. Collections (new, launch, etc.)
  const collection = getCollectionBySlug(slug)
  if (collection) {
    const collectionProducts = products.filter((product) => collection.productIds.includes(product.id))
    return <ShopListing products={collectionProducts} title={collection.name} description={collection.description} />
  }

  // 3. Apparel categories (men-tshirts, women-shirts, etc.)
  const apparelCategory = getApparelCategoryBySlug(slug)
  if (apparelCategory) {
    return <ApparelCategoryListing category={apparelCategory} />
  }

  // 4. "shoes" — all footwear
  if (slug === 'shoes') {
    return <ShopListing products={products} title="Shoes" description="Every shoe in the OFFLINE range. Four silhouettes, four contexts. Made to be worn often, repaired when needed, and kept for a long time." />
  }

  notFound()
}
