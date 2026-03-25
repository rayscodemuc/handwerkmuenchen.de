"use client";

import { useCallback, useEffect, useState } from "react";
import { KeyRound, Mail, Trash2 } from "lucide-react";
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

function isGewerkRole(role: UserRole): boolean {
  return role.startsWith("gewerk_");
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
  const [userToDelete, setUserToDelete] = useState<AdminUserRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
        body: JSON.stringify({
          user_id: resetUser.id,
          email: resetUser.email ?? "",
          password: resetPassword,
        }),
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

  const handleConfirmDeleteGewerkUser = async () => {
    if (!userToDelete) return;
    setFormError(null);
    setFormSuccess(null);
    setDeletingId(userToDelete.id);
    try {
      const res = await fetch(`/api/admin/users/${encodeURIComponent(userToDelete.id)}`, {
        method: "DELETE",
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        setFormError(json.error ?? "Löschen fehlgeschlagen.");
        return;
      }
      setFormSuccess(`Gewerk-Nutzer ${userToDelete.email ?? userToDelete.id} wurde gelöscht.`);
      setUserToDelete(null);
      await loadUsers();
    } catch {
      setFormError("Netzwerkfehler");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-10">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">Neuen Nutzer anlegen</h2>
        <p className="mt-1 text-sm text-slate-600">
          Gewerk-Nutzer sehen nur Aufträge, deren Kanban-Karte ihr Gewerk enthält. Admin sieht alles.
        </p>
        <form onSubmit={(e) => void handleCreate(e)} className="mt-6 space-y-4">
          {formError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {formError}
            </div>
          )}
          {formSuccess && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              {formSuccess}
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nu-email">E-Mail</Label>
              <Input
                id="nu-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nu-pass">Passwort (min. 8 Zeichen)</Label>
              <Input
                id="nu-pass"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nu-name">Anzeigename (optional)</Label>
              <Input
                id="nu-name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Rolle</Label>
              <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {USER_ROLE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" disabled={creating}>
            {creating ? "Wird angelegt…" : "Nutzer anlegen"}
          </Button>
        </form>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Bestehende Nutzer</h2>
          <Button type="button" variant="outline" onClick={() => void loadUsers()} disabled={loading}>
            Aktualisieren
          </Button>
        </div>
        {listError && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {listError}
          </div>
        )}
        {loading ? (
          <p className="text-sm text-slate-500">Lade Nutzer…</p>
        ) : users.length === 0 ? (
          <p className="text-sm text-slate-500">Keine Nutzer gefunden.</p>
        ) : (
          <>
            {/* Mobil: gleiche Infos wie Tabelle, ohne horizontales Scrollen */}
            <ul className="flex flex-col gap-3 sm:hidden">
              {users.map((u) => (
                <li
                  key={u.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <p className="break-words text-sm font-semibold text-slate-900">{u.email ?? "–"}</p>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div className="flex gap-2">
                      <dt className="w-24 shrink-0 text-slate-500">Rolle</dt>
                      <dd className="min-w-0 text-slate-800">{roleLabel(u.role)}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-24 shrink-0 text-slate-500">Name</dt>
                      <dd className="min-w-0 text-slate-700">{u.display_name ?? "–"}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-24 shrink-0 text-slate-500">Angelegt</dt>
                      <dd className="min-w-0 tabular-nums text-slate-600">
                        {u.created_at
                          ? new Date(u.created_at).toLocaleString("de-DE", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "–"}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="min-h-11 touch-manipulation"
                      onClick={() => handleOpenReset(u)}
                      disabled={u.id === currentUser?.id}
                    >
                      <KeyRound className="mr-2 h-4 w-4" />
                      Passwort
                    </Button>
                    {u.email?.trim() ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="min-h-11 touch-manipulation"
                        onClick={() => void handleResendEmail(u)}
                        disabled={resendingId === u.id}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        {resendingId === u.id ? "Sende…" : "E-Mail"}
                      </Button>
                    ) : null}
                    {isGewerkRole(u.role) && u.id !== currentUser?.id ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="min-h-11 touch-manipulation border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                        onClick={() => {
                          setFormError(null);
                          setFormSuccess(null);
                          setUserToDelete(u);
                        }}
                        disabled={deletingId === u.id}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {deletingId === u.id ? "Löschen…" : "Löschen"}
                      </Button>
                    ) : null}
                  </div>
                  {u.id === currentUser?.id && (
                    <p className="mt-2 text-xs text-slate-500">
                      Eigenes Passwort nur über „Passwort vergessen“ auf der Anmeldeseite änderbar.
                    </p>
                  )}
                </li>
              ))}
            </ul>

            <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm sm:block">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">E-Mail</th>
                    <th className="px-4 py-3 font-medium">Rolle</th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Angelegt</th>
                    <th className="min-w-[8rem] px-4 py-3 font-medium">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {users.map((u) => (
                    <tr key={u.id} className="text-slate-800 transition-colors hover:bg-slate-50/80">
                      <td className="px-4 py-3">{u.email ?? "–"}</td>
                      <td className="px-4 py-3 text-slate-700">{roleLabel(u.role)}</td>
                      <td className="px-4 py-3 text-slate-600">{u.display_name ?? "–"}</td>
                      <td className="px-4 py-3 text-slate-500">
                        {u.created_at ? new Date(u.created_at).toLocaleString("de-DE") : "–"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
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
                              className="h-9 w-9 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
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
                          {isGewerkRole(u.role) && u.id !== currentUser?.id ? (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 text-red-600 hover:bg-red-50 hover:text-red-800"
                              onClick={() => {
                                setFormError(null);
                                setFormSuccess(null);
                                setUserToDelete(u);
                              }}
                              disabled={deletingId === u.id}
                              aria-label={`Gewerk-Nutzer ${u.email ?? u.id} löschen`}
                              title="Gewerk-Nutzer löschen"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      <Dialog open={!!userToDelete} onOpenChange={(o) => !o && setUserToDelete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Gewerk-Nutzer löschen</DialogTitle>
          </DialogHeader>
          {userToDelete && (
            <>
              <p className="text-sm text-muted-foreground">
                Soll der Zugang für{" "}
                <strong className="text-foreground">{userToDelete.email ?? userToDelete.id}</strong>{" "}
                (<span className="text-foreground">{roleLabel(userToDelete.role)}</span>) dauerhaft gelöscht werden?
                Dies kann nicht rückgängig gemacht werden.
              </p>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button type="button" variant="outline" onClick={() => setUserToDelete(null)}>
                  Abbrechen
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => void handleConfirmDeleteGewerkUser()}
                  disabled={!!deletingId}
                >
                  {deletingId ? "Wird gelöscht…" : "Endgültig löschen"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!resetUser} onOpenChange={(o) => !o && setResetUser(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Passwort zurücksetzen</DialogTitle>
          </DialogHeader>
          {resetUser && (
            <>
              <p className="text-sm text-muted-foreground">
                Neues Passwort für <strong className="text-foreground">{resetUser.email}</strong>:
              </p>
              <div className="space-y-2">
                <Label htmlFor="reset-pass">Neues Passwort (min. 8 Zeichen)</Label>
                <Input
                  id="reset-pass"
                  type="password"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="••••••••"
                />
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button type="button" variant="outline" onClick={() => setResetUser(null)}>
                  Abbrechen
                </Button>
                <Button
                  type="button"
                  onClick={() => void handleResetPassword()}
                  disabled={resetPassword.length < 8 || resetting}
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
