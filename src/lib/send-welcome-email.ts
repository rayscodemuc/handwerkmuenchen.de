import { Resend } from "resend";
import { USER_ROLE_OPTIONS } from "@/lib/auth-types";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const fromEmail = process.env.RESEND_FROM ?? "Handwerk München <noreply@handwerkmuenchen.de>";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://handwerkmuenchen.de";

/**
 * Sendet eine Willkommens-Mail an neu angelegte Nutzer.
 * Kein Fehler, wenn Resend nicht konfiguriert ist – dann wird übersprungen.
 */
export async function sendWelcomeEmail(options: {
  to: string;
  displayName: string | null;
  role: string;
}): Promise<{ sent: boolean; error?: string }> {
  if (!resend) return { sent: false };

  const loginUrl = `${baseUrl}/login`;
  const roleLabel =
    USER_ROLE_OPTIONS.find((o) => o.value === options.role)?.label ?? options.role;
  const greeting = options.displayName ? `Hallo ${options.displayName},` : "Hallo,";

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; line-height: 1.6; color: #334155; max-width: 480px; margin: 0 auto; padding: 24px;">
  <p>${greeting}</p>
  <p>Ihr Konto im Auftragsverwaltungs-System wurde angelegt (Rolle: ${roleLabel}).</p>
  <p>Sie können sich unter folgender Adresse anmelden:</p>
  <p><a href="${loginUrl}" style="color: #0ea5e9;">${loginUrl}</a></p>
  <p>Das Passwort erhalten Sie von Ihrem Administrator.</p>
  <p style="margin-top: 24px; color: #64748b; font-size: 14px;">Diese E-Mail wurde automatisch versendet.</p>
</body>
</html>
  `.trim();

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: options.to,
      subject: "Ihr Konto wurde angelegt – Handwerk München",
      html,
    });
    if (error) return { sent: false, error: error.message };
    return { sent: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unbekannter Fehler";
    return { sent: false, error: msg };
  }
}
