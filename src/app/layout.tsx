import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

// Plus Jakarta Sans — moderne Schriftart für Trading-Plattform
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
    title: 'Robotrading — Automatisierter Handel',
    description: 'Professionelles Algorithmic Trading für moderne Anleger.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      {/* Font-Variable auf html-Element — wichtig für Tailwind v4 @theme inline */}
      <html lang="de" className={plusJakartaSans.variable}>
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  )
}
