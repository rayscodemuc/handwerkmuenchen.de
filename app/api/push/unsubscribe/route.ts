import { NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import type { PushSubscriptionInput } from "@/lib/push/types";

export const dynamic = "force-dynamic";

type Body = {
  endpoint?: string | null;
  subscription?: PushSubscriptionInput | null;
};

export async function POST(request: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(request);
    if (!sessionUser) {
      return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
    }

    const body = (await request.json()) as Body;
    const endpoint = body.endpoint?.trim() || body.subscription?.endpoint?.trim() || "";
    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint fehlt." }, { status: 400 });
    }

    const admin = createServiceRoleClient();
    const now = new Date().toISOString();
    const { error } = await admin
      .from("push_subscriptions")
      .update({ is_active: false, updated_at: now, last_seen_at: now })
      .eq("user_id", sessionUser.id)
      .eq("endpoint", endpoint);

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
