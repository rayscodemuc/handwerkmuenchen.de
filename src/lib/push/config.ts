const DEFAULT_SITE_URL = "https://handwerkmuenchen.de";

export function getPushSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
}

export function getPushVapidPublicKey(): string {
  return process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "";
}

export function getPushVapidPrivateKey(): string {
  return process.env.VAPID_PRIVATE_KEY ?? "";
}

export function getPushVapidSubject(): string {
  return process.env.VAPID_SUBJECT ?? "mailto:noreply@handwerkmuenchen.de";
}

export function isServerPushConfigured(): boolean {
  return Boolean(getPushVapidPublicKey() && getPushVapidPrivateKey());
}
