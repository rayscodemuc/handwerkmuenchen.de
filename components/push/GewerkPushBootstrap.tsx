"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, RefreshCw } from "lucide-react";
import { authFetch } from "@/lib/supabase/auth-fetch";
import { getPushVapidPublicKey } from "@/lib/push/config";
import { isGewerkRole } from "@/lib/auftraege/role-to-gewerk";
import { useAdminUser } from "@/app/admin/AdminUserContext";
import { Button } from "@/components/ui/button";

function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = `${base64String}${padding}`.replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0))).buffer as ArrayBuffer;
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;
  return navigator.serviceWorker.register("/sw.js");
}

type DebugState = {
  permission: NotificationPermission | "unsupported";
  serviceWorker: "registered" | "missing";
  subscription: "present" | "missing" | "unknown";
  lastSync: string | null;
  lastError: string | null;
  endpointPreview: string | null;
};

export function GewerkPushBootstrap() {
  const user = useAdminUser();
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [busy, setBusy] = useState(false);
  const [debugBusy, setDebugBusy] = useState(false);
  const [debug, setDebug] = useState<DebugState>({
    permission: "unsupported",
    serviceWorker: "missing",
    subscription: "unknown",
    lastSync: null,
    lastError: null,
    endpointPreview: null,
  });
  const publicKey = useMemo(() => getPushVapidPublicKey(), []);
  const promptKey = user ? `push-prompt-dismissed:${user.id}` : "";

  useEffect(() => {
    if (!user || !isGewerkRole(user.role)) return;
    if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) return;
    if (!publicKey) return;

    let cancelled = false;

    const syncSubscription = async (swRegistration: ServiceWorkerRegistration) => {
      const existing = await swRegistration.pushManager.getSubscription();
      setDebug((prev) => ({
        ...prev,
        permission: Notification.permission,
        serviceWorker: "registered",
        subscription: existing ? "present" : "missing",
        endpointPreview: existing?.endpoint ? `${existing.endpoint.slice(0, 48)}...` : null,
      }));
      if (!existing) return;

      const response = await authFetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription: existing.toJSON(),
          userAgent: navigator.userAgent,
        }),
      });
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setDebug((prev) => ({
        ...prev,
        lastSync: response.ok ? new Date().toLocaleTimeString("de-DE") : prev.lastSync,
        lastError: response.ok ? null : payload?.error ?? "Subscribe fehlgeschlagen",
      }));
    };

    void (async () => {
      const swRegistration = await registerServiceWorker();
      if (cancelled || !swRegistration) return;
      setRegistration(swRegistration);
      setDebug((prev) => ({
        ...prev,
        permission: Notification.permission,
        serviceWorker: "registered",
      }));

      if (Notification.permission === "granted") {
        await syncSubscription(swRegistration);
        setShowBanner(false);
        return;
      }

      if (Notification.permission === "denied") {
        const existing = await swRegistration.pushManager.getSubscription();
        if (existing) {
          await authFetch("/api/push/unsubscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subscription: existing.toJSON() }),
          });
        }
        setDebug((prev) => ({
          ...prev,
          permission: "denied",
          subscription: existing ? "present" : "missing",
        }));
        setShowBanner(false);
        return;
      }

      setShowBanner(window.localStorage.getItem(promptKey) !== "dismissed");
    })();

    return () => {
      cancelled = true;
    };
  }, [promptKey, publicKey, user]);

  if (!user || !isGewerkRole(user.role) || !showBanner || !registration || !publicKey) {
    return user && isGewerkRole(user.role) ? (
      <div className="fixed inset-x-3 bottom-3 z-[120] sm:left-auto sm:right-4 sm:max-w-md">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/96 p-4 text-slate-100 shadow-2xl backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-slate-800 p-2 text-slate-200">
              <Bell className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Push-Status</p>
              <div className="mt-2 space-y-1 text-xs text-slate-300">
                <p>Permission: <span className="font-medium text-slate-100">{debug.permission}</span></p>
                <p>Service Worker: <span className="font-medium text-slate-100">{debug.serviceWorker}</span></p>
                <p>Subscription: <span className="font-medium text-slate-100">{debug.subscription}</span></p>
                <p>Letzter Sync: <span className="font-medium text-slate-100">{debug.lastSync ?? "noch keiner"}</span></p>
                {debug.endpointPreview ? <p className="break-all text-[11px] text-slate-400">{debug.endpointPreview}</p> : null}
                {debug.lastError ? <p className="text-rose-300">{debug.lastError}</p> : null}
              </div>
              {registration ? (
                <div className="mt-3 flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={debugBusy}
                    onClick={async () => {
                      setDebugBusy(true);
                      try {
                        const existing = await registration.pushManager.getSubscription();
                        setDebug((prev) => ({
                          ...prev,
                          permission: Notification.permission,
                          serviceWorker: "registered",
                          subscription: existing ? "present" : "missing",
                          endpointPreview: existing?.endpoint ? `${existing.endpoint.slice(0, 48)}...` : null,
                        }));
                        if (existing) {
                          const response = await authFetch("/api/push/subscribe", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              subscription: existing.toJSON(),
                              userAgent: navigator.userAgent,
                            }),
                          });
                          const payload = (await response.json().catch(() => null)) as { error?: string } | null;
                          setDebug((prev) => ({
                            ...prev,
                            lastSync: response.ok ? new Date().toLocaleTimeString("de-DE") : prev.lastSync,
                            lastError: response.ok ? null : payload?.error ?? "Subscribe fehlgeschlagen",
                          }));
                        }
                      } finally {
                        setDebugBusy(false);
                      }
                    }}
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Status prüfen
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }

  const enablePush = async () => {
    setBusy(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        window.localStorage.setItem(promptKey, "dismissed");
        setShowBanner(false);
        return;
      }

      const existing = await registration.pushManager.getSubscription();
      const subscription =
        existing ??
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey),
        }));

      await authFetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          userAgent: navigator.userAgent,
        }),
      });

      window.localStorage.setItem(promptKey, "enabled");
      setShowBanner(false);
    } finally {
      setBusy(false);
    }
  };

  const dismiss = () => {
    window.localStorage.setItem(promptKey, "dismissed");
    setShowBanner(false);
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-[120] sm:left-auto sm:right-4 sm:max-w-md">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/96 p-4 text-slate-100 shadow-2xl backdrop-blur">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-teal-500/15 p-2 text-teal-300">
            <Bell className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Push aktivieren</p>
            <p className="mt-1 text-sm text-slate-300">
              Erhalte neue Aufträge direkt auf dieses Gerät, sobald dir ein Auftrag zugeteilt wird.
            </p>
            <div className="mt-3 flex gap-2">
              <Button type="button" onClick={enablePush} disabled={busy} className="bg-teal-600 hover:bg-teal-700">
                {busy ? "Wird aktiviert..." : "Push aktivieren"}
              </Button>
              <Button type="button" variant="outline" onClick={dismiss} disabled={busy}>
                Später
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
