import * as z from "zod";

type Translations = {
  (key: string): string;
};

export const CreateUserBody = (t: Translations) =>
  z.object({
    name: z.string().min(1, {
      message: t("invalidName"),
    }),
    email: z.string().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
      message: t("invalidEmail"),
    }),
    password: z.string().min(8, {
      message: t("passwordMin"),
    }),
    role: z.enum(["ADMIN", "TEACHER", "STUDENT", "GUEST"]),
    updatedAt: z
      .date()
      .optional()
      .default(() => new Date()),
  });
export type CreateUserBodyType = z.infer<ReturnType<typeof CreateUserBody>>;
