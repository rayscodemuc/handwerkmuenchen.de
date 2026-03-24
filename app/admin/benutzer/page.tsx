import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";
import { AdminNavPopover } from "../AdminNavPopover";
import { AdminUsersPanel } from "./AdminUsersPanel";

export default async function AdminBenutzerPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") {
    return (
      <div className="flex min-h-[50dvh] flex-col items-center justify-center bg-slate-50 px-4 py-24 text-center">
        <h1 className="text-xl font-semibold text-slate-900">Kein Zugriff</h1>
        <p className="mt-2 text-slate-600">Nur Admins haben Zugriff auf die Benutzerverwaltung.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200/80 bg-white/95 px-4 pt-[max(0.5rem,env(safe-area-inset-top))] shadow-[0_1px_0_0_rgba(0,0,0,0.04)] backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-nowrap items-center justify-between gap-2 py-2.5">
          <nav
            className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2"
            aria-label="Admin"
          >
            <Link
              href="/admin/dashboard"
              className="inline-flex min-h-11 min-w-0 shrink touch-manipulation items-center gap-2 rounded-xl px-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 active:bg-slate-200/80 sm:min-h-10 sm:rounded-lg sm:px-3"
            >
              <LayoutDashboard className="h-[1.125rem] w-[1.125rem] shrink-0 sm:h-4 sm:w-4" strokeWidth={2} />
              <span className="truncate">Dashboard</span>
            </Link>
            <AdminNavPopover role={user.role} />
          </nav>
          <form action="/auth/signout" method="post" className="shrink-0">
            <button
              type="submit"
              aria-label="Abmelden"
              title="Abmelden"
              className="inline-flex h-11 min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center gap-2 rounded-xl border border-slate-200/90 bg-slate-50/80 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 active:bg-slate-200/80 sm:h-auto sm:min-h-10 sm:min-w-0 sm:rounded-lg sm:border-0 sm:bg-transparent sm:px-3 sm:py-2 sm:hover:bg-slate-100"
            >
              <LogOut className="h-[1.125rem] w-[1.125rem] shrink-0 sm:h-4 sm:w-4" strokeWidth={2} />
              <span className="hidden sm:inline">Abmelden</span>
            </button>
          </form>
        </div>
      </header>
      <div className="px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-8">
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Benutzerverwaltung</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Lege Gewerk-Logins an. Jeder Nutzer meldet sich wie bisher unter{" "}
          <span className="font-medium text-slate-800">/login</span> mit E-Mail und Passwort an.
        </p>
        <div className="mt-8">
          <AdminUsersPanel />
        </div>
      </div>
    </div>
  );
}
