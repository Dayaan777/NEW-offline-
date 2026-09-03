import Link from 'next/link'

export function EditorialSection() {
  return (
    <section aria-labelledby="editorial-heading" className="bg-[var(--color-bg-primary)]">
      <div className="container">
        <div className="grid min-h-[420px] border-b border-[var(--color-border-subtle)] md:grid-cols-[1.35fr_0.65fr]">
          <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden bg-[#201A16] px-5 py-6 md:min-h-[420px] md:px-8 md:py-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_35%_35%,#4A3324_0%,#2A211B_45%,transparent_78%)]" aria-hidden="true" />
            <div className="relative flex items-center justify-between">
              <p className="label-category text-white/45">OFFLINE / 2024</p>
              <p className="label-category text-white/30">Field notes</p>
            </div>
            <div className="relative max-w-[420px]">
              <p className="label-category mb-4 text-white/45">A shoe for the way through</p>
              <p className="text-[2.35rem] font-light leading-[0.92] tracking-[-0.03em] text-white/80 sm:text-[3.25rem] md:text-[4rem]">
                Stay out a little longer.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between border-t border-[var(--color-border-subtle)] px-5 py-8 md:border-l md:border-t-0 md:px-8 md:py-10">
            <p className="max-w-[250px] text-[0.95rem] leading-relaxed text-[var(--color-text-secondary)]">
              Built for the distance between where you are and where you meant to go.
            </p>
            <Link
              href="/shop/field"
              className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] text-[var(--color-accent)] transition-colors duration-150 hover:text-[var(--color-accent-hover)]"
            >
              Explore the edit
              <span className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
