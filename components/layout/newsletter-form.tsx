'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setStatus('submitted')
  }

  if (status === 'submitted') {
    return <p className="mt-6 text-[13px] leading-6 text-[var(--color-text-primary)]">Thank you for subscribing.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex max-w-[252px] items-end border-b border-[var(--color-text-primary)]">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        aria-label="Email address for newsletter"
        className="min-w-0 flex-1 bg-transparent py-1 text-[13px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none"
      />
      <button type="submit" aria-label="Subscribe" className="p-1 text-[var(--color-text-primary)] transition-opacity hover:opacity-60">
        <Mail size={20} strokeWidth={1.4} aria-hidden="true" />
      </button>
    </form>
  )
}
