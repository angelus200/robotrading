import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Robotrading — Automatisierter Handel für moderne Anleger',
  description:
    'Professionelle Handelsstrategien vollautomatisch ausführen. Algorithmic Trading für jeden.',
}

// SSG — Landing Page wird beim Build statisch generiert
export const revalidate = 3600 // stündlich neu generieren

export default function LandingPage() {
  return (
    <>
      {/* Hero-Bereich */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_#2563EB20_0%,_transparent_60%)]" />
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Algo Trading Platform
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
            Automatisierter Handel{' '}
            <span className="text-primary">ohne Kompromisse</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Robotrading verbindet deine Handelsstrategien mit führenden Brokern
            und führt sie vollautomatisch aus — 24/7, ohne manuelles Eingreifen.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/sign-up"
              className="rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-accent transition-colors"
            >
              Jetzt kostenlos starten
            </a>
            <a
              href="#features"
              className="rounded-lg border border-border px-8 py-3 text-base font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              Mehr erfahren
            </a>
          </div>
        </div>
      </section>

      {/* Feature-Bereich */}
      <section id="features" className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            Alles was du brauchst
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors"
              >
                <div className="mb-4 text-3xl">{f.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA-Bereich */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-primary/5 p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Bereit zum automatisierten Handeln?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Starte heute und verbinde deine erste Handelsstrategie.
          </p>
          <a
            href="/sign-up"
            className="mt-8 inline-block rounded-lg bg-primary px-10 py-3 font-semibold text-white hover:bg-accent transition-colors"
          >
            Kostenlos registrieren
          </a>
        </div>
      </section>
    </>
  )
}

const features = [
  {
    icon: '⚡',
    title: 'Echtzeit-Ausführung',
    description:
      'Blitzschnelle Orderausführung direkt über die Broker-API. Kein Delay, kein manuelles Klicken.',
  },
  {
    icon: '📊',
    title: 'Live-Portfolio',
    description:
      'Beobachte dein Portfolio in Echtzeit. PnL, Win-Rate und alle offenen Positionen auf einen Blick.',
  },
  {
    icon: '🔒',
    title: 'Sicher & Verschlüsselt',
    description:
      'Deine API-Keys werden verschlüsselt gespeichert. Clerk-Auth schützt jeden Zugriff.',
  },
  {
    icon: '🤖',
    title: 'Vollautomatisch',
    description:
      'Definiere deine Strategie einmal, Robotrading kümmert sich um den Rest — 24/7.',
  },
  {
    icon: '📈',
    title: 'Backtesting',
    description:
      'Teste deine Strategie auf historischen Daten bevor du live gehst.',
  },
  {
    icon: '🔗',
    title: 'Multi-Broker',
    description:
      'Unterstützt alle großen Broker. Ein Konto, viele Verbindungen.',
  },
]
