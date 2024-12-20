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
