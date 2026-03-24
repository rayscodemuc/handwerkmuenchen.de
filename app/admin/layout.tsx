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
    <AdminUserProvider user={{ id: user.id, email: user.email, displayName: user.displayName, role: user.role }}>
      <div className="min-h-[100dvh] min-h-screen">
        <main className="min-h-[100dvh] overflow-x-hidden overflow-y-auto">{children}</main>
      </div>
    </AdminUserProvider>
  );
}
