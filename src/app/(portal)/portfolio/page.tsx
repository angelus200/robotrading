'use client'

import { trpc } from '@/lib/trpc'
import { formatCurrency, formatPercent } from '@/lib/utils'

export default function PortfolioPage() {
  const { data: summary, isLoading: summaryLoading } =
    trpc.portfolio.summary.useQuery()
  const { data: portfolios, isLoading: portfoliosLoading } =
    trpc.portfolio.list.useQuery()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
        <p className="text-muted-foreground">
          Übersicht aller deiner Handels-Portfolios.
        </p>
      </div>

      {/* Gesamtübersicht */}
      {!summaryLoading && summary && (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Gesamtwert</p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {formatCurrency(summary.totalValue)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Gesamt-PnL</p>
            <p
              className={`mt-2 text-2xl font-bold ${
                summary.totalPnl >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {summary.totalPnl >= 0 ? '+' : ''}
              {formatCurrency(summary.totalPnl)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Portfolios</p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {summary.portfolioCount}
            </p>
          </div>
        </div>
      )}

      {/* Portfolio-Liste */}
      {portfoliosLoading ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl border border-border bg-card"
            />
          ))}
        </div>
      ) : !portfolios?.length ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-3xl mb-4">💼</p>
          <h3 className="text-lg font-semibold text-foreground">
            Noch keine Portfolios
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Portfolios werden automatisch erstellt wenn eine Strategie aktiviert
            wird.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {portfolio.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Strategie: {portfolio.strategy.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">
                    {formatCurrency(Number(portfolio.currentValue), portfolio.currency)}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      Number(portfolio.totalPnl) >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {Number(portfolio.totalPnl) >= 0 ? '+' : ''}
                    {formatCurrency(Number(portfolio.totalPnl))} (
                    {formatPercent(Number(portfolio.totalPnlPct))})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
