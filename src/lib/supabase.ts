import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// URL und Key ausschließlich aus .env.local (kein hartcodierter Platzhalter)
if (!supabaseUrl || !supabaseAnonKey) {
  const missing = [
    !supabaseUrl && "NEXT_PUBLIC_SUPABASE_URL",
    !supabaseAnonKey && "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ].filter(Boolean);
  console.warn("⚠️ Supabase: folgende Umgebungsvariablen fehlen:", missing.join(", "));
  console.warn("Bitte in .env.local setzen und Dev-Server neu starten (Strg+C, dann npm run dev).");
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

/** Edge Function handle-new-lead – Basis-URL kommt aus NEXT_PUBLIC_SUPABASE_URL (.env.local) */
export const EDGE_FUNCTION_HANDLE_NEW_LEAD =
  typeof supabaseUrl === "string" && supabaseUrl.length > 0
    ? `${supabaseUrl.replace(/\/$/, "")}/functions/v1/handle-new-lead`
    : "";
