import { Course } from '@/types/course';

import { api } from '@/config/axios';

interface GetCoursesParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  projectId?: string;
  view?: 'grid' | 'list';
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
    const {
      page = 1,
      limit = 10,
      search = '',
      categoryId = '',
      projectId,
      view = 'grid',
    } = params || {};

    const { data } = await api.get('/api/course', {
      params: {
        page,
        limit,
        search,
        categoryId,
        projectId,
        view,
      },
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

  async enrollCourse(courseId: string) {
    const { data } = await api.post(`/api/course/${courseId}/enroll`);
    return data;
  },

  async unenrollCourse(courseId: string) {
    const { data } = await api.delete(`/api/course/${courseId}/enroll`);
    return data;
  },

  async getChapter(courseId: string, chapterId: string) {
    const { data } = await api.get(
      `/api/course/${courseId}/chapters/${chapterId}`,
    );
    return data;
  },
};
