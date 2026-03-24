import { NextResponse } from "next/server";

/** Temporär: prüft ob Env-Variablen geladen werden. Nach Debug wieder löschen. */
export async function GET() {
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const hasAnon = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const hasServiceRole = !!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return NextResponse.json({
    NEXT_PUBLIC_SUPABASE_URL: hasUrl,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: hasAnon,
    SUPABASE_SERVICE_ROLE_KEY: hasServiceRole,
    nodeEnv: process.env.NODE_ENV,
  });
}
