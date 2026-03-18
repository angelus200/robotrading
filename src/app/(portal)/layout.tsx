import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { TRPCProvider } from '@/components/providers/trpc-provider'

// Portal-Layout — geschützter Bereich für eingeloggte User
export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  // Doppelte Absicherung neben Middleware
  if (!userId) redirect('/sign-in')

  return (
    <TRPCProvider>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r border-border bg-card md:flex">
          <div className="flex h-16 items-center border-b border-border px-6">
            <a href="/dashboard" className="text-xl font-bold text-primary">
              Robotrading
            </a>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <UserButton afterSignOutUrl="/landing" />
              <span className="text-sm text-muted-foreground">Profil</span>
            </div>
          </div>
        </aside>

        {/* Hauptinhalt */}
        <div className="flex flex-1 flex-col">
          {/* Mobiler Header */}
          <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6 md:hidden">
            <a href="/dashboard" className="text-lg font-bold text-primary">
              Robotrading
            </a>
            <UserButton afterSignOutUrl="/landing" />
          </header>

          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </TRPCProvider>
  )
}

const navItems = [
  { href: '/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/strategies', icon: '🤖', label: 'Strategien' },
  { href: '/portfolio', icon: '💼', label: 'Portfolio' },
  { href: '/settings', icon: '⚙️', label: 'Einstellungen' },
]
