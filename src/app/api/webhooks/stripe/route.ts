import { headers } from 'next/headers'
import { getDb } from '@/lib/db'
import { getUserByStripeCustomerId } from '@/server/services/user.service'
import type { SubscriptionStatus } from '@/generated/prisma/client'

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  // Graceful fail wenn keine echten Stripe-Keys konfiguriert
  if (!webhookSecret || webhookSecret === 'whsec_dummy') {
    console.warn('[Stripe Webhook] Kein echter STRIPE_WEBHOOK_SECRET — Request ignoriert')
    return Response.json({ received: false, reason: 'no_secret' }, { status: 200 })
  }

  const body = await req.text()
  const headerPayload = await headers()
  const signature = headerPayload.get('stripe-signature')

  if (!signature) {
    return Response.json({ error: 'Fehlende Stripe-Signatur' }, { status: 400 })
  }

  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-02-25.clover',
    typescript: true,
  })

  let event: import('stripe').Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch {
    return Response.json({ error: 'Ungültige Stripe-Signatur' }, { status: 400 })
  }

  const db = getDb()

  const statusMap: Record<string, SubscriptionStatus> = {
    active: 'ACTIVE',
    canceled: 'CANCELED',
    incomplete: 'INACTIVE',
    incomplete_expired: 'INACTIVE',
    past_due: 'PAST_DUE',
    paused: 'INACTIVE',
    trialing: 'TRIALING',
    unpaid: 'PAST_DUE',
  }

  try {
    if (
      event.type === 'customer.subscription.created' ||
      event.type === 'customer.subscription.updated'
    ) {
      const sub = event.data.object as import('stripe').Stripe.Subscription
      const user = await getUserByStripeCustomerId(sub.customer as string)
      if (!user) return Response.json({ received: true })

      const item = sub.items.data[0]
      // Stripe API 2026-02-25.clover: current_period_start/end auf SubscriptionItem verschoben
      const periodStart = new Date(item.current_period_start * 1000)
      const periodEnd = new Date(item.current_period_end * 1000)
      await db.subscription.upsert({
        where: { stripeSubscriptionId: sub.id },
        create: {
          userId: user.id,
          stripeSubscriptionId: sub.id,
          stripePriceId: item.price.id,
          stripeProductId: item.price.product as string,
          status: statusMap[sub.status] ?? 'INACTIVE',
          currentPeriodStart: periodStart,
          currentPeriodEnd: periodEnd,
          cancelAtPeriodEnd: sub.cancel_at_period_end,
        },
        update: {
          stripePriceId: item.price.id,
          stripeProductId: item.price.product as string,
          status: statusMap[sub.status] ?? 'INACTIVE',
          currentPeriodStart: periodStart,
          currentPeriodEnd: periodEnd,
          cancelAtPeriodEnd: sub.cancel_at_period_end,
        },
      })
    } else if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as import('stripe').Stripe.Subscription
      await db.subscription.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: { status: 'CANCELED' },
      })
    }
  } catch (err) {
    console.error('Stripe-Webhook Fehler:', err)
    return Response.json({ error: 'Verarbeitungsfehler' }, { status: 500 })
  }

  return Response.json({ received: true })
}
