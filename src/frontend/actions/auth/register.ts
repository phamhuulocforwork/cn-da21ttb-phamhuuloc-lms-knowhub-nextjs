"use server";

import axios from "axios";
import { getTranslations } from "next-intl/server";
import { RegisterBodyType } from "~/schemas";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const register = async (values: RegisterBodyType) => {
  const t = await getTranslations("auth.serverMessages");
  try {
    await api.post("/api/auth/register", {
      name: values.name,
      email: values.email,
      password: values.password,
    });
    return { success: t("success.register") };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        return { error: t("error.emailExists") };
      }
      if (error.response?.status === 429) {
        return { error: t("error.tooManyRequests") };
      }
    }
    return { error: t("error.registrationFailed") };
  }
};
