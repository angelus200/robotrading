import type { Metadata } from 'next'
import { getDb } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Unterstützte Broker — Robotrading',
  description:
    'Alle kompatiblen Broker für automatisierten Handel mit Robotrading.',
}

export const revalidate = 3600

async function getBrokers() {
  const db = getDb()
  return db.broker.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  })
}

export default async function BrokersPage() {
  const brokers = await getBrokers()

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-4 text-4xl font-extrabold text-foreground">
        Unterstützte Broker
      </h1>
      <p className="mb-12 text-muted-foreground">
        Robotrading verbindet sich mit allen großen Brokern über sichere API-Verbindungen.
      </p>

      {brokers.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">
            Broker-Informationen werden bald verfügbar sein.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {brokers.map((broker) => (
            <div
              key={broker.id}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors"
            >
              {broker.logoUrl ? (
                <img
                  src={broker.logoUrl}
                  alt={`${broker.name} Logo`}
                  className="mb-4 h-10 w-auto object-contain"
                />
              ) : (
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <span className="text-sm font-bold text-primary">
                    {broker.name[0]}
                  </span>
                </div>
              )}
              <h2 className="text-lg font-semibold text-foreground">{broker.name}</h2>
              {broker.description && (
                <p className="mt-2 text-sm text-muted-foreground">{broker.description}</p>
              )}
              {broker.minDeposit && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Min. Einzahlung: {Number(broker.minDeposit).toLocaleString('de-DE')} €
                </p>
              )}
              {broker.website && (
                <a
                  href={broker.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-xs font-medium text-primary hover:text-accent transition-colors"
                >
                  Website besuchen →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
