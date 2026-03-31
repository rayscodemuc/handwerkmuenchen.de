import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Session-Refresh und geschützte Routen.
 * - /admin/** erfordert Login → Redirect zu /login
 * - /login und /auth/callback sind öffentlich
 * - WICHTIG: supabase.auth.getClaims() aufrufen, damit Tokens refreshed werden
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const path = request.nextUrl.pathname;
  const envOk = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  // If admin route and env is not configured, redirect to login or show a friendly error
  if (!envOk && path.startsWith("/admin")) {
    const login = request.nextUrl.clone();
    login.pathname = "/login";
    login.searchParams.set("redirect", path);
    return NextResponse.redirect(login);
  }

  const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPA_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!SUPA_URL || !SUPA_ANON) {
    console.error("Missing Supabase URL/KEY in env for admin route");
    return NextResponse.json({ error: "Missing Supabase configuration" }, { status: 500 });
  }
  const supabase = createServerClient(
    SUPA_URL,
    SUPA_ANON,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Session-Refresh (getClaims validiert JWT und refresht bei Bedarf)
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  const path = request.nextUrl.pathname;
  const isAdminRoute = path.startsWith("/admin");

  // Nicht eingeloggt + Admin-Route → Login
  if (!user && isAdminRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
