import { SignUp } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registrieren — Robotrading',
}

// Clerk Sign-Up Komponente — Catch-All-Route
export default function SignUpPage() {
  return (
    <SignUp
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
          dividerLine: 'bg-border',
          dividerText: 'text-muted-foreground',
          socialButtonsBlockButton:
            'border-border text-foreground hover:bg-secondary',
        },
      }}
    />
  )
}
