"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEFAULT_COMPANY_ID } from "@/src/config/businessConfig";
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

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="rounded-2xl bg-white p-6 mb-6 shadow">
        <h2 className="text-xl font-semibold text-gray-800">Mangelmeldung erstellen (Testmodus)</h2>
        <p className="text-sm text-gray-600 mt-1">Nur für Testzwecke. Zugriff ist eingeschränkt auf Admins.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Titel</Label>
          <Input id="title" value={form.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="Kurze Bezeichnung des Mangels" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Standort/Adresse</Label>
          <Input id="address" value={form.address} onChange={(e) => handleChange("address", e.target.value)} placeholder="Musterstraße 1, 80331 München" />
        </div>

        <div className="col-span-1 md:col-span-2 space-y-2">
          <Label htmlFor="beschreibung">Beschreibung</Label>
          <Textarea id="beschreibung" rows={5} value={form.beschreibung} onChange={(e) => handleChange("beschreibung", e.target.value)} placeholder="Beschreiben Sie den Mangel detailliert..." />
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="kontakt_email">Auftraggeber (E-Mail)</Label>
          <Input id="kontakt_email" type="email" value={form.kontakt_email} onChange={(e) => handleChange("kontakt_email", e.target.value)} placeholder="admin@example.com" />
        </div>

        <div className="md:col-span-2 flex items-center justify-end">
          <button type="submit" className="rounded-full bg-[#3E505B] px-6 py-3 text-white font-semibold hover:bg-[#4C626C]">
            Mangel melden
          </button>
        </div>
      </form>
    </section>
  );
}

