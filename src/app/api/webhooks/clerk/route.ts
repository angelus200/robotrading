import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { upsertUser, deleteUser } from '@/server/services/user.service'

// Clerk-Webhook-Handler — synchronisiert Clerk-User mit der Datenbank
export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

  if (!webhookSecret) {
    return Response.json(
      { error: 'CLERK_WEBHOOK_SECRET nicht konfiguriert' },
      { status: 500 }
    )
  }

  // Svix-Signatur verifizieren
  const headerPayload = await headers()
  const svixId = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return Response.json({ error: 'Fehlende Svix-Header' }, { status: 400 })
  }

  const body = await req.text()

  let event: {
    type: string
    data: {
      id: string
      email_addresses: Array<{ email_address: string; id: string }>
      primary_email_address_id: string
      first_name: string | null
      last_name: string | null
      image_url: string | null
    }
  }

  try {
    const wh = new Webhook(webhookSecret)
    event = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as typeof event
  } catch {
    return Response.json({ error: 'Ungültige Webhook-Signatur' }, { status: 400 })
  }

  const { type, data } = event

  // Primäre E-Mail-Adresse ermitteln
  const primaryEmail = data.email_addresses.find(
    (e) => e.id === data.primary_email_address_id
  )?.email_address

  if (!primaryEmail && type !== 'user.deleted') {
    return Response.json({ error: 'Keine primäre E-Mail gefunden' }, { status: 400 })
  }

  try {
    if (type === 'user.created' || type === 'user.updated') {
      await upsertUser({
        clerkId: data.id,
        email: primaryEmail!,
        name:
          [data.first_name, data.last_name].filter(Boolean).join(' ') || undefined,
        avatarUrl: data.image_url ?? undefined,
      })
    } else if (type === 'user.deleted') {
      await deleteUser(data.id)
    }
  } catch (err) {
    console.error('Clerk-Webhook DB-Fehler:', err)
    return Response.json({ error: 'Datenbankfehler' }, { status: 500 })
  }

  return Response.json({ received: true })
}
