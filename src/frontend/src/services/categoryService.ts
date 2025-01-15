import { Category } from '@/types/category';

import { api } from '@/config/axios';

interface GetCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface GetCategoriesResponse {
  categories: Category[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const categoryService = {
  async getCategories(
    params?: GetCategoriesParams,
  ): Promise<GetCategoriesResponse> {
    const { page = 1, limit = 10, search = '' } = params || {};
    const response = await api.get('/api/category', {
      params: { page, limit, search },
    });
    return response.data;
  },

  async createCategory(category: Omit<Category, 'id'>) {
    const response = await api.post('/api/category', category);
    return response.data;
  },

  async updateCategory(category: Partial<Category>) {
    const response = await api.put(`/api/category/${category.id}`, category);
    return response.data;
  },

  async deleteCategory(id: string) {
    const response = await api.delete(`/api/category/${id}`);
    return response.data;
  },
};
