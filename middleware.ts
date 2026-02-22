import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const NON_WWW_HOST = "handwerkmuenchen.de";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const url = request.nextUrl.clone();

  // www.handwerkmuenchen.de → handwerkmuenchen.de (301 permanent)
  if (host.toLowerCase().startsWith("www.")) {
    url.host = NON_WWW_HOST;
    url.protocol = "https:";
    return NextResponse.redirect(url.toString(), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
