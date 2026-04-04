import type { NotificationProvider } from "@/lib/push/types";
import { createWebPushProvider } from "@/lib/push/web-push-provider";

export function getNotificationProvider(): NotificationProvider {
  return createWebPushProvider();
}
