# Skill: Proptrading Platform (FTMO-Modell)

## Business-Modell
Trader kaufen eine Challenge und beweisen ihre Trading-Fähigkeiten. Bei Bestehen erhalten sie ein "Funded Account" mit Gewinnbeteiligung.

### Challenge-Flow
1. Trader wählt Kontogröße (10k, 25k, 50k, 100k, 200k EUR)
2. Zahlt via Stripe (z.B. 50k = 299€)
3. System erstellt automatisch MT4/MT5 Demo-Account
4. Trader handelt nach definierten Regeln
5. Cron-Job prüft täglich alle Regeln
6. Bei Bestehen → Status "PASSED" → E-Mail via Resend
7. Funded Account mit Profit Split (80/20 oder 90/10)
8. Trader kann Payouts beantragen → Admin-Freigabe

### Challenge-Typen
- **ONE_STEP:** Eine Evaluierungsphase, dann Funded
- **TWO_STEP:** Phase 1 (Challenge) → Phase 2 (Verification) → Funded
- **FREE_TRIAL:** Kostenlose Demo ohne Payment

### Regeln (pro Challenge konfigurierbar)
- **Profit Target:** z.B. 8% (Phase 1), 5% (Phase 2)
- **Max Loss:** z.B. 10% vom Startkapital (absolute Grenze)
- **Daily Max Loss:** z.B. 5% pro Tag
- **Min Trading Days:** z.B. 5 Tage
- **Max Days:** z.B. 30 Tage (null = unbegrenzt)

### Status-Flow
```
PENDING → ACTIVE → PASSED → FUNDED
                 → FAILED
                 → EXPIRED
PENDING → ACTIVE → EVALUATION (nur TWO_STEP) → PASSED → FUNDED
```

### Datenbank-Entities
- Challenge (userId, type, accountSize, price, status, mt4Login, mt4Password)
- ChallengeRule (profitTarget, maxLoss, dailyMaxLoss, minTradingDays, profitSplit)
- Trade (challengeId, ticket, symbol, lots, openPrice, closePrice, pnl)
- DailySnapshot (challengeId, date, balance, equity, floatingPnl)
- Payout (challengeId, amount, method, status)

### Pricing (Vorschlag)
| Kontogröße | Preis | Profit Target | Max Loss | Daily Loss | Profit Split |
|------------|-------|---------------|----------|------------|--------------|
| 10.000€ | 99€ | 8% | 10% | 5% | 80/20 |
| 25.000€ | 199€ | 8% | 10% | 5% | 80/20 |
| 50.000€ | 299€ | 8% | 10% | 5% | 80/20 |
| 100.000€ | 499€ | 8% | 10% | 5% | 85/15 |
| 200.000€ | 899€ | 8% | 10% | 5% | 90/10 |

### Account MetriX (Trader-Dashboard)
Zeigt dem Trader in Echtzeit:
- Equity-Kurve (Chart)
- Aktueller Balance / Equity
- Drawdown (aktuell + max)
- Offene Trades
- P&L heute / gesamt
- Regel-Status (grün/rot für jede Regel)
- Verbleibende Tage
- Challenge-Status Badge

### Scaling Plan
Bei konsistenter Performance (z.B. 3 Monate profitabel):
- Auto-Upgrade auf nächsthöhere Kontogröße
- Verbesserter Profit Split

### MT4/MT5 Integration
- Account-Erstellung via Manager API
- Trade-Daten via Manager API oder Trade Copier
- Cron-Job (Railway) prüft alle 5 Minuten aktive Challenges
- DailySnapshot wird um Mitternacht erstellt

### E-Mail-Trigger (Resend)
- Challenge gekauft → MT4-Zugangsdaten + Regeln
- Challenge bestanden → Glückwunsch + nächste Schritte
- Challenge failed → Ergebnis + Retry-Angebot mit Rabatt
- Payout beantragt → Bestätigung
- Payout ausgezahlt → Bestätigung mit Betrag

### Rechtliche Hinweise
- IMMER "simuliertes Kapital" / "Demo-Account" verwenden
- Risikohinweis auf allen Proptrading-Seiten
- BaFin/FMA-Prüfung ob Erlaubnispflicht besteht (MiFID II / WpIG)
- AML/KYC für Payouts ab Schwellenwert
