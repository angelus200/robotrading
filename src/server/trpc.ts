import 'server-only'
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { IS_DEV_MOCK, MOCK_USER_ID } from '@/lib/dev-mode'

// ─── Kontext ──────────────────────────────────────────────────────────────────

export interface TRPCContext {
  userId: string | null
}

export async function createTRPCContext(): Promise<TRPCContext> {
  // Dev-Mode: Mock-User zurückgeben
  if (IS_DEV_MOCK) {
    return { userId: MOCK_USER_ID }
  }
  const { auth } = await import('@clerk/nextjs/server')
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
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

// ─── Exports ──────────────────────────────────────────────────────────────────

export const router = t.router
export const createCallerFactory = t.createCallerFactory
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Nicht authentifiziert.' })
  }
  return next({ ctx: { ...ctx, userId: ctx.userId } })
})
