import 'server-only'
import { getDb } from '@/lib/db'
import { StrategyStatus } from '@/generated/prisma'
import { Decimal } from '@prisma/client/runtime/library'

// Strategie-Performance berechnen
export async function calculateStrategyPerformance(strategyId: string) {
  const db = getDb()
  const trades = await db.trade.findMany({
    where: { strategyId, status: 'CLOSED' },
    select: { pnl: true, pnlPct: true },
  })

  const totalPnl = trades.reduce((sum, t) => sum + Number(t.pnl ?? 0), 0)
  const winningTrades = trades.filter((t) => Number(t.pnl ?? 0) > 0).length
  const winRate = trades.length > 0 ? (winningTrades / trades.length) * 100 : 0

  return { totalPnl, winRate, tradeCount: trades.length }
}

// Portfolio nach Strategie-Performance aktualisieren
export async function updatePortfolioValue(
  strategyId: string,
  newValue: number,
  totalPnl: number,
  totalPnlPct: number
) {
  const db = getDb()
  return db.portfolio.updateMany({
    where: { strategyId },
    data: {
      currentValue: new Decimal(newValue),
      totalPnl: new Decimal(totalPnl),
      totalPnlPct: new Decimal(totalPnlPct),
    },
  })
}

// Alle aktiven Strategien abrufen (für Scheduler)
export async function getActiveStrategies() {
  const db = getDb()
  return db.strategy.findMany({
    where: { status: StrategyStatus.ACTIVE },
    include: { user: true, broker: true },
  })
}
