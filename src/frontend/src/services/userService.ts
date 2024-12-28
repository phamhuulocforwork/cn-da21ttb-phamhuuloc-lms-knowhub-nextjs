import axios from "axios";
import { User } from "@/types/user";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface GetUsersResponse {
  users: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const userService = {
  async getUsers(params?: GetUsersParams): Promise<GetUsersResponse> {
    const { page = 1, limit = 10, search = "" } = params || {};
    const response = await api.get("/api/user", {
      params: { page, limit, search }
    });
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
