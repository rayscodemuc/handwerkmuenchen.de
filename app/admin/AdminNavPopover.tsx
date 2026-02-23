"use client";

import Link from "next/link";
import { LayoutDashboard, Users, Settings } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { UserRole } from "@/lib/auth";

const ADMIN_NAV_ITEMS: { label: string; href: string; roles: UserRole[] }[] = [
  { label: "Dashboard", href: "/admin/dashboard", roles: [] },
  { label: "Benutzerverwaltung", href: "/admin/benutzer", roles: ["admin"] },
];

function filterNavByRole(role: UserRole) {
  return ADMIN_NAV_ITEMS.filter(
    (item) => item.roles.length === 0 || item.roles.includes(role)
  );
}

export function AdminNavPopover({ role }: { role: UserRole }) {
  const navItems = filterNavByRole(role);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-100"
        >
          <Settings className="h-4 w-4 shrink-0" />
          Einstellungen
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" side="right" className="w-52 border-slate-700 bg-slate-900 p-2">
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const Icon = item.href.includes("benutzer") ? Users : LayoutDashboard;
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
      </PopoverContent>
    </Popover>
  );
}
