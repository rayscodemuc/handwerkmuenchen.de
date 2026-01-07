import { useState } from "react";
import { cn } from "@/lib/utils";

interface Location {
  name: string;
  x: number;
  y: number;
  description: string;
  href: string;
}

const locations: Location[] = [
  { name: "München", x: 285, y: 470, description: "Hauptsitz", href: "/standorte/muenchen" },
  { name: "Augsburg", x: 260, y: 445, description: "Servicebereich", href: "/standorte/augsburg" },
  { name: "Ingolstadt", x: 280, y: 410, description: "Servicebereich", href: "/standorte/ingolstadt" },
  { name: "Nürnberg", x: 275, y: 360, description: "Servicebereich", href: "/standorte/nuernberg" },
  { name: "Frankfurt", x: 200, y: 310, description: "Servicebereich", href: "/standorte/frankfurt" },
  { name: "Hamburg", x: 235, y: 115, description: "Servicebereich", href: "/standorte/hamburg" },
  { name: "Berlin", x: 340, y: 165, description: "Servicebereich", href: "/standorte/berlin" },
];

export function GermanyMap({ className }: { className?: string }) {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 450 580"
        className="w-full h-full"
        style={{ maxHeight: "400px" }}
      >
        {/* Germany outline - simplified path */}
        <path
          d="M235 50 L280 45 L320 55 L355 70 L380 95 L395 130 L390 165 L375 195 L385 220 L400 250 L395 285 L380 315 L390 350 L385 385 L370 420 L350 455 L320 485 L285 510 L250 520 L215 510 L180 490 L155 460 L130 425 L115 385 L105 345 L95 300 L100 255 L115 215 L135 180 L150 145 L170 115 L195 85 L220 60 Z"
          fill="hsl(var(--primary) / 0.15)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          className="transition-colors duration-300"
        />
        
        {/* Inner details - simplified regions */}
        <path
          d="M200 200 Q220 220 250 210 Q280 200 300 220"
          fill="none"
          stroke="hsl(var(--primary) / 0.3)"
          strokeWidth="1"
        />
        <path
          d="M150 300 Q200 280 250 290 Q300 300 340 280"
          fill="none"
          stroke="hsl(var(--primary) / 0.3)"
          strokeWidth="1"
        />
        <path
          d="M180 400 Q230 380 280 390 Q320 400 350 380"
          fill="none"
          stroke="hsl(var(--primary) / 0.3)"
          strokeWidth="1"
        />

        {/* Location markers */}
        {locations.map((location) => (
          <g
            key={location.name}
            className="cursor-pointer"
            onMouseEnter={() => setActiveLocation(location.name)}
            onMouseLeave={() => setActiveLocation(null)}
            onClick={() => window.location.href = location.href}
          >
            {/* Pulse animation ring */}
            <circle
              cx={location.x}
              cy={location.y}
              r={activeLocation === location.name ? 20 : 12}
              fill="hsl(var(--primary) / 0.2)"
              className="transition-all duration-300"
            >
              {activeLocation === location.name && (
                <animate
                  attributeName="r"
                  values="12;24;12"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
            
            {/* Main marker dot */}
            <circle
              cx={location.x}
              cy={location.y}
              r={activeLocation === location.name ? 10 : 8}
              fill="hsl(var(--foreground))"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              className="transition-all duration-300"
            />

            {/* Location label */}
            <text
              x={location.x}
              y={location.y - 18}
              textAnchor="middle"
              className={cn(
                "text-xs font-semibold fill-foreground transition-all duration-300",
                activeLocation === location.name ? "opacity-100" : "opacity-70"
              )}
              style={{ fontSize: activeLocation === location.name ? "14px" : "11px" }}
            >
              {location.name}
            </text>
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      {activeLocation && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl px-4 py-3 shadow-lg pointer-events-none">
          <p className="font-semibold text-foreground">
            {locations.find(l => l.name === activeLocation)?.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {locations.find(l => l.name === activeLocation)?.description}
          </p>
        </div>
      )}
    </div>
  );
}
