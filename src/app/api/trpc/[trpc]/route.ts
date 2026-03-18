import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/routers'
import { createTRPCContext } from '@/server/trpc'

// tRPC-Handler für Next.js App Router
// Unterstützt GET (queries) und POST (mutations)
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(`tRPC-Fehler auf Pfad "${path}":`, error)
          }
        : undefined,
  })

export { handler as GET, handler as POST }
