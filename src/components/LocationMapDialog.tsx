import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, Phone, Mail } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface LocationMapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const locations = [
  { name: "München", coordinates: [11.5820, 48.1351] as [number, number], description: "Hauptsitz & Umgebung" },
  { name: "Augsburg", coordinates: [10.8978, 48.3705] as [number, number], description: "Servicebereich" },
  { name: "Ingolstadt", coordinates: [11.4250, 48.7665] as [number, number], description: "Servicebereich" },
  { name: "Nürnberg", coordinates: [11.0753, 49.4521] as [number, number], description: "Servicebereich" },
  { name: "Frankfurt", coordinates: [8.6821, 50.1109] as [number, number], description: "Servicebereich" },
  { name: "Hamburg", coordinates: [9.9937, 53.5511] as [number, number], description: "Servicebereich" },
  { name: "Berlin", coordinates: [13.4050, 52.5200] as [number, number], description: "Servicebereich" },
];

// Note: Replace with your Mapbox public token
const MAPBOX_TOKEN = "pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtNWF3bzV0YTA3OWoycXF2MG9oZXJhc3oifQ.sDPGkWyfoGpSOn6g1m3Ipg";

export function LocationMapDialog({ open, onOpenChange }: LocationMapDialogProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!open || !mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [10.5, 50.5], // Center of Germany
      zoom: 5.2,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on("load", () => {
      setMapLoaded(true);

      // Add markers for each location
      locations.forEach((location) => {
        const el = document.createElement("div");
        el.className = "custom-marker";
        el.innerHTML = `
          <div style="
            background: #dc2626;
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            border: 3px solid white;
          ">
            <div style="
              transform: rotate(45deg);
              color: white;
              font-size: 14px;
              font-weight: bold;
            ">●</div>
          </div>
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 8px;">
            <h3 style="font-weight: 700; font-size: 16px; margin: 0 0 4px 0;">${location.name}</h3>
            <p style="color: #666; margin: 0; font-size: 14px;">${location.description}</p>
          </div>
        `);

        new mapboxgl.Marker(el)
          .setLngLat(location.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
        setMapLoaded(false);
      }
    };
  }, [open]);

  // Cleanup when dialog closes
  useEffect(() => {
    if (!open && map.current) {
      map.current.remove();
      map.current = null;
      setMapLoaded(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <MapPin className="h-6 w-6 text-primary" />
            Unsere Standorte & Servicebereiche
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Map Container */}
          <div 
            ref={mapContainer} 
            className="h-[400px] w-full rounded-xl overflow-hidden border border-border"
          />

          {/* Locations Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {locations.map((location) => (
              <div
                key={location.name}
                className="flex items-center gap-2 rounded-lg bg-muted p-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{location.name}</p>
                  <p className="text-xs text-muted-foreground">{location.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 rounded-xl bg-primary/5 p-4">
            <a 
              href="tel:+491234567890" 
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-5 w-5 text-primary" />
              <span className="font-medium">+49 123 456 789 0</span>
            </a>
            <a 
              href="mailto:info@mrclean-services.de"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5 text-primary" />
              <span className="font-medium">info@mrclean-services.de</span>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
