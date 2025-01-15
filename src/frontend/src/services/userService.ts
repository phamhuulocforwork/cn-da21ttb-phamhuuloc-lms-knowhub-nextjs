import { User } from '@/types/user';

import { api } from '@/config/axios';

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
    const { page = 1, limit = 10, search = '' } = params || {};
    const response = await api.get('/api/user', {
      params: { page, limit, search },
    });
    return response.data;
  },

  async getProfile() {
    const response = await api.get('/api/user/me');
    return response.data;
  },

  async getProfileStats() {
    const response = await api.get('/api/user/me/stats');
    return response.data;
  },

  async getProfileActivity() {
    const response = await api.get('/api/user/me/activity');
    return response.data;
  },

  async getUser(id: string) {
    const response = await api.get(`/api/user/${id}`);
    return response.data;
  },

  async createUser(user: Omit<User, 'id' | 'createdAt'>) {
    const response = await api.post('/api/auth/register', user);
    return response.data;
  },

  async updateUser(user: Partial<User>) {
    const response = await api.put('/api/user', user);
    return response.data;
  },

  async deleteUser(id: string) {
    const response = await api.delete(`/api/user/${id}`);
    return response.data;
  },
};
