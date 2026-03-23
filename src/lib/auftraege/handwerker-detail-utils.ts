export function buildMapsSearchUrl(strasse: string | null, ort: string | null): string {
  const parts = [strasse, ort].map((s) => (s ?? "").trim()).filter(Boolean);
  if (parts.length === 0) return "https://www.google.com/maps";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(parts.join(", "))}`;
}

export function waMeHref(phone: string | null | undefined): string | null {
  if (!phone?.trim()) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 6) return null;
  return `https://wa.me/${digits}`;
}

export function formatAuftragDatum(datum: string | null | undefined): string | null {
  if (!datum?.trim()) return null;
  const d = new Date(datum);
  if (Number.isNaN(d.getTime())) return datum.trim();
  return d.toLocaleDateString("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function attachmentFileExt(file: File): string {
  if (file.type.includes("pdf")) return "pdf";
  const m = /\.([a-z0-9]{1,8})$/i.exec(file.name.trim());
  if (m && /^[a-z0-9]+$/i.test(m[1]!)) {
    const e = m[1]!.toLowerCase();
    return e === "jpeg" ? "jpg" : e;
  }
  return "bin";
}

export function isProbablyImageAttachmentUrl(url: string): boolean {
  return /\.(jpe?g|png|webp|gif|heic|heif)(\?|#|$)/i.test(url);
}

export function compressImageForUpload(file: File): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const MAX_SIZE = 1920;
      let { width, height } = img;
      if (width > MAX_SIZE || height > MAX_SIZE) {
        if (width >= height) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        } else {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file as unknown as Blob);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : resolve(file as unknown as Blob)),
        "image/jpeg",
        0.82
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file as unknown as Blob);
    };
    img.src = url;
  });
}
