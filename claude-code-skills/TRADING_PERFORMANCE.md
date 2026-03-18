# Skill: Live Performance Dashboard & Trading

## Konzept
Eigener MyFXBook-Ersatz: Echtzeit-Performance-Daten der Robotrading-Strategien,
öffentlich sichtbar als Social Proof und im Client Portal als detailliertes Dashboard.

## MT4/MT5 Bridge
- Datenquelle: MetaTrader Manager API oder Trade Copier
- Polling-Intervall: alle 5 Minuten (Cron-Job auf Railway)
- Daten: Offene Trades, geschlossene Trades, Balance, Equity

## Performance-Metriken
| Metrik | Berechnung |
|--------|-----------|
| Total Return | (Aktuell - Start) / Start * 100 |
| Drawdown | (Peak - Trough) / Peak * 100 |
| Max Drawdown | Größter Drawdown im gesamten Zeitraum |
| Win Rate | Gewinn-Trades / Gesamt-Trades * 100 |
| Profit Factor | Brutto-Gewinn / Brutto-Verlust |
| Sharpe Ratio | (Avg Return - Risk-Free) / Std Dev |
| Avg Trade | Gesamt-PnL / Anzahl Trades |
| Expectancy | (Win% × Avg Win) - (Loss% × Avg Loss) |

## Charts (Recharts oder D3)
- **Equity Curve:** Linienchart, Balance + Equity über Zeit
- **Drawdown Chart:** Negativer Bereich unter der 0-Linie
- **Monthly Returns:** Heatmap (grün/rot pro Monat)
- **Trade Distribution:** Histogramm der Trade-Ergebnisse
- **Symbol Breakdown:** Pie-Chart nach gehandelten Paaren

## Public Widget (Phase 4)
Embeddable Performance-Widget für externe Seiten:
```html
<iframe src="https://robotrading.net/widget/strategy/[id]" width="400" height="300" />
```

## Signal-Feed (Phase 2)
- Live Trading-Signale via WebSocket
- In-App Notification + Push (PWA) + E-Mail (Resend)
- Signal: Richtung, Entry, SL, TP, Symbol, Zeitrahmen
- Nur für Abonnenten (Clerk Role check)

## Datenbank
- Strategy (id, name, description, status, startBalance, currentBalance)
- Trade (strategyId, ticket, symbol, type, lots, openPrice, closePrice, pnl)
- DailySnapshot (strategyId, date, balance, equity, floatingPnl, tradesCount)

## Wichtig
- Performance-Daten sind HISTORISCH — keine Garantie für zukünftige Ergebnisse
- Disclaimer unter jedem Chart: "Vergangene Performance ist kein Indikator für zukünftige Ergebnisse"
