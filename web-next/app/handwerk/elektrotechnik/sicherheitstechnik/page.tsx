import type { Metadata } from "next";
import Sicherheitstechnik from "@/app/leistungen/elektrotechnik/sicherheitstechnik/page";

export const metadata: Metadata = {
  title: "Elektrotechnik: Sicherheitstechnik & Videoüberwachung",
  description: "Professionelle Sicherheitstechnik: Videoüberwachung, Alarmanlagen und Zutrittskontrolle für Gewerbe und Wohnanlagen. VdS-zertifiziert.",
  alternates: {
    canonical: "/handwerk/elektrotechnik/sicherheitstechnik",
  },
};

export default function HandwerkElektrotechnikSicherheitstechnik() {
  return <Sicherheitstechnik />;
}
