"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEFAULT_COMPANY_ID } from "@/src/config/businessConfig";
import { GEWERKE_OPTIONS } from "@/src/config/gewerkeOptions";
import { useUniversalSubmit } from "@/hooks/useUniversalSubmit";

type MangelFormFields = {
  title: string;
  address: string;
  beschreibung: string;
  prioritaet: string;
  kunde_name: string;
  kontakt_email: string;
};

export default function MangelmeldungenPage() {
  const { submit, loading, success, reset } = useUniversalSubmit();
  const [form, setForm] = useState<MangelFormFields>({
    title: "",
    address: "",
    beschreibung: "",
    prioritaet: "hoch",
    kunde_name: "Admin",
    kontakt_email: "admin@example.com",
  });

  const handleChange = <K extends keyof MangelFormFields>(key: K, value: MangelFormFields[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      company_id: DEFAULT_COMPANY_ID,
      kunde_name: form.kunde_name,
      kontakt_email: form.kontakt_email,
      beschreibung: form.beschreibung,
      address: form.address,
      titel: form.title,
      prioritaet: form.prioritaet,
      test_mode: true,
      test_user: "admin",
    };

    const result = await submit(payload, DEFAULT_COMPANY_ID);
    if (result?.success) {
      // Clear form after successful submission
      setForm({
        title: "",
        address: "",
        beschreibung: "",
        prioritaet: "hoch",
        kunde_name: "Admin",
        kontakt_email: "admin@example.com",
      });
      reset();
    }
  };

const priorityOptions = [
    { value: "hoch", label: "Hoch" },
    { value: "mittel", label: "Mittel" },
    { value: "niedrig", label: "Niedrig" },
  ];

  // MVP: zwei Sektionen in einer Seite – Formular links, Liste rechts
  // Liste-Logik wird hier ergänzt (Sektion B)
  const [list, setList] = useState<any[]>([]);
  const [listLoaded, setListLoaded] = useState(false);
  const [gewerg, setGewerg] = useState<string>("");

  const markRead = async (id: string) => {
    try {
      await fetch('/api/admin/mangelmeldungen/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: [id] }),
      });
      setList((prev) => prev.filter((t) => t.id !== id));
    } catch {
      // ignore errors in MVP
    }
  };

  // Lade Liste beim ersten Render
  useEffect(() => {
    fetch(`/api/admin/mangelmeldungen/list?unreadOnly=false&limit=50&offset=0&gewerg=${encodeURIComponent(gewerg)}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setList(data);
        setListLoaded(true);
      })
      .catch(() => setListLoaded(true));
  }, [gewerg]);

  // Dev-bypass für lokalen Test: Kopfzeilen-Header automatisch hinzufügen
  React.useEffect(() => {
    const enableBypass = (process.env.DEV_BYPASS_AUTH || "").toLowerCase() === "true";
    if (!enableBypass || typeof window === "undefined" || !window.fetch) return;
    const originalFetch = (window.fetch as any).bind(window);
    (window as any).fetch = (input: any, init?: any) => {
      const newInit = { ...(init || {}) };
      newInit.headers = newInit.headers ? newInit.headers : {};
      if (typeof newInit.headers.set === 'function') {
        (newInit.headers as any).set('x-dev-admin', '1');
      } else {
        (newInit.headers as any)['x-dev-admin'] = '1';
      }
      return originalFetch(input, newInit);
    } as any;
    return () => { (window as any).fetch = originalFetch; };
  }, []);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/admin/dashboard" className="inline-flex items-center text-sm text-blue-600 hover:underline">
          <ChevronLeft className="h-4 w-4 mr-2" /> Zurück zum Dashboard
        </Link>
      </div>
      <div className="rounded-2xl bg-white p-6 mb-6 shadow flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Mangelmeldung erstellen (Testmodus)</h2>
          <p className="text-sm text-gray-600 mt-1">Zwei Sektionen: Neuen Mangel melden + Gewerke-Meldungen</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-sm text-white">Unread: 0</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titel</Label>
              <Input id="title" value={form.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="Kurze Bezeichnung des Mangels" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Standort/Adresse</Label>
              <Input id="address" value={form.address} onChange={(e) => handleChange("address", e.target.value)} placeholder="Musterstraße 1, 80331 München" />
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 space-y-2">
            <Label htmlFor="beschreibung">Beschreibung</Label>
            <Textarea id="beschreibung" rows={5} value={form.beschreibung} onChange={(e) => handleChange("beschreibung", e.target.value)} placeholder="Beschreiben Sie den Mangel detailliert..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prioritaet">Priorität</Label>
              <Select name="prioritaet" value={form.prioritaet} onValueChange={(value) => handleChange("prioritaet", value)}>
                <SelectTrigger className="text-[#3E505B] bg-white">
                  <SelectValue placeholder="Priorität auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="kunde_name">Auftraggeber (Name)</Label>
              <Input id="kunde_name" value={form.kunde_name} onChange={(e) => handleChange("kunde_name", e.target.value)} placeholder="Ihr Name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="kontakt_email">Auftraggeber (E-Mail)</Label>
            <Input id="kontakt_email" type="email" value={form.kontakt_email} onChange={(e) => handleChange("kontakt_email", e.target.value)} placeholder="admin@example.com" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="rounded-full bg-[#3E505B] px-6 py-3 text-white font-semibold hover:bg-[#4C626C]">
              Mangel melden
            </button>
          </div>
        </form>

        {/* Sektion B: Gewerke-Meldungen-Liste */}
        <aside className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Gewerke-Meldungen</h3>
          <div className="border rounded p-2">
            <div className="mb-2 text-sm text-gray-600">Filter nach Gewerk</div>
            <select className="border rounded w-full px-2 py-1" value={gewerg} onChange={(e)=>setGewerg(e.target.value)}>
              <option value="">Alle</option>
              {GEWERKE_OPTIONS.map((g) => {
                const isObj = typeof g === 'object' && g !== null;
                const value = isObj ? (g as any).value ?? "" : (g as any);
                const label = isObj ? (g as any).label ?? String(value) : String(g);
                const key = isObj ? (g as any).value ?? String(value) : String(value);
                return <option key={key} value={value}>{label}</option>;
              })}
            </select>
          </div>
          <div className="border rounded p-2" style={{minHeight:200}}>
            {list.length === 0 && listLoaded ? (
              <div className="text-sm text-gray-500">Keine Meldungen</div>
            ) : (
              <ul>
                {list.map((t) => (
                  <li key={t.id} className="flex justify-between py-1 border-b text-sm">
                    <span>{t.kunde_name ?? t.objekt_adresse ?? t.beschreibung?.slice(0,40) ?? "Meldung"}</span>
                    <button className="text-blue-600" onClick={() => markRead(t.id)}>Als gelesen</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
