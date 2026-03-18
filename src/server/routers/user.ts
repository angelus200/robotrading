import { z } from 'zod'
import { router, protectedProcedure, publicProcedure } from '@/server/trpc'
import { getDb } from '@/lib/db'
import { TRPCError } from '@trpc/server'

export const userRouter = router({
  // Aktuellen User abrufen oder neu anlegen (nach Clerk-Webhook Fallback)
  me: protectedProcedure.query(async ({ ctx }) => {
    const db = getDb()
    const user = await db.user.findUnique({
      where: { clerkId: ctx.userId },
      include: { subscription: true },
    })
    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Benutzer nicht gefunden.',
      })
    }
    return user
  }),

  // Profil aktualisieren
  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100).optional(),
        avatarUrl: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb()
      return db.user.update({
        where: { clerkId: ctx.userId },
        data: input,
      })
    }),

  // Admin: alle User auflisten
  list: protectedProcedure
    .input(
      z.object({
        page: z.number().int().min(1).default(1),
        limit: z.number().int().min(1).max(100).default(20),
      })
    )
    .query(async ({ input }) => {
      const db = getDb()
      const [users, total] = await Promise.all([
        db.user.findMany({
          skip: (input.page - 1) * input.limit,
          take: input.limit,
          orderBy: { createdAt: 'desc' },
          include: { subscription: true },
        }),
        db.user.count(),
      ])
      return { users, total, pages: Math.ceil(total / input.limit) }
    }),

  // Öffentlich: User-Statistiken (für Landing Page)
  stats: publicProcedure.query(async () => {
    const db = getDb()
    const count = await db.user.count()
    return { totalUsers: count }
  }),
})
