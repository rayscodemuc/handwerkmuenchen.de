import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { AdminUserProvider } from "./AdminUserContext";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login?redirect=/admin");

  return (
    <AdminUserProvider user={{ id: user.id, email: user.email, displayName: user.displayName }}>
      <div className="min-h-screen bg-slate-950">
        <main className="overflow-auto">{children}</main>
      </div>
    </AdminUserProvider>
  );
}
