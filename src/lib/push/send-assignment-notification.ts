import type { UserRole } from "@/lib/auth-types";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { getNotificationProvider } from "@/lib/push/provider";
import { sendAssignmentFallbackEmail } from "@/lib/send-assignment-email";
import type { NotificationSendResult, PushPayload, PushSubscriptionInput, PushSubscriptionRecord } from "@/lib/push/types";

function trimNotificationBody(input: string): string {
  const collapsed = input.trim().replace(/\s+/g, " ");
  if (!collapsed) return "Ihnen wurde ein neuer Auftrag zugeteilt";
  if (collapsed.length <= 140) return collapsed;
  return `${collapsed.slice(0, 137).trimEnd()}...`;
}

export function buildAssignmentNotificationBody(input: string | null | undefined): string {
  return trimNotificationBody(input ?? "");
}

export async function sendAssignmentNotification(options: {
  role: UserRole;
  auftragId: string;
  title: string;
  body: string;
  deepLink: string;
}): Promise<NotificationSendResult> {
  const admin = createServiceRoleClient();
  const provider = getNotificationProvider();
  const payload: PushPayload = {
    title: options.title,
    body: trimNotificationBody(options.body),
    url: options.deepLink,
    tag: `auftrag-${options.auftragId}`,
    data: { auftragId: options.auftragId, url: options.deepLink },
  };

  const { data, error } = await admin
    .from("push_subscriptions")
    .select("*")
    .eq("role", options.role)
    .eq("is_active", true);

  if (error) {
    const emailResult = await sendAssignmentFallbackEmail({
      role: options.role,
      title: options.title,
      body: payload.body,
      deepLink: options.deepLink,
    });
    return {
      sent: 0,
      invalidated: 0,
      emailed: emailResult.sent,
      errors: [error.message, ...(emailResult.error ? [emailResult.error] : [])],
    };
  }

  const subscriptions = (data ?? []) as PushSubscriptionRecord[];
  const invalidEndpoints: string[] = [];
  const errors: string[] = [];
  let sent = 0;

  for (const row of subscriptions) {
    const subscription: PushSubscriptionInput = {
      endpoint: row.endpoint,
      keys: {
        p256dh: row.p256dh,
        auth: row.auth,
      },
    };

    const result = await provider.send(subscription, payload);
    if (result.ok) {
      sent += 1;
      continue;
    }
    if (result.invalid) {
      invalidEndpoints.push(row.endpoint);
      continue;
    }
    if (result.error) {
      errors.push(result.error);
    }
  }

  if (invalidEndpoints.length > 0) {
    await admin
      .from("push_subscriptions")
      .update({ is_active: false, updated_at: new Date().toISOString(), last_seen_at: new Date().toISOString() })
      .in("endpoint", invalidEndpoints);
  }

  let emailed = 0;
  if (sent === 0) {
    const emailResult = await sendAssignmentFallbackEmail({
      role: options.role,
      title: options.title,
      body: payload.body,
      deepLink: options.deepLink,
    });
    emailed = emailResult.sent;
    if (emailResult.error) errors.push(emailResult.error);
  }

  return {
    sent,
    invalidated: invalidEndpoints.length,
    emailed,
    errors,
  };
}
