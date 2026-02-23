import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Benutzerverwaltung – nur für Admin-Rolle.
 * Vorbereitet für spätere Gewerke-Logins.
 */
export default async function AdminBenutzerPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-xl font-semibold text-slate-100">Kein Zugriff</h1>
        <p className="mt-2 text-slate-400">
          Nur Admins haben Zugriff auf die Benutzerverwaltung.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-100">Benutzerverwaltung</h1>
      <p className="mt-2 text-slate-400">
        Hier können später Nutzer und Gewerke-Rollen verwaltet werden.
      </p>
      <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/50 p-6">
        <p className="text-sm text-slate-500">
          Platzhalter – Implementierung folgt.
        </p>
      </div>
    </div>
  );
}
