# Skill: Affiliate Portal

## Konzept
Partner bewerben Robotrading-Produkte und erhalten Provisionen für Conversions.
Eigener Bereich im Client Portal (Clerk Role: affiliate).

## Tracking-System
```
Affiliate erhält persönlichen Link: robotrading.net/?ref=AFFILIATE_CODE
→ UTM-Parameter werden erfasst
→ Cookie wird gesetzt (30 Tage Lifetime)
→ Server-side Attribution bei Registration/Kauf
→ First-Touch UND Last-Touch Tracking
```

## Provisionsmodelle
| Modell | Beschreibung | Beispiel |
|--------|-------------|----------|
| CPA | Fester Betrag pro Conversion | 50€ pro Challenge-Kauf |
| Revenue Share | Prozent vom Umsatz | 15% vom Kaufpreis |
| Hybrid | CPA + Revenue Share | 20€ + 10% |

Provisionen sind pro Produkt konfigurierbar.

## Affiliate-Dashboard zeigt
- Gesamte Einnahmen / Auszahlungen / Offener Saldo
- Clicks heute / diese Woche / diesen Monat
- Conversions + Conversion Rate
- Letzte Referrals (Datum, Produkt, Commission)
- Persönlicher Affiliate-Link + Copy-Button
- Marketing-Materialien (Banner, Deeplinks)

## Auszahlungen
- Minimum-Threshold: z.B. 100€
- Methoden: Stripe Connect, Banküberweisung, Krypto (Phase 4)
- Auszahlungszyklus: monatlich oder auf Antrag
- Admin-Freigabe erforderlich

## Datenbank
- AffiliateProfile (userId, code, commissionType, commissionRate, totalEarned)
- Referral (affiliateId, referredUserId, sourceProduct, commission, status, utmSource/Medium/Campaign)
- AffiliatePayout (affiliateId, amount, method, status)

## tRPC Router
- affiliate.getProfile → Eigenes Affiliate-Profil
- affiliate.getStats → Dashboard-Statistiken
- affiliate.getReferrals → Liste aller Referrals
- affiliate.requestPayout → Auszahlung beantragen
- admin.affiliate.list → Alle Affiliates (Admin)
- admin.affiliate.approvePayout → Auszahlung freigeben (Admin)
