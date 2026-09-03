export default function ProductPage({
  params,
}: {
  params: { category: string; slug: string }
}) {
  return <div>Product: {params.slug} in {params.category} — coming soon</div>
}
