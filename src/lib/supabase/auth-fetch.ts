"use client";

import { createClient } from "@/lib/supabase/client";

/**
 * fetch() zu eigenen API-Routen mit Supabase-Access-Token im Authorization-Header.
 * Ergänzt Cookies, falls Route Handler die Session aus Cookies nicht lesen kann.
 */
export async function authFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const headers = new Headers(init?.headers);
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }
  return fetch(input, {
    ...init,
    credentials: init?.credentials ?? "include",
    headers,
  });
}
