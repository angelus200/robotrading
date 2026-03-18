import { IS_DEV_MOCK, MOCK_USER } from '@/lib/dev-mode'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Einstellungen — Robotrading' }

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Einstellungen</h1>
        <p className="text-muted-foreground">
          Verwalte dein Profil, Sicherheit und Benachrichtigungen.
        </p>
      </div>

      {IS_DEV_MOCK ? <DevSettingsPlaceholder /> : <ClerkUserProfileWrapper />}
    </div>
  )
}

// Dev-Mode: einfaches Profil-Formular-Platzhalter
function DevSettingsPlaceholder() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-400">
        🛠 Dev-Mode — Clerk UserProfile nicht verfügbar ohne echte Keys
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Profil</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Name</label>
            <p className="mt-1 text-foreground">{MOCK_USER.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">E-Mail</label>
            <p className="mt-1 text-foreground">{MOCK_USER.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Rolle</label>
            <span className="mt-1 inline-block rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
              {MOCK_USER.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Prod-Mode: echter Clerk UserProfile
async function ClerkUserProfileWrapper() {
  const { UserProfile } = await import('@clerk/nextjs')
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <UserProfile
        appearance={{
          elements: {
            rootBox: 'w-full',
            card: 'bg-card shadow-none rounded-none border-0',
            navbar: 'bg-secondary border-r border-border',
            navbarButton: 'text-muted-foreground hover:text-foreground',
            navbarButtonActive: 'text-primary bg-primary/10',
            pageScrollBox: 'bg-card',
            formButtonPrimary: 'bg-primary hover:bg-accent text-white',
            formFieldInput: 'bg-input border-border text-foreground focus:ring-primary',
          },
        }}
      />
    </div>
  )
}
