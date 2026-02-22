"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, Mail } from "lucide-react";
import { GermanyMap } from "@/components/GermanyMap";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";

interface LocationMapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const locations = [
  { name: "München", description: "Hauptsitz", href: "/kontakt" },
];

export function LocationMapDialog({ open, onOpenChange }: LocationMapDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <MapPin className="h-6 w-6 text-primary" />
            Unser Standort München
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* SVG Germany Map */}
          <div className="h-[400px] w-full rounded-xl overflow-hidden border border-border bg-primary/5 flex items-center justify-center">
            <GermanyMap className="w-full h-full p-4" />
          </div>

          {/* Locations Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {locations.map((location) => (
              <Link
                key={location.name}
                href={location.href}
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-2 rounded-lg bg-primary/10 p-3 transition-colors hover:bg-primary/20"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{location.name}</p>
                  <p className="text-xs text-muted-foreground">{location.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-primary p-4">
            <a
              href={`mailto:${BUSINESS.email}`}
              className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="font-medium">{BUSINESS.email}</span>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
