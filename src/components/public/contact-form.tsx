'use client'

import { useState } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '', phone: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    // Placeholder — Resend-Integration folgt in Phase 2
    await new Promise((r) => setTimeout(r, 800))
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-8 text-center">
        <div className="mb-3 text-4xl">✓</div>
        <h3 className="text-lg font-semibold text-white">Nachricht gesendet!</h3>
        <p className="mt-2 text-sm text-[#94A3B8]">
          Wir melden uns schnellstmöglich bei Ihnen. Vielen Dank!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-[#334155] bg-[#0F172A] px-4 py-3 text-sm text-white placeholder-[#475569] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Adresse"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-[#334155] bg-[#0F172A] px-4 py-3 text-sm text-white placeholder-[#475569] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
      </div>
      <div>
        <textarea
          placeholder="Ihre Nachricht"
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-lg border border-[#334155] bg-[#0F172A] px-4 py-3 text-sm text-white placeholder-[#475569] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
        />
      </div>
      <div>
        <input
          type="tel"
          placeholder="Ihre Telefonnummer"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-lg border border-[#334155] bg-[#0F172A] px-4 py-3 text-sm text-white placeholder-[#475569] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>
      <div className="text-right">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-60 transition-colors"
        >
          {status === 'sending' ? 'Wird gesendet…' : 'Senden'}
        </button>
      </div>
    </form>
  )
}
