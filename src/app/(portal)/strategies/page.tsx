'use client'

import type { Metadata } from 'next'
import { trpc } from '@/lib/trpc'

// Hinweis: Metadata-Export funktioniert nur in Server-Komponenten
// Diese Seite ist Client-Seite wegen tRPC-Hooks
export default function StrategiesPage() {
  const { data, isLoading } = trpc.strategy.list.useQuery({ page: 1, limit: 20 })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Strategien</h1>
          <p className="text-muted-foreground">
            Verwalte deine automatisierten Handelsstrategien.
          </p>
        </div>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent transition-colors">
          + Neue Strategie
        </button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-xl border border-border bg-card"
            />
          ))}
        </div>
      ) : !data?.strategies.length ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="mb-4 text-3xl">🤖</p>
          <h3 className="text-lg font-semibold text-foreground">
            Noch keine Strategien
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Erstelle deine erste automatisierte Handelsstrategie.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.strategies.map((strategy) => (
            <div
              key={strategy.id}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{strategy.name}</h3>
                  {strategy.description && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {strategy.description}
                    </p>
                  )}
                </div>
                <StatusBadge status={strategy.status} />
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span>{strategy._count.trades} Trades</span>
                {strategy.broker && <span>{strategy.broker.name}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    ACTIVE: 'bg-green-500/10 text-green-400',
    PAUSED: 'bg-yellow-500/10 text-yellow-400',
    STOPPED: 'bg-red-500/10 text-red-400',
    DRAFT: 'bg-muted text-muted-foreground',
  }
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors[status] ?? colors.DRAFT}`}>
      {status}
    </span>
  )
}
