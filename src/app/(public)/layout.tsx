// Public-Layout — Landing, Blog, Broker, statische Seiten (kein Auth erforderlich)
import Link from 'next/link'
import { PublicHeader } from '@/components/public/public-header'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicHeader />

      <main className="flex-1">{children}</main>

      {/* Footer — dunkel wie auf robotrading.net */}
      <footer className="border-t border-[#243040] bg-[#1A2332]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Unternehmen */}
            <div>
              <div className="mb-4">
                <div className="text-base font-bold text-white">ROBOTRADING.NET</div>
                <div className="text-xs text-[#4DA8DA]">Ihr Sprung in die Gewinnzone!</div>
              </div>
              <address className="not-italic space-y-1 text-sm text-[#94A3B8]">
                <p className="font-semibold text-[#CBD5E1]">Activa Fintech Processing KG</p>
                <p>Konrad-Zuse-Platz 8</p>
                <p>81829 München</p>
                <p className="mt-2 font-semibold text-[#CBD5E1]">Sitz der Gesellschaft:</p>
                <p>Charlottenthal 4</p>
                <p>92549 Stadlern</p>
              </address>
            </div>

            {/* Kontakt */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#CBD5E1]">
                Kontakt
              </h4>
              <div className="space-y-2 text-sm text-[#94A3B8]">
                <p>
                  Email:{' '}
                  <a
                    href="mailto:office@angelus.group"
                    className="text-[#4DA8DA] hover:text-[#6BBFE8] transition-colors"
                  >
                    office@angelus.group
                  </a>
                </p>
              </div>

              {/* Social */}
              <div className="mt-6">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#CBD5E1]">
                  Social Media
                </h4>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/profile.php?id=61575952515839"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#334155] text-[#94A3B8] hover:border-[#4DA8DA] hover:text-[#4DA8DA] transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/robotradingnet/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#334155] text-[#94A3B8] hover:border-[#4DA8DA] hover:text-[#4DA8DA] transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Rechtliches */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#CBD5E1]">
                Rechtliches
              </h4>
              <nav className="space-y-2">
                {[
                  { label: 'Impressum', href: '/impressum' },
                  { label: 'Datenschutz', href: '/datenschutz' },
                  { label: 'AGB', href: '/agb' },
                  { label: 'AGB für Affiliates', href: '/agb-affiliates' },
                  { label: 'Risikohinweise', href: '/risikohinweise' },
                  { label: 'AML-Richtlinie', href: '/aml' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#CBD5E1]">
                Unsere Services
              </h4>
              <nav className="space-y-2">
                {[
                  { label: 'Trading Schulungen', href: '/schulungen' },
                  { label: 'Tradingberatung', href: '/tradingberatung' },
                  { label: 'Brokerberatung', href: '/brokerberatung' },
                  { label: '1:1 Coachings', href: '/coachings' },
                  { label: 'Trading Signale', href: '/signale' },
                  { label: 'Trading Software', href: '/software' },
                  { label: 'Affiliate Programm', href: '/affiliate' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 border-t border-[#334155] pt-6 text-center text-xs text-[#64748B]">
            <p>
              © {new Date().getFullYear()} Activa Fintech Processing KG · Robotrading.net · Alle Rechte
              vorbehalten
            </p>
            <p className="mt-1">
              CFD-Handel birgt ein hohes Risiko. Lesen Sie unsere{' '}
              <Link href="/risikohinweise" className="text-[#4DA8DA] hover:text-[#6BBFE8] transition-colors">
                Risikohinweise
              </Link>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
