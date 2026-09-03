import Link from 'next/link'

export function FinalCtaSection() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-[var(--color-bg-primary)]"
    >
      <div className="container">
        <div className="border-b border-[var(--color-border-subtle)] py-12 md:py-16 lg:py-20">
          <p className="label-category text-[var(--color-text-muted)] mb-5">
            Next
          </p>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <h2
              id="final-cta-heading"
              className="max-w-[16ch] text-[2.5rem] font-light uppercase leading-[0.92] tracking-normal text-[var(--color-text-primary)] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5rem]"
            >
              <span className="block">Make</span>
              <span className="block">somewhere</span>
              <span className="block text-[var(--color-accent)]">
                worth going.
              </span>
            </h2>

            <div className="flex flex-col items-start gap-4 pb-1 sm:flex-row sm:items-center lg:max-w-[340px] lg:flex-col lg:items-start">
              <Link
                href="/shop"
                className="inline-flex h-11 items-center bg-[var(--color-accent)] px-7 text-[13px] font-medium tracking-[0.06em] text-[var(--color-text-inverse)] transition-colors duration-150 hover:bg-[var(--color-accent-hover)]"
              >
                Shop OFFLINE
              </Link>
              <p className="max-w-[240px] text-[0.875rem] leading-relaxed text-[var(--color-text-muted)]">
                Four shoes. Pick the one that matches the day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
