import type { Metadata } from "next";
import ServiceWartung from "@/app/leistungen/service-wartung/page";

export const metadata: Metadata = {
  title: "Handwerk: Service & Wartung",
  description: "Gewerkübergreifende Anlagenwartung nach DIN 31051. Maximale Verfügbarkeit, planbare Kosten und volle Rechtssicherheit.",
  alternates: {
    canonical: "/handwerk/service-wartung",
  },
};

export default function HandwerkServiceWartung() {
  return <ServiceWartung />;
}
