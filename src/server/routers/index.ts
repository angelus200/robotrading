import { router } from '@/server/trpc'
import { userRouter } from './user'
import { strategyRouter } from './strategy'
import { portfolioRouter } from './portfolio'

// Root-Router — kombiniert alle Sub-Router
export const appRouter = router({
  user: userRouter,
  strategy: strategyRouter,
  portfolio: portfolioRouter,
})

// Typ-Export für Client-seitiges Type-Inference
export type AppRouter = typeof appRouter
