import { z } from 'zod'
import { router, protectedProcedure } from '@/server/trpc'
import { getDb } from '@/lib/db'
import { TRPCError } from '@trpc/server'
import { StrategyStatus } from '@/generated/prisma'

// Eingabe-Schema für Strategie-Erstellung/-Aktualisierung
const strategyInput = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  brokerId: z.string().cuid().optional(),
  config: z.record(z.unknown()).optional(),
  isPublic: z.boolean().optional(),
})

export const strategyRouter = router({
  // Alle Strategien des eingeloggten Users
  list: protectedProcedure
    .input(
      z.object({
        status: z.nativeEnum(StrategyStatus).optional(),
        page: z.number().int().min(1).default(1),
        limit: z.number().int().min(1).max(50).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const db = getDb()
      const where = {
        user: { clerkId: ctx.userId },
        ...(input.status ? { status: input.status } : {}),
      }
      const [strategies, total] = await Promise.all([
        db.strategy.findMany({
          where,
          skip: (input.page - 1) * input.limit,
          take: input.limit,
          orderBy: { createdAt: 'desc' },
          include: { broker: true, portfolio: true, _count: { select: { trades: true } } },
        }),
        db.strategy.count({ where }),
      ])
      return { strategies, total, pages: Math.ceil(total / input.limit) }
    }),

  // Einzelne Strategie abrufen
  byId: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const db = getDb()
      const strategy = await db.strategy.findFirst({
        where: { id: input.id, user: { clerkId: ctx.userId } },
        include: {
          broker: true,
          portfolio: true,
          trades: { take: 10, orderBy: { createdAt: 'desc' } },
        },
      })
      if (!strategy) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Strategie nicht gefunden.' })
      }
      return strategy
    }),

  // Neue Strategie erstellen
  create: protectedProcedure
    .input(strategyInput)
    .mutation(async ({ ctx, input }) => {
      const db = getDb()
      const user = await db.user.findUnique({ where: { clerkId: ctx.userId } })
      if (!user) throw new TRPCError({ code: 'NOT_FOUND' })
      return db.strategy.create({
        data: {
          ...input,
          config: input.config ?? {},
          userId: user.id,
        },
      })
    }),

  // Strategie aktualisieren
  update: protectedProcedure
    .input(strategyInput.extend({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb()
      const { id, ...data } = input
      const existing = await db.strategy.findFirst({
        where: { id, user: { clerkId: ctx.userId } },
      })
      if (!existing) throw new TRPCError({ code: 'NOT_FOUND' })
      return db.strategy.update({ where: { id }, data })
    }),

  // Status ändern (Starten/Pausieren/Stoppen)
  setStatus: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        status: z.nativeEnum(StrategyStatus),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb()
      const existing = await db.strategy.findFirst({
        where: { id: input.id, user: { clerkId: ctx.userId } },
      })
      if (!existing) throw new TRPCError({ code: 'NOT_FOUND' })
      return db.strategy.update({
        where: { id: input.id },
        data: { status: input.status },
      })
    }),

  // Strategie löschen
  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb()
      const existing = await db.strategy.findFirst({
        where: { id: input.id, user: { clerkId: ctx.userId } },
      })
      if (!existing) throw new TRPCError({ code: 'NOT_FOUND' })
      await db.strategy.delete({ where: { id: input.id } })
      return { success: true }
    }),
})
