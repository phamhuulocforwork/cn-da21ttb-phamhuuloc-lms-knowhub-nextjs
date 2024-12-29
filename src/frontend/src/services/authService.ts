import { api } from "@/config/axios";
import { LoginBodyType, RegisterBodyType } from "~/schemas";
import { User } from "@/types/user";

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginBodyType): Promise<AuthResponse> {
    const response = await api.post("/api/auth/login", credentials);
    return response.data;
  },

  async register(userData: RegisterBodyType): Promise<AuthResponse> {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  },

  async googleAuth(googleData: {
    email: string;
    name: string;
    image?: string;
  }): Promise<AuthResponse> {
    const response = await api.post("/api/auth/google", {
      ...googleData,
      role: "STUDENT",
    });
    return response.data;
  },

  async refreshToken(userId: string): Promise<AuthResponse> {
    const response = await api.post("/api/auth/refresh-token", { userId });
    return response.data;
  },
};
