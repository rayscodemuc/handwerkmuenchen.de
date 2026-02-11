import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Prüfen, ob die Variablen geladen wurden (Next.js lädt .env.local nur beim Start)
if (!supabaseUrl || !supabaseAnonKey) {
  const missing = [
    !supabaseUrl && "NEXT_PUBLIC_SUPABASE_URL",
    !supabaseAnonKey && "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ].filter(Boolean);
  console.warn("⚠️ Supabase: folgende Umgebungsvariablen fehlen:", missing.join(", "));
  console.warn("Falls .env.local existiert: Dev-Server neu starten (Strg+C, dann npm run dev).");
} else {
  console.log("✅ Supabase-Konfiguration erkannt!");
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);
