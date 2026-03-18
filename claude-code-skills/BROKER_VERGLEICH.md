# Skill: Broker-Vergleich & Betrugs-Warnungen

## Konzept
Interaktiver Broker-Vergleich mit Bewertungssystem und Betrugs-Datenbank.
SEO-optimierte Detailseiten pro Broker.

## Broker-Datenbank (Prisma)
```prisma
model Broker {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  logo        String?
  website     String?
  description String?  @db.Text
  rating      Decimal? @db.Decimal(3, 1) // 0.0-5.0
  spreads     String?  // "ab 0.1 Pips"
  regulation  String[] // ["BaFin", "CySEC", "FCA"]
  platforms   String[] // ["MT4", "MT5", "cTrader"]
  minDeposit  Decimal?
  leverage    String?  // "1:500"
  warning     String?  @db.Text
  isScam      Boolean  @default(false)
  isActive    Boolean  @default(true)
}
```

## Features
### Vergleichs-Tool
- Filter: Regulierung, Plattform, Min. Einzahlung, Spreads
- Side-by-Side Vergleich (max 3 Broker)
- Sortierung nach Rating, Spreads, Beliebtheit

### Betrugs-Warnungen
- Rote Warnbanner bei isScam = true
- Warntext erklärt warum der Broker als Betrug eingestuft ist
- Prominent sichtbar, nicht versteckt
- Link zu "Hilfe bei Brokerbetrug" Seite

### SEO-Seiten
- /broker/[slug] → Detailseite pro Broker
- Strukturierte Daten (JSON-LD) für Google
- Automatische Meta-Tags

### Community-Reviews (Phase 3)
- Verifizierte Nutzer können Bewertungen abgeben
- 1-5 Sterne + Text
- Admin-Moderation

## Rechtlich
- "Keine Anlageberatung" Disclaimer
- Risikohinweis auf jeder Broker-Seite
- Keine direkten Affiliate-Links zu Brokern ohne Kennzeichnung
