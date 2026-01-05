import { useEffect, useRef } from "react";
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

const MAPBOX_TOKEN = "pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtNWF3bzV0YTA3OWoycXF2MG9oZXJhc3oifQ.sDPGkWyfoGpSOn6g1m3Ipg";

// Brand colors: Primary is #afc8d3 (hsl 198 29% 76%)
const brandPrimaryHex = "#afc8d3";
const brandDarkHex = "#1a2634";

export function LocationMapDialog({ open, onOpenChange }: LocationMapDialogProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!open || !mapContainer.current) return;

    // Cleanup previous map
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [10.4515, 51.1657], // Center of Germany
      zoom: 5,
      minZoom: 4,
      maxZoom: 10,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on("load", () => {
      if (!map.current) return;

      // Apply brand colors to the map
      // Water color - brand primary
      map.current.setPaintProperty("water", "fill-color", brandPrimaryHex);
      
      // Land background - very light version of brand
      map.current.setPaintProperty("land", "background-color", "#f0f5f7");
      
      // Parks and green areas
      try {
        map.current.setPaintProperty("landuse", "fill-color", [
          "match",
          ["get", "class"],
          "park", "#d4e5d8",
          "grass", "#d4e5d8",
          "cemetery", "#d4e5d8",
          "#e8f0f3"
        ]);
      } catch (e) {
        // Layer might not exist
      }

      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Add markers for each location with brand-colored pins
      locations.forEach((location) => {
        // Create custom marker element with brand colors
        const markerEl = document.createElement("div");
        markerEl.style.cssText = `
          width: 40px;
          height: 40px;
          cursor: pointer;
          transition: transform 0.2s ease;
        `;
        markerEl.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; filter: drop-shadow(0 3px 6px rgba(26, 38, 52, 0.3));">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${brandDarkHex}" stroke="${brandPrimaryHex}" stroke-width="2"/>
            <circle cx="12" cy="9" r="3" fill="${brandPrimaryHex}"/>
          </svg>
        `;
        
        // Hover effect
        markerEl.addEventListener("mouseenter", () => {
          markerEl.style.transform = "scale(1.15)";
        });
        markerEl.addEventListener("mouseleave", () => {
          markerEl.style.transform = "scale(1)";
        });

        // Create popup with brand styling
        const popup = new mapboxgl.Popup({ 
          offset: 25,
          closeButton: false,
          className: "brand-popup"
        }).setHTML(`
          <div style="padding: 12px 16px; font-family: 'Lexend', sans-serif; background: white; border-radius: 12px;">
            <h3 style="font-weight: 700; font-size: 16px; margin: 0 0 4px 0; color: ${brandDarkHex};">${location.name}</h3>
            <p style="color: #64748b; margin: 0; font-size: 13px;">${location.description}</p>
          </div>
        `);

        // Create and add marker
        const marker = new mapboxgl.Marker(markerEl)
          .setLngLat(location.coordinates)
          .setPopup(popup)
          .addTo(map.current!);

        markersRef.current.push(marker);
      });

      // Fit bounds to show all markers with padding
      const bounds = new mapboxgl.LngLatBounds();
      locations.forEach(loc => bounds.extend(loc.coordinates));
      map.current?.fitBounds(bounds, { 
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        maxZoom: 6
      });
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [open]);

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
          {/* Map Container */}
          <div 
            ref={mapContainer} 
            className="h-[400px] w-full rounded-xl overflow-hidden border border-border bg-primary/20"
          />

          {/* Locations Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {locations.map((location) => (
              <div
                key={location.name}
                className="flex items-center gap-2 rounded-lg bg-primary/10 p-3 transition-colors hover:bg-primary/20"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{location.name}</p>
                  <p className="text-xs text-muted-foreground">{location.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 rounded-xl bg-primary p-4">
            <a 
              href="tel:+491234567890" 
              className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span className="font-medium">+49 123 456 789 0</span>
            </a>
            <a 
              href="mailto:info@mrclean-services.de"
              className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="font-medium">info@mrclean-services.de</span>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
