import { STATUS } from "@/src/config/businessConfig";

/** Diese Board-Status setzen voraus, dass ein Kalender-Termin existiert. */
const REQUIRES_TERMIN = new Set<string>([
  STATUS.EINGETEILT,
  STATUS.BESICHTIGUNG,
  STATUS.AUSFUEHRUNG,
]);

/** true, wenn ohne termin_start der Status nicht mehr zum Auftrag passt (z. B. nach gelöschtem Termin). */
export function boardStatusInconsistentWithoutTermin(
  boardStatus: string | null | undefined,
  terminStart: string | null | undefined
): boolean {
  if ((terminStart ?? "").trim() !== "") return false;
  const s = (boardStatus ?? "").trim();
  return REQUIRES_TERMIN.has(s);
}
