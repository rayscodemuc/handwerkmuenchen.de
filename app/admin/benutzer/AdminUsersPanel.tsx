"use client";

import { useCallback, useEffect, useState } from "react";
import { KeyRound, Mail } from "lucide-react";
import { useAdminUser } from "@/app/admin/AdminUserContext";
import { USER_ROLE_OPTIONS, type UserRole } from "@/lib/auth-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AdminUserRow = {
  id: string;
  email: string | null;
  role: UserRole;
  display_name: string | null;
  created_at: string;
};

function roleLabel(role: UserRole): string {
  return USER_ROLE_OPTIONS.find((o) => o.value === role)?.label ?? role;
}

export function AdminUsersPanel() {
  const currentUser = useAdminUser();
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<UserRole>("gewerk_elektro");
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [resetUser, setResetUser] = useState<AdminUserRow | null>(null);
  const [resetPassword, setResetPassword] = useState("");
  const [resetting, setResetting] = useState(false);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setListError(null);
    try {
      const res = await fetch("/api/admin/users");
      const json = (await res.json()) as AdminUserRow[] | { error?: string };
      if (!res.ok) {
        setListError(typeof json === "object" && json && "error" in json ? String(json.error) : "Laden fehlgeschlagen");
        setUsers([]);
        return;
      }
      setUsers(Array.isArray(json) ? json : []);
    } catch {
      setListError("Netzwerkfehler");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setCreating(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          role,
          display_name: displayName.trim() || undefined,
        }),
      });
      const json = (await res.json()) as { error?: string; email_sent?: boolean };
      if (!res.ok) {
        setFormError(json.error ?? "Anlegen fehlgeschlagen");
        return;
      }
      setFormSuccess(
        json.email_sent
          ? "Nutzer wurde angelegt. Eine Willkommens-Mail mit Anmelde-Link wurde versendet."
          : "Nutzer wurde angelegt und kann sich sofort anmelden."
      );
      setEmail("");
      setPassword("");
      setDisplayName("");
      await loadUsers();
    } catch {
      setFormError("Netzwerkfehler");
    } finally {
      setCreating(false);
    }
  };

  const handleResendEmail = async (u: AdminUserRow) => {
    if (!u.email?.trim()) return;
    setFormError(null);
    setFormSuccess(null);
    setResendingId(u.id);
    try {
      const res = await fetch("/api/admin/users/resend-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: u.email,
          role: u.role,
          display_name: u.display_name ?? null,
        }),
      });
      const json = (await res.json()) as { error?: string; message?: string };
      if (res.ok) {
        setFormSuccess(json.message ?? "Willkommens-Mail wurde erneut versendet.");
      } else {
        setFormError(json.error ?? "E-Mail konnte nicht versendet werden.");
      }
    } catch {
      setFormError("Netzwerkfehler");
    } finally {
      setResendingId(null);
    }
  };

  const handleOpenReset = (u: AdminUserRow) => {
    setFormError(null);
    setFormSuccess(null);
    setResetUser(u);
    setResetPassword("");
  };

  const handleResetPassword = async () => {
    if (!resetUser || resetPassword.length < 8) return;
    setResetting(true);
    try {
      const res = await fetch("/api/admin/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: resetUser.id, password: resetPassword }),
      });
      const json = (await res.json()) as { error?: string; message?: string };
      if (res.ok) {
        setFormError(null);
        setFormSuccess(json.message ?? "Passwort wurde geändert. Der Nutzer kann sich jetzt anmelden.");
        setResetUser(null);
      } else {
        setFormError(json.error ?? "Passwort konnte nicht geändert werden.");
      }
    } catch {
      setFormError("Netzwerkfehler");
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="space-y-10">
      <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="text-lg font-semibold text-slate-100">Neuen Nutzer anlegen</h2>
        <p className="mt-1 text-sm text-slate-400">
          Gewerk-Nutzer sehen nur Aufträge, deren Kanban-Karte ihr Gewerk enthält. Admin sieht alles.
        </p>
        <form onSubmit={(e) => void handleCreate(e)} className="mt-6 space-y-4">
          {formError && (
            <div className="rounded-lg border border-red-500/40 bg-red-950/30 px-3 py-2 text-sm text-red-200">
              {formError}
            </div>
          )}
          {formSuccess && (
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/30 px-3 py-2 text-sm text-emerald-200">
              {formSuccess}
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nu-email" className="text-slate-300">
                E-Mail
              </Label>
              <Input
                id="nu-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                className="border-slate-600 bg-slate-800 text-slate-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nu-pass" className="text-slate-300">
                Passwort (min. 8 Zeichen)
              </Label>
              <Input
                id="nu-pass"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="border-slate-600 bg-slate-800 text-slate-100"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nu-name" className="text-slate-300">
                Anzeigename (optional)
              </Label>
              <Input
                id="nu-name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="border-slate-600 bg-slate-800 text-slate-100"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Rolle</Label>
              <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                <SelectTrigger className="border-slate-600 bg-slate-800 text-slate-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-900">
                  {USER_ROLE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="text-slate-100 focus:bg-slate-800">
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" disabled={creating} className="bg-slate-100 text-slate-900 hover:bg-white">
            {creating ? "Wird angelegt…" : "Nutzer anlegen"}
          </Button>
        </form>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-100">Bestehende Nutzer</h2>
          <Button
            type="button"
            variant="outline"
            onClick={() => void loadUsers()}
            disabled={loading}
            className="border-slate-600 bg-transparent text-slate-200 hover:bg-slate-800"
          >
            Aktualisieren
          </Button>
        </div>
        {listError && (
          <div className="mb-4 rounded-lg border border-amber-500/40 bg-amber-950/20 px-3 py-2 text-sm text-amber-100">
            {listError}
          </div>
        )}
        {loading ? (
          <p className="text-sm text-slate-500">Lade Nutzer…</p>
        ) : users.length === 0 ? (
          <p className="text-sm text-slate-500">Keine Nutzer gefunden.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">E-Mail</th>
                  <th className="px-4 py-3 font-medium">Rolle</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Angelegt</th>
                  <th className="w-24 px-4 py-3 font-medium">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="bg-slate-900/30 text-slate-200">
                    <td className="px-4 py-3">{u.email ?? "–"}</td>
                    <td className="px-4 py-3 text-slate-300">{roleLabel(u.role)}</td>
                    <td className="px-4 py-3 text-slate-400">{u.display_name ?? "–"}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {u.created_at ? new Date(u.created_at).toLocaleString("de-DE") : "–"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-slate-400 hover:bg-slate-800 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handleOpenReset(u)}
                          disabled={u.id === currentUser?.id}
                          aria-label={
                            u.id === currentUser?.id
                              ? "Eigenes Passwort nur über „Passwort vergessen“ änderbar"
                              : `Passwort für ${u.email} zurücksetzen`
                          }
                          title={
                            u.id === currentUser?.id
                              ? "Eigenes Passwort nur über „Passwort vergessen“ änderbar"
                              : "Passwort zurücksetzen"
                          }
                        >
                          <KeyRound className="h-4 w-4" />
                        </Button>
                        {u.email?.trim() ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            onClick={() => void handleResendEmail(u)}
                            disabled={resendingId === u.id}
                            aria-label={`Willkommens-Mail an ${u.email} erneut senden`}
                            title="Willkommens-Mail erneut senden"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        ) : (
                          <span className="w-9" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Dialog open={!!resetUser} onOpenChange={(o) => !o && setResetUser(null)}>
        <DialogContent className="border-slate-700 bg-slate-900 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-slate-100">
              Passwort zurücksetzen
            </DialogTitle>
          </DialogHeader>
          {resetUser && (
            <>
              <p className="text-sm text-slate-400">
                Neues Passwort für <strong className="text-slate-200">{resetUser.email}</strong>:
              </p>
              <div className="space-y-2">
                <Label htmlFor="reset-pass" className="text-slate-300">
                  Neues Passwort (min. 8 Zeichen)
                </Label>
                <Input
                  id="reset-pass"
                  type="password"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  minLength={8}
                  autoComplete="new-password"
                  className="border-slate-600 bg-slate-800 text-slate-100"
                  placeholder="••••••••"
                />
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setResetUser(null)}
                  className="border-slate-600 text-slate-200"
                >
                  Abbrechen
                </Button>
                <Button
                  type="button"
                  onClick={() => void handleResetPassword()}
                  disabled={resetPassword.length < 8 || resetting}
                  className="bg-slate-100 text-slate-900 hover:bg-white"
                >
                  {resetting ? "Wird gespeichert…" : "Passwort ändern"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
