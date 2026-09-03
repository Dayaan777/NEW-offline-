import Link from 'next/link'
import { products } from '@/lib/data/products'

export function MaterialsSection() {
  const margin = products.find((product) => product.slug === 'margin')
  const details = products.filter((product) => ['margin', 'farrow', 'croft'].includes(product.slug))

  return (
    <section aria-labelledby="materials-heading" className="bg-[var(--color-bg-primary)]">
      <div className="container">
        <div className="grid border-b border-[var(--color-border-subtle)] md:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col justify-center border-b border-[var(--color-border-subtle)] py-12 md:border-b-0 md:border-r md:py-16 md:pr-12 lg:pr-20">
            <p className="label-category mb-4 text-[var(--color-text-muted)]">Materials / Construction</p>
            <h2 id="materials-heading" className="max-w-[420px] text-[2.5rem] font-light leading-[0.92] tracking-[-0.03em] text-[var(--color-text-primary)] md:text-[3.5rem]">Made to show the day.</h2>
            <p className="mt-6 max-w-[350px] text-[0.95rem] leading-relaxed text-[var(--color-text-secondary)]">Every surface has a job. Full-grain leather, open suede, stitched rubber. Materials selected to soften, mark, and hold their shape in use.</p>
            <Link href="/brand/materials" className="group mt-8 inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]">Explore construction <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span></Link>
          </div>
          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[300px] overflow-hidden bg-[#231B15] p-6 md:min-h-full md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_42%_35%,#57402D_0%,#2D2118_48%,transparent_78%)]" aria-hidden="true" />
              <div className="relative flex h-full flex-col justify-between"><p className="label-category text-white/40">Material study / 01</p><p className="max-w-[290px] text-[2.5rem] font-light leading-[0.9] tracking-[-0.03em] text-white/75 md:text-[3.5rem]">Crease.<br />Soften.<br />Hold.</p>{margin && <p className="max-w-[250px] text-[0.8rem] leading-relaxed text-white/40">{margin.materials.upper}. {margin.materials.outsole}.</p>}</div>
            </div>
            <div className="flex flex-col divide-y divide-[var(--color-border-subtle)] border-t border-[var(--color-border-subtle)] md:border-l md:border-t-0">
              {details.map((product) => <div key={product.id} className="flex flex-1 flex-col justify-center px-6 py-6"><div className="flex items-baseline justify-between gap-4"><p className="text-[1.15rem] font-light text-[var(--color-text-primary)]">{product.name}</p><p className="label-category text-[var(--color-text-muted)]">{product.category}</p></div><p className="mt-2 text-[0.8rem] leading-relaxed text-[var(--color-text-secondary)]">{product.materials.upper}</p><p className="mt-1 text-[0.75rem] text-[var(--color-text-muted)]">{product.construction.split('.')[0]}</p></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
