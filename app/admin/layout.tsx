import type { Metadata, Viewport } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { GewerkPushBootstrap } from "@/components/push/GewerkPushBootstrap";
import { AdminUserProvider } from "./AdminUserContext";

/** Mobile-first: volle Gerätebreite, Safe Area (Notch/Home-Indikator), kein willkürliches Zoomen. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export const metadata: Metadata = {
  title: "Admin",
  appleWebApp: {
    capable: true,
    title: "Handwerk Admin",
    statusBarStyle: "black-translucent",
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login?redirect=/admin");

  return (
    <AdminUserProvider user={{ id: user.id, email: user.email, displayName: user.displayName, role: user.role }}>
      {/* Kein overflow-y-auto hier: min-h + auto-Höhe = kein innerer Overflow; auf Mobil blockiert das oft den Seiten-Scroll. */}
      <div className="min-h-[100dvh] min-h-screen touch-manipulation">
        <main className="min-h-[100dvh] w-full min-w-0">{children}</main>
        <GewerkPushBootstrap />
      </div>
    </AdminUserProvider>
  );
}
