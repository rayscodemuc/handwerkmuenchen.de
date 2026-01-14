import type { Metadata } from "next";
import Sanierung from "@/app/leistungen/elektrotechnik/sanierung/page";

export const metadata: Metadata = {
  title: "Elektrotechnik: Elektrosanierung & Modernisierung",
  description: "Elektrosanierung im Altbau: Modernisierung veralteter Installationen, Nachrüstung von FI-Schutzschaltern und Erhöhung der Sicherheit.",
  alternates: {
    canonical: "/handwerk/elektrotechnik/sanierung",
  },
};

export default function HandwerkElektrotechnikSanierung() {
  return <Sanierung />;
}
