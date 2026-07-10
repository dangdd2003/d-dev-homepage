import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if legacy router fallback is enabled via environment variable
  const useLegacy = process.env.USE_LEGACY_ROUTER === 'true'

  if (useLegacy) {
    const url = request.nextUrl.clone()
    // Avoid rewriting paths that are already pointing to legacy or static assets
    if (!url.pathname.startsWith('/legacy') && !url.pathname.match(/\.(.*)$/)) {
      url.pathname = `/legacy${url.pathname === '/' ? '/index' : url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}
