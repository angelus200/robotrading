import 'server-only'
import { IS_DEV_MOCK, MOCK_USER_ID } from './dev-mode'

// Einheitlicher Auth-Wrapper — gibt Mock-User in Dev zurück, Clerk in Prod
export async function getAuth(): Promise<{ userId: string | null }> {
  if (IS_DEV_MOCK) {
    return { userId: MOCK_USER_ID }
  }
  const { auth } = await import('@clerk/nextjs/server')
  return auth()
}
