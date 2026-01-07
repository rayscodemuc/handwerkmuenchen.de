import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Location {
  name: string;
  x: number;
  y: number;
  description: string;
  href: string;
}

// Coordinates mapped to the accurate Germany SVG viewBox
const locations: Location[] = [
  { name: "München", x: 450, y: 680, description: "Hauptsitz", href: "/standorte/muenchen" },
  { name: "Augsburg", x: 400, y: 640, description: "Servicebereich", href: "/standorte/augsburg" },
  { name: "Ingolstadt", x: 430, y: 590, description: "Servicebereich", href: "/standorte/ingolstadt" },
  { name: "Nürnberg", x: 420, y: 510, description: "Servicebereich", href: "/standorte/nuernberg" },
  { name: "Frankfurt", x: 310, y: 440, description: "Servicebereich", href: "/standorte/frankfurt" },
  { name: "Hamburg", x: 365, y: 165, description: "Servicebereich", href: "/standorte/hamburg" },
  { name: "Berlin", x: 530, y: 240, description: "Servicebereich", href: "/standorte/berlin" },
];

export function GermanyMap({ className }: { className?: string }) {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 650 850"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="germanyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.25)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.15)" />
          </linearGradient>
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.15"/>
          </filter>
        </defs>

        {/* Accurate Germany outline */}
        <path
          d="M310 45 L330 42 L355 48 L380 55 L405 52 L430 58 L455 65 L480 72 L505 68 L530 75 L555 82 L575 95 L590 115 L598 140 L595 165 L588 190 L580 215 L575 240 L582 265 L590 290 L585 315 L575 340 L565 365 L558 390 L565 415 L575 440 L580 465 L572 490 L560 515 L545 540 L530 565 L518 590 L510 615 L498 640 L485 665 L468 690 L450 715 L430 735 L408 750 L385 760 L360 765 L335 758 L310 745 L288 725 L270 700 L255 675 L242 650 L230 625 L218 600 L205 575 L192 550 L178 525 L165 500 L152 475 L140 450 L128 425 L118 400 L110 375 L105 350 L102 325 L100 300 L105 275 L115 250 L128 225 L142 200 L158 178 L175 158 L195 140 L218 125 L242 112 L268 100 L292 85 L310 65 Z
          M370 85 L385 78 L400 82 L412 92 L405 105 L390 110 L375 105 L365 95 Z"
          fill="url(#germanyGradient)"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          filter="url(#dropShadow)"
          className="transition-colors duration-300"
        />

        {/* State borders - subtle internal lines */}
        <g stroke="hsl(var(--primary) / 0.2)" strokeWidth="1" fill="none">
          {/* Bavaria border */}
          <path d="M320 500 Q380 480 440 510 Q480 540 500 600 Q490 660 450 700" />
          {/* Baden-Württemberg border */}
          <path d="M200 550 Q260 520 320 540 Q350 580 340 640" />
          {/* Hessen/Thuringia */}
          <path d="M280 380 Q340 360 400 390 Q430 420 420 470" />
          {/* Lower Saxony / Schleswig-Holstein */}
          <path d="M200 280 Q280 260 360 280 Q400 300 380 350" />
          {/* Brandenburg */}
          <path d="M450 200 Q500 180 550 210 Q570 260 540 320" />
          {/* Saxony */}
          <path d="M480 350 Q530 340 570 370 Q580 420 550 460" />
        </g>

        {/* Cities - major reference points (subtle) */}
        <g fill="hsl(var(--muted-foreground) / 0.3)">
          <circle cx="280" cy="580" r="3" /> {/* Stuttgart */}
          <circle cx="225" cy="470" r="3" /> {/* Köln */}
          <circle cx="185" cy="420" r="3" /> {/* Düsseldorf */}
          <circle cx="540" cy="400" r="3" /> {/* Dresden */}
          <circle cx="480" cy="360" r="3" /> {/* Leipzig */}
          <circle cx="350" cy="310" r="3" /> {/* Hannover */}
          <circle cx="160" cy="240" r="3" /> {/* Bremen */}
        </g>

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
                r={activeLocation === location.name ? 28 : 16}
                fill="hsl(var(--primary) / 0.25)"
                className="transition-all duration-300"
              >
                {activeLocation === location.name && (
                  <animate
                    attributeName="r"
                    values="16;32;16"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
              
              {/* Outer ring */}
              <circle
                cx={location.x}
                cy={location.y}
                r={activeLocation === location.name ? 14 : 11}
                fill="hsl(var(--background))"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                className="transition-all duration-300"
              />

              {/* Inner dot */}
              <circle
                cx={location.x}
                cy={location.y}
                r={activeLocation === location.name ? 7 : 5}
                fill="hsl(var(--foreground))"
                className="transition-all duration-300"
              />

              {/* Location label */}
              <text
                x={location.x}
                y={location.y - 22}
                textAnchor="middle"
                className="font-semibold fill-foreground transition-all duration-300"
                style={{ 
                  fontSize: activeLocation === location.name ? "16px" : "13px",
                  opacity: activeLocation === location.name ? 1 : 0.8,
                  fontFamily: "'Lexend', sans-serif"
                }}
              >
                {location.name}
              </text>
              
              {/* Description on hover */}
              {activeLocation === location.name && (
                <text
                  x={location.x}
                  y={location.y + 35}
                  textAnchor="middle"
                  className="fill-muted-foreground"
                  style={{ 
                    fontSize: "11px",
                    fontFamily: "'Lexend', sans-serif"
                  }}
                >
                  {location.description}
                </text>
              )}
            </Link>
          </g>
        ))}

        {/* Legend */}
        <g transform="translate(30, 780)">
          <circle cx="10" cy="10" r="6" fill="hsl(var(--foreground))" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x="25" y="14" className="fill-muted-foreground" style={{ fontSize: "12px", fontFamily: "'Lexend', sans-serif" }}>
            Unsere Standorte
          </text>
        </g>
      </svg>
    </div>
  );
}
