"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface Location {
  name: string;
  x: number;
  y: number;
  description: string;
  href: string;
}

// Coordinates mapped to the 1000x1000 viewBox of the real Germany SVG
const locations: Location[] = [
  { name: "München", x: 595, y: 780, description: "Hauptsitz", href: "/kontakt" },
];

export function GermanyMap({ className }: { className?: string }) {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  return (
    <div className={cn("relative", className)}>
      {/* Germany Map as background with brand colors */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src="/assets/germany-map.svg"
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
            <Link href={location.href}>
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
                x={location.x - 55}
                y={location.y - 50}
                width="110"
                height="28"
                rx="14"
                fill={activeLocation === location.name ? "hsl(var(--foreground))" : "hsl(var(--background) / 0.9)"}
                stroke="hsl(var(--border))"
                strokeWidth="1"
                className="transition-all duration-300"
              />
              <text
                x={location.x}
                y={location.y - 30}
                textAnchor="middle"
                className="font-semibold transition-all duration-300"
                style={{ 
                  fontSize: "18px",
                  fontFamily: "'Lexend', sans-serif",
                  fill: activeLocation === location.name ? "hsl(var(--background))" : "hsl(var(--foreground))",
                }}
              >
                {location.name}
              </text>
            </Link>
          </g>
        ))}
      </svg>
    </div>
  );
}
