import { Request, Response } from "express";

import { db } from "../../config/db";

export default new (class ProjectController {
  async getProjects(req: Request, res: Response): Promise<Response> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = (req.query.search as string) || "";
      const categoryId = req.query.categoryId as string;

      const skip = (page - 1) * limit;

      const where = {
        OR: [{ title: { contains: search } }, { description: { contains: search } }],
        status: {
          in: ["PUBLISHED"],
        },
        ...(categoryId && {
          categories: {
            some: { id: categoryId },
          },
        }),
      };

      const [projects, total] = await Promise.all([
        db.project.findMany({
          where: where as any,
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            categories: true,
          },
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        db.project.count({ where: where as any }),
      ]);

      return res.status(200).json({
        projects,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Get projects error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getMyProjects(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await db.user.findUnique({
        where: { id: req.user.id },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const projects = await db.project.findMany({
        where: {
          authorId: req.user.id,
          status: {
            not: "DELETED",
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

      return res.status(200).json(projects);
    } catch (error) {
      console.error("Get my projects error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getProject(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const courseSelect = {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        status: true,
        categories: true,
        updatedAt: true,
        _count: { select: { enrollments: true } },
      };

      const quizSelect = {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        status: true,
        categories: true,
        updatedAt: true,
        _count: {
          select: {
            attempts: true,
            questions: true,
          },
        },
      };

      const project = await db.project.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          categories: true,
          courses: {
            where: {
              status: {
                in: ["PUBLISHED", "UNPUBLISHED", "DRAFT"],
              },
            },
            select: {
              ...courseSelect,
            },
          },
          quizzes: {
            where: {
              status: {
                in: ["PUBLISHED", "UNPUBLISHED", "DRAFT"],
              },
            },
            select: { ...quizSelect },
          },
        },
      });

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      return res.status(200).json(project);
    } catch (error) {
      console.error("Get project error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async createProject(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description, thumbnail, categoryIds } = req.body;
      const userId = req.user?.id;

      const project = await db.project.create({
        data: {
          title,
          description,
          thumbnail,
          authorId: userId!,
          categories: {
            connect: categoryIds.map((id: string) => ({ id })),
          },
        },
        include: {
          categories: true,
        },
      });

      return res.status(201).json(project);
    } catch (error) {
      console.error("Create project error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateProject(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { title, description, thumbnail, categoryIds, status } = req.body;
      const userId = req.user?.id;

      const project = await db.project.findUnique({
        where: { id },
      });

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      if (project.authorId !== userId) {
        return res.status(403).json({ error: "Not authorized" });
      }

      const updatedProject = await db.project.update({
        where: { id },
        data: {
          title,
          description,
          thumbnail,
          status,
          categories: {
            set: [],
            connect: categoryIds.map((id: string) => ({ id })),
          },
        },
        include: {
          categories: true,
        },
      });

      return res.status(200).json(updatedProject);
    } catch (error) {
      console.error("Update project error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteProject(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const project = await db.project.findUnique({
        where: { id },
      });

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      if (project.authorId !== userId) {
        return res.status(403).json({ error: "Not authorized" });
      }

      await db.project.delete({
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      console.error("Delete project error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
})();
