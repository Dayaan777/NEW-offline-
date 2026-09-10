'use client'

import { useState } from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setStatus('submitted')
    }
  }

  if (status === 'submitted') {
    return (
      <p aria-live="polite" className="text-[13px] leading-relaxed text-[var(--color-text-inverse)]">
        Thanks — you&apos;re on the list.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[240px] items-center border-b border-[var(--color-border-inverse)]">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        aria-label="Email address for newsletter"
        className="min-w-0 flex-1 bg-transparent py-2 text-[13px] text-[var(--color-text-inverse)] placeholder:text-[var(--color-text-inverse-muted)] focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-[var(--color-text-inverse-muted)] transition-colors duration-150 hover:text-[var(--color-text-inverse)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-text-inverse)]"
      >
        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      </button>
    </form>
  )
}
