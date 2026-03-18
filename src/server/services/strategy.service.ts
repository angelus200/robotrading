import 'server-only'
import { getDb } from '@/lib/db'
import { StrategyStatus } from '@/generated/prisma/client'

// Strategie-Performance berechnen
export async function calculateStrategyPerformance(strategyId: string) {
  const db = getDb()
  const trades = await db.trade.findMany({
    where: { strategyId, status: 'CLOSED' },
    select: { pnl: true, pnlPct: true },
  })

  const totalPnl = trades.reduce((sum, t) => sum + (t.pnl ?? 0), 0)
  const winningTrades = trades.filter((t) => (t.pnl ?? 0) > 0).length
  const winRate = trades.length > 0 ? (winningTrades / trades.length) * 100 : 0

  return { totalPnl, winRate, tradeCount: trades.length }
}

// Portfolio-Werte aktualisieren (Float statt Decimal für SQLite-Kompatibilität)
export async function updatePortfolioValue(
  strategyId: string,
  newValue: number,
  totalPnl: number,
  totalPnlPct: number
) {
  const db = getDb()
  return db.portfolio.updateMany({
    where: { strategyId },
    data: { currentValue: newValue, totalPnl, totalPnlPct },
  })
}

// Alle aktiven Strategien (für Scheduler/Cron)
export async function getActiveStrategies() {
  const db = getDb()
  return db.strategy.findMany({
    where: { status: StrategyStatus.ACTIVE },
    include: { user: true, broker: true },
  })
}
