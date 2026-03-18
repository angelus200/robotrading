import 'server-only'
import { PrismaClient } from '@/generated/prisma/client'
import path from 'path'

// Singleton-Pattern: verhindert Connection-Leaks im Next.js Dev-Hot-Reload
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const dbUrl = process.env.DATABASE_URL ?? 'file:./dev.db'
  const logLevel = process.env.NODE_ENV === 'development'
    ? (['error', 'warn'] as const)
    : (['error'] as const)

  // Lokal mit SQLite (file:-Protokoll) — nur in IS_DEV_MOCK-Modus, DB wird nie wirklich abgefragt
  if (dbUrl.startsWith('file:')) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3')
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Database = require('better-sqlite3')
    const dbPath = dbUrl.slice(5) // "file:" Präfix entfernen
    const resolvedPath = path.resolve(process.cwd(), dbPath)
    const sqlite = new Database(resolvedPath)
    const adapter = new PrismaBetterSqlite3(sqlite)
    return new PrismaClient({ adapter, log: logLevel })
  }

  // Produktion: PostgreSQL via DATABASE_URL (Railway, Neon, etc.)
  return new PrismaClient({ log: logLevel })
}

export function getDb(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient()
  }
  return globalForPrisma.prisma
}
