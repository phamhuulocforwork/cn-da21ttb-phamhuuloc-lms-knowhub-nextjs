"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

interface SignInFormProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  no_account: string;
  showSocial?: boolean;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  no_account,
  showSocial = true,
}) => {
  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-full flex-col items-center justify-center"
      >
        <Card className="min-w-96 border-none">
          <CardHeader className="flex w-full flex-col items-center gap-y-4">
            <CardTitle>{headerLabel}</CardTitle>
          </CardHeader>
          <CardContent>{children}</CardContent>
          {showSocial && (
            <CardFooter>
              <Social />
            </CardFooter>
          )}
          <CardFooter>
            <span>
              {no_account}{" "}
              <BackButton
                label={backButtonLabel}
                href={backButtonHref}
              ></BackButton>
            </span>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

interface SignInButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const SignInButton = ({
  children,
  mode = "redirect",
  asChild,
}: SignInButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/sign-in");
  };

  if (mode === "modal") {
  }

  if (mode === "redirect") {
  }

  if (asChild) {
    return <span>{children}</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export const Social = () => {
  return (
    <div className="flex w-full items-center gap-2">
      <Button variant="outline" size="lg" className="w-full" onClick={() => {}}>
        <FcGoogle className="h-6 w-6" />
      </Button>
    </div>
  );
};

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant="link" className="w-full font-normal" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
