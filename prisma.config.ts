// Prisma 7 Konfiguration — URL für CLI/Migrations
// Runtime-Verbindung läuft über den Adapter in src/lib/db.ts
import { configDotenv } from 'dotenv'
import { defineConfig } from 'prisma/config'

// .env.local für Next.js-Dev-Mode laden (Priorität vor .env)
configDotenv({ path: '.env.local' })
configDotenv({ path: '.env' })

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL ?? 'file:./dev.db',
  },
})
