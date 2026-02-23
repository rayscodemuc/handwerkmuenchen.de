import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import { getSessionUser, ADMIN_NAV_ITEMS, type UserRole } from "@/lib/auth";
import { Logo } from "@/components/Logo";

function filterNavByRole(role: UserRole) {
  return ADMIN_NAV_ITEMS.filter(
    (item) => item.roles.length === 0 || item.roles.includes(role)
  );
}

function getNavIcon(href: string) {
  if (href.includes("benutzer")) return Users;
  return LayoutDashboard;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login?redirect=/admin");

  const navItems = filterNavByRole(user.role);

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-slate-800 bg-slate-900/50">
        <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-4">
          <Logo variant="header" className="h-8" />
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Admin
          </span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const Icon = getNavIcon(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-100"
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-slate-800 p-3">
          <div className="mb-2 rounded-lg px-3 py-2 text-xs text-slate-500">
            <span className="font-medium text-slate-400">
              {user.displayName || user.email || "Nutzer"}
            </span>
            <span className="block text-slate-600">{user.role}</span>
          </div>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
            >
              <LogOut className="h-4 w-4" />
              Abmelden
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
