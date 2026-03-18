# ROBOTRADING.NET — Projekt-Kontext für Claude Code

## Projekt-Übersicht
Robotrading.net ist ein vollständiges Trading-Ökosystem der Angelus Group / Activa Fintech Processing KG.
Das Portal ersetzt die bestehende WordPress-Seite durch eine selbst-programmierte Next.js Plattform.

## Betreiber
- **Firma:** Activa Fintech Processing KG
- **Gruppe:** Angelus Group (32 Unternehmen in Europa)
- **Adresse:** Konrad-Zuse-Platz 8, 81829 München
- **Sitz:** Charlottenthal 4, 92549 Stadlern
- **Kontakt:** office@angelus.group
- **CEO-Philosophie:** Maximale Automatisierung, Eigenentwicklung, Kostenminimierung

## Tech-Stack (NICHT ÄNDERN)
| Bereich | Technologie | Version |
|---------|-------------|---------|
| Framework | Next.js (App Router) + React + TypeScript | 15.x / 19.x |
| Styling | Tailwind CSS + shadcn/ui | v4 |
| API | tRPC + Zod | v11 |
| ORM | Prisma | v7 |
| Datenbank | PostgreSQL | Railway |
| Auth | Clerk | v7 |
| E-Mail | Resend | aktuell |
| Payments | Stripe (Checkout, Subscriptions, Connect) | v20+ |
| Hosting | Railway (komplett) | — |
| Echtzeit | WebSockets (Socket.io) | — |
| Monitoring | Sentry | — |

## Architektur
Modularer Monolith in Next.js mit Route Groups:

```
src/app/(public)/     → Landing, Blog, Broker, Shop (SSG/ISR)
src/app/(auth)/       → Clerk Sign-In/Sign-Up
src/app/(portal)/     → Client Dashboard (protected via Clerk Middleware)
src/app/(portal)/proptrading/  → Challenges, MetriX, Payouts
src/app/(portal)/wallet/       → Krypto-Wallet
src/app/(portal)/affiliate/    → Affiliate-Dashboard
src/app/(admin)/      → Admin Panel (Clerk Role: admin)
src/app/api/trpc/     → tRPC Handler
src/app/api/webhooks/ → Clerk, Stripe, MT4 Webhooks
src/server/routers/   → tRPC Router pro Modul
src/server/services/  → Business Logic
src/lib/              → Utilities (db, trpc, stripe, resend)
prisma/schema.prisma  → Datenmodell
```

## Design-System
- **Theme:** Dark Mode (IMMER)
- **Background:** #0F172A (Slate 900)
- **Surface/Card:** #1E293B (Slate 800)
- **Primary:** #2563EB (Blue 600)
- **Accent:** #3B82F6 (Blue 500)
- **Text:** #F8FAFC (Slate 50)
- **Muted Text:** #94A3B8 (Slate 400)
- **Border:** #334155 (Slate 700)
- **Font:** Plus Jakarta Sans (Google Fonts)
- **Stil:** Professionell, Fintech-Ästhetik, wie FTMO.com
- **Das bestehende Grau/Blau-Design von robotrading.net beibehalten**

## Clerk-Rollen (RBAC)
| Rolle | Zugriff | Clerk Metadata |
|-------|---------|----------------|
| user | Public, Shop, Profil | { role: "user" } |
| trader | + Proptrading, Performance | { role: "trader" } |
| affiliate | + Affiliate Dashboard | { role: "affiliate" } |
| admin | Vollzugriff inkl. Admin | { role: "admin" } |

## Prisma-Hinweise
- **Prisma 7:** Import immer von `@/generated/prisma` (NICHT `@prisma/client`)
- **Prisma 7:** Braucht IMMER einen Adapter (z.B. `@prisma/adapter-pg`)
- **prisma generate** muss VOR `next build` laufen (package.json: `"build": "prisma generate && next build"`)
- **Enums** als Prisma enums definieren, nicht als TypeScript strings

## Coding-Konventionen
- **Sprache im Code:** Englisch (Variablen, Funktionen, Kommentare)
- **Sprache im UI:** Deutsch (Texte, Labels, Buttons, Fehler)
- **Kein `any`** — immer typisieren
- **Zod** für alle Input-Validierungen (Client + Server via tRPC)
- **Server Components** als Default, `"use client"` nur wenn nötig
- **Error Boundaries** in allen Route Segments
- **Loading States** in allen async Seiten
- **Responsive Design** — Mobile First

## Git-Konventionen
- **Branch:** `main` (Railway deployt automatisch bei Push)
- **Commits:** Conventional Commits (feat:, fix:, chore:, docs:)
- **Commit-Sprache:** Deutsch
- **Keine Secrets committen** — .env.local ist in .gitignore

## Wichtige Dateien
- `docs/CLAUDE_CODE_PROMPTS.md` — Phase-1 Prompts
- `prisma/schema.prisma` — Datenmodell
- `.env.example` — Alle Environment Variables
- `src/lib/db.ts` — Prisma Client Singleton
- `src/middleware.ts` — Clerk Auth Middleware

## 8 Kernmodule (Phasen)

### Phase 1 (Foundation) ✅
- Projekt-Setup, Auth, Layouts, Landing Page, Shop-Basis, Admin-Basis

### Phase 2 (Core Business) — ALS NÄCHSTES
- Proptrading Engine (Challenge kaufen → MT4 Account → Monitoring → Payout)
- Live Performance Dashboard (MT4 Bridge, Charts)
- Affiliate Portal (Tracking, Provisionen)
- Broker-Vergleich (Datenbank, Filter, Warnungen)
- Blog-System (MDX)
- Signal-Feed (WebSocket)
- Coaching-Bereich
- Ticket-System

### Phase 3 (Krypto & Advanced)
- Krypto Wallet (Non-custodial, Multi-Chain)
- Payout-Systeme (Proptrading + Affiliate)
- KYC-Integration
- Newsletter, Mehrsprachigkeit, PWA

### Phase 4 (Scale & Polish)
- DEX-Swap, Leaderboard, Zertifikate, Academy
- Security Audit, Load Testing, Go-Live

## Sicherheit
- HTTPS überall, CSP Headers
- Rate Limiting auf tRPC Endpoints
- Clerk 2FA built-in
- Prisma verhindert SQL Injection
- Krypto-Keys: AES-256-GCM Client-side, NIE auf dem Server
- DSGVO-konform: Cookie-Consent, Datenlöschung, DPA

## Regulatorik
- Risikohinweise auf allen Trading-Seiten (Pflicht!)
- BaFin/FMA-Prüfung für Proptrading-Modell steht aus
- AML/KYC für Payouts ab Schwellenwert
- Non-custodial Wallet = kein Verwahrgeschäft
- Separate AGB für Shop, Proptrading, Affiliate

## Railway Deployment
- Push auf `main` → automatisches Deployment
- `DATABASE_URL` ist in Railway Variables gesetzt
- Build: `prisma generate && next build --turbopack`
- Start: `npm run start`
