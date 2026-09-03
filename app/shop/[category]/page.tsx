import { notFound } from 'next/navigation'
import { ShopListing } from '@/components/shop/shop-listing'
import { products } from '@/lib/data/products'
import { getCategoryBySlug } from '@/lib/data/categories'
import { getCollectionBySlug } from '@/lib/data/collections'

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params
  const category = getCategoryBySlug(slug)
  if (category) {
    return <ShopListing products={products} category={category.id} title={category.name} description={category.longDescription} />
  }
  const collection = getCollectionBySlug(slug)
  if (collection) {
    const collectionProducts = products.filter((product) => collection.productIds.includes(product.id))
    return <ShopListing products={collectionProducts} title={collection.name} description={collection.description} />
  }
  notFound()
}
