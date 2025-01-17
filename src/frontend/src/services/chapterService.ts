import { Chapter } from '@/types/chapter';

import { api } from '@/config/axios';

export const chapterService = {
  async createChapter(courseId: string, data: Partial<Chapter>) {
    const response = await api.post(`/api/course/${courseId}/chapters`, data);
    return response.data;
  },

  async updateChapter(
    courseId: string,
    chapterId: string,
    data: Partial<Chapter>,
  ) {
    const response = await api.put(
      `/api/course/${courseId}/chapters/${chapterId}`,
      data,
    );
    return response.data;
  },

  async updateChapterPosition(
    courseId: string,
    chapterId: string,
    position: number,
  ) {
    const response = await api.patch(
      `/api/course/${courseId}/chapters/${chapterId}/position`,
      { position },
    );
    return response.data;
  },

  async deleteChapter(courseId: string, chapterId: string) {
    const response = await api.delete(
      `/api/course/${courseId}/chapters/${chapterId}`,
    );
    return response.data;
  },

  async getChapter(courseId: string, chapterId: string) {
    const response = await api.get(
      `/api/course/${courseId}/chapters/${chapterId}`,
    );
    return response.data;
  },

  async updateProgress(courseId: string, chapterId: string) {
    const response = await api.put(
      `/api/course/${courseId}/chapters/${chapterId}/progress`,
    );
    return response.data;
  },
};
