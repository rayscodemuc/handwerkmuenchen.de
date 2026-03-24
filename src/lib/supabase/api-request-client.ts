import { createClient as createSupabaseJsClient, type SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/**
 * Supabase-Client für Route Handler: bevorzugt Cookie-Session, sonst Authorization Bearer.
 * Damit stimmen RLS (`auth.uid()`) und Session-Check überein.
 */
export async function getSupabaseForApiRequest(request: Request): Promise<SupabaseClient> {
  const cookieClient = await createClient();
  const {
    data: { user },
  } = await cookieClient.auth.getUser();
  if (user) return cookieClient;

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (token && url && anon) {
    return createSupabaseJsClient(url, anon, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
  }

  return cookieClient;
}
