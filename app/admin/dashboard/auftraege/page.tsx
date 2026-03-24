import { redirect } from "next/navigation";

/** Aufträge für Gewerk-Nutzer sind ins Haupt-Dashboard integriert. */
export default function AuftraegePageRedirect() {
  redirect("/admin/dashboard");
}
