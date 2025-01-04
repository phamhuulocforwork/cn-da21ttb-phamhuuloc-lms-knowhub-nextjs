import { api } from "@/config/axios";
import { Project } from "@/types/project";

interface GetProjectsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
}

interface GetProjectsResponse {
  projects: Project[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const projectService = {
  async getProjects(params?: GetProjectsParams): Promise<GetProjectsResponse> {
    const { page = 1, limit = 10, search = "", categoryId } = params || {};
    const response = await api.get("/api/project", {
      params: { page, limit, search, categoryId },
    });
    return response.data;
  },

  async getProject(id: string) {
    const response = await api.get(`/api/project/${id}`);
    return response.data;
  },

  async createProject(project: Partial<Project>) {
    const response = await api.post("/api/project", project);
    return response.data;
  },

  async updateProject(id: string, project: Partial<Project>) {
    const response = await api.put(`/api/project/${id}`, project);
    return response.data;
  },

  async deleteProject(id: string) {
    const response = await api.delete(`/api/project/${id}`);
    return response.data;
  },
};
