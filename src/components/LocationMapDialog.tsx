import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, Phone, Mail } from "lucide-react";
import { GermanyMap } from "@/components/GermanyMap";
import { Link } from "react-router-dom";

interface LocationMapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const locations = [
  { name: "München", description: "Hauptsitz", href: "/standorte/muenchen" },
  { name: "Augsburg", description: "Servicebereich", href: "/standorte/augsburg" },
  { name: "Ingolstadt", description: "Servicebereich", href: "/standorte/ingolstadt" },
  { name: "Nürnberg", description: "Servicebereich", href: "/standorte/nuernberg" },
  { name: "Frankfurt", description: "Servicebereich", href: "/standorte/frankfurt" },
  { name: "Hamburg", description: "Servicebereich", href: "/standorte/hamburg" },
  { name: "Berlin", description: "Servicebereich", href: "/standorte/berlin" },
];

export function LocationMapDialog({ open, onOpenChange }: LocationMapDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <MapPin className="h-6 w-6 text-primary" />
            Unsere Standorte in Deutschland
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
                to={location.href}
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
          <div className="flex flex-wrap items-center justify-center gap-6 rounded-xl bg-primary p-4">
            <a 
              href="tel:+498925006354" 
              className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span className="font-medium">+49 (0)89 25006354</span>
            </a>
            <a 
              href="mailto:kontakt@mr-clean-services.de"
              className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="font-medium">kontakt@mr-clean-services.de</span>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
