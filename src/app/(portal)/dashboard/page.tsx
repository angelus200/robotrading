import type { Metadata } from 'next'
import { getAuth } from '@/lib/auth'
import { IS_DEV_MOCK, MOCK_USER } from '@/lib/dev-mode'
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
  const { userId } = await getAuth()
  if (!userId) return null

  // Dev-Mode: Dummy-Daten anzeigen da DB leer ist
  if (IS_DEV_MOCK) {
    return <DevDashboard />
  }

  const { user, activeStrategies, recentTrades } = await getDashboardData(userId)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Willkommen zurück{user?.name ? `, ${user.name}` : ''}
        </h1>
        <p className="text-muted-foreground">Übersicht deiner Trading-Aktivitäten.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Strategien gesamt" value={user?._count.strategies ?? 0} icon="🤖" />
        <StatCard title="Aktive Strategien" value={activeStrategies} icon="⚡" highlight />
        <StatCard title="Portfolios" value={user?._count.portfolios ?? 0} icon="💼" />
        <StatCard title="Abo-Status" value={user?.subscription?.status ?? 'Kein Abo'} icon="🎯" />
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Letzte Trades</h2>
        {recentTrades.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Noch keine Trades.{' '}
            <a href="/strategies" className="text-primary hover:text-accent">
              Erste Strategie erstellen →
            </a>
          </p>
        ) : (
          <TradesTable trades={recentTrades} />
        )}
      </div>
    </div>
  )
}

// Dev-Mode Dashboard mit Beispieldaten
function DevDashboard() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-400">
        🛠 Dev-Mode aktiv — Mock-Daten, SQLite-Datenbank, kein Clerk
      </div>

      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Willkommen zurück, {MOCK_USER.name}
        </h1>
        <p className="text-muted-foreground">Übersicht deiner Trading-Aktivitäten.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Strategien gesamt" value={3} icon="🤖" />
        <StatCard title="Aktive Strategien" value={1} icon="⚡" highlight />
        <StatCard title="Portfolios" value={1} icon="💼" />
        <StatCard title="Abo-Status" value="DEV" icon="🎯" />
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Letzte Trades</h2>
        <p className="text-sm text-muted-foreground">
          Keine echten Trades im Dev-Mode.{' '}
          <a href="/strategies" className="text-primary hover:text-accent">
            Strategien ansehen →
          </a>
        </p>
      </div>
    </div>
  )
}

type TradesRow = {
  id: string
  symbol: string
  direction: string
  status: string
  pnl: number | null
  strategy: { name: string }
}

function TradesTable({ trades }: { trades: TradesRow[] }) {
  return (
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
          {trades.map((trade) => (
            <tr key={trade.id} className="border-b border-border/50">
              <td className="py-3 font-mono font-medium text-foreground">{trade.symbol}</td>
              <td className="py-3">
                <span className={`rounded px-2 py-0.5 text-xs font-medium ${trade.direction === 'LONG' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {trade.direction}
                </span>
              </td>
              <td className="py-3 text-muted-foreground">{trade.status}</td>
              <td className="py-3 text-muted-foreground">{trade.strategy.name}</td>
              <td className="py-3 text-right font-mono">
                {trade.pnl != null ? (
                  <span className={trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)} €
                  </span>
                ) : <span className="text-muted-foreground">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatCard({ title, value, icon, highlight }: {
  title: string; value: string | number; icon: string; highlight?: boolean
}) {
  return (
    <div className={`rounded-xl border bg-card p-5 ${highlight ? 'border-primary/30 bg-primary/5' : 'border-border'}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>
        <span className="text-xl">{icon}</span>
      </div>
      <p className={`mt-2 text-2xl font-bold ${highlight ? 'text-primary' : 'text-foreground'}`}>
        {value}
      </p>
    </div>
  )
}
