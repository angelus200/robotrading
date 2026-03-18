// Auth-Mock-Modus: aktiv wenn Clerk-Key fehlt, leer oder explizit als Dummy gesetzt
// Fängt auf Railway den Fall ab wenn keine Clerk-Keys konfiguriert wurden
const _clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
export const IS_DEV_MOCK =
  !_clerkKey ||
  _clerkKey === 'pk_test_dummy' ||
  _clerkKey.startsWith('pk_test_dummy')

// Mock-Benutzer für Dev-Mode (Rolle: ADMIN damit alle Seiten zugänglich)
export const MOCK_USER_ID = 'dev_mock_clerk_id'

export const MOCK_USER = {
  id: 'dev_user_id',
  clerkId: MOCK_USER_ID,
  email: 'dev@robotrading.local',
  name: 'Dev Admin',
  avatarUrl: null,
  role: 'ADMIN' as const,
  stripeCustomerId: null,
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
}
