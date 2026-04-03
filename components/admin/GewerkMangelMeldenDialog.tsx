"use client";

import { useCallback, useState } from "react";
import { AlertTriangle, ImagePlus, Loader2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { compressImageForUpload } from "@/lib/images/compress-image-for-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const BUCKET = "ticket-images";

type GewerkMangelMeldenDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLightTheme: boolean;
  onSubmitted?: () => void;
};

export function GewerkMangelMeldenDialog({
  open,
  onOpenChange,
  isLightTheme,
  onSubmitted,
}: GewerkMangelMeldenDialogProps) {
  const supabase = createClient();
  const [adresse, setAdresse] = useState("");
  const [notiz, setNotiz] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setAdresse("");
    setNotiz("");
    setFiles([]);
    setPreviews((prev) => {
      prev.forEach((u) => URL.revokeObjectURL(u));
      return [];
    });
    setError(null);
  }, []);

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const onPickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list?.length) return;
    const next = [...files];
    const prev = [...previews];
    for (let i = 0; i < list.length; i++) {
      const f = list[i]!;
      if (!f.type.startsWith("image/")) continue;
      if (next.length >= 12) break;
      next.push(f);
      prev.push(URL.createObjectURL(f));
    }
    setFiles(next);
    setPreviews(prev);
    e.target.value = "";
  };

  const removeAt = (idx: number) => {
    setFiles((f) => f.filter((_, i) => i !== idx));
    setPreviews((p) => {
      const u = p[idx];
      if (u) URL.revokeObjectURL(u);
      return p.filter((_, i) => i !== idx);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const a = adresse.trim();
    if (!a) {
      setError("Bitte die Objektadresse angeben.");
      return;
    }

    setSubmitting(true);
    try {
      const {
        data: { user },
        error: authErr,
      } = await supabase.auth.getUser();
      if (authErr || !user) {
        setError("Nicht eingeloggt.");
        return;
      }

      const imageUrls: string[] = [];
      for (const file of files) {
        const blob = file.type.startsWith("image/")
          ? await compressImageForUpload(file)
          : file;
        const id = crypto.randomUUID();
        const path = `maengel/${user.id}/${id}.jpg`;
        const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, blob, {
          cacheControl: "3600",
          upsert: false,
          contentType: "image/jpeg",
        });
        if (upErr) {
          setError(upErr.message);
          return;
        }
        const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
        if (pub?.publicUrl) imageUrls.push(pub.publicUrl);
      }

      const res = await fetch("/api/gewerk/maengel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adresse: a,
          notiz: notiz.trim() || undefined,
          image_urls: imageUrls,
        }),
      });
      const json = (await res.json()) as { error?: string; id?: string };
      if (!res.ok) {
        setError(json.error ?? "Speichern fehlgeschlagen.");
        return;
      }

      onSubmitted?.();
      reset();
      onOpenChange(false);
    } catch {
      setError("Netzwerkfehler.");
    } finally {
      setSubmitting(false);
    }
  };

  const surface = isLightTheme ? "border-slate-200 bg-white" : "border-slate-600 bg-slate-900";
  const label = isLightTheme ? "text-slate-700" : "text-slate-200";
  const muted = isLightTheme ? "text-slate-500" : "text-slate-400";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={cn("max-h-[min(90dvh,720px)] overflow-y-auto sm:max-w-lg", surface)}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" strokeWidth={2} />
            Mangel melden
          </DialogTitle>
          <DialogDescription className={muted}>
            Adresse und Beschreibung am Objekt. Fotos optional (max. 12).
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-100">
              {error}
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="mangel-adresse" className={label}>
              Objektadresse
            </Label>
            <Textarea
              id="mangel-adresse"
              required
              rows={3}
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              placeholder="Straße, PLZ Ort"
              className={isLightTheme ? "resize-y" : "resize-y border-slate-600 bg-slate-950 text-slate-100"}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mangel-notiz" className={label}>
              Notiz
            </Label>
            <Textarea
              id="mangel-notiz"
              rows={4}
              value={notiz}
              onChange={(e) => setNotiz(e.target.value)}
              placeholder="Was ist der Mangel?"
              className={isLightTheme ? "resize-y" : "resize-y border-slate-600 bg-slate-950 text-slate-100"}
            />
          </div>

          <div className="space-y-2">
            <Label className={label}>Fotos</Label>
            <div className="flex flex-wrap items-center gap-2">
              <label
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  isLightTheme
                    ? "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    : "border-slate-600 bg-slate-800 hover:bg-slate-700"
                )}
              >
                <ImagePlus className="h-4 w-4" />
                Bilder wählen
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={onPickFiles}
                  disabled={submitting || files.length >= 12}
                />
              </label>
              <span className={cn("text-xs", muted)}>{files.length}/12</span>
            </div>
            {previews.length > 0 ? (
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {previews.map((src, idx) => (
                  <li key={src} className="relative aspect-square overflow-hidden rounded-lg border border-slate-200 dark:border-slate-600">
                    <img src={src} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeAt(idx)}
                      className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                      aria-label="Bild entfernen"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={submitting}>
              Abbrechen
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wird gesendet…
                </>
              ) : (
                "Absenden"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
