"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { userService } from "@/services/userService";
import { User } from "@/types/user";
import { useMinimumLoading } from "@/components/hooks/use-minimum-loading";

interface AuthContextType {
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
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
  const { data: session, status: sessionStatus } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const { loading, withMinimumLoading } = useMinimumLoading(500);

  const fetchUser = async () => {
    try {
      if (sessionStatus === "authenticated" && session?.user?.accessToken) {
        const userData = await userService.getCurrentUser();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    if (sessionStatus === "loading") return;
    withMinimumLoading(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStatus, session]);

  const logout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const refreshUser = async () => {
    await withMinimumLoading(fetchUser());
  };

  const status =
    loading || sessionStatus === "loading" ? "loading" : sessionStatus;

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        logout,
        refreshUser,
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
