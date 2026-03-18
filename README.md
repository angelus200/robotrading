# Robotrading — Automatisierter Handel

Professionelle Plattform für automatisierte Handelsstrategien auf robotrading.net.

## Tech-Stack

| Bereich | Technologie |
|---------|-------------|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui + Plus Jakarta Sans |
| API | tRPC v11 + Zod-Validierung |
| Datenbank | Prisma ORM + PostgreSQL (Railway) |
| Auth | Clerk |
| E-Mail | Resend |
| Payments | Stripe |

## Projektstruktur

```
src/
├── app/
│   ├── (public)/        # Landing, Blog, Broker — SSG
│   ├── (auth)/          # Clerk Sign-In/Sign-Up
│   ├── (portal)/        # Client Dashboard (geschützt)
│   ├── (admin)/         # Admin Panel (Rolle: ADMIN)
│   └── api/
│       ├── trpc/        # tRPC Handler
│       └── webhooks/    # Clerk + Stripe Webhooks
├── server/
│   ├── routers/         # tRPC Router (user, strategy, portfolio)
│   └── services/        # Business Logic
├── lib/                 # db, stripe, resend, trpc, utils
├── components/          # React-Komponenten + Providers
└── types/               # TypeScript-Typen
prisma/
└── schema.prisma        # Datenbankmodell
```

## Schnellstart

```bash
# 1. Umgebungsvariablen einrichten
cp .env.example .env.local
# .env.local mit echten Werten befüllen

# 2. Abhängigkeiten installieren
npm install

# 3. Prisma Client generieren + DB-Schema pushen
npx prisma generate
npx prisma db push

# 4. Entwicklungsserver starten
npm run dev
```

## Umgebungsvariablen

Alle benötigten Variablen: siehe [.env.example](.env.example)

- `DATABASE_URL` — PostgreSQL auf Railway
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY` — Clerk Dashboard
- `STRIPE_SECRET_KEY` + `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe Dashboard
- `RESEND_API_KEY` — Resend Dashboard

## Deployment

Railway (PostgreSQL) + Vercel (Next.js App)

---

© 2026 Marketplace 24-7 GmbH — Non Dom Group
