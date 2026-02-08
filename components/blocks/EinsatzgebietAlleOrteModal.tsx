"use client";

import { useMemo, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, MapPin } from "lucide-react";
import { MUENCHEN_STADTTEILE, UMLAND_ORTE } from "@/lib/geo/muenchen-stadtteile";
import { cn } from "@/lib/utils";

/** Normalisiert für Suche: case-insensitive, Umlaute robust (ä→a etc.) */
function normalizeForSearch(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ß/g, "ss");
}

/** Erster Buchstabe für Gruppierung (A–Z), Ä→A etc. */
function groupLetter(s: string): string {
  const first = s.trim().charAt(0).toUpperCase();
  if (first === "Ä") return "A";
  if (first === "Ö") return "O";
  if (first === "Ü") return "U";
  return first;
}

function groupByLetter(items: string[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  const sorted = [...items].sort((a, b) => a.localeCompare(b, "de"));
  for (const item of sorted) {
    const letter = groupLetter(item);
    if (!map.has(letter)) map.set(letter, []);
    map.get(letter)!.push(item);
  }
  return map;
}

const MUENCHEN_ARR = [...MUENCHEN_STADTTEILE];
const UMLAND_ARR = [...UMLAND_ORTE];

export function EinsatzgebietAlleOrteModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredMuenchen = useMemo(() => {
    const q = normalizeForSearch(query.trim());
    if (!q) return MUENCHEN_ARR;
    return MUENCHEN_ARR.filter((name) => normalizeForSearch(name).includes(q));
  }, [query]);

  const filteredUmland = useMemo(() => {
    const q = normalizeForSearch(query.trim());
    if (!q) return UMLAND_ARR;
    return UMLAND_ARR.filter((name) => normalizeForSearch(name).includes(q));
  }, [query]);

  const muenchenByLetter = useMemo(
    () => groupByLetter(filteredMuenchen),
    [filteredMuenchen],
  );
  const umlandByLetter = useMemo(
    () => groupByLetter(filteredUmland),
    [filteredUmland],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    },
    [],
  );

  const hasResults =
    filteredMuenchen.length > 0 || filteredUmland.length > 0;
  const sortedLetters = (m: Map<string, string[]>) =>
    [...m.keys()].sort((a, b) => a.localeCompare(b, "de"));

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="mt-3 text-lg font-semibold border-primary/40 hover:bg-primary/10 hover:border-primary"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Alle Stadtteile anzeigen – öffnet Liste in einem Dialog"
      >
        <MapPin className="h-5 w-5 shrink-0" aria-hidden />
        Alle Stadtteile anzeigen
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-lg gap-0 p-0 overflow-hidden flex flex-col max-h-[90vh]"
          onKeyDown={handleKeyDown}
        >
          <DialogTitle id="einsatzgebiet-modal-title" className="sr-only">
            Alle Stadtteile
          </DialogTitle>
          <DialogDescription id="einsatzgebiet-modal-desc" className="sr-only">
            Münchner Stadtbezirke und Umland – Einsatzgebiet der Meisterrunde.
          </DialogDescription>
          <DialogHeader className="px-6 pt-6 pb-4 shrink-0 border-b border-border">
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              Alle Stadtteile
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Münchner Stadtbezirke und Umland – Einsatzgebiet der Meisterrunde.
            </p>
            <label htmlFor="einsatzgebiet-search" className="sr-only">
              Stadtteil oder Ort suchen
            </label>
            <Input
              id="einsatzgebiet-search"
              type="search"
              placeholder="Suchen …"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              aria-label="Stadtteil oder Ort suchen"
              className="mt-3"
            />
          </DialogHeader>

          <div
            className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-6 pb-6"
            tabIndex={0}
            aria-label="Liste der Stadtteile – Bereich ist scrollbar"
          >
            <div className="pr-2 pt-4 space-y-8">
              {!hasResults && (
                <p className="text-sm text-muted-foreground">
                  Keine Orte gefunden. Bitte Suchbegriff anpassen.
                </p>
              )}

              {filteredMuenchen.length > 0 && (
                <Collapsible defaultOpen={false} asChild>
                  <section
                    aria-labelledby="muenchen-heading"
                    className="rounded-lg border border-border bg-muted/20 overflow-hidden"
                  >
                    <CollapsibleTrigger
                      id="muenchen-heading"
                      className="group flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold text-foreground uppercase tracking-widest hover:bg-muted/30 transition-colors"
                    >
                      <span>München (Stadtbezirke)</span>
                      <ChevronDown
                        className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
                        aria-hidden
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-4 px-4 pb-4 pt-1 border-t border-border">
                        {sortedLetters(muenchenByLetter).map((letter) => (
                          <div key={letter}>
                            <p
                              className="text-xs font-medium text-muted-foreground mb-1.5"
                              aria-hidden
                            >
                              {letter}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {muenchenByLetter.get(letter)!.map((ort) => (
                                <span
                                  key={ort}
                                  className={cn(
                                    "rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground",
                                  )}
                                >
                                  {ort}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </section>
                </Collapsible>
              )}

              {filteredUmland.length > 0 && (
                <Collapsible defaultOpen={false} asChild>
                  <section
                    aria-labelledby="umland-heading"
                    className="rounded-lg border border-border bg-muted/20 overflow-hidden"
                  >
                    <CollapsibleTrigger
                      id="umland-heading"
                      className="group flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold text-foreground uppercase tracking-widest hover:bg-muted/30 transition-colors"
                    >
                      <span>Umland (Gemeinden &amp; Städte)</span>
                      <ChevronDown
                        className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
                        aria-hidden
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-4 px-4 pb-4 pt-1 border-t border-border">
                        {sortedLetters(umlandByLetter).map((letter) => (
                          <div key={`umland-${letter}`}>
                            <p
                              className="text-xs font-medium text-muted-foreground mb-1.5"
                              aria-hidden
                            >
                              {letter}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {umlandByLetter.get(letter)!.map((ort) => (
                                <span
                                  key={ort}
                                  className={cn(
                                    "rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground",
                                  )}
                                >
                                  {ort}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </section>
                </Collapsible>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
