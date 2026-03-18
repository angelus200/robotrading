import { redirect } from 'next/navigation'
import { TRPCProvider } from '@/components/providers/trpc-provider'
import { getAuth } from '@/lib/auth'
import { IS_DEV_MOCK, MOCK_USER } from '@/lib/dev-mode'
import { getDb } from '@/lib/db'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await getAuth()
  if (!userId) redirect('/sign-in')

  // Dev-Mode: Mock-User hat immer ADMIN-Rolle
  if (!IS_DEV_MOCK) {
    const db = getDb()
    const user = await db.user.findUnique({
      where: { clerkId: userId },
      select: { role: true },
    })
    if (!user || user.role !== 'ADMIN') redirect('/dashboard')
  }

  return (
    <TRPCProvider>
      <div className="flex min-h-screen bg-background">
        <aside className="hidden w-64 flex-col border-r border-border bg-card md:flex">
          <div className="flex h-16 items-center border-b border-border px-6 gap-2">
            <span className="text-sm font-bold text-primary">Robotrading</span>
            <span className="rounded bg-destructive/20 px-1.5 py-0.5 text-xs font-bold text-destructive">
              ADMIN
            </span>
            {IS_DEV_MOCK && (
              <span className="rounded bg-yellow-500/20 px-1.5 py-0.5 text-xs font-bold text-yellow-400">
                DEV
              </span>
            )}
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              <li>
                <a href="/admin/users" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                  <span>👥</span> Benutzer
                </a>
              </li>
              <li>
                <a href="/admin/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                  <span>⚙️</span> Admin-Einstellungen
                </a>
              </li>
              <li className="mt-4 border-t border-border pt-4">
                <a href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                  <span>←</span> Zurück zum Portal
                </a>
              </li>
            </ul>
          </nav>

          {IS_DEV_MOCK && (
            <div className="border-t border-border p-4">
              <p className="text-xs text-yellow-400">
                Eingeloggt als: {MOCK_USER.name}
              </p>
              <p className="text-xs text-muted-foreground">Dev Mock · Admin</p>
            </div>
          )}
        </aside>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </TRPCProvider>
  )
}
