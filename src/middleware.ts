import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Dev-Mode: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === 'pk_test_dummy'
const IS_DEV_MOCK =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === 'pk_test_dummy'

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
  ? (_req: NextRequest) => NextResponse.next()
  : clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req)) await auth.protect()
    })

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
