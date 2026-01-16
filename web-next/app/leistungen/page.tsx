import { permanentRedirect } from "next/navigation";

/**
 * Redirect-Seite für /leistungen
 * Leitet permanent auf /reinigung weiter
 */
export default function LeistungenRedirectPage() {
  permanentRedirect("/reinigung");
}
