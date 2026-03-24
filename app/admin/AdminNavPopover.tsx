"use client";

import Link from "next/link";
import { LayoutDashboard, Users, Settings } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ADMIN_NAV_ITEMS, type UserRole } from "@/lib/auth-types";

function filterNavByRole(role: UserRole) {
  return ADMIN_NAV_ITEMS.filter(
    (item) => item.roles.length === 0 || item.roles.includes(role)
  );
}

export function AdminNavPopover({ role }: { role: UserRole }) {
  if (role !== "admin") return null;

  const navItems = filterNavByRole(role);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Einstellungen und Navigation"
          title="Einstellungen"
          className="inline-flex h-11 min-h-[44px] min-w-[44px] shrink-0 touch-manipulation items-center justify-center gap-2 rounded-xl border border-slate-200/90 bg-slate-50/80 px-0 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 active:bg-slate-200/80 sm:h-auto sm:min-h-10 sm:min-w-0 sm:rounded-lg sm:border-0 sm:bg-transparent sm:px-3 sm:py-2 sm:hover:bg-slate-100"
        >
          <Settings className="h-[1.125rem] w-[1.125rem] shrink-0 sm:h-4 sm:w-4" strokeWidth={2} />
          <span className="hidden sm:inline">Einstellungen</span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" side="right" className="w-52 border-slate-200 bg-white p-2 shadow-md">
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const Icon = item.href.includes("benutzer") ? Users : LayoutDashboard;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
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
