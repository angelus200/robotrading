# Skill: E-Mail-System (Resend)

## Setup
- Provider: Resend (resend.com)
- Domain: robotrading.net (muss verifiziert werden)
- From: noreply@robotrading.net
- Reply-To: office@angelus.group

## Alle E-Mail-Trigger

| Trigger | Template-Name | Empfänger | Phase |
|---------|--------------|-----------|-------|
| User registriert (Clerk Webhook) | welcome | Neuer User | 1 |
| Bestellung abgeschlossen | order-confirmation | Käufer | 1 |
| Challenge gekauft | challenge-purchased | Trader | 2 |
| Challenge bestanden | challenge-passed | Trader | 2 |
| Challenge failed | challenge-failed | Trader | 2 |
| Payout beantragt | payout-requested | Trader | 3 |
| Payout ausgezahlt | payout-completed | Trader | 3 |
| Neues Trading-Signal | signal-alert | Abonnenten | 2 |
| Affiliate Provision | affiliate-commission | Affiliate | 2 |
| Support-Ticket Update | ticket-update | User/Admin | 2 |
| Newsletter | newsletter | Subscriber-Liste | 3 |

## Template-Struktur
```typescript
// src/lib/email/templates/welcome.tsx
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string) {
  await resend.emails.send({
    from: 'Robotrading <noreply@robotrading.net>',
    to,
    subject: 'Willkommen bei Robotrading.net!',
    html: `...` // React Email oder HTML Template
  });
}
```

## Design-Richtlinien für E-Mails
- Gleiches Grau/Blau-Schema wie die Website
- Logo oben
- Klarer CTA-Button (blau)
- Footer: Impressum, Abmelden-Link, Risikohinweis
- Mobile-optimiert
- Deutsch als Standardsprache

## Newsletter (Phase 3)
- Double-Opt-In (DSGVO-Pflicht!)
- Resend Audiences für Segmentierung
- Abmelde-Link in jeder Mail (Pflicht!)
- Tracking: Öffnungsrate, Klickrate
