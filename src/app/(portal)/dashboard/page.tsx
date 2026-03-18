import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'
import { getDb } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Dashboard — Robotrading',
}

async function getDashboardData(clerkId: string) {
  const db = getDb()
  const user = await db.user.findUnique({
    where: { clerkId },
    include: {
      subscription: true,
      _count: { select: { strategies: true, portfolios: true } },
    },
  })

  const activeStrategies = await db.strategy.count({
    where: { user: { clerkId }, status: 'ACTIVE' },
  })

  const recentTrades = await db.trade.findMany({
    where: { strategy: { user: { clerkId } } },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { strategy: { select: { name: true } } },
  })

  return { user, activeStrategies, recentTrades }
}

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) return null

  const { user, activeStrategies, recentTrades } = await getDashboardData(userId)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Willkommen zurück{user?.name ? `, ${user.name}` : ''}
        </h1>
        <p className="text-muted-foreground">
          Hier ist eine Übersicht deiner Trading-Aktivitäten.
        </p>
      </div>

      {/* KPI-Karten */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Strategien gesamt"
          value={user?._count.strategies ?? 0}
          icon="🤖"
        />
        <StatCard
          title="Aktive Strategien"
          value={activeStrategies}
          icon="⚡"
          highlight
        />
        <StatCard
          title="Portfolios"
          value={user?._count.portfolios ?? 0}
          icon="💼"
        />
        <StatCard
          title="Abo-Status"
          value={user?.subscription?.status ?? 'Kein Abo'}
          icon="🎯"
        />
      </div>

      {/* Letzte Trades */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Letzte Trades
        </h2>
        {recentTrades.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Noch keine Trades vorhanden.{' '}
            <a href="/strategies" className="text-primary hover:text-accent">
              Erste Strategie erstellen →
            </a>
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-2 text-left font-medium">Symbol</th>
                  <th className="pb-2 text-left font-medium">Richtung</th>
                  <th className="pb-2 text-left font-medium">Status</th>
                  <th className="pb-2 text-left font-medium">Strategie</th>
                  <th className="pb-2 text-right font-medium">PnL</th>
                </tr>
              </thead>
              <tbody>
                {recentTrades.map((trade) => (
                  <tr key={trade.id} className="border-b border-border/50">
                    <td className="py-3 font-mono font-medium text-foreground">
                      {trade.symbol}
                    </td>
                    <td className="py-3">
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${
                          trade.direction === 'LONG'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {trade.direction}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{trade.status}</td>
                    <td className="py-3 text-muted-foreground">
                      {trade.strategy.name}
                    </td>
                    <td className="py-3 text-right font-mono">
                      {trade.pnl ? (
                        <span
                          className={
                            Number(trade.pnl) >= 0
                              ? 'text-green-400'
                              : 'text-red-400'
                          }
                        >
                          {Number(trade.pnl) >= 0 ? '+' : ''}
                          {Number(trade.pnl).toFixed(2)} €
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  highlight,
}: {
  title: string
  value: string | number
  icon: string
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-xl border bg-card p-5 ${
        highlight ? 'border-primary/30 bg-primary/5' : 'border-border'
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>
        <span className="text-xl">{icon}</span>
      </div>
      <p
        className={`mt-2 text-2xl font-bold ${
          highlight ? 'text-primary' : 'text-foreground'
        }`}
      >
        {value}
      </p>
    </div>
  )
}
