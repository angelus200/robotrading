'use client'

import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@/server/routers'

// tRPC-React-Client — wird in Komponenten mit trpc.xxx.useQuery() genutzt
export const trpc = createTRPCReact<AppRouter>()
