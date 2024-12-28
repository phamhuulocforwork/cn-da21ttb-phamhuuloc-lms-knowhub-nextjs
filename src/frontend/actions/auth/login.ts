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
    const response = await api.post("/api/auth/login", {
      email: values.email,
      password: values.password,
    });

    return {
      success: t("success.login"),
      user: {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        image: response.data.user.image,
        role: response.data.user.role,
      },
    };
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
