"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAdminUser } from "../AdminUserContext";
import { MangelMeldungDialog } from "@/components/admin/MangelMeldungDialog";

type Mangelmeldung = {
  id: string;
  titel: string;
  bereich: string;
  status: string;
  prioritaet?: string;
  erstellt_at?: string;
  beschreibung?: string;
  created_at: string;
};

const STATUS_LABELS: Record<string, string> = {
  offen: "Offen",
  in_bearbeitung: "In Bearbeitung",
  behoben: "Behoben",
};

const PRIORITAET_LABELS: Record<string, string> = {
  tief: "Tief",
  mittel: "Mittel",
  hoch: "Hoch",
};

const BEREICH_LABELS: Record<string, string> = {
  gewerk_elektro: "Elektro",
  gewerk_sanitaer: "Sanitär",
  gewerk_ausbau: "Ausbau",
  gewerk_reinigung: "Reinigung",
  gewerk_facility: "Facility",
};

function statusBadgeClass(status: string): string {
  switch (status) {
    case "offen":
      return "bg-red-100 text-red-800";
    case "in_bearbeitung":
      return "bg-yellow-100 text-yellow-800";
    case "behoben":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function prioritaetBadgeClass(p: string): string {
  switch (p) {
    case "hoch":
      return "bg-red-50 text-red-700 border-red-200";
    case "mittel":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "tief":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

export default function MangelmeldungenPage() {
  const adminUser = useAdminUser();
  const isAdmin = adminUser?.role === "admin";
  const [data, setData] = useState<Mangelmeldung[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = isAdmin
        ? "/api/admin/mangelmeldungen"
        : "/api/gewerke/mangelmeldungen";
      const res = await fetch(endpoint);
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || `Fehler ${res.status}`);
      }
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshKey]);

  const handleSuccess = () => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Mangelmeldungen
          </h1>
          {!isAdmin && (
            <p className="text-sm text-slate-500 mt-1">
              Nur Meldungen aus Ihrem Gewerkebereich
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-sm text-slate-600 hover:text-slate-900 hover:underline">
            ← Dashboard
          </Link>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-1.5" />
            Mangel melden
          </Button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-600" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-800">
          Fehler beim Laden: {error}
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg px-6 py-12 text-center">
          <p className="text-slate-600">Keine Mangelmeldungen vorhanden.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setDialogOpen(true)}
          >
            Erste Mangelmeldung erstellen
          </Button>
        </div>
      )}

      {!loading && data.length > 0 && (
        <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Titel
                </th>
                {isAdmin && (
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Bereich
                  </th>
                )}
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Priorität
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Erstellt
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{m.titel}</div>
                    {m.beschreibung && (
                      <div className="text-sm text-slate-500 mt-0.5 line-clamp-1">
                        {m.beschreibung}
                      </div>
                    )}
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                        {BEREICH_LABELS[m.bereich] || m.bereich}
                      </span>
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${prioritaetBadgeClass(
                        m.prioritaet || "mittel"
                      )}`}
                    >
                      {PRIORITAET_LABELS[m.prioritaet ?? ""] || m.prioritaet || "Mittel"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadgeClass(
                        m.status || "offen"
                      )}`}
                    >
                      {STATUS_LABELS[m.status] || m.status || "Offen"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">
                    {m.created_at
                      ? new Date(m.created_at).toLocaleDateString("de-DE", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <MangelMeldungDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
