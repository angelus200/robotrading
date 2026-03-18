import { SignIn } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anmelden — Robotrading',
}

// Clerk Sign-In Komponente — Catch-All-Route für alle Clerk-Auth-Flows
export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: 'w-full max-w-md',
          card: 'bg-card border border-border shadow-xl rounded-xl',
          headerTitle: 'text-foreground',
          headerSubtitle: 'text-muted-foreground',
          formButtonPrimary: 'bg-primary hover:bg-accent text-white',
          formFieldInput:
            'bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary',
          footerActionLink: 'text-primary hover:text-accent',
          identityPreviewText: 'text-foreground',
          dividerLine: 'bg-border',
          dividerText: 'text-muted-foreground',
          socialButtonsBlockButton:
            'border-border text-foreground hover:bg-secondary',
        },
      }}
    />
  )
}
