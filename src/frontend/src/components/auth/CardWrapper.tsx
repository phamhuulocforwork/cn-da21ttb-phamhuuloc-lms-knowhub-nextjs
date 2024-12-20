"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Logo } from "@/components/app/Logo";
import { Button } from "../ui/Button";
import { Link } from "@/i18n/routing";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonLink: string;
  backButtonLinkText?: string;
}

export const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Logo />
    </div>
  );
};

const BackButton = ({
  backButtonLabel,
  backButtonLink,
  backButtonLinkText,
}: {
  backButtonLabel: string;
  backButtonLink: string;
  backButtonLinkText: string;
}) => {
  return (
    <div className="mt-4 flex w-full items-center justify-center gap-2 text-sm">
      {backButtonLabel}
      <Button variant="link" className="p-0 text-sm">
        <Link href={backButtonLink}>{backButtonLinkText}</Link>
      </Button>
    </div>
  );
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonLink,
  backButtonLinkText,
}: CardWrapperProps) => {
  return (
    <Card className="w-[480px] max-w-full border-none bg-transparent px-8 py-6 shadow-none">
      <CardHeader>
        <Header />
        <CardTitle className="text-2xl font-black">{headerLabel}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {backButtonLabel && backButtonLink && backButtonLinkText && (
        <CardFooter>
          <BackButton
            backButtonLabel={backButtonLabel}
            backButtonLink={backButtonLink}
            backButtonLinkText={backButtonLinkText}
          />
        </CardFooter>
      )}
    </Card>
  );
};
