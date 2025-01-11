import { Request, Response } from "express";

import { db } from "../../config/db";

export default new (class CourseController {
  async getCourses(req: Request, res: Response): Promise<Response> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = (req.query.search as string) || "";
      const categoryId = req.query.categoryId as string;
      const projectId = req.query.projectId as string;
      const view = (req.query.view as "list" | "gallery") || "list";

      const skip = (page - 1) * limit;

      const where = {
        OR: [{ title: { contains: search } }, { description: { contains: search } }],
        status: "PUBLISHED",
        ...(categoryId && {
          categories: {
            some: { id: categoryId },
          },
        }),
        ...(projectId && { projectId }),
      };

      const [courses, total] = await Promise.all([
        db.course.findMany({
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
            project: {
              select: {
                id: true,
                title: true,
              },
            },
            _count: {
              select: {
                enrollments: true,
              },
            },
          },
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        db.course.count({ where: where as any }),
      ]);

      return res.status(200).json({
        courses,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          view,
        },
      });
    } catch (error) {
      console.error("Get courses error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getCourse(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const course = await db.course.findUnique({
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
          project: {
            select: {
              id: true,
              title: true,
            },
          },
          content: {
            orderBy: { order: "asc" },
          },
          _count: {
            select: {
              enrollments: true,
            },
          },
        },
      });

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      return res.status(200).json(course);
    } catch (error) {
      console.error("Get course error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async createCourse(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description, thumbnail, videoUrl, categoryIds, projectId, content } = req.body;
      const userId = req.user?.id;

      const course = await db.course.create({
        data: {
          title,
          description,
          thumbnail,
          videoUrl,
          authorId: userId!,
          projectId,
          categories: {
            connect: categoryIds.map((id: string) => ({ id })),
          },
        },
        include: {
          categories: true,
        },
      });

      return res.status(201).json(course);
    } catch (error) {
      console.error("Create course error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateCourse(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { title, description, thumbnail, videoUrl, categoryIds, status, content } = req.body;
      const userId = req.user?.id;

      const course = await db.course.findUnique({
        where: { id },
      });

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      if (course.authorId !== userId) {
        return res.status(403).json({ error: "Not authorized" });
      }

      // Delete existing content
      await db.content.deleteMany({
        where: { courseId: id },
      });

      const updatedCourse = await db.course.update({
        where: { id },
        data: {
          title,
          description,
          thumbnail,
          videoUrl,
          status,
          categories: {
            set: [],
            connect: categoryIds.map((id: string) => ({ id })),
          },
          content: {
            create: content.map((item: any, index: number) => ({
              type: item.type,
              value: item.value,
              order: index,
            })),
          },
        },
        include: {
          categories: true,
          content: true,
        },
      });

      return res.status(200).json(updatedCourse);
    } catch (error) {
      console.error("Update course error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteCourse(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const course = await db.course.findUnique({
        where: { id },
      });

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      if (course.authorId !== userId) {
        return res.status(403).json({ error: "Not authorized" });
      }

      await db.course.delete({
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      console.error("Delete course error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async enrollCourse(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const course = await db.course.findUnique({
        where: { id },
        include: {
          project: true,
        },
      });

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      // Check if course belongs to a project
      if (course.projectId) {
        const hasAccess = await db.project.findFirst({
          where: {
            id: course.projectId,
            OR: [
              { authorId: userId },
              { courses: { some: { enrollments: { some: { userId } } } } },
            ],
          },
        });

        if (!hasAccess) {
          return res.status(403).json({ error: "Not authorized" });
        }
      }

      const enrollment = await db.courseEnrollment.create({
        data: {
          userId: userId!,
          courseId: id,
        },
      });

      return res.status(201).json(enrollment);
    } catch (error) {
      console.error("Enroll course error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async unenrollCourse(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      await db.courseEnrollment.delete({
        where: {
          userId_courseId: {
            userId: userId!,
            courseId: id,
          },
        },
      });

      return res.status(204).send();
    } catch (error) {
      console.error("Unenroll course error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
})();
