"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Circle, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MUNICH_CENTER: [number, number] = [48.1351, 11.582];
const RADIUS_KM = 30;

// Fix Leaflet default icon in Next.js (icons are not found under node_modules in browser)
function DefaultIconFix() {
  const didFix = useRef(false);
  useEffect(() => {
    if (didFix.current) return;
    didFix.current = true;
    const Default = L.Icon.Default as unknown as { prototype: { _getIconUrl?: string } };
    if (Default?.prototype?._getIconUrl) {
      delete Default.prototype._getIconUrl;
    }
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);
  return null;
}

function MapContent() {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    map.invalidateSize();
  }, [map]);
  return (
    <>
      <DefaultIconFix />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={MUNICH_CENTER}
        radius={RADIUS_KM * 1000}
        pathOptions={{
          color: "#2563eb",
          fillColor: "#2563eb",
          fillOpacity: 0.25,
          weight: 2,
        }}
      />
      <Marker position={MUNICH_CENTER} />
    </>
  );
}

export function EinsatzgebietMap() {
  return (
    <div className="container mx-auto w-full px-4 sm:px-6 lg:px-8">
      {/* Text zentral */}
      <div className="mx-auto max-w-2xl text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[#3E505B]">
          Unser Einsatzgebiet
        </h2>
        <p className="mt-1 sm:mt-1.5 text-sm sm:text-base text-[#3E505B]/95 leading-relaxed">
          Wir sind in ganz München und im Umland für Sie da. Von Dachau bis
          Holzkirchen, von Fürstenfeldbruck bis Markt Schwaben – wir
          garantieren kurze Anfahrtswege und schnelle Hilfe durch unsere
          lokale Verwurzelung.
        </p>
      </div>

      {/* Map in voller Breite darunter */}
      <div className="w-full min-w-0 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="h-[400px] w-full overflow-hidden rounded-2xl sm:rounded-3xl relative shadow-sm border border-[#3E505B]/8">
          <MapContainer
            center={MUNICH_CENTER}
            zoom={9}
            className="h-full w-full rounded-2xl sm:rounded-3xl"
            scrollWheelZoom={true}
            style={{ minHeight: "400px" }}
            attributionControl={false}
          >
            <MapContent />
          </MapContainer>
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 text-[10px] text-[#3E505B]/70 hover:underline z-[1000]"
          >
            © OpenStreetMap
          </a>
        </div>
      </div>
    </div>
  );
}
