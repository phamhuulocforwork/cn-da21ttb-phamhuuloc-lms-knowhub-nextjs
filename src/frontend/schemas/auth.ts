import * as z from "zod";

type Translations = {
  (key: string): string;
};

export const LoginBody = (t: Translations) =>
  z.object({
    email: z.string().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
      message: t("invalidEmail"),
    }),
    password: z.string().min(1, { message: t("invalidPassword") }),
  });
export type LoginBodyType = z.infer<ReturnType<typeof LoginBody>>;

export const RegisterBody = (t: Translations) =>
  z
    .object({
      name: z.string().min(1, {
        message: t("invalidName"),
      }),
      email: z
        .string()
        .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
          message: t("invalidEmail"),
        }),
      password: z
        .string()
        .min(8, {
          message: t("passwordMin"),
        })
        .regex(/[a-z]/, {
          message: t("passwordLowercase"),
        })
        .regex(/[A-Z]/, {
          message: t("passwordUppercase"),
        })
        .regex(/[0-9]/, {
          message: t("passwordNumber"),
        }),
      confirmPassword: z.string(),
    })
    .strict()
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: t("passwordNotMatch"),
          path: ["confirmPassword"],
        });
      }
    });
export type RegisterBodyType = z.infer<ReturnType<typeof RegisterBody>>;
