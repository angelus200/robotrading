'use client'

import { UserProfile } from '@clerk/nextjs'

// Clerk UserProfile eingebettet — verwaltet alle Auth-Einstellungen
export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Einstellungen</h1>
        <p className="text-muted-foreground">
          Verwalte dein Profil, Sicherheit und Benachrichtigungen.
        </p>
      </div>

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
              formFieldInput:
                'bg-input border-border text-foreground focus:ring-primary',
            },
          }}
        />
      </div>
    </div>
  )
}
