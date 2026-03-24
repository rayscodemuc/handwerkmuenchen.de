import { format, isToday, isTomorrow, isValid, parseISO } from "date-fns";
import { de } from "date-fns/locale";

/** Kurztext für kompakte Termin-Zeile (Gewerk-Handy). */
export function formatGewerkTerminKurz(
  startIso: string | null | undefined,
  endIso: string | null | undefined
): string | null {
  const s = (startIso ?? "").trim();
  if (!s) return null;
  const ds = parseISO(s);
  if (!isValid(ds)) return null;
  const e = (endIso ?? "").trim();
  const timeS = format(ds, "HH:mm", { locale: de });
  let timePart = timeS;
  if (e) {
    const de_ = parseISO(e);
    if (isValid(de_)) {
      timePart = `${timeS}–${format(de_, "HH:mm", { locale: de })}`;
    }
  }
  if (isToday(ds)) return `Heute · ${timePart}`;
  if (isTomorrow(ds)) return `Morgen · ${timePart}`;
  return `${format(ds, "EEE dd.MM.", { locale: de })} ${timePart}`;
}
