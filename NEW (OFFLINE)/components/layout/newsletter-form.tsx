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
      <p className="text-[15px] text-[var(--color-text-inverse)] leading-relaxed">
        Noted.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-0">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        aria-label="Email address for newsletter"
        className="flex-1 bg-transparent border-b border-[var(--color-border-inverse)] pb-2 text-[15px] text-[var(--color-text-inverse)] placeholder:text-[var(--color-text-inverse-muted)] focus:outline-none focus:border-[var(--color-text-inverse)] transition-colors duration-150"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="pb-2 pl-3 border-b border-[var(--color-border-inverse)] text-[var(--color-text-inverse-muted)] hover:text-[var(--color-text-inverse)] transition-colors duration-100 focus:outline-none focus-visible:text-[var(--color-text-inverse)]"
      >
        →
      </button>
    </form>
  )
}
