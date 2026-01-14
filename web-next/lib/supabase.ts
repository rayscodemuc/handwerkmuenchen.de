import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Prüfen, ob die Variablen geladen wurden
if (!supabaseUrl || !supabaseAnonKey) {
  console.log("❌ Umgebungsvariablen noch nicht geladen.");
} else {
  console.log("✅ Supabase-Konfiguration erkannt!");
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);