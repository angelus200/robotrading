import { z } from 'zod'
import { router, protectedProcedure } from '@/server/trpc'
import { getDb } from '@/lib/db'
import { TRPCError } from '@trpc/server'

export const portfolioRouter = router({
  // Alle Portfolios des Users
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = getDb()
    return db.portfolio.findMany({
      where: { user: { clerkId: ctx.userId } },
      include: { strategy: true },
      orderBy: { updatedAt: 'desc' },
    })
  }),

  // Portfolio-Übersicht (Gesamtwert, PnL)
  summary: protectedProcedure.query(async ({ ctx }) => {
    const db = getDb()
    const portfolios = await db.portfolio.findMany({
      where: { user: { clerkId: ctx.userId } },
    })
    const totalValue = portfolios.reduce(
      (sum, p) => sum + Number(p.currentValue),
      0
    )
    const totalPnl = portfolios.reduce(
      (sum, p) => sum + Number(p.totalPnl),
      0
    )
    return { totalValue, totalPnl, portfolioCount: portfolios.length }
  }),

  // Einzelnes Portfolio
  byId: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const db = getDb()
      const portfolio = await db.portfolio.findFirst({
        where: { id: input.id, user: { clerkId: ctx.userId } },
        include: {
          strategy: {
            include: {
              trades: { orderBy: { openedAt: 'desc' }, take: 50 },
            },
          },
        },
      })
      if (!portfolio) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Portfolio nicht gefunden.' })
      }
      return portfolio
    }),
})
