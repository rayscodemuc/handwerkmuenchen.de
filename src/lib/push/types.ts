import type { UserRole } from "@/lib/auth-types";

export type PushSubscriptionInput = {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
};

export type PushSubscriptionRecord = {
  id: string;
  user_id: string;
  role: UserRole;
  endpoint: string;
  p256dh: string;
  auth: string;
  user_agent: string | null;
  last_seen_at: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type PushPayload = {
  title: string;
  body: string;
  url: string;
  tag?: string;
  data?: Record<string, unknown>;
};

export type NotificationProvider = {
  send: (
    subscription: PushSubscriptionInput,
    payload: PushPayload
  ) => Promise<{ ok: boolean; invalid?: boolean; error?: string }>;
};

export type NotificationSendResult = {
  sent: number;
  invalidated: number;
  emailed: number;
  errors: string[];
};
