import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin-Einstellungen — Robotrading',
}

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin-Einstellungen</h1>
        <p className="text-muted-foreground">
          Plattform-weite Konfiguration und Verwaltung.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Broker-Verwaltung
          </h2>
          <p className="text-sm text-muted-foreground">
            Broker hinzufügen, bearbeiten und deaktivieren.
          </p>
          <button className="mt-4 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Broker verwalten
          </button>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Blog-Verwaltung
          </h2>
          <p className="text-sm text-muted-foreground">
            Artikel erstellen und veröffentlichen.
          </p>
          <button className="mt-4 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Artikel verwalten
          </button>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Stripe-Produkte
          </h2>
          <p className="text-sm text-muted-foreground">
            Preispläne und Produkte synchronisieren.
          </p>
          <button className="mt-4 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Produkte anzeigen
          </button>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            System-Logs
          </h2>
          <p className="text-sm text-muted-foreground">
            Webhooks und Fehler-Logs einsehen.
          </p>
          <button className="mt-4 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Logs öffnen
          </button>
        </div>
      </div>
    </div>
  )
}
