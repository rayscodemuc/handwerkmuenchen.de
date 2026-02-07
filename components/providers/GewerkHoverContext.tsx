"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type GewerkHoverKey = "elektro" | "sanitaer" | "innenausbau" | "reinigung-facility" | null;

type GewerkHoverContextValue = {
  hoveredGewerk: GewerkHoverKey;
  setHoveredGewerk: (value: GewerkHoverKey) => void;
};

const GewerkHoverContext = createContext<GewerkHoverContextValue | null>(null);

/** Map Header nav item name to data-gewerk-hover value. */
export function getGewerkHoverKey(name: string): GewerkHoverKey {
  switch (name) {
    case "Elektrotechnik":
      return "elektro";
    case "Sanitär & Heizung":
      return "sanitaer";
    case "Innenausbau":
      return "innenausbau";
    case "Reinigung":
    case "Facility":
    case "Reinigung & Facility":
      return "reinigung-facility";
    default:
      return null;
  }
}

export function GewerkHoverProvider({ children }: { children: ReactNode }) {
  const [hoveredGewerk, setHoveredGewerk] = useState<GewerkHoverKey>(null);
  return (
    <GewerkHoverContext.Provider value={{ hoveredGewerk, setHoveredGewerk }}>
      {children}
    </GewerkHoverContext.Provider>
  );
}

export function useGewerkHover() {
  const ctx = useContext(GewerkHoverContext);
  return (
    ctx ?? {
      hoveredGewerk: null as GewerkHoverKey,
      setHoveredGewerk: () => {},
    }
  );
}
