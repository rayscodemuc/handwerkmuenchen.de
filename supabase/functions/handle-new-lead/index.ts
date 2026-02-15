// Supabase Edge Function: handle-new-lead
// Modus: Database Webhook für die Tabelle `tickets`
// Architektur:
//   Frontend -> Insert in `tickets` -> DB-Webhook -> diese Function -> E-Mail / Slack
//
// WICHTIG:
// - Die Funktion schreibt NICHT mehr in die Datenbank.
// - Sie reagiert nur noch auf Webhook-Events (z.B. INSERT auf `tickets`).

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

interface TicketsRecord {
  id: string;
  company_id: string;
  status: string | null;
  customer_name?: string | null;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  additional_data?: Record<string, Json> | null;
  created_at?: string | null;
}

interface DbWebhookPayload<R = TicketsRecord> {
  type: "INSERT" | "UPDATE" | "DELETE" | string;
  table: string;
  schema: string;
  record: R | null;
  old_record: R | null;
}

// Optional: einfacher Shared-Secret-Check für Webhooks.
// In Supabase im Webhook unter "HTTP headers" z.B. setzen:
//   x-webhook-secret: <DEIN_GEHEIMNIS>
const WEBHOOK_SECRET = Deno.env.get("TICKETS_WEBHOOK_SECRET");

function formatAdditionalData(additional: Record<string, Json> | null | undefined): string {
  if (!additional || Object.keys(additional).length === 0) {
    return "Keine zusätzlichen Angaben.";
  }

  const lines: string[] = [];
  for (const [key, value] of Object.entries(additional)) {
    let rendered: string;
    if (value === null || value === undefined) {
      rendered = "—";
    } else if (typeof value === "object") {
      rendered = JSON.stringify(value);
    } else {
      rendered = String(value);
    }
    lines.push(`- ${key}: ${rendered}`);
  }

  return lines.join("\n");
}

function buildMessageFromRecord(record: TicketsRecord): { subject: string; text: string } {
  const createdAt = record.created_at ?? new Date().toISOString();

  const subject = record.subject
    ? `Neue Anfrage: ${record.subject}`
    : "Neue Anfrage aus dem Ticketsystem";

  const headerLines = [
    `Ticket-ID: ${record.id}`,
    `Company-ID: ${record.company_id}`,
    `Status: ${record.status ?? "Unbekannt"}`,
    `Erstellt am: ${createdAt}`,
    "",
    `Kunde: ${record.customer_name ?? "Unbekannt"}`,
    `E-Mail: ${record.email ?? "—"}`,
    `Telefon: ${record.phone ?? "—"}`,
    "",
  ];

  const additionalBlock = [
    "Zusätzliche Angaben:",
    formatAdditionalData(record.additional_data ?? null),
  ];

  const text = [...headerLines, ...additionalBlock].join("\n");

  return { subject, text };
}

async function sendSlackNotification(message: { subject: string; text: string }) {
  const slackWebhookUrl = Deno.env.get("SLACK_WEBHOOK_URL");
  if (!slackWebhookUrl) return;

  try {
    const res = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `*${message.subject}*\n\`\`\`\n${message.text}\n\`\`\``,
      }),
    });

    if (!res.ok) {
      console.error("Slack Webhook error:", await res.text());
    }
  } catch (err) {
    console.error("Slack Webhook exception:", err);
  }
}

async function sendEmailNotification(message: { subject: string; text: string }) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const RESEND_FROM = Deno.env.get("RESEND_FROM");
  const RESEND_TO = Deno.env.get("RESEND_TO");

  if (!RESEND_API_KEY || !RESEND_FROM || !RESEND_TO) {
    // E-Mail-Konfiguration ist optional – wenn sie fehlt, überspringen wir den Versand.
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [RESEND_TO],
        subject: message.subject,
        text: message.text,
      }),
    });

    if (!res.ok) {
      console.error("Resend API error:", await res.text());
    }
  } catch (err) {
    console.error("Resend API exception:", err);
  }
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  // Optionaler Sicherheits-Check via Shared Secret
  if (WEBHOOK_SECRET) {
    const headerSecret = req.headers.get("x-webhook-secret");
    if (headerSecret !== WEBHOOK_SECRET) {
      return jsonResponse(401, { error: "Unauthorized" });
    }
  }

  let payload: DbWebhookPayload;
  try {
    payload = (await req.json()) as DbWebhookPayload;
  } catch (err) {
    console.error("Invalid JSON payload:", err);
    return jsonResponse(400, { error: "Invalid JSON body" });
  }

  if (!payload || !payload.record) {
    return jsonResponse(400, { error: "Missing record in payload" });
  }

  if (payload.table !== "tickets") {
    // Nur Tickets interessieren uns hier – andere Events ignorieren.
    return jsonResponse(200, {
      skipped: true,
      reason: `Unhandled table: ${payload.table}`,
    });
  }

  if (payload.type !== "INSERT") {
    return jsonResponse(200, {
      skipped: true,
      reason: `Unhandled event type: ${payload.type}`,
    });
  }

  const record = payload.record as TicketsRecord;

  const message = buildMessageFromRecord(record);

  // Parallel versuchen, Slack und/oder E-Mail zu versenden.
  await Promise.all([
    sendSlackNotification(message),
    sendEmailNotification(message),
  ]);

  return jsonResponse(200, {
    success: true,
    handled: true,
  });
});

