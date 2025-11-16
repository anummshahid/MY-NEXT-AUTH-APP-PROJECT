import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to signin page and API routes
        if (
          req.nextUrl.pathname === "/signin" ||
          req.nextUrl.pathname.startsWith("/api/auth")
        ) {
          return true
        }
        // Require authentication for all other pages
        return !!token
      },
    },
    pages: {
      signIn: "/signin",
    },
  }
)

export const config = {
  matcher: ["/((?!api|_next|static|signin).*)"],
}
