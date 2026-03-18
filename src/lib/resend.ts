import 'server-only'
import { Resend } from 'resend'

// Lazy-Init — Resend-Client wird erst bei erstem Aufruf erstellt
let _resend: Resend | null = null

export function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY!)
  }
  return _resend
}

// Standard-Absender-Adresse
export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? 'noreply@robotrading.net'

// Hilfs-Typen für E-Mail-Templates
export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}
