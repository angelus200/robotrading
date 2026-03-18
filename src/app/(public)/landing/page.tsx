import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from '@/components/public/contact-form'

export const metadata: Metadata = {
  title: 'Robotrading.net – Ihr Sprung in die Gewinnzone!',
  description:
    'Automatisierter Handel, Trading Schulungen, Beratung und Signale – alles rund um algorithmischen Handel.',
}

export const revalidate = 3600

const services = [
  {
    title: 'Trading Schulungen',
    description:
      'Lernen Sie von Experten alles über automatisierten Handel – von den Grundlagen bis zu fortgeschrittenen Strategien.',
    href: '/schulungen',
    icon: '📚',
  },
  {
    title: 'Tradingberatung',
    description:
      'Individuelle Beratung für Ihre Trading-Strategie. Wir analysieren Ihren Ansatz und helfen Ihnen, ihn zu optimieren.',
    href: '/tradingberatung',
    icon: '💼',
  },
  {
    title: 'Brokerberatung',
    description:
      'Finden Sie den richtigen Broker für Ihre Bedürfnisse. Wir vergleichen und empfehlen regulierte, seriöse Anbieter.',
    href: '/brokerberatung',
    icon: '🔍',
  },
  {
    title: '1:1 Coachings',
    description:
      'Persönliches Coaching direkt mit unseren Experten. Maßgeschneidert auf Ihren Wissensstand und Ihre Ziele.',
    href: '/coachings',
    icon: '🎯',
  },
  {
    title: 'Trading Signale',
    description:
      'Profitieren Sie von unseren professionellen Trading Signalen und lassen Sie die Algorithmen für sich arbeiten.',
    href: '/signale',
    icon: '📡',
  },
  {
    title: 'Trading Software',
    description:
      'Modernste Trading Software und Expert Advisors für MetaTrader 4 und 5 – entwickelt und getestet von Profis.',
    href: '/software',
    icon: '🤖',
  },
]

const autoTradingBenefits = [
  'Kein ständiges Marktbeobachten erforderlich',
  'Diszipliniertes Einhalten der Strategie',
  'Paralleles Handeln auf mehreren Märkten',
  'Schnellere Auftragsausführung als manuell',
  'Backtesting mit historischen Daten möglich',
  'Geringerer zeitlicher Aufwand nach Setup',
]

