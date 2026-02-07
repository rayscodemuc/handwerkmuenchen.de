import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Prüfen, ob die Variablen geladen wurden
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Supabase-Umgebungsvariablen fehlen. Formulare funktionieren möglicherweise nicht.");
  console.warn("Bitte erstellen Sie eine .env.local Datei mit:");
  console.warn("NEXT_PUBLIC_SUPABASE_URL=https://ihr-projekt.supabase.co");
  console.warn("NEXT_PUBLIC_SUPABASE_ANON_KEY=ihr-anon-key");
} else {
  console.log("✅ Supabase-Konfiguration erkannt!");
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);
