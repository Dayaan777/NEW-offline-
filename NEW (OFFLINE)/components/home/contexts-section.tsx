import Link from 'next/link'
import { categories } from '@/lib/data/categories'
import type { CategoryId } from '@/lib/types'

const CONTEXT_ORDER: CategoryId[] = ['ground', 'field', 'floor', 'track']

export function ContextsSection() {
  return (
    <section aria-labelledby="contexts-heading" className="bg-[var(--color-bg-primary)]">
      <div className="container">
        <div className="flex flex-col gap-5 border-b border-[var(--color-border-subtle)] py-8 md:flex-row md:items-center md:justify-between md:py-10">
          <div>
            <p className="label-category mb-2 text-[var(--color-text-muted)]">The contexts</p>
            <h2 id="contexts-heading" className="text-[1.75rem] font-light leading-none tracking-[-0.02em] text-[var(--color-text-primary)] md:text-[2.25rem]">Four ways through the day.</h2>
          </div>
          <div className="flex max-w-full gap-3 overflow-x-auto pb-1 md:gap-0 md:overflow-visible">
            {CONTEXT_ORDER.map((id, index) => {
              const category = categories.find((item) => item.id === id)
              if (!category) return null
              return (
                <Link key={id} href={`/shop/${category.slug}`} className="group min-w-[180px] border-l border-[var(--color-border-default)] px-4 first:pl-0 md:min-w-0 md:flex-1 md:px-6 md:first:pl-0">
                  <span className="label-category text-[var(--color-text-muted)]">{String(index + 1).padStart(2, '0')}</span>
                  <span className="mt-3 block text-[1.2rem] font-light text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent-hover)]">{category.name}</span>
                  <span className="mt-2 block max-w-[150px] text-[0.8rem] leading-relaxed text-[var(--color-text-secondary)]">{category.description}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
