import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  console.log("request", request);
  console.log("response", response);
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/health",
};
