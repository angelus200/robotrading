import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Routen die Authentifizierung erfordern
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/strategies(.*)',
  '/portfolio(.*)',
  '/settings(.*)',
])

// Admin-Routen — zusätzlich Rollen-Check im Layout
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Portal-Routen schützen
  if (isProtectedRoute(req) || isAdminRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Next.js-Interna und statische Dateien überspringen
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // API-Routen immer prüfen
    '/(api|trpc)(.*)',
  ],
}
