"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

import { CardWrapper } from "@/app/[locale]/(auth)/_components/CardWrapper";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ParentFormMessage } from "@/components/ui/ParentFormMessage";
import { authService } from "@/services/authService";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { z } from "zod";

export const RegisterForm = () => {
  const [loading, setLoading] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const t = useTranslations("auth.register");
  const tValidation = useTranslations("auth.validation");

  const formSchema = z
    .object({
      name: z.string().min(1, {
        message: tValidation("invalidName"),
      }),
      email: z
        .string()
        .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
          message: tValidation("invalidEmail"),
        }),
      password: z
        .string()
        .min(8, {
          message: tValidation("passwordMin"),
        })
        .regex(/[a-z]/, {
          message: tValidation("passwordLowercase"),
        })
        .regex(/[A-Z]/, {
          message: tValidation("passwordUppercase"),
        })
        .regex(/[0-9]/, {
          message: tValidation("passwordNumber"),
        }),
      confirmPassword: z.string(),
    })
    .strict()
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: tValidation("passwordNotMatch"),
          path: ["confirmPassword"],
        });
      }
    });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: FormData) => {
    setError("");
    setSuccess("");
    setLoading(() => {
      authService.register(values).then((res) => {
        console.log(res);
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
                  <LoadingSpinner size="sm" />
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
