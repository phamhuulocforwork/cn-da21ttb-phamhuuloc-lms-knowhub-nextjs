import * as z from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LoginSchema = (t: any) =>
  z.object({
    email: z.string().email({
      message: t("invalidEmail"),
    }),
    password: z.string().min(1, {
      message: t("invalidPassword"),
    }),
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RegisterSchema = (t: any) =>
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
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });
