import 'server-only'
import { initTRPC, TRPCError } from '@trpc/server'
import { auth } from '@clerk/nextjs/server'
import superjson from 'superjson'
import { ZodError } from 'zod'

// ─── Kontext ──────────────────────────────────────────────────────────────────

export interface TRPCContext {
  userId: string | null
}

// Kontext-Factory — wird pro Request aufgerufen
export async function createTRPCContext(): Promise<TRPCContext> {
  const { userId } = await auth()
  return { userId }
}

// ─── tRPC Init ────────────────────────────────────────────────────────────────

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        // Zod-Validierungsfehler strukturiert zurückgeben
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

// ─── Router & Procedure Exports ───────────────────────────────────────────────

export const router = t.router
export const createCallerFactory = t.createCallerFactory

// Öffentliche Procedure — kein Auth erforderlich
export const publicProcedure = t.procedure

// Geschützte Procedure — wirft UNAUTHORIZED wenn nicht eingeloggt
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Nicht authentifiziert. Bitte einloggen.',
    })
  }
  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId, // userId ist jetzt NonNullable
    },
  })
})
