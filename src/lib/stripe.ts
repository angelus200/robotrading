import 'server-only'
import Stripe from 'stripe'

// Lazy-Init — Stripe-Client wird erst bei erstem Aufruf initialisiert
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    })
  }
  return _stripe
}

// Stripe-Preise für Abonnements
export const STRIPE_PRICES = {
  basic: process.env.STRIPE_BASIC_PRICE_ID!,
  pro: process.env.STRIPE_PRO_PRICE_ID!,
  enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
} as const

export type PlanType = keyof typeof STRIPE_PRICES
