"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Paperclip,
  MapPin,
  FileText,
  Phone,
  Mail,
  ImagePlus,
  X,
  Upload,
  Navigation,
  MessageCircle,
  CalendarDays,
  User,
  Building2,
  Share2,
  ChevronDown,
  Send,
  Trash2,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import {
  resolveLeistungsempfaenger,
  resolveRechnungsempfaenger,
} from "@/lib/auftraege/billing-recipient-fields";
import {
  attachmentFileExt,
  buildMapsSearchUrl,
  compressImageForUpload,
  formatAuftragDatum,
  isProbablyImageAttachmentUrl,
  waMeHref,
} from "@/lib/auftraege/handwerker-detail-utils";
import type { HandwerkerAuftrag } from "@/src/types/handwerker-auftrag";
import { GEWERKE_OPTIONS } from "@/src/config/gewerkeOptions";

const BUCKET_IMAGES = "ticket-images";
const supabase = createClient();

type HandwerkerKommentar = {
  id: string;
  text: string;
  author: string;
  timestamp: string;
};
const LEGACY_COMMENT_PREFIX = "__KOMMENTARE_JSON__:";

function normalizeGewerkList(v: string[] | null | undefined): string[] {
  if (!v || !Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === "string" && x.trim() !== "");
}

function normalizeKommentare(value: unknown): HandwerkerKommentar[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((raw) => {
      if (!raw || typeof raw !== "object") return null;
      const row = raw as Record<string, unknown>;
      const id = typeof row.id === "string" && row.id.trim() ? row.id.trim() : crypto.randomUUID();
      const text = typeof row.text === "string" ? row.text.trim() : "";
      if (!text) return null;
      const author =
        typeof row.author === "string" && row.author.trim() ? row.author.trim() : "Admin";
      const timestamp =
        typeof row.timestamp === "string" && row.timestamp.trim()
          ? row.timestamp.trim()
          : new Date().toISOString();
      return { id, text, author, timestamp };
    })
    .filter((x): x is HandwerkerKommentar => x != null)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

function parseLegacyKommentareFromNotizen(notizen: string | null | undefined): HandwerkerKommentar[] {
  const raw = (notizen ?? "").trim();
  if (!raw.startsWith(LEGACY_COMMENT_PREFIX)) return [];
  const payload = raw.slice(LEGACY_COMMENT_PREFIX.length).trim();
  if (!payload) return [];
  try {
    const parsed = JSON.parse(payload);
    return normalizeKommentare(parsed);
  } catch {
    return [];
  }
}

function serializeKommentareToNotizen(kommentare: HandwerkerKommentar[]): string {
  return `${LEGACY_COMMENT_PREFIX}${JSON.stringify(kommentare)}`;
}

function isMissingKommentarColumnError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const msg = String((err as { message?: unknown }).message ?? "").toLowerCase();
  return (
    msg.includes("handwerker_kommentare") &&
    (msg.includes("schema cache") || msg.includes("column"))
  );
}

export type AuftragHandwerkerDetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  auftrag: HandwerkerAuftrag | null;
  onAuftragPatch?: (auftragId: string, patch: Partial<HandwerkerAuftrag>) => void;
  showBilling?: boolean;
  /** Bekanntes Board-Ticket (z. B. Klick im Kanban) – sonst wird per `auftrag_id` gesucht. */
  boardTicketId?: string | null;
  boardTicketGewerk?: string[] | null;
  onBoardGewerkSaved?: (ticketId: string, gewerk: string[] | null) => void;
};

