import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import germanyMapSvg from "@/assets/germany-map.svg";

interface Location {
  name: string;
  x: number;
  y: number;
  description: string;
  href: string;
}

// Coordinates mapped to the 1000x1000 viewBox of the real Germany SVG
const locations: Location[] = [
  { name: "München", x: 595, y: 780, description: "Hauptsitz", href: "/standorte/muenchen" },
  { name: "Augsburg", x: 545, y: 735, description: "Servicebereich", href: "/standorte/augsburg" },
  { name: "Ingolstadt", x: 570, y: 680, description: "Servicebereich", href: "/standorte/ingolstadt" },
  { name: "Nürnberg", x: 560, y: 600, description: "Servicebereich", href: "/standorte/nuernberg" },
  { name: "Frankfurt", x: 410, y: 520, description: "Servicebereich", href: "/standorte/frankfurt" },
  { name: "Hamburg", x: 485, y: 195, description: "Servicebereich", href: "/standorte/hamburg" },
  { name: "Berlin", x: 680, y: 305, description: "Servicebereich", href: "/standorte/berlin" },
];

export function GermanyMap({ className }: { className?: string }) {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  return (
    <div className={cn("relative", className)}>
      {/* Germany Map as background with brand colors applied via CSS filter */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          filter: "hue-rotate(160deg) saturate(0.6) brightness(1.1)",
        }}
      >
        <img 
          src={germanyMapSvg} 
          alt="Deutschlandkarte mit Standorten" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Location markers overlay */}
      <svg
        viewBox="0 0 1000 1000"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Main location markers */}
        {locations.map((location) => (
          <g
            key={location.name}
            className="cursor-pointer"
            onMouseEnter={() => setActiveLocation(location.name)}
            onMouseLeave={() => setActiveLocation(null)}
          >
            <Link to={location.href}>
              {/* Pulse animation ring */}
              <circle
                cx={location.x}
                cy={location.y}
                r={activeLocation === location.name ? 35 : 20}
                fill="hsl(var(--primary) / 0.3)"
                className="transition-all duration-300"
              >
                {activeLocation === location.name && (
                  <animate
                    attributeName="r"
                    values="20;40;20"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
              
              {/* Outer ring */}
              <circle
                cx={location.x}
                cy={location.y}
                r={activeLocation === location.name ? 18 : 14}
                fill="hsl(var(--background))"
                stroke="hsl(var(--foreground))"
                strokeWidth="4"
                className="transition-all duration-300"
              />

              {/* Inner dot */}
              <circle
                cx={location.x}
                cy={location.y}
                r={activeLocation === location.name ? 9 : 7}
                fill="hsl(var(--foreground))"
                className="transition-all duration-300"
              />

              {/* Location label with background */}
              <rect
                x={location.x - 50}
                y={location.y - 45}
                width="100"
                height="24"
                rx="12"
                fill={activeLocation === location.name ? "hsl(var(--foreground))" : "hsl(var(--background) / 0.9)"}
                stroke="hsl(var(--border))"
                strokeWidth="1"
                className="transition-all duration-300"
              />
              <text
                x={location.x}
                y={location.y - 28}
                textAnchor="middle"
                className="font-semibold transition-all duration-300"
                style={{ 
                  fontSize: "14px",
                  fontFamily: "'Lexend', sans-serif",
                  fill: activeLocation === location.name ? "hsl(var(--background))" : "hsl(var(--foreground))",
                }}
              >
                {location.name}
              </text>
              
              {/* Description on hover */}
              {activeLocation === location.name && (
                <>
                  <rect
                    x={location.x - 45}
                    y={location.y + 25}
                    width="90"
                    height="20"
                    rx="10"
                    fill="hsl(var(--primary))"
                  />
                  <text
                    x={location.x}
                    y={location.y + 40}
                    textAnchor="middle"
                    style={{ 
                      fontSize: "11px",
                      fontFamily: "'Lexend', sans-serif",
                      fill: "hsl(var(--foreground))",
                    }}
                  >
                    {location.description}
                  </text>
                </>
              )}
            </Link>
          </g>
        ))}
      </svg>
    </div>
  );
}
