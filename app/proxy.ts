import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicPaths = [
    "/admin/login",
    "/api/auth/login",
    "/api/auth/me",
    "/api/projects",
    "/api/blog",
    "/api/testimonials",
    "/api/contact",
    "/api/github",
    "/api/stats",
    "/api/profile",
    "/api/cv",
    "/api/views",
    "/api/chatbot",
  ];

  if (pathname.startsWith("/admin") && !publicPaths.some((p) => pathname.startsWith(p))) {
    const accessToken = request.cookies.get("access_token")?.value;
    const refreshToken = request.cookies.get("refresh_token")?.value;

    if (!accessToken && !refreshToken) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
