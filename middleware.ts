import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { getSessionFromCookies, redirectToLogin } from "./lib/auth/session"

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/client")) {
    return NextResponse.next()
  }

  const session = await getSessionFromCookies(request.cookies)

  if (!session) {
    return redirectToLogin(request.nextUrl, "unauthenticated")
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/client/:path*"],
}
