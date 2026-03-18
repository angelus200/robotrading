import 'server-only'
import { PrismaClient } from '@/generated/prisma'

// Globaler Singleton um Connection-Leaks in Next.js Dev-Mode zu vermeiden
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Lazy-Init — kein Module-Level-Aufruf, sicher für next build
function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })
}

export function getDb(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient()
  }
  return globalForPrisma.prisma
}
