import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { AdminUsersPanel } from "./AdminUsersPanel";

export default async function AdminBenutzerPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-xl font-semibold text-slate-100">Kein Zugriff</h1>
        <p className="mt-2 text-slate-400">Nur Admins haben Zugriff auf die Benutzerverwaltung.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-end gap-1.5 border-b border-slate-800 px-4 py-3 sm:px-6">
        {user.email && <span className="text-xs text-slate-500">{user.email}</span>}
        <form action="/auth/signout" method="post" className="inline">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
          >
            <LogOut className="h-4 w-4" />
            Abmelden
          </button>
        </form>
      </div>
      <div className="p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-100">Benutzerverwaltung</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Lege Gewerk-Logins an. Jeder Nutzer meldet sich wie bisher unter{" "}
          <span className="text-slate-300">/login</span> mit E-Mail und Passwort an.
        </p>
        <p className="mt-2 max-w-2xl text-xs text-slate-500">
          Technisch nötig: In Vercel (bzw. lokal in <code className="rounded bg-slate-800 px-1">.env.local</code>) die
          Variable <code className="rounded bg-slate-800 px-1">SUPABASE_SERVICE_ROLE_KEY</code> setzen – sonst kann die
          Nutzerliste und das Anlegen nicht funktionieren.
        </p>
        <div className="mt-8">
          <AdminUsersPanel />
        </div>
      </div>
    </div>
  );
}
