# Skill: Trading Shop & Lizenzierung

## Konzept
Verkauf von Expert Advisors (EAs), Indikatoren, Skripten und Kursen.
Stripe für Payments, eigenes Lizenz-System für Software-Aktivierung.

## Produkttypen
| Typ | Beschreibung | Lizenz |
|-----|-------------|--------|
| EA | Expert Advisor (MT4/MT5) | Hardware-gebunden, max Aktivierungen |
| INDICATOR | Trading-Indikator | Hardware-gebunden |
| SCRIPT | Utility-Script | Einmal-Key |
| COURSE | Video-Kurs / Schulung | Account-gebunden |
| SUBSCRIPTION | Abo (Signale, Coaching) | Zeitbasiert (Stripe Subscription) |

## Lizenz-System
```
Kauf → Stripe Payment → Webhook → Order PAID → License generiert
→ User erhält License Key per E-Mail + im Portal
→ User aktiviert in MT4/MT5 mit Key + Hardware-ID
→ API-Endpunkt prüft: Key gültig? HW-ID stimmt? Max Aktivierungen?
```

### License Key Format
`RT-XXXXX-XXXXX-XXXXX-XXXXX` (Zufällig generiert, unique)

### Aktivierungs-API
```
POST /api/license/activate
Body: { licenseKey, hardwareId }
Response: { valid: true, product: "...", expiresAt: "..." }
```

## Download-System
- Sichere Downloads mit signiertem Token (JWT, 1h gültig)
- Versionsverwaltung: User kann alte Versionen herunterladen
- File Storage: Railway Volume oder S3/R2
- Download-Counter pro User/Produkt

## Stripe Integration
- **Einmalkauf:** Stripe Checkout Session → Webhook checkout.session.completed
- **Abo:** Stripe Subscription → Webhook invoice.paid / customer.subscription.deleted
- **Gutscheincodes:** Stripe Coupon API
- **Webhooks:** Signature-Verifizierung!

## Shop-Seiten
- /shop → Produktübersicht mit Filtern
- /shop/[slug] → Produktdetail mit Screenshots, Beschreibung, Reviews
- /portal/products → Meine gekauften Produkte + Downloads
- /portal/licenses → Meine Lizenzen + Aktivierungsstatus

## Datenbank
- Product (name, slug, type, price, description, images, isActive)
- Order (userId, status, totalAmount, stripePaymentIntentId)
- OrderItem (orderId, productId, quantity, unitPrice)
- License (orderId, productId, licenseKey, hwId, maxActivations, expiresAt)
- Download (productId, version, fileName, filePath)
- Review (productId, userId, rating, content, isVerified)
