// Auth-Layout — zentriertes Layout für Sign-In/Up Seiten
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
      <a href="/landing" className="mb-8 flex items-center gap-2">
        <span className="text-2xl font-bold text-primary">Robotrading</span>
      </a>
      {children}
      <p className="mt-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Robotrading
      </p>
    </div>
  )
}
