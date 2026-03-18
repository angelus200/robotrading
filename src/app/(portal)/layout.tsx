import { redirect } from 'next/navigation'
import { TRPCProvider } from '@/components/providers/trpc-provider'
import { getAuth } from '@/lib/auth'
import { IS_DEV_MOCK, MOCK_USER } from '@/lib/dev-mode'

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await getAuth()
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
            {IS_DEV_MOCK && (
              <span className="ml-2 rounded bg-yellow-500/20 px-1.5 py-0.5 text-xs font-bold text-yellow-400">
                DEV
              </span>
            )}
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
            {/* Dev-Mode: einfacher Platzhalter statt UserButton */}
            <DevAwareUserButton />
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6 md:hidden">
            <a href="/dashboard" className="text-lg font-bold text-primary">
              Robotrading
            </a>
            <DevAwareUserButton />
          </header>
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </TRPCProvider>
  )
}

// Zeigt echten UserButton oder Dev-Platzhalter
async function DevAwareUserButton() {
  if (IS_DEV_MOCK) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          {MOCK_USER.name[0]}
        </div>
        <div>
          <p className="text-xs font-medium text-foreground">{MOCK_USER.name}</p>
          <p className="text-xs text-yellow-400">Dev Mock</p>
        </div>
      </div>
    )
  }

  const { UserButton } = await import('@clerk/nextjs')
  return (
    <div className="flex items-center gap-3">
      <UserButton afterSignOutUrl="/landing" />
      <span className="text-sm text-muted-foreground">Profil</span>
    </div>
  )
}

const navItems = [
  { href: '/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/strategies', icon: '🤖', label: 'Strategien' },
  { href: '/portfolio', icon: '💼', label: 'Portfolio' },
  { href: '/settings', icon: '⚙️', label: 'Einstellungen' },
]
