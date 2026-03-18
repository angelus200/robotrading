'use client'

import { trpc } from '@/lib/trpc'
import { formatDate } from '@/lib/utils'

export default function AdminUsersPage() {
  const { data, isLoading } = trpc.user.list.useQuery({ page: 1, limit: 50 })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Benutzer</h1>
          <p className="text-muted-foreground">
            {data?.total ?? 0} Benutzer registriert
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Lädt...</div>
        ) : !data?.users.length ? (
          <div className="p-8 text-center text-muted-foreground">
            Keine Benutzer gefunden.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50">
                <tr className="text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">E-Mail</th>
                  <th className="px-4 py-3 font-medium">Rolle</th>
                  <th className="px-4 py-3 font-medium">Abo</th>
                  <th className="px-4 py-3 font-medium">Registriert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.users.map((user) => (
                  <tr key={user.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {user.name ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          user.role === 'ADMIN'
                            ? 'bg-destructive/10 text-destructive'
                            : 'bg-secondary text-muted-foreground'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {user.subscription ? (
                        <span className="text-xs text-green-400">
                          {user.subscription.status}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Kein Abo</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
