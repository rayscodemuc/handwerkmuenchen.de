"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminUser } from "@/app/admin/AdminUserContext";

type MangelMeldungDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

const PRIORITAET_OPTIONS = [
  { value: "tief", label: "Tief" },
  { value: "mittel", label: "Mittel" },
  { value: "hoch", label: "Hoch" },
];

const BEREICH_OPTIONS = [
  { value: "gewerk_elektro", label: "Elektro" },
  { value: "gewerk_sanitaer", label: "Sanitär" },
  { value: "gewerk_ausbau", label: "Ausbau" },
  { value: "gewerk_reinigung", label: "Reinigung" },
  { value: "gewerk_facility", label: "Facility" },
];

export function MangelMeldungDialog({
  open,
  onOpenChange,
  onSuccess,
}: MangelMeldungDialogProps) {
  const adminUser = useAdminUser();
  const isAdmin = adminUser?.role === "admin";
  const isGewerkUser = adminUser?.role?.startsWith("gewerk_");

  const [titel, setTitel] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [prioritaet, setPrioritaet] = useState("mittel");
  const [bereich, setBereich] = useState(
    isGewerkUser && adminUser?.role ? adminUser.role : ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setTitel("");
    setBeschreibung("");
    setPrioritaet("mittel");
    setBereich(
      isGewerkUser && adminUser?.role ? adminUser.role : ""
    );
    setError(null);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!titel.trim()) {
      setError("Titel ist erforderlich.");
      return;
    }

    if (!isAdmin && !bereich) {
      setError("Bereich ist erforderlich.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = isAdmin
        ? "/api/admin/mangelmeldungen"
        : "/api/gewerke/mangelmeldungen";

      const body: Record<string, string> = {
        titel: titel.trim(),
        beschreibung: beschreibung.trim(),
        prioritaet,
      };

      if (isAdmin && bereich) {
        body.bereich = bereich;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Fehler beim Speichern.");
      }

      resetForm();
      onSuccess?.();
      handleOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Mangel melden
          </DialogTitle>
          <DialogDescription>
            {isAdmin
              ? "Erstellen Sie eine neue Mangelmeldung für einen Gewerkebereich."
              : "Erstellen Sie eine neue Mangelmeldung für Ihren Gewerkebereich."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="mangel-titel" className="text-sm font-medium">
              Titel <span className="text-red-500">*</span>
            </label>
            <Input
              id="mangel-titel"
              value={titel}
              onChange={(e) => setTitel(e.target.value)}
              placeholder="z.B. Wasserflecken in Raum 201"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="mangel-beschreibung" className="text-sm font-medium">
              Beschreibung
            </label>
            <Textarea
              id="mangel-beschreibung"
              value={beschreibung}
              onChange={(e) => setBeschreibung(e.target.value)}
              placeholder="Beschreiben Sie den Mangel im Detail..."
              rows={4}
              disabled={loading}
            />
          </div>

          {isAdmin && (
            <div className="space-y-2">
              <label htmlFor="mangel-bereich" className="text-sm font-medium">
                Bereich <span className="text-red-500">*</span>
              </label>
              <Select value={bereich} onValueChange={setBereich} disabled={loading}>
                <SelectTrigger id="mangel-bereich">
                  <SelectValue placeholder="Bereich wählen" />
                </SelectTrigger>
                <SelectContent>
                  {BEREICH_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="mangel-prioritaet" className="text-sm font-medium">
              Priorität
            </label>
            <Select
              value={prioritaet}
              onValueChange={setPrioritaet}
              disabled={loading}
            >
              <SelectTrigger id="mangel-prioritaet">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PRIORITAET_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
              {error}
            </p>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              Abbrechen
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Wird gespeichert..." : "Mangel melden"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
