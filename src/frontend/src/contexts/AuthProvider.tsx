"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";
import { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  status: "loading" | "authenticated" | "unauthenticated";
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextContent>{children}</AuthContextContent>
    </SessionProvider>
  );
}

function AuthContextContent({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const logout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user || null,
        status,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
