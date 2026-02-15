"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Ticket = {
  id: string;
  ticket_display_id: string | null;
  kunde_name: string | null;
  partner_name: string | null;
  objekt_adresse: string | null;
  beschreibung: string | null;
  image_urls: string[] | null;
  created_at: string;
  status: string | null;
};

function getDisplayName(t: Ticket | null): string {
  if (!t) return "–";
  const k = (t.kunde_name ?? "").trim();
  const p = (t.partner_name ?? "").trim();
  return k || p || "Unbekannter Kunde";
}

function formatDate(createdAt: string | null): string {
  if (!createdAt) return "–";
  const d = new Date(createdAt);
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AuftragPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    (async () => {
      const { data, error: e } = await supabase
        .from("tickets")
        .select("id, ticket_display_id, kunde_name, partner_name, objekt_adresse, beschreibung, image_urls, created_at, status")
        .eq("id", id)
        .single();
      if (e) {
        setError(e.message);
        setTicket(null);
      } else {
        setTicket(data as Ticket);
      }
      setLoading(false);
    })();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Arbeitsauftrag ${ticket?.ticket_display_id ?? id}`,
          url: window.location.href,
          text: `Arbeitsauftrag: ${getDisplayName(ticket)} – ${ticket?.objekt_adresse ?? ""}`,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") console.error(err);
      }
    } else {
      await navigator.clipboard?.writeText(window.location.href);
      alert("Link in Zwischenablage kopiert. Einfügen und z.B. in WhatsApp senden.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-8 text-black">
        <p>Lade Arbeitsauftrag …</p>
      </div>
    );
  }
  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-white p-8 text-black">
        <p className="text-red-600">{error ?? "Auftrag nicht gefunden."}</p>
        <Link href="/admin/dashboard" className="mt-4 inline-block text-slate-700 underline hover:text-black">
          Zurück zum Dashboard
        </Link>
      </div>
    );
  }

  const displayId =
    (ticket.status ?? "").trim().toLowerCase() === "ticket" && ticket.ticket_display_id
      ? ticket.ticket_display_id
      : "–";

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Nur auf Bildschirm: Aktionsleiste (nicht drucken) */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm print:hidden">
        <Link
          href="/admin/dashboard"
          className="text-sm font-medium text-slate-600 underline hover:text-slate-900"
        >
          ← Dashboard
        </Link>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            Teilen
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Drucken / PDF
          </button>
        </div>
      </div>

      {/* A4-optimiertes Layout für Druck */}
      <div className="mx-auto max-w-[210mm] bg-white px-6 py-8 text-black print:max-w-none print:px-8 print:py-10">
        {/* Logo-Platzhalter */}
        <div className="mb-8 flex justify-between border-b border-slate-300 pb-4">
          <div className="h-14 w-48 rounded border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-sm text-slate-500 print:h-16 print:w-52">
            Firmenlogo
          </div>
          <div className="text-right text-sm text-slate-600">
            <div className="font-semibold text-slate-900">Arbeitsauftrag</div>
            <div>Datum Export: {new Date().toLocaleDateString("de-DE")}</div>
          </div>
        </div>

        {/* Ticket-ID & Datum */}
        <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold text-slate-700">Ticket-Nr.:</span>{" "}
            <span className="text-black">{displayId}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-700">Eingang:</span>{" "}
            <span className="text-black">{formatDate(ticket.created_at)}</span>
          </div>
        </div>

        {/* Kunde & Adresse */}
        <div className="mb-6 border border-slate-200 bg-slate-50/50 p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Kunde / Anschrift
          </div>
          <div className="font-medium text-black">{getDisplayName(ticket)}</div>
          <div className="text-slate-800">{ticket.objekt_adresse ?? "–"}</div>
        </div>

        {/* Ursprüngliche Anfrage */}
        <div className="mb-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Ursprüngliche Anfrage
          </div>
          <div className="whitespace-pre-wrap rounded border border-slate-200 bg-white p-4 text-black">
            {ticket.beschreibung?.trim() || "–"}
          </div>
        </div>

        {/* Hochgeladene Bilder */}
        {ticket.image_urls != null && ticket.image_urls.length > 0 && (
          <div className="mb-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Bilder / Dokumentation
            </div>
            <div className="grid grid-cols-2 gap-3 print:grid-cols-2">
              {ticket.image_urls.map((url, idx) => (
                <div key={`${url}-${idx}`} className="overflow-hidden rounded border border-slate-200">
                  <img
                    src={url}
                    alt={`Anhang ${idx + 1}`}
                    className="h-40 w-full object-cover print:h-44"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monteur-Notizen (leeres Feld) */}
        <div className="mt-8">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Monteur-Notizen (vor Ort)
          </div>
          <div className="min-h-[120px] rounded border-2 border-slate-300 bg-white p-3 print:min-h-[140px]">
            <span className="text-slate-400">Hier Notizen beim Termin festhalten …</span>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-4 text-center text-xs text-slate-500">
          Dieses Dokument wurde aus dem Admin-Dashboard erstellt. Bei Fragen zum Auftrag bitte im System nachsehen.
        </div>
      </div>
    </div>
  );
}
