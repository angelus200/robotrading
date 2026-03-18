import 'server-only'
import { PrismaClient } from '@/generated/prisma/client'
import path from 'path'

// Singleton-Pattern: verhindert Connection-Leaks im Next.js Dev-Hot-Reload
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const dbUrl = process.env.DATABASE_URL ?? 'file:./dev.db'

  // Lokal mit SQLite (file:-Protokoll)
  // In IS_DEV_MOCK-Modus wird die DB nie wirklich abgefragt
  if (dbUrl.startsWith('file:')) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3')
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Database = require('better-sqlite3')
    const dbPath = dbUrl.slice(5) // "file:" Präfix entfernen
    const resolvedPath = path.resolve(process.cwd(), dbPath)
    const sqlite = new Database(resolvedPath)
    const adapter = new PrismaBetterSqlite3(sqlite)
    return new PrismaClient({ adapter })
  }

  // Produktion: PostgreSQL via DATABASE_URL (Railway, Neon, etc.)
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Pool } = require('pg')
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaPg } = require('@prisma/adapter-pg')
  const pool = new Pool({ connectionString: dbUrl })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

export function getDb(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient()
  }
  return globalForPrisma.prisma
}
