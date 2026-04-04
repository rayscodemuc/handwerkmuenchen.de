import webpush from "web-push";
import { getPushVapidPrivateKey, getPushVapidPublicKey, getPushVapidSubject, isServerPushConfigured } from "@/lib/push/config";
import type { NotificationProvider, PushPayload, PushSubscriptionInput } from "@/lib/push/types";

let configured = false;

function ensureConfigured() {
  if (configured || !isServerPushConfigured()) return;
  webpush.setVapidDetails(
    getPushVapidSubject(),
    getPushVapidPublicKey(),
    getPushVapidPrivateKey()
  );
  configured = true;
}

async function send(subscription: PushSubscriptionInput, payload: PushPayload) {
  if (!isServerPushConfigured()) {
    return { ok: false, error: "Web-Push ist nicht konfiguriert." };
  }

  ensureConfigured();

  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    return { ok: true };
  } catch (error) {
    const statusCode =
      typeof error === "object" && error && "statusCode" in error
        ? Number((error as { statusCode?: number }).statusCode)
        : undefined;
    const body =
      typeof error === "object" && error && "body" in error
        ? String((error as { body?: string }).body ?? "")
        : "";
    return {
      ok: false,
      invalid: statusCode === 404 || statusCode === 410,
      error:
        body ||
        (error instanceof Error ? error.message : "Unbekannter Web-Push-Fehler"),
    };
  }
}

export function createWebPushProvider(): NotificationProvider {
  return { send };
}
