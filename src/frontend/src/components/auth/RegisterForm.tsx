"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterBody, RegisterBodyType } from "~/schemas";
import { useRouter } from "@/i18n/routing";

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
import { register } from "~/actions/register";
import { ParentFormMessage } from "@/components/ui/ParentFormMessage";

export const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const t = useTranslations("auth.register");
  const tValidation = useTranslations("auth.validation");

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody(tValidation)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: RegisterBodyType) => {
    setError("");
    setSuccess("");
    setLoading(() => {
      register(values).then((res) => {
        setError(res.error);
        setSuccess(res.success);
        if (res.success) {
          setTimeout(() => {
            router.push("/login");
          }, 500);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel={t("headerLabel")}
      backButtonLabel={t("backButtonLabel")}
      backButtonLink="/login"
      backButtonLinkText={t("backButtonLinkText")}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1">
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
                      onChange={(e) => {
                        field.onChange(e);
                        setError("");
                      }}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      type="text"
                      placeholder={t("namePlaceholder")}
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
                    <Input {...field} disabled={loading} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("confirmPassword")}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ParentFormMessage message={error} variant="error" />
          <ParentFormMessage message={success} variant="success" />
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
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
