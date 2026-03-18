import { headers } from 'next/headers'
import { getStripe } from '@/lib/stripe'
import { getDb } from '@/lib/db'
import { getUserByStripeCustomerId } from '@/server/services/user.service'
import type { SubscriptionStatus } from '@/generated/prisma'
import type Stripe from 'stripe'

// Stripe-Status → DB-Enum Mapping
function mapStripeStatus(status: Stripe.Subscription.Status): SubscriptionStatus {
  const map: Record<Stripe.Subscription.Status, SubscriptionStatus> = {
    active: 'ACTIVE',
    canceled: 'CANCELED',
    incomplete: 'INACTIVE',
    incomplete_expired: 'INACTIVE',
    past_due: 'PAST_DUE',
    paused: 'INACTIVE',
    trialing: 'TRIALING',
    unpaid: 'PAST_DUE',
  }
  return map[status] ?? 'INACTIVE'
}

// Stripe-Webhook-Handler
export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    return Response.json(
      { error: 'STRIPE_WEBHOOK_SECRET nicht konfiguriert' },
      { status: 500 }
    )
  }

  const body = await req.text()
  const headerPayload = await headers()
  const signature = headerPayload.get('stripe-signature')

  if (!signature) {
    return Response.json({ error: 'Fehlende Stripe-Signatur' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch {
    return Response.json({ error: 'Ungültige Stripe-Signatur' }, { status: 400 })
  }

  const db = getDb()

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const user = await getUserByStripeCustomerId(sub.customer as string)
        if (!user) break

        const item = sub.items.data[0]
        await db.subscription.upsert({
          where: { stripeSubscriptionId: sub.id },
          create: {
            userId: user.id,
            stripeSubscriptionId: sub.id,
            stripePriceId: item.price.id,
            stripeProductId: item.price.product as string,
            status: mapStripeStatus(sub.status),
            currentPeriodStart: new Date(sub.current_period_start * 1000),
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
            cancelAtPeriodEnd: sub.cancel_at_period_end,
          },
          update: {
            stripePriceId: item.price.id,
            stripeProductId: item.price.product as string,
            status: mapStripeStatus(sub.status),
            currentPeriodStart: new Date(sub.current_period_start * 1000),
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
            cancelAtPeriodEnd: sub.cancel_at_period_end,
          },
        })
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await db.subscription.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: { status: 'CANCELED' },
        })
        break
      }
    }
  } catch (err) {
    console.error('Stripe-Webhook Fehler:', err)
    return Response.json({ error: 'Verarbeitungsfehler' }, { status: 500 })
  }

  return Response.json({ received: true })
}
