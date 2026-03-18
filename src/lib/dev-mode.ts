// Dev-Mode Erkennung — funktioniert auf Client und Server
// Aktiviert wenn NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === 'pk_test_dummy'
export const IS_DEV_MOCK =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === 'pk_test_dummy'

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
