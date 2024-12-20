"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "~/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

import { CardWrapper } from "@/components/auth/CardWrapper";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FormError } from "@/components/app/FormError";
import { FormSuccess } from "@/components/app/FormSuccess";
import { login } from "~/actions/login";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loading, setLoading] = useTransition();

  const t = useTranslations("auth.login");
  const tValidation = useTranslations("auth.validation");

  const form = useForm<z.infer<ReturnType<typeof LoginSchema>>>({
    resolver: zodResolver(LoginSchema(tValidation)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<ReturnType<typeof LoginSchema>>) => {
    setSuccess("");
    setError("");

    setLoading(() => {
      //FIXME:
      // login(values).then((res) => {
      //   setSuccess(res.success);
      //   setError(res.error);
      // });
      login(values);
    });
  };

  return (
    <CardWrapper
      headerLabel={t("headerLabel")}
      backButtonLabel={t("backButtonLabel")}
      backButtonLink="/register"
      backButtonLinkText={t("backButtonLinkText")}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      type="email"
                      placeholder={t("emailPlaceholder")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      type="password"
                      placeholder={t("passwordPlaceholder")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Link href="/forgot-password">
            <Button
              className="w-full justify-end p-0 text-right text-sm"
              variant="link"
              disabled={loading}
            >
              {t("forgotPassword")}
            </Button>
          </Link>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <div className="flex flex-col gap-2">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  {t("submitLoading")}
                </span>
              ) : (
                t("submit")
              )}
            </Button>
            <SocialButtons loginWithGoogleLabel={t("loginWithGoogleLabel")} />
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

const SocialButtons = ({
  loginWithGoogleLabel,
}: {
  loginWithGoogleLabel: string;
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <Button
        size="lg"
        className="w-full justify-center gap-2"
        variant="outline"
        onClick={() => {}}
      >
        <FcGoogle className="h-6 w-6" />
        {loginWithGoogleLabel}
      </Button>
    </div>
  );
};
