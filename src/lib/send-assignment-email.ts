import { Resend } from "resend";
import type { UserRole } from "@/lib/auth-types";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { getPushSiteUrl } from "@/lib/push/config";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const fromEmail = process.env.RESEND_FROM ?? "Handwerk München <noreply@handwerkmuenchen.de>";

export async function sendAssignmentFallbackEmail(options: {
  role: UserRole;
  title: string;
  body: string;
  deepLink: string;
}): Promise<{ sent: number; error?: string }> {
  if (!resend) return { sent: 0 };

  try {
    const admin = createServiceRoleClient();
    const { data: profiles, error: profileError } = await admin
      .from("profiles")
      .select("id, display_name, role")
      .eq("role", options.role);

    if (profileError) {
      return { sent: 0, error: profileError.message };
    }

    const ids = (profiles ?? []).map((profile) => String(profile.id));
    if (ids.length === 0) return { sent: 0 };

    const userPages = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (userPages.error) {
      return { sent: 0, error: userPages.error.message };
    }

    const profileById = new Map(
      (profiles ?? []).map((profile) => [
        String(profile.id),
        {
          displayName: typeof profile.display_name === "string" ? profile.display_name : null,
        },
      ])
    );

    const recipients = userPages.data.users
      .filter((user) => ids.includes(user.id) && user.email)
      .map((user) => ({
        email: user.email as string,
        displayName:
          profileById.get(user.id)?.displayName ??
          (typeof user.user_metadata?.display_name === "string" ? user.user_metadata.display_name : null),
      }));

    if (recipients.length === 0) return { sent: 0 };

    const fullUrl = new URL(options.deepLink, getPushSiteUrl()).toString();
    let sent = 0;

    for (const recipient of recipients) {
      const greeting = recipient.displayName ? `Hallo ${recipient.displayName},` : "Hallo,";
      const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; line-height: 1.6; color: #334155; max-width: 480px; margin: 0 auto; padding: 24px;">
  <p>${greeting}</p>
  <p><strong>${options.title}</strong></p>
  <p>${options.body}</p>
  <p><a href="${fullUrl}" style="color: #0f766e;">Auftrag in der PWA öffnen</a></p>
  <p style="margin-top: 24px; color: #64748b; font-size: 14px;">Diese E-Mail wurde automatisch versendet.</p>
</body>
</html>
      `.trim();

      const { error } = await resend.emails.send({
        from: fromEmail,
        to: recipient.email,
        subject: options.title,
        html,
      });

      if (!error) {
        sent += 1;
      }
    }

    return { sent };
  } catch (error) {
    return {
      sent: 0,
      error: error instanceof Error ? error.message : "Unbekannter Fehler",
    };
  }
}
