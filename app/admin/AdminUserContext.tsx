"use client";

import React, { createContext, useContext } from "react";

type AdminUser = {
  id: string;
  email: string | null;
  displayName: string | null;
};

const AdminUserContext = createContext<AdminUser | null>(null);

export function AdminUserProvider({
  user,
  children,
}: {
  user: AdminUser;
  children: React.ReactNode;
}) {
  return (
    <AdminUserContext.Provider value={user}>
      {children}
    </AdminUserContext.Provider>
  );
}

export function useAdminUser() {
  return useContext(AdminUserContext);
}