export function AuftragHandwerkerDetailDialog({
  open,
  onOpenChange,
  auftrag,
  onAuftragPatch,
  showBilling = true,
  boardTicketId: boardTicketIdProp,
  boardTicketGewerk,
  onBoardGewerkSaved,
}: AuftragHandwerkerDetailDialogProps) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deletingImageUrl, setDeletingImageUrl] = useState<string | null>(null);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [detailKommentare, setDetailKommentare] = useState<HandwerkerKommentar[]>([]);
  const [newKommentarText, setNewKommentarText] = useState("");
  const [kommentarSaving, setKommentarSaving] = useState(false);
  const [dialogError, setDialogError] = useState<string | null>(null);

  const [fetchedBoardTicketId, setFetchedBoardTicketId] = useState<string | null>(null);
  const [fetchedBoardGewerk, setFetchedBoardGewerk] = useState<string[] | null>(null);
  const [boardTicketLookupDone, setBoardTicketLookupDone] = useState(false);
  const [boardGewerke, setBoardGewerke] = useState<string[]>([]);
  const [boardGewerkSaving, setBoardGewerkSaving] = useState(false);
  const boardGewerkSyncKey = useRef<string>("");

  const effectiveBoardTicketId =
    boardTicketIdProp != null && boardTicketIdProp !== ""
      ? boardTicketIdProp
      : fetchedBoardTicketId;

  useEffect(() => {
    const comments = normalizeKommentare((auftrag as Record<string, unknown> | null)?.handwerker_kommentare);
    const commentsFromLegacy = parseLegacyKommentareFromNotizen(auftrag?.handwerker_notizen);
    const legacyText = (auftrag?.handwerker_notizen ?? "").trim();
    const isSerializedLegacy = legacyText.startsWith(LEGACY_COMMENT_PREFIX);
    if (comments.length > 0) {
      setDetailKommentare(comments);
      return;
    }
    if (commentsFromLegacy.length > 0) {
      setDetailKommentare(commentsFromLegacy);
      return;
    }
    if (legacyText && !isSerializedLegacy) {
      setDetailKommentare([
        {
          id: `legacy-${auftrag?.id ?? "auftrag"}`,
          text: legacyText,
          author: "Admin",
          timestamp: auftrag?.created_at ?? new Date().toISOString(),
        },
      ]);
      return;
    }
    setDetailKommentare([]);
  }, [auftrag?.id, auftrag?.handwerker_notizen, (auftrag as Record<string, unknown> | null)?.handwerker_kommentare, auftrag?.created_at]);

  useEffect(() => {
    if (!open || !auftrag?.id) {
      setFetchedBoardTicketId(null);
      setFetchedBoardGewerk(null);
      setBoardTicketLookupDone(false);
      boardGewerkSyncKey.current = "";
      return;
    }
    if (boardTicketIdProp != null && boardTicketIdProp !== "") {
      setFetchedBoardTicketId(null);
      setFetchedBoardGewerk(null);
      setBoardTicketLookupDone(true);
      return;
    }
    setBoardTicketLookupDone(false);
    let cancelled = false;
    void (async () => {
      const { data, error } = await supabase
        .from("tickets")
        .select("id, gewerk")
        .eq("additional_data->>auftrag_id", auftrag.id)
        .maybeSingle();
      if (cancelled) return;
      if (error || !data?.id) {
        setFetchedBoardTicketId(null);
        setFetchedBoardGewerk(null);
      } else {
        setFetchedBoardTicketId(data.id);
        setFetchedBoardGewerk(Array.isArray(data.gewerk) ? data.gewerk : null);
      }
      setBoardTicketLookupDone(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [open, auftrag?.id, boardTicketIdProp]);

  useEffect(() => {
    if (!open) {
      boardGewerkSyncKey.current = "";
      return;
    }
    if (!effectiveBoardTicketId) {
      setBoardGewerke([]);
      boardGewerkSyncKey.current = "";
      return;
    }
    if (!boardTicketLookupDone) return;
    const fromProp =
      boardTicketIdProp != null && boardTicketIdProp !== ""
        ? boardTicketGewerk
        : fetchedBoardGewerk;
    const key = `${effectiveBoardTicketId}:${JSON.stringify(fromProp ?? null)}`;
    if (boardGewerkSyncKey.current === key) return;
    boardGewerkSyncKey.current = key;
    setBoardGewerke(normalizeGewerkList(fromProp));
  }, [
    open,
    effectiveBoardTicketId,
    boardTicketLookupDone,
    boardTicketIdProp,
    boardTicketGewerk,
    fetchedBoardGewerk,
  ]);

  const saveBoardGewerk = useCallback(async () => {
    if (!effectiveBoardTicketId) return;
    setBoardGewerkSaving(true);
    setDialogError(null);
    const value = boardGewerke.length > 0 ? boardGewerke : null;
    const { error } = await supabase
      .from("tickets")
      .update({ gewerk: value })
      .eq("id", effectiveBoardTicketId);
    if (error) {
      setDialogError(error.message);
    } else {
      boardGewerkSyncKey.current = `${effectiveBoardTicketId}:${JSON.stringify(value)}`;
      onBoardGewerkSaved?.(effectiveBoardTicketId, value);
    }
    setBoardGewerkSaving(false);
  }, [effectiveBoardTicketId, boardGewerke, onBoardGewerkSaved]);

  const uploadAuftragImage = useCallback(
    async (
      auftragId: string,
      file: File,
      currentUrls: string[] = []
    ): Promise<string | null> => {
      setUploadingImage(true);
      setDialogError(null);
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError || !authData?.user) {
          setDialogError("Nicht eingeloggt");
          setUploadingImage(false);
          return null;
        }
      } catch {
        setDialogError("Nicht eingeloggt");
        setUploadingImage(false);
        return null;
      }
      const isImage = file.type.startsWith("image/");
      const blob = isImage ? await compressImageForUpload(file) : (file as Blob);
      if (!blob || !(blob instanceof Blob)) {
        setDialogError("Ungültige Datei");
        setUploadingImage(false);
        return null;
      }
      const path = `auftraege/${auftragId}_${Date.now()}.jpg`.replace(/^\/+/, "");
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_IMAGES)
        .upload(path, blob, {
          cacheControl: "3600",
          upsert: false,
          contentType: isImage ? "image/jpeg" : file.type || "application/octet-stream",
        });
      if (uploadError) {
        setDialogError(uploadError.message);
        setUploadingImage(false);
        return null;
      }
      const { data: urlData } = supabase.storage.from(BUCKET_IMAGES).getPublicUrl(path);
      const publicUrl = urlData.publicUrl;
      const newUrls = [...currentUrls, publicUrl];
      const { error: updateError } = await supabase
        .from("auftraege")
        .update({ image_urls: newUrls })
        .eq("id", auftragId);
      if (updateError) {
        setDialogError(updateError.message);
        setUploadingImage(false);
        return null;
      }
      onAuftragPatch?.(auftragId, { image_urls: newUrls });
      setUploadingImage(false);
      return publicUrl;
    },
    [onAuftragPatch]
  );

  const uploadAuftragDoc = useCallback(
    async (
      auftragId: string,
      file: File,
      currentUrls: string[] = []
    ): Promise<string | null> => {
      setUploadingDoc(true);
      setDialogError(null);
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError || !authData?.user) {
          setDialogError("Nicht eingeloggt");
          setUploadingDoc(false);
          return null;
        }
      } catch {
        setDialogError("Nicht eingeloggt");
        setUploadingDoc(false);
        return null;
      }
      if (!file || !(file instanceof Blob)) {
        setDialogError("Ungültige Datei");
        setUploadingDoc(false);
        return null;
      }
      const isImage = file.type.startsWith("image/");
      const body: Blob = isImage ? await compressImageForUpload(file) : file;
      const ext = isImage ? "jpg" : attachmentFileExt(file);
      const contentType = isImage ? "image/jpeg" : file.type || "application/octet-stream";
      const path = `auftraege/docs/${auftragId}_${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_IMAGES)
        .upload(path, body, {
          cacheControl: "3600",
          upsert: false,
          contentType,
        });
      if (uploadError) {
        setDialogError(uploadError.message);
        setUploadingDoc(false);
        return null;
      }
      const { data: urlData } = supabase.storage.from(BUCKET_IMAGES).getPublicUrl(path);
      const publicUrl = urlData.publicUrl;
      const newUrls = [...currentUrls, publicUrl];
      const { error: updateError } = await supabase
        .from("auftraege")
        .update({ angebot_rechnung_urls: newUrls })
        .eq("id", auftragId);
      if (updateError) {
        setDialogError(updateError.message);
        setUploadingDoc(false);
        return null;
      }
      onAuftragPatch?.(auftragId, { angebot_rechnung_urls: newUrls });
      setUploadingDoc(false);
      return publicUrl;
    },
    [onAuftragPatch]
  );

  const deleteAuftragImage = useCallback(
    async (auftragId: string, targetUrl: string, currentUrls: string[] = []) => {
      setDeletingImageUrl(targetUrl);
      setDialogError(null);
      const nextUrls = currentUrls.filter((u) => u !== targetUrl);

      // Best-effort: remove underlying storage object when URL matches public bucket path.
      try {
        const parsed = new URL(targetUrl);
        const marker = `/storage/v1/object/public/${BUCKET_IMAGES}/`;
        const idx = parsed.pathname.indexOf(marker);
        if (idx >= 0) {
          const objectPath = decodeURIComponent(parsed.pathname.slice(idx + marker.length));
          if (objectPath) {
            await supabase.storage.from(BUCKET_IMAGES).remove([objectPath]);
          }
        }
      } catch {
        // Ignore invalid URL format; DB list update is the source of truth.
      }

      const { error: updateError } = await supabase
        .from("auftraege")
        .update({ image_urls: nextUrls })
        .eq("id", auftragId);

      if (updateError) {
        setDialogError(updateError.message);
      } else {
        onAuftragPatch?.(auftragId, { image_urls: nextUrls });
      }
      setDeletingImageUrl(null);
    },
    [onAuftragPatch]
  );

  const saveKommentare = useCallback(async (nextKommentare: HandwerkerKommentar[]) => {
    if (!auftrag?.id) return;
    setKommentarSaving(true);
    setDialogError(null);
    const { error: updateError } = await supabase
      .from("auftraege")
      .update({ handwerker_kommentare: nextKommentare, handwerker_notizen: null })
      .eq("id", auftrag.id);
    if (updateError && isMissingKommentarColumnError(updateError)) {
      const legacyPayload = serializeKommentareToNotizen(nextKommentare);
      const { error: legacyError } = await supabase
        .from("auftraege")
        .update({ handwerker_notizen: legacyPayload })
        .eq("id", auftrag.id);
      if (legacyError) {
        setDialogError(legacyError.message);
      } else {
        setDetailKommentare(nextKommentare);
        onAuftragPatch?.(auftrag.id, {
          handwerker_notizen: legacyPayload,
        });
      }
      setKommentarSaving(false);
      return;
    }
    if (updateError) {
      setDialogError(updateError.message);
    } else {
      setDetailKommentare(nextKommentare);
      onAuftragPatch?.(auftrag.id, {
        handwerker_kommentare: nextKommentare,
        handwerker_notizen: null,
      });
    }
    setKommentarSaving(false);
  }, [auftrag?.id, onAuftragPatch]);

  const addKommentar = useCallback(async () => {
    const text = newKommentarText.trim();
    if (!text) return;
    const { data } = await supabase.auth.getUser();
    const author =
      data?.user?.user_metadata?.full_name ??
      data?.user?.email ??
      "Admin";
    const next = [
      {
        id: crypto.randomUUID(),
        text,
        author: typeof author === "string" && author.trim() ? author.trim() : "Admin",
        timestamp: new Date().toISOString(),
      },
      ...detailKommentare,
    ];
    await saveKommentare(next);
    setNewKommentarText("");
  }, [newKommentarText, detailKommentare, saveKommentare]);

  const deleteKommentar = useCallback(async (kommentarId: string) => {
    const next = detailKommentare.filter((k) => k.id !== kommentarId);
    await saveKommentare(next);
  }, [detailKommentare, saveKommentare]);

  const handleDetailShare = useCallback(async () => {
    if (!auftrag) return;
    const addr = [auftrag.adresse_strasse, auftrag.adresse_ort]
      .map((s) => (s ?? "").trim())
      .filter(Boolean)
      .join(", ");
    const nr = auftrag.auftragsnummer ?? "–";
    const title = `Auftrag ${nr}`;
    const task = (auftrag.aufgabe ?? "").trim().slice(0, 280);
    const text = [addr, task].filter(Boolean).join("\n\n");
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text });
      } catch (err) {
        if ((err as Error).name !== "AbortError") console.error(err);
      }
    } else {
      await navigator.clipboard?.writeText(`${title}\n${text}`);
      alert("Auftrag in Zwischenablage kopiert.");
    }
  }, [auftrag]);

  const mergedAuftrag = auftrag;

  return (
    <>
      <Dialog
        open={open && !!mergedAuftrag}
        onOpenChange={(o) => {
          if (!o) setLightboxImage(null);
          onOpenChange(o);
        }}
      >
        <DialogContent className="flex h-[100dvh] max-h-[100dvh] w-full min-w-0 max-w-none flex-col gap-0 overflow-hidden border-0 p-0 sm:h-[min(92dvh,880px)] sm:max-h-[92dvh] sm:max-w-2xl sm:rounded-2xl sm:border sm:border-slate-200 sm:p-0">
          {mergedAuftrag &&
            (() => {
              const detailAuftrag = mergedAuftrag;
              const strasse = (detailAuftrag.adresse_strasse ?? "").trim();
              const ort = (detailAuftrag.adresse_ort ?? "").trim();
              const hasAddress = Boolean(strasse || ort);
              const mapsUrl = buildMapsSearchUrl(detailAuftrag.adresse_strasse, detailAuftrag.adresse_ort);
              const tel = (detailAuftrag.mieter_telefon ?? "").trim();
              const email = (detailAuftrag.mieter_email ?? "").trim();
              const wa = waMeHref(detailAuftrag.mieter_telefon);
              const datumLabel = formatAuftragDatum(detailAuftrag.datum);
              const rechnungsempfaengerText = resolveRechnungsempfaenger(detailAuftrag);
              const leistungsempfaengerText = resolveLeistungsempfaenger(detailAuftrag);
              return (
                <>
                  {dialogError && (
                    <div className="shrink-0 border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">
                      {dialogError}
                    </div>
                  )}
                  <div className="sticky top-0 z-10 shrink-0 border-b border-slate-200 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.04)] sm:rounded-t-2xl">
                    <div className="flex items-start justify-between gap-2 px-4 pb-2 pt-3 sm:px-5 sm:pt-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                            {detailAuftrag.auftragsnummer ?? "–"}
                          </h2>
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-900">
                            SPM
                          </span>
                          {detailAuftrag.status?.trim() && (
                            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                              {detailAuftrag.status.trim()}
                            </span>
                          )}
                        </div>
                        {datumLabel && (
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                            {datumLabel}
                            {detailAuftrag.auftragstyp?.trim() && (
                              <>
                                <span className="text-slate-300">·</span>
                                <span className="truncate">{detailAuftrag.auftragstyp.trim()}</span>
                              </>
                            )}
                          </p>
                        )}
                        {!datumLabel && detailAuftrag.auftragstyp?.trim() && (
                          <p className="mt-1 truncate text-xs text-slate-500">
                            {detailAuftrag.auftragstyp.trim()}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => void handleDetailShare()}
                          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
                          aria-label="Teilen"
                        >
                          <Share2 className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenChange(false)}
                          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                          aria-label="Schließen"
                        >
                          <X className="h-5 w-5" strokeWidth={2} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 px-4 pb-2.5 sm:grid-cols-3 sm:px-5 sm:pb-3">
                      {hasAddress ? (
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 active:scale-[0.98]"
                        >
                          <Navigation className="h-4 w-4 shrink-0" />
                          Navigation
                        </a>
                      ) : (
                        <span className="flex min-h-[44px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 text-center text-xs text-slate-400">
                          Keine Adresse
                        </span>
                      )}
                      {tel ? (
                        <a
                          href={`tel:${tel}`}
                          className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 active:scale-[0.98]"
                        >
                          <Phone className="h-4 w-4 shrink-0 text-emerald-600" />
                          Anrufen
                        </a>
                      ) : (
                        <span className="flex min-h-[44px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 text-center text-xs text-slate-400">
                          Kein Telefon
                        </span>
                      )}
                      {wa ? (
                        <a
                          href={wa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 active:scale-[0.98] sm:col-span-1"
                        >
                          <MessageCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                          WhatsApp
                        </a>
                      ) : null}
                      {detailAuftrag.anhang_url ? (
                        <a
                          href={detailAuftrag.anhang_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50/80 px-3 py-2 text-sm font-semibold text-blue-900 shadow-sm transition-colors hover:bg-blue-50 active:scale-[0.98] ${wa ? "" : "col-span-2 sm:col-span-1"}`}
                        >
                          <FileText className="h-4 w-4 shrink-0" />
                          Auftrag-PDF
                        </a>
                      ) : null}
                      {email ? (
                        <a
                          href={`mailto:${email}`}
                          className="col-span-2 flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 sm:col-span-1"
                        >
                          <Mail className="h-4 w-4 shrink-0 text-slate-600" />
                          E-Mail
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 overflow-y-auto overscroll-contain bg-slate-50 px-3 py-3 sm:px-4 sm:py-4">
                    <div className="mx-auto max-w-xl space-y-3 sm:max-w-none">
                      <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
                        <div className="flex gap-2.5 px-3 py-3 sm:px-4">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Einsatzort
                            </p>
                            <p className="text-base font-semibold leading-snug text-slate-900 [overflow-wrap:anywhere]">
                              {strasse || "–"}
                            </p>
                            {ort && (
                              <p className="mt-0.5 text-sm text-slate-600 [overflow-wrap:anywhere]">{ort}</p>
                            )}
                          </div>
                        </div>

                        {(detailAuftrag.aufgabe ?? "").trim() ? (
                          <>
                            <div className="h-px bg-slate-100" />
                            <div className="px-3 py-3 sm:px-4">
                              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                Leistung / Aufgabe
                              </p>
                              <p className="mt-1 whitespace-pre-wrap text-[15px] leading-relaxed text-slate-800 [overflow-wrap:anywhere]">
                                {(detailAuftrag.aufgabe ?? "").trim()}
                              </p>
                            </div>
                          </>
                        ) : null}

                        {showBilling && (rechnungsempfaengerText || leistungsempfaengerText) && (
                          <>
                            <div className="h-px bg-slate-100" />
                            <div className="px-3 py-3 sm:px-4">
                              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                Abrechnung
                              </p>
                              <div className="mt-2 space-y-3">
                                {rechnungsempfaengerText && (
                                  <div className="flex gap-2.5">
                                    <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-[11px] font-medium text-slate-500">Rechnungsempfänger</p>
                                      <p className="text-sm leading-relaxed text-slate-800 [overflow-wrap:anywhere]">
                                        {rechnungsempfaengerText}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {leistungsempfaengerText && (
                                  <div className="flex gap-2.5">
                                    <User className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-[11px] font-medium text-slate-500">Leistungsempfänger</p>
                                      <p className="text-sm leading-relaxed text-slate-800 [overflow-wrap:anywhere]">
                                        {leistungsempfaengerText}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}

                        {(detailAuftrag.mieter_name || tel || email) && (
                          <>
                            <div className="h-px bg-slate-100" />
                            <div className="px-3 py-2.5 sm:px-4">
                              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                Kontakt vor Ort
                              </p>
                              {detailAuftrag.mieter_name?.trim() && (
                                <p className="mt-0.5 text-sm font-medium text-slate-900 [overflow-wrap:anywhere]">
                                  {detailAuftrag.mieter_name.trim()}
                                </p>
                              )}
                              <p className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-sm">
                                {tel && (
                                  <a href={`tel:${tel}`} className="text-emerald-700 underline decoration-emerald-700/30">
                                    {tel}
                                  </a>
                                )}
                                {email && (
                                  <a href={`mailto:${email}`} className="text-slate-700 underline decoration-slate-400/40 [overflow-wrap:anywhere]">
                                    {email}
                                  </a>
                                )}
                              </p>
                            </div>
                          </>
                        )}

                        <details className="group border-t border-slate-100">
                          <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2.5 outline-none sm:px-4 [&::-webkit-details-marker]:hidden">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Gewerk (Board)
                            </span>
                            <span className="min-w-0 flex-1 truncate text-right text-xs text-slate-600">
                              {!boardTicketLookupDone
                                ? "…"
                                : !effectiveBoardTicketId
                                  ? "Keine Karte"
                                  : boardGewerke.length > 0
                                    ? boardGewerke.join(", ")
                                    : "Nicht gewählt"}
                            </span>
                            <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                          </summary>
                          <div className="space-y-2 border-t border-slate-50 px-3 pb-3 pt-2 sm:px-4">
                            {!boardTicketLookupDone ? (
                              <p className="text-xs text-slate-500">Wird geladen…</p>
                            ) : !effectiveBoardTicketId ? (
                              <p className="text-xs leading-relaxed text-slate-600">
                                Sobald eine Kanban-Karte mit diesem Auftrag existiert, kannst du das Gewerk hier
                                setzen.
                              </p>
                            ) : (
                              <>
                                <div className="flex flex-wrap gap-1.5">
                                  {GEWERKE_OPTIONS.map((opt) => {
                                    const checked = boardGewerke.includes(opt.value);
                                    return (
                                      <label
                                        key={opt.value}
                                        className={`inline-flex cursor-pointer items-center rounded-full border px-2.5 py-1 text-xs transition-colors ${
                                          checked
                                            ? "border-slate-900 bg-slate-900 text-white"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                        }`}
                                      >
                                        <input
                                          type="checkbox"
                                          className="sr-only"
                                          checked={checked}
                                          onChange={() =>
                                            setBoardGewerke((prev) =>
                                              prev.includes(opt.value)
                                                ? prev.filter((g) => g !== opt.value)
                                                : [...prev, opt.value]
                                            )
                                          }
                                        />
                                        {opt.label}
                                      </label>
                                    );
                                  })}
                                </div>
                                <button
                                  type="button"
                                  disabled={boardGewerkSaving}
                                  onClick={() => void saveBoardGewerk()}
                                  className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
                                >
                                  {boardGewerkSaving ? "Speichern…" : "Speichern"}
                                </button>
                              </>
                            )}
                          </div>
                        </details>
                      </div>

                      <section className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
                        <div className="border-b border-slate-100 px-3 py-2 sm:px-4">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                            Dokumentation
                          </p>
                          <p className="text-xs text-slate-500">Fotos und Notizen</p>
                        </div>
                        <div className="space-y-4 p-3 sm:p-4">
                          <div>
                            <p className="mb-1.5 text-xs font-medium text-slate-600">Fotos</p>
                            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 py-3.5 transition-colors hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                disabled={uploadingImage || !detailAuftrag.id}
                                onChange={async (e) => {
                                  const files = e.target.files;
                                  if (!files?.length || !detailAuftrag.id) return;
                                  let urls = [...(detailAuftrag.image_urls ?? [])];
                                  for (let i = 0; i < files.length; i++) {
                                    const newUrl = await uploadAuftragImage(
                                      detailAuftrag.id,
                                      files[i]!,
                                      urls
                                    );
                                    if (newUrl) urls = [...urls, newUrl];
                                  }
                                  e.target.value = "";
                                }}
                              />
                              <ImagePlus className="h-5 w-5 text-slate-400" />
                              <span className="mt-1.5 text-sm font-medium text-slate-700">
                                {uploadingImage ? "Wird hochgeladen …" : "Fotos hinzufügen"}
                              </span>
                            </label>
                            {Array.isArray(detailAuftrag.image_urls) &&
                              detailAuftrag.image_urls.length > 0 && (
                                <div className="mt-2 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                  {detailAuftrag.image_urls.map((url, idx) => (
                                    <div
                                      key={`${url}-${idx}`}
                                      className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
                                    >
                                      <button
                                        type="button"
                                        onClick={() => setLightboxImage(url)}
                                        className="h-full w-full"
                                      >
                                        <img src={url} alt="" className="h-full w-full object-cover" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          void deleteAuftragImage(
                                            detailAuftrag.id,
                                            url,
                                            detailAuftrag.image_urls ?? []
                                          )
                                        }
                                        disabled={deletingImageUrl === url || uploadingImage}
                                        className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 disabled:opacity-50"
                                        aria-label="Foto löschen"
                                        title="Foto löschen"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                          <div>
                            <div className="mb-1.5 flex items-center justify-between gap-2">
                              <p className="text-xs font-medium text-slate-600">Kommentare</p>
                              <span className="text-[11px] text-slate-400">{detailKommentare.length}</span>
                            </div>
                            <div className="max-h-44 space-y-1.5 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2">
                              {detailKommentare.length === 0 ? (
                                <p className="py-3 text-center text-xs text-slate-400">Noch keine Kommentare.</p>
                              ) : (
                                detailKommentare.map((k) => (
                                  <div key={k.id} className="rounded-md border border-slate-200 bg-white px-2.5 py-2">
                                    <div className="mb-1 flex items-center justify-between gap-2">
                                      <p className="text-[11px] font-medium text-slate-500">
                                        {k.author} · {new Date(k.timestamp).toLocaleString("de-DE")}
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() => void deleteKommentar(k.id)}
                                        disabled={kommentarSaving}
                                        className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
                                        aria-label="Kommentar löschen"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 [overflow-wrap:anywhere]">
                                      {k.text}
                                    </p>
                                  </div>
                                ))
                              )}
                            </div>
                            <div className="mt-2 flex items-end gap-2">
                              <Textarea
                                value={newKommentarText}
                                onChange={(e) => setNewKommentarText(e.target.value)}
                                placeholder="Kommentar schreiben … (Ctrl+Enter zum Senden)"
                                rows={2}
                                className="min-h-[72px] resize-none border-slate-200 text-sm leading-relaxed placeholder:text-slate-400"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                                    e.preventDefault();
                                    void addKommentar();
                                  }
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => void addKommentar()}
                                disabled={!newKommentarText.trim() || kommentarSaving || !detailAuftrag.id}
                                className="mb-0.5 inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 px-3 text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
                                aria-label="Kommentar senden"
                              >
                                <Send className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="h-px bg-slate-100" />
                          <div>
                            <p className="mb-1.5 text-xs font-medium text-slate-600">Rechnung hinzufügen</p>
                            <p className="mb-2 text-xs text-slate-500">PDF und Bilder</p>
                            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 py-3.5 transition-colors hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">
                              <input
                                type="file"
                                accept="application/pdf,.pdf,image/*,.heic,.heif"
                                multiple
                                className="hidden"
                                disabled={uploadingDoc || !detailAuftrag.id}
                                onChange={async (e) => {
                                  const files = e.target.files;
                                  if (!files?.length || !detailAuftrag.id) return;
                                  let urls = [...(detailAuftrag.angebot_rechnung_urls ?? [])];
                                  for (let i = 0; i < files.length; i++) {
                                    const newUrl = await uploadAuftragDoc(
                                      detailAuftrag.id,
                                      files[i]!,
                                      urls
                                    );
                                    if (newUrl) urls = [...urls, newUrl];
                                  }
                                  e.target.value = "";
                                }}
                              />
                              <Upload className="h-5 w-5 text-slate-400" />
                              <span className="mt-1.5 text-sm font-medium text-slate-700">
                                {uploadingDoc ? "Wird hochgeladen …" : "Dateien auswählen"}
                              </span>
                            </label>
                            {Array.isArray(detailAuftrag.angebot_rechnung_urls) &&
                              detailAuftrag.angebot_rechnung_urls.length > 0 && (
                                <div className="mt-2 space-y-1.5">
                                  {detailAuftrag.angebot_rechnung_urls.map((url, idx) => {
                                    const isImg = isProbablyImageAttachmentUrl(url);
                                    return (
                                      <div
                                        key={`${url}-${idx}`}
                                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-2 pr-1.5 transition-colors hover:bg-slate-100"
                                      >
                                        {isImg ? (
                                          <button
                                            type="button"
                                            onClick={() => setLightboxImage(url)}
                                            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-200 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-slate-400"
                                          >
                                            <img
                                              src={url}
                                              alt=""
                                              className="h-full w-full object-cover"
                                            />
                                          </button>
                                        ) : (
                                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white">
                                            <FileText className="h-6 w-6 text-slate-500" />
                                          </span>
                                        )}
                                        <a
                                          href={url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="min-w-0 flex-1 py-0.5 text-sm font-medium text-slate-800 no-underline hover:underline"
                                        >
                                          Datei {idx + 1}
                                          <span className="mt-0.5 block text-[11px] font-normal text-slate-500 no-underline">
                                            {isImg ? "Bild · tippen für Vorschau" : "PDF / Dokument"}
                                          </span>
                                        </a>
                                        <a
                                          href={url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white hover:text-slate-600"
                                          aria-label={`Datei ${idx + 1} öffnen`}
                                        >
                                          <Paperclip className="h-4 w-4" />
                                        </a>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </>
              );
            })()}
        </DialogContent>
      </Dialog>

      {lightboxImage &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Bild vergrößert"
            onClick={() => setLightboxImage(null)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(null);
              }}
              className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-slate-800 shadow-lg transition hover:bg-white"
              aria-label="Schließen"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
            <div className="relative max-h-[90vh] max-w-full" onClick={(e) => e.stopPropagation()}>
              <img
                src={lightboxImage}
                alt="Vergrößerte Ansicht"
                className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-xl"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
