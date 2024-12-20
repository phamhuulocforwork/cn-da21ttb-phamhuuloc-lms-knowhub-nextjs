"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="container relative rounded-2xl bg-background shadow-lg dark:bg-foreground lg:p-8">
      <div
        className="absolute right-8 top-8 cursor-pointer"
        onClick={() => router.back()}
      >
        <X />
      </div>

      <div className="flex h-full min-h-screen w-full md:min-h-[600px]">
        <div className="relative hidden w-full bg-primary-100 p-4 dark:bg-slate-900 md:flex lg:rounded-2xl">
          <div className="absolute bottom-4 left-8 w-11/12">
            <Image
              src="/assets/illustrations/auth.png"
              alt="Auth Illustration"
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
