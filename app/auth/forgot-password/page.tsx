"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const redirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback?next=/auth/reset-password`
          : "";
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo,
      });
      if (resetError) {
        setError(resetError.message);
        return;
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Anfrage fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-sm space-y-8">
          <div className="flex justify-center">
            <Logo variant="header" className="h-10" />
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl backdrop-blur">
            <h1 className="text-center text-xl font-semibold text-slate-100">
              E-Mail gesendet
            </h1>
            <p className="mt-4 text-center text-sm text-slate-400">
              Falls ein Konto mit <strong className="text-slate-300">{email}</strong> existiert,
              haben Sie eine E-Mail mit einem Link zum Zurücksetzen des Passworts erhalten.
              Bitte prüfen Sie auch den Spam-Ordner.
            </p>
            <Link href="/login" className="mt-6 block">
              <Button variant="outline" className="w-full border-slate-600 bg-transparent text-slate-200 hover:bg-slate-800">
                Zurück zur Anmeldung
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex justify-center">
          <Logo variant="header" className="h-10" />
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl backdrop-blur">
          <h1 className="text-center text-xl font-semibold text-slate-100">
            Passwort vergessen
          </h1>
          <p className="mt-2 text-center text-sm text-slate-400">
            Geben Sie Ihre E-Mail-Adresse ein. Sie erhalten einen Link zum Zurücksetzen des Passworts.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <div className="rounded-lg border border-red-500/50 bg-red-950/40 px-3 py-2 text-sm text-red-200">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                E-Mail
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@beispiel.de"
                required
                autoComplete="email"
                className="border-slate-600 bg-slate-800 text-slate-100"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Wird gesendet…" : "Link zum Zurücksetzen senden"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-slate-500">
            <Link href="/login" className="text-slate-400 hover:text-slate-200">
              ← Zurück zur Anmeldung
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
