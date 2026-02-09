"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NAV_GEWERKE } from "@/lib/leistungen/config";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const LEISTUNGEN_SLUGS = NAV_GEWERKE.map((g) => ({ slug: g.slug, label: g.name }));
/** Unter Projekte nur Reinigung & Facility (ein Eintrag), keine einzelnen Reinigung/Facility. */
const PROJEKTE_SLUGS = NAV_GEWERKE.map((g) => ({ slug: g.slug, label: g.name }));

type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const pathname = usePathname();

  const isLeistungenActive =
    pathname === "/leistungen" || pathname.startsWith("/leistungen/");
  const isProjekteActive =
    pathname === "/projekte" || pathname.startsWith("/projekte/");

  const linkBase =
    "block py-2.5 text-sm font-medium transition-colors border-l-2 -ml-px pl-4";
  const linkActive = "text-white border-white font-semibold";
  const linkInactive = "text-white/75 border-transparent hover:text-white";

  const closeDrawer = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-[320px] border-white/10 bg-[#26413C] p-0 text-white [&>button]:text-white [&>button]:hover:text-white [&>button]:opacity-90"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Menü</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col py-6" aria-label="Hauptnavigation">
          {/* a) Leistungen */}
          <div className="border-b border-white/10 px-4 pb-4">
            <Link
              href="/leistungen"
              onClick={closeDrawer}
              className={cn(
                "flex items-center justify-between py-3 text-base font-semibold",
                isLeistungenActive ? "text-white" : "text-white/90 hover:text-white"
              )}
            >
              Leistungen
              <ChevronRight className="h-4 w-4 opacity-70" aria-hidden />
            </Link>
            <ul className="space-y-0.5">
              {LEISTUNGEN_SLUGS.map(({ slug, label }) => {
                const href = `/leistungen/${slug}`;
                const isActive = pathname === href || pathname.startsWith(href + "/");
                return (
                  <li key={slug}>
                    <Link
                      href={href}
                      onClick={closeDrawer}
                      className={cn(
                        linkBase,
                        isActive ? linkActive : linkInactive,
                        isActive && "pl-5"
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* b) Projekte */}
          <div className="border-b border-white/10 px-4 py-4">
            <Link
              href="/projekte"
              onClick={closeDrawer}
              className={cn(
                "flex items-center justify-between py-3 text-base font-semibold",
                isProjekteActive ? "text-white" : "text-white/90 hover:text-white"
              )}
            >
              Projekte
              <ChevronRight className="h-4 w-4 opacity-70" aria-hidden />
            </Link>
            <ul className="space-y-0.5">
              {PROJEKTE_SLUGS.map(({ slug, label }) => {
                const href = `/projekte/${slug}`;
                const isActive = pathname === href;
                return (
                  <li key={slug}>
                    <Link
                      href={href}
                      onClick={closeDrawer}
                      className={cn(
                        linkBase,
                        isActive ? linkActive : linkInactive,
                        isActive && "pl-5"
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* c) Über uns, Kontakt */}
          <div className="px-4 py-4">
            <Link
              href="/ueber-uns"
              onClick={closeDrawer}
              className={cn(
                "block py-3 text-base font-semibold",
                pathname === "/ueber-uns" ? "text-white underline" : "text-white/90 hover:text-white"
              )}
            >
              Über uns
            </Link>
            <Link
              href="/kontakt"
              onClick={closeDrawer}
              className={cn(
                "block py-3 text-base font-semibold",
                pathname === "/kontakt" ? "text-white underline" : "text-white/90 hover:text-white"
              )}
            >
              Kontakt
            </Link>
          </div>

          {/* CTA */}
          <div className="mt-auto border-t border-white/10 px-4 pt-4">
            <Button
              asChild
              className="w-full rounded-full bg-[#8AB0AB] text-[#26413C] hover:bg-[#8AB0AB]/90"
            >
              <Link href="/anfrage" onClick={closeDrawer}>
                Projekt anfragen
              </Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
