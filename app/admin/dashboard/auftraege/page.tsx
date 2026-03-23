"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/Logo";
import {
  Paperclip,
  LayoutDashboard,
  ArrowLeft,
  RefreshCw,
  ChevronRight,
  FileText,
} from "lucide-react";
import { AuftragHandwerkerDetailDialog } from "@/components/admin/AuftragHandwerkerDetailDialog";
import type { HandwerkerAuftrag } from "@/src/types/handwerker-auftrag";

const supabase = createClient();

export default function AuftraegePage() {
  const [auftraege, setAuftraege] = useState<HandwerkerAuftrag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailAuftrag, setDetailAuftrag] = useState<HandwerkerAuftrag | null>(null);

  const loadAuftraege = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auftraege");
      const json = await res.json();
      if (!res.ok) {
        const msg =
          json.code === "PGRST116"
            ? "Tabelle 'auftraege' nicht gefunden."
            : json.error ?? "Fehler beim Laden.";
        setError(`${msg}${json.code ? ` (${json.code})` : ""}`);
        setAuftraege([]);
        return;
      }
      setAuftraege((Array.isArray(json) ? json : []) as HandwerkerAuftrag[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Netzwerkfehler");
      setAuftraege([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAuftraege();
  }, [loadAuftraege]);

  useEffect(() => {
    const client = createClient();
    const channel = client
      .channel("auftraege-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "auftraege" },
        () => void loadAuftraege()
      )
      .subscribe();
    return () => {
      void client.removeChannel(channel);
    };
  }, [loadAuftraege]);

  const handleAuftragPatch = useCallback((auftragId: string, patch: Partial<HandwerkerAuftrag>) => {
    setAuftraege((prev) =>
      prev.map((a) => (a.id === auftragId ? { ...a, ...patch } : a))
    );
    setDetailAuftrag((prev) =>
      prev?.id === auftragId ? { ...prev, ...patch } : prev
    );
  }, []);

  return (
    <div className="min-h-[100dvh] bg-slate-50 pb-[max(1rem,env(safe-area-inset-bottom,1rem))]">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-md  sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Link
            href="/admin/dashboard"
            className="flex shrink-0 items-center justify-center rounded-full p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 active:bg-slate-200"
            aria-label="Zurück"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <Logo className="h-7 w-7 shrink-0 text-slate-800" />
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-slate-900 sm:text-lg">
              Aufträge
            </h1>
            <p className="truncate text-xs text-slate-500">
              {auftraege.length} {auftraege.length === 1 ? "Eintrag" : "Einträge"}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => void loadAuftraege()}
            disabled={loading}
            className="flex h-11 w-11 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 active:bg-slate-200 disabled:opacity-50"
            aria-label="Aktualisieren"
          >
            <RefreshCw
              className={`h-5 w-5 ${loading ? "animate-spin" : ""}`}
            />
          </button>
          <Link
            href="/admin/dashboard"
            className="flex h-11 w-11 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 active:bg-slate-200"
            aria-label="Dashboard"
          >
            <LayoutDashboard className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <main className="px-4 py-4 sm:px-6 sm:py-6">
        {error && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-600" />
            <p className="text-sm text-slate-500">Lade Aufträge…</p>
          </div>
        ) : auftraege.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <div className="mb-4 rounded-full bg-slate-100 p-4">
              <FileText className="h-8 w-8 text-slate-400" />
            </div>
            <p className="font-medium text-slate-700">Keine Aufträge</p>
            <p className="mt-1 text-sm text-slate-500">
              Neue Einträge aus n8n erscheinen hier automatisch.
            </p>
          </div>
        ) : (
          <ul className="space-y-3 sm:space-y-4">
            {auftraege.map((auftrag) => (
              <li key={auftrag.id}>
                <article
                  role="button"
                  tabIndex={0}
                  onClick={() => setDetailAuftrag(auftrag)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setDetailAuftrag(auftrag)
                  }
                  className="group flex min-h-[88px] cursor-pointer items-stretch gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:border-slate-300 hover:shadow-md active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {auftrag.auftragsnummer ?? "–"}
                        </span>
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                          SPM
                        </span>
                      </div>
                      {auftrag.status && (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                          {auftrag.status}
                        </span>
                      )}
                    </div>
                    <h2 className="line-clamp-2 font-medium leading-snug text-slate-900">
                      {(auftrag.adresse_strasse ?? "").trim() || "–"}
                      {(auftrag.adresse_ort ?? "").trim() &&
                        `, ${auftrag.adresse_ort}`}
                    </h2>
                    <p className="line-clamp-2 text-sm text-slate-500">
                      {(auftrag.aufgabe ?? "").trim() || "–"}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end justify-between gap-2">
                    {auftrag.anhang_url && (
                      <a
                        href={auftrag.anhang_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
                        aria-label="PDF öffnen"
                      >
                        <Paperclip className="h-4 w-4" />
                      </a>
                    )}
                    <ChevronRight className="h-5 w-5 text-slate-300 transition-colors group-hover:text-slate-500" />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </main>

      <AuftragHandwerkerDetailDialog
        open={!!detailAuftrag}
        auftrag={detailAuftrag}
        onOpenChange={(open) => !open && setDetailAuftrag(null)}
        onAuftragPatch={handleAuftragPatch}
      />
    </div>
  );
}
