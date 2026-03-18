import 'server-only'
import { PrismaClient } from '@/generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'
import path from 'path'

// Singleton-Pattern: verhindert Connection-Leaks im Next.js Dev-Hot-Reload
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  // DATABASE_URL "file:./dev.db" → "./dev.db" (file:-Prefix entfernen)
  const dbUrl = process.env.DATABASE_URL ?? 'file:./dev.db'
  const dbPath = dbUrl.startsWith('file:') ? dbUrl.slice(5) : dbUrl
  const resolvedPath = path.resolve(process.cwd(), dbPath)

  const sqlite = new Database(resolvedPath)
  const adapter = new PrismaBetterSqlite3(sqlite)

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

export function getDb(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient()
  }
  return globalForPrisma.prisma
}
