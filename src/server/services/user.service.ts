import 'server-only'
import { getDb } from '@/lib/db'
import type { UserRole } from '@/generated/prisma/client'

// Typen für Clerk-Webhook-Payload
interface ClerkUserData {
  clerkId: string
  email: string
  name?: string
  avatarUrl?: string
}

// User aus Clerk-Webhook anlegen oder aktualisieren
export async function upsertUser(data: ClerkUserData) {
  const db = getDb()
  return db.user.upsert({
    where: { clerkId: data.clerkId },
    create: {
      clerkId: data.clerkId,
      email: data.email,
      name: data.name,
      avatarUrl: data.avatarUrl,
    },
    update: {
      email: data.email,
      name: data.name,
      avatarUrl: data.avatarUrl,
    },
  })
}

// User nach Clerk-ID löschen
export async function deleteUser(clerkId: string) {
  const db = getDb()
  return db.user.delete({ where: { clerkId } })
}

// Rolle eines Users setzen (Admin-Funktion)
export async function setUserRole(userId: string, role: UserRole) {
  const db = getDb()
  return db.user.update({ where: { id: userId }, data: { role } })
}

// Stripe-Customer-ID verknüpfen
export async function setStripeCustomerId(clerkId: string, stripeCustomerId: string) {
  const db = getDb()
  return db.user.update({
    where: { clerkId },
    data: { stripeCustomerId },
  })
}

// User nach Stripe-Customer-ID suchen
export async function getUserByStripeCustomerId(stripeCustomerId: string) {
  const db = getDb()
  return db.user.findUnique({
    where: { stripeCustomerId },
    include: { subscription: true },
  })
}
