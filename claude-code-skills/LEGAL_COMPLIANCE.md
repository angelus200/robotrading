# Skill: Recht & Compliance (DACH / EU)

## Pflichtseiten (Phase 1 — MUSS vor Go-Live existieren)

### Impressum (TMG §5)
- Activa Fintech Processing KG
- Konrad-Zuse-Platz 8, 81829 München
- Sitz: Charlottenthal 4, 92549 Stadlern
- E-Mail: office@angelus.group
- HRA-Nummer, USt-IdNr (muss ergänzt werden)
- Vertretungsberechtigte Person (muss ergänzt werden)

### Datenschutzerklärung (DSGVO Art. 13/14)
Muss alle Dienste abdecken:
- Clerk (Auth-Provider, Sitz: USA → SCCs/DPF prüfen)
- Stripe (Zahlungen, Sitz: USA → SCCs/DPF)
- Railway (Hosting, Sitz: USA → DPA erforderlich)
- Resend (E-Mail, Sitz: USA → DPA erforderlich)
- CoinGecko API (Krypto-Preise)
- Sentry (Error Tracking)

Sections:
- Verantwortlicher + Kontakt DSB
- Rechtsgrundlagen (Art. 6 DSGVO)
- Erhobene Daten + Zweck + Speicherdauer
- Empfänger / Auftragsverarbeiter
- Drittlandtransfers (USA)
- Rechte der Betroffenen (Auskunft, Löschung, Widerspruch, Portabilität)
- Cookie-Nutzung
- Widerrufsrecht bei Einwilligung

### Cookie-Banner
- Consent-Management BEVOR Tracking-Cookies gesetzt werden
- Kategorien: Notwendig (immer aktiv), Analyse, Marketing
- Granulare Einwilligung (nicht nur "Alle akzeptieren")
- Widerrufsmöglichkeit jederzeit

### AGB
Separate AGB für:
- **Shop:** Widerrufsrecht (14 Tage bei digitalen Produkten eingeschränkt), Lizenzbestimmungen, Gewährleistung
- **Proptrading:** Challenge-Regeln, Payout-Bedingungen, Haftungsausschluss, Kündigung
- **Affiliate:** Provisionsregeln, Auszahlungsbedingungen, Verbotene Werbemethoden, Kündigung

### Risikohinweise (PFLICHT auf allen Trading-Seiten)
```
CFDs sind komplexe Instrumente und bergen ein hohes Risiko, schnell Geld zu verlieren.
[XX]% der Kleinanlegerkonten verlieren Geld beim CFD-Handel. Sie sollten überlegen,
ob Sie verstehen, wie CFDs funktionieren, und ob Sie es sich leisten können, das hohe
Risiko einzugehen, Ihr Geld zu verlieren. Dies ist keine Anlageberatung.
```

### AML-Richtlinie
- Anti-Money-Laundering Policy
- KYC-Pflichten für Payouts
- Verdachtsmeldepflicht

## Regulatorische Prüfungen (VOR Go-Live)

### BaFin / FMA Check
- Fällt das Proptrading-Modell unter MiFID II?
- Brauchen wir eine WpIG-Lizenz?
- Simulated Trading vs. echtes Kapital → Rechtliche Abgrenzung
- Angelus Legal muss das prüfen

### Krypto-Regulierung
- Non-custodial Wallet = kein Verwahrgeschäft (§1 Abs. 1a KWG)
- Trotzdem: Juristische Bestätigung einholen
- MiCA-Verordnung beachten (ab 2024/2025 voll wirksam)

## DSGVO-Technische Umsetzung
- **Datenlöschung:** Clerk Webhook user.deleted → Soft-Delete + Anonymisierung
- **Auskunftsrecht:** Admin-Panel Funktion zum Export aller User-Daten
- **Einwilligung:** Double-Opt-In für Newsletter
- **DPA:** Auftragsverarbeitungsverträge mit allen Diensten abschließen

## UI-Regeln
- Risikohinweis im Footer ALLER Seiten (auch intern)
- Cookie-Banner beim ersten Besuch
- "Keine Anlageberatung" bei Broker-Vergleich
- "Simuliertes Kapital" bei Proptrading
- Impressum + Datenschutz von JEDER Seite erreichbar (Footer)
