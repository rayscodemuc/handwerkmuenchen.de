"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Mangelmeldung = {
  id: string;
  titel: string;
  bereich: string;
  status: string;
  prioritaet?: string;
  erstellt_at?: string;
  beschreibung?: string;
};

export default function MangelmeldungenPage() {
  const [data, setData] = useState<Mangelmeldung[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let aborted = false;
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/mangelmeldungen");
        if (!res.ok) {
          throw new Error(`Fehler ${res.status}`);
        }
        const json = await res.json();
        if (!aborted) {
          setData(Array.isArray(json) ? json : []);
          setError(null);
        }
      } catch (e) {
        if (!aborted) {
          setError((e as Error).message ?? "Unbekannter Fehler");
        }
      } finally {
        if (!aborted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      aborted = true;
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl font-semibold">Mangelmeldungen</h1>
        <Link href="/admin/dashboard" className="text-sm text-blue-600 hover:underline">Zurück zum Dashboard</Link>
      </div>

      {loading && <p>Lade...</p>}
      {error && <p className="text-red-600">Fehler beim Laden: {error}</p>}

      {!loading && data.length === 0 && <p className="text-gray-600">Keine Mangelmeldungen gefunden.</p>}

      {data.length > 0 && (
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titel</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bereich</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priorität</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Erstellt</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((m) => (
                <tr key={m.id}>
                  <td className="px-4 py-2">{m.titel || m.beschreibung || "—"}</td>
                  <td className="px-4 py-2">{m.bereich || "—"}</td>
                  <td className="px-4 py-2">{m.status || "—"}</td>
                  <td className="px-4 py-2">{m.prioritaet ?? "—"}</td>
                  <td className="px-4 py-2">{m.erstellt_at ? new Date(m.erstellt_at).toLocaleDateString("de-DE") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
