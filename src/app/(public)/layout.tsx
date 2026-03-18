// Public-Layout — für Landing, Blog, Brokers
// Kein Auth erforderlich, SSG-optimiert
import Link from 'next/link'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Öffentliche Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/landing" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Robotrading</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/landing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Start
            </Link>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/brokers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Broker
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Anmelden
            </Link>
            <Link
              href="/sign-up"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-accent transition-colors"
            >
              Kostenlos starten
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-6">
          <p>© {new Date().getFullYear()} Robotrading. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  )
}
