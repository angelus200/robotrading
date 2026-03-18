import { redirect } from 'next/navigation'
import { IS_DEV_MOCK } from '@/lib/dev-mode'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Anmelden — Robotrading' }

export default function SignInPage() {
  // Dev-Mode: direkt zum Dashboard weiterleiten
  if (IS_DEV_MOCK) {
    redirect('/dashboard')
  }

  // Prod-Mode: Clerk Sign-In Komponente
  // (Lazy-Import um Dev-Mode nicht zu beeinflussen)
  return <ClerkSignIn />
}

async function ClerkSignIn() {
  const { SignIn } = await import('@clerk/nextjs')
  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: 'w-full max-w-md',
          card: 'bg-card border border-border shadow-xl rounded-xl',
          headerTitle: 'text-foreground',
          headerSubtitle: 'text-muted-foreground',
          formButtonPrimary: 'bg-primary hover:bg-accent text-white',
          formFieldInput: 'bg-input border-border text-foreground focus:ring-primary',
          footerActionLink: 'text-primary hover:text-accent',
          dividerLine: 'bg-border',
          dividerText: 'text-muted-foreground',
          socialButtonsBlockButton: 'border-border text-foreground hover:bg-secondary',
        },
      }}
    />
  )
}
