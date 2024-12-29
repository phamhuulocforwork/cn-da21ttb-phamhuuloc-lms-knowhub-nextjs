"use client";

import { useAuth } from "@/contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status !== "loading" && user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [user, status, router]);

  if (status === "loading") {
    return null; // Or a loading spinner
  }

  if (user?.role !== "ADMIN") {
    return null;
  }

  return <>{children}</>;
}
