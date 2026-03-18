import { redirect } from 'next/navigation'

// Root-URL leitet zur Landing Page weiter
export default function RootPage() {
  redirect('/landing')
}
