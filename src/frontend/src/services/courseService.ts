import { Course } from '@/types/course';

import { api } from '@/config/axios';

interface GetCoursesParams {
  page?: number;
  limit?: number;
  search?: string;
  projectId?: string;
}

interface GetCoursesResponse {
  courses: Course[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const courseService = {
  async getCourses(params?: GetCoursesParams): Promise<GetCoursesResponse> {
    const { page = 1, limit = 10, search = '', projectId } = params || {};
    const { data } = await api.get('/api/course', {
      params: { page, limit, search, projectId },
    });
    return data;
  },

  async getCourse(id: string) {
    const { data } = await api.get(`/api/course/${id}`);
    return data;
  },

  async createCourse(course: Partial<Course>) {
    const { data } = await api.post('/api/course', course);
    return data;
  },

  async updateCourse(id: string, course: Partial<Course>) {
    const { data } = await api.put(`/api/course/${id}`, course);
    return data;
  },

  async deleteCourse(id: string) {
    const { data } = await api.delete(`/api/course/${id}`);
    return data;
  },

  async enrollCourse(id: string) {
    const { data } = await api.post(`/api/course/${id}/enroll`);
    return data;
  },

  async unenrollCourse(id: string) {
    const { data } = await api.delete(`/api/course/${id}/enroll`);
    return data;
  },
};
