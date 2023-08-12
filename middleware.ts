import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    if (
      req.nextUrl.pathname.startsWith("/authed/vendor") &&
      req.nextauth?.token?.user.role !== "VENDOR"
    ) {
      return NextResponse.rewrite(
        new URL("/api/auth/signin?message=ログインしてください", req.url),
      );
    }
    if (
      req.nextUrl.pathname.startsWith("/authed/customer") &&
      req.nextauth?.token?.user.role !== "CUSTOMER"
    ) {
      return NextResponse.rewrite(
        new URL("/api/auth/signin?message=ログインしてください", req.url),
      );
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/authed/:path*"],
};
