"use server";

import axios from "axios";
import { getTranslations } from "next-intl/server";
import { LoginBodyType } from "~/schemas";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const login = async (values: LoginBodyType) => {
  const t = await getTranslations("auth.serverMessages");
  try {
    await api.post("/api/auth/login", {
      email: values.email,
      password: values.password,
    });
    return { success: t("success.login") };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return { error: t("error.invalidCredentials") };
      }
      if (error.response?.status === 429) {
        return { error: t("error.tooManyRequests") };
      }
    }
    return { error: t("error.loginFailed") };
  }
};
