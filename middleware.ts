import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req, eve) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      const { pathname } = req.nextUrl;
      if (
        pathname.startsWith("/authed/vendor") &&
        token?.user.role === "VENDOR"
      ) {
        return true;
      }
      if (
        pathname.startsWith("/authed/customer") &&
        token?.user.role === "CUSTOMER"
      ) {
        return true;
      }

      return false;
    },
  },
});

export const config = {
  matcher: ["/authed/:path*"],
};
