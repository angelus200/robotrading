import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Auth-Mock-Modus: kein Clerk wenn Key fehlt, leer oder als Dummy gesetzt
const _clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
const IS_DEV_MOCK =
  !_clerkKey ||
  _clerkKey === 'pk_test_dummy' ||
  _clerkKey.startsWith('pk_test_dummy')

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/strategies(.*)',
  '/portfolio(.*)',
  '/settings(.*)',
  '/admin(.*)',
])

// In Dev-Mode: einfacher Passthrough, kein Clerk
// In Prod-Mode: Clerk schützt alle Portal- und Admin-Routen
export default IS_DEV_MOCK
  ? () => NextResponse.next()
  : clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req)) await auth.protect()
    })

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
