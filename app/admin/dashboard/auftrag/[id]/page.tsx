"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Logo } from "@/components/Logo";

type Kommentar = { id: string; text: string; author: string; timestamp: string };

type Ticket = {
  id: string;
  ticket_display_id: string | null;
  is_partner: boolean | null;
  kunde_name: string | null;
  partner_name: string | null;
  kontakt_email: string | null;
  kontakt_telefon: string | null;
  objekt_adresse: string | null;
  beschreibung: string | null;
  gewerk: string[] | null;
  status: string | null;
  interne_notizen: string | null;
  kommentare: Kommentar[] | null;
  termin_start: string | null;
  termin_ende: string | null;
  termin_typ: string | null;
  image_urls: string[] | null;
  created_at: string;
};

function getDisplayName(t: Ticket | null): string {
  if (!t) return "–";
  const k = (t.kunde_name ?? "").trim();
  const p = (t.partner_name ?? "").trim();
  return k || p || "Unbekannter Kunde";
}

function formatDate(iso: string | null): string {
  if (!iso) return "–";
  const d = new Date(iso);
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateShort(iso: string | null): string {
  if (!iso) return "–";
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function normalizeGewerke(gewerk: string[] | null): string[] {
  if (!gewerk || !Array.isArray(gewerk)) return [];
  return gewerk.filter((g) => g != null && String(g).trim() !== "");
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
        .select("id, ticket_display_id, is_partner, kunde_name, partner_name, kontakt_email, kontakt_telefon, objekt_adresse, beschreibung, gewerk, status, interne_notizen, kommentare, termin_start, termin_ende, termin_typ, image_urls, created_at")
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
      <div className="min-h-screen bg-slate-50 p-8 text-slate-900 print:bg-white">
        <p>Lade Arbeitsauftrag …</p>
      </div>
    );
  }
  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 text-slate-900 print:bg-white">
        <p className="text-red-600">{error ?? "Auftrag nicht gefunden."}</p>
        <Link href="/admin/dashboard" className="mt-4 inline-block text-slate-700 underline hover:text-slate-900">
          Zurück zum Dashboard
        </Link>
      </div>
    );
  }

  const ticketNummer = (ticket.ticket_display_id ?? "").trim() || "–";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 print:bg-white print:text-black">
      {/* Nur auf Bildschirm: Aktionsleiste (nicht drucken) */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 py-3 shadow-[0_1px_0_0_rgba(0,0,0,0.04)] print:hidden">
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
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition-all hover:opacity-90 hover:border-slate-300"
          >
            Teilen
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90"
          >
            Drucken / PDF
          </button>
        </div>
      </div>

      {/* DIN A4 – 210mm × 297mm */}
      <div className="mx-auto w-[210mm] min-h-[297mm] max-w-[210mm] px-6 py-8 print:w-full print:min-h-0 print:max-w-none print:px-0 print:py-0">
        <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] print:rounded-none print:border print:shadow-none print:p-8 print:w-[210mm] print:min-h-[297mm]">
        {/* Logo + Arbeitsauftrag-Header */}
        <div className="mb-8 flex justify-between border-b border-slate-200 pb-4">
          <div className="flex h-14 items-center print:h-16">
            <Logo variant="footer" className="h-10 print:h-12" />
          </div>
          <div className="text-right text-sm text-slate-600">
            <div className="font-medium text-slate-900">Arbeitsauftrag</div>
            <div>Ticket-Nr.: {ticketNummer}</div>
          </div>
        </div>

        {/* Kunde & Kontakt */}
        <div className="mb-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 shadow-sm print:rounded print:shadow-none">
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            Kunde / Anschrift
          </div>
          <div className="font-medium text-slate-900">{getDisplayName(ticket)}</div>
          <div className="text-slate-700">{ticket.objekt_adresse ?? "–"}</div>
          {(ticket.kontakt_email?.trim() || ticket.kontakt_telefon?.trim()) && (
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
              {ticket.kontakt_email?.trim() && (
                <a href={`mailto:${ticket.kontakt_email.trim()}`} className="text-blue-600 hover:underline">
                  {ticket.kontakt_email.trim()}
                </a>
              )}
              {ticket.kontakt_telefon?.trim() && (
                <a href={`tel:${ticket.kontakt_telefon.trim()}`} className="text-blue-600 hover:underline">
                  {ticket.kontakt_telefon.trim()}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Ursprüngliche Anfrage */}
        <div className="mb-6">
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            Ursprüngliche Anfrage
          </div>
          <div className="whitespace-pre-wrap rounded-2xl border border-slate-200/80 bg-white p-4 text-slate-900 shadow-sm print:rounded print:shadow-none">
            {ticket.beschreibung?.trim() || "–"}
          </div>
        </div>

        {/* Interne Notizen */}
        {ticket.interne_notizen?.trim() && (
          <div className="mb-6">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
              Interne Notizen
            </div>
            <div className="whitespace-pre-wrap rounded-2xl border border-slate-200/80 bg-amber-50/50 p-4 text-slate-900 shadow-sm print:rounded print:shadow-none">
              {ticket.interne_notizen.trim()}
            </div>
          </div>
        )}

        {/* Kommentare */}
        {Array.isArray(ticket.kommentare) && ticket.kommentare.length > 0 && (
          <div className="mb-6">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
              Kommentare
            </div>
            <div className="space-y-2">
              {ticket.kommentare.map((k) => (
                <div
                  key={k.id}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3 text-sm print:rounded"
                >
                  <div className="mb-1 text-xs text-slate-500">
                    {k.author} · {formatDateShort(k.timestamp)}
                  </div>
                  <div className="whitespace-pre-wrap text-slate-900">{k.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hochgeladene Bilder */}
        {ticket.image_urls != null && ticket.image_urls.length > 0 && (
          <div className="mb-6">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
              Bilder / Dokumentation
            </div>
            <div className="grid grid-cols-2 gap-3 print:grid-cols-2">
              {ticket.image_urls.map((url, idx) => (
                <div key={`${url}-${idx}`} className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm print:rounded">
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

        {/* Monteur-Notizen (erweiterter Bereich) */}
        <div className="mt-8 flex-1">
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            Monteur-Notizen (vor Ort)
          </div>
          <div className="min-h-[280px] rounded-2xl border border-slate-200 bg-white p-4 print:min-h-[150mm] print:rounded print:p-4">
            <span className="text-slate-400">Hier Notizen beim Termin festhalten …</span>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-4 text-center text-xs text-slate-500">
          Dieses Dokument wurde aus dem Admin-Dashboard erstellt. Bei Fragen zum Auftrag bitte im System nachsehen.
        </div>
        </div>
      </div>
    </div>
  );
}
