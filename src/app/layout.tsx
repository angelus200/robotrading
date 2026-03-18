import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { IS_DEV_MOCK } from '@/lib/dev-mode'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Robotrading — Automatisierter Handel',
    template: '%s | Robotrading',
  },
  description:
    'Automatisierte Handelsstrategien für moderne Anleger. Professionelles Algorithmic Trading auf robotrading.net.',
  keywords: ['Robotrading', 'Algo Trading', 'Automatisierter Handel', 'Trading Strategien'],
  authors: [{ name: 'Robotrading Team' }],
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://robotrading.net',
    siteName: 'Robotrading',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const content = (
    <html lang="de" className={plusJakartaSans.variable}>
      <body className="antialiased">{children}</body>
    </html>
  )

  // In Dev-Mode kein ClerkProvider — Dummy-Keys würden einen Fehler werfen
  if (IS_DEV_MOCK) return content

  return <ClerkProvider>{content}</ClerkProvider>
}
