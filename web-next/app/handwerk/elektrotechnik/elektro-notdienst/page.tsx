import type { Metadata } from "next";
import ElektroNotdienst from "@/app/leistungen/elektrotechnik/elektro-notdienst/page";

export const metadata: Metadata = {
  title: "Elektrotechnik: Elektro-Notdienst 24/7",
  description: "24/7 Elektro-Notdienst: Schnelle Hilfe bei Stromausfall, Kurzschluss und elektrischen Gefahrensituationen. In 60-90 Minuten vor Ort.",
  alternates: {
    canonical: "/handwerk/elektrotechnik/elektro-notdienst",
  },
};

export default function HandwerkElektrotechnikElektroNotdienst() {
  return <ElektroNotdienst />;
}
