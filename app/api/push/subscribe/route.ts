import { NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import type { PushSubscriptionInput } from "@/lib/push/types";

export const dynamic = "force-dynamic";

type Body = {
  subscription?: PushSubscriptionInput | null;
  userAgent?: string | null;
};

export async function POST(request: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(request);
    if (!sessionUser) {
      return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
    }

    const body = (await request.json()) as Body;
    const subscription = body.subscription;
    if (!subscription?.endpoint || !subscription.keys?.p256dh || !subscription.keys?.auth) {
      return NextResponse.json({ error: "Ungültige Subscription." }, { status: 400 });
    }

    const admin = createServiceRoleClient();
    const now = new Date().toISOString();
    const { error } = await admin.from("push_subscriptions").upsert(
      {
        user_id: sessionUser.id,
        role: sessionUser.role,
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
        user_agent: typeof body.userAgent === "string" ? body.userAgent : null,
        last_seen_at: now,
        updated_at: now,
        is_active: true,
      },
      { onConflict: "endpoint" }
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unbekannter Fehler" },
      { status: 500 }
    );
  }
}