const stats = [
  { label: '24/7', desc: 'Handel ohne Unterbrechung' },
  { label: '100%', desc: 'Emotionsfreies Trading' },
  { label: 'MT4/5', desc: 'Alle Plattformen unterstützt' },
  { label: 'Backtested', desc: 'Historisch getestete Strategien' },
]

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0F172A] py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.12)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
            Automatisierter Handel 24/7
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            Willkommen bei{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Robotrading.net
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl font-medium text-[#94A3B8] md:text-2xl">
            Ihrer Anlaufstelle rund um automatisierten Handel!
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#64748B]">
            Wir unterstützen Trader dabei, durch algorithmenbasierte Systeme effizienter und
            profitabler zu handeln. Von der Schulung bis zur fertigen Software – alles aus einer
            Hand.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/sign-up"
              className="rounded-lg bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/30"
            >
              Jetzt starten
            </Link>
            <a
              href="https://www.myfxbook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[#334155] bg-[#1E293B] px-8 py-3.5 text-sm font-semibold text-[#CBD5E1] transition-colors hover:border-[#475569] hover:text-white"
            >
              Strategie-Ergebnisse ansehen
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-[#0A0F1E] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Unsere Services</h2>
            <p className="mt-4 text-[#64748B]">
              Alles was Sie für erfolgreiches Trading benötigen
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-xl border border-[#1E293B] bg-[#0F172A] p-6 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="mb-4 text-3xl">{service.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-blue-400">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#64748B]">{service.description}</p>
                <div className="mt-4 text-sm font-medium text-blue-500 group-hover:text-blue-400">
                  Mehr erfahren →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Was ist automatisiertes Trading? */}
      <section className="bg-[#0F172A] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Was ist automatisiertes Trading?
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#94A3B8]">
                Automatisiertes Trading, auch algorithmisches Trading genannt, ermöglicht es,
                Handelsentscheidungen durch Software-Programme (sogenannte Expert Advisors)
                automatisch ausführen zu lassen.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#94A3B8]">
                Diese Systeme analysieren Marktdaten rund um die Uhr –{' '}
                <strong className="text-white">24 Stunden am Tag, 7 Tage die Woche</strong> – und
                führen Trades nach vordefinierten Regeln ohne emotionale Einflüsse aus.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#94A3B8]">
                Wir helfen Ihnen dabei, die richtigen Strategien zu finden, zu testen und
                erfolgreich einzusetzen – von der ersten Idee bis zum laufenden System.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-[#1E293B] bg-[#0A0F1E] p-4"
                  >
                    <div className="text-xl font-bold text-blue-400">{item.label}</div>
                    <div className="mt-1 text-xs text-[#64748B]">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[#1E293B] bg-[#0A0F1E] p-8">
              <div className="space-y-4">
                {autoTradingBenefits.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#94A3B8]">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-[#0A0F1E] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-blue-500/5 p-10 text-center">
            <div className="text-5xl font-extrabold text-white md:text-6xl">230+</div>
            <div className="mt-2 text-xl font-semibold text-blue-400">
              Trader vertrauen uns bereits
            </div>
            <p className="mx-auto mt-4 max-w-xl text-sm text-[#64748B]">
              Unsere Community wächst täglich. Werden auch Sie Teil unserer Gemeinschaft
              erfolgreicher Trader und profitieren Sie von geballtem Wissen und erprobten
              Strategien.
            </p>
            <Link
              href="/sign-up"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Jetzt Mitglied werden
            </Link>
          </div>
        </div>
      </section>

      {/* Broker Warning */}
      <section className="bg-[#0F172A] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-3xl">⚠️</div>
              <div>
                <h3 className="text-lg font-semibold text-amber-400">
                  Wichtiger Hinweis zu Brokern
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                  Im Bereich automatisiertes Trading gibt es leider viele unseriöse Broker und
                  Betrugsmaschen. Wir helfen Ihnen dabei, seriöse und regulierte Anbieter zu
                  identifizieren und Fallstricke zu vermeiden. Bei Verdacht auf Brokerbetrug stehen
                  wir Ihnen mit unserer Erfahrung zur Seite.
                </p>
                <Link
                  href="/brokerbetrug"
                  className="mt-3 inline-block text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
                >
                  Hilfe bei Brokerbetrug →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[#0A0F1E] py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Verpassen Sie keine Insights mehr!
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[#64748B]">
            Abonnieren Sie unseren Newsletter und erhalten Sie regelmäßig Trading-Tipps,
            Strategie-Updates und Marktanalysen direkt in Ihr Postfach.
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Ihre E-Mail Adresse"
              className="flex-1 rounded-lg border border-[#334155] bg-[#0F172A] px-4 py-3 text-sm text-white placeholder-[#475569] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            <button
              type="button"
              className="whitespace-nowrap rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Anmelden
            </button>
          </div>
          <p className="mt-3 text-xs text-[#475569]">
            Kein Spam. Jederzeit abmeldbar. Datenschutz wird großgeschrieben.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-[#0F172A] py-20" id="kontakt">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Nehmen Sie Kontakt auf
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#94A3B8]">
                Sie haben Fragen zu unseren Services, möchten eine Beratung buchen oder benötigen
                Hilfe bei einem Broker? Wir sind für Sie da.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
                  <span className="text-blue-400">✉</span>
                  <a
                    href="mailto:office@angelus.group"
                    className="text-blue-400 transition-colors hover:text-blue-300"
                  >
                    office@angelus.group
                  </a>
                </div>
                <div className="flex items-start gap-3 text-sm text-[#94A3B8]">
                  <span className="mt-0.5 text-blue-400">📍</span>
                  <div>
                    <p className="font-semibold text-[#CBD5E1]">Activa Fintech Processing KG</p>
                    <p>Konrad-Zuse-Platz 8, 81829 München</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-[#1E293B] bg-[#0A0F1E] p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
