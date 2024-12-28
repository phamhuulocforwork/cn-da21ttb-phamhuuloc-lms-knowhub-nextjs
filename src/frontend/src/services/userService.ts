import axios from "axios";
import { User } from "@/types/user";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const userService = {
  async getUsers() {
    const response = await api.get("/api/user");
    return response.data;
  },

  async getUser(id: string) {
    const response = await api.get(`/api/user/${id}`);
    return response.data;
  },

  async createUser(user: Omit<User, "id" | "createdAt">) {
    const response = await api.post("/api/auth/register", user);
    return response.data;
  },

  async updateUser(user: Partial<User>) {
    const response = await api.put("/api/user", user);
    return response.data;
  },

  async deleteUser(id: string) {
    const response = await api.delete(`/api/user/${id}`);
    return response.data;
  },
};
