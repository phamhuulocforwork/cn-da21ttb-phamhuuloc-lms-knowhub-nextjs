import { db } from "../../config/db";
import { Request, Response } from "express";

export default new (class WikiController {
  async getWikis(req: Request, res: Response): Promise<Response> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = (req.query.search as string) || "";
      const categoryId = req.query.categoryId as string;
      const projectId = req.query.projectId as string;
      const view = req.query.view as "list" | "gallery" || "list";

      const skip = (page - 1) * limit;

      const where = {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
        ],
        status: "PUBLISHED",
        ...(categoryId && {
          categories: {
            some: { id: categoryId },
          },
        }),
        ...(projectId && { projectId }),
      };

      const [wikis, total] = await Promise.all([
        db.wiki.findMany({
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
          },
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        db.wiki.count({ where: where as any }),
      ]);

      return res.status(200).json({
        wikis,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          view,
        },
      });
    } catch (error) {
      console.error("Get wikis error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getWiki(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const wiki = await db.wiki.findUnique({
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
        },
      });

      if (!wiki) {
        return res.status(404).json({ error: "Wiki not found" });
      }

      // Check if wiki belongs to a project and if user has access
      if (wiki.projectId) {
        const hasAccess = await db.project.findFirst({
          where: {
            id: wiki.projectId,
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

      return res.status(200).json(wiki);
    } catch (error) {
      console.error("Get wiki error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async createWiki(req: Request, res: Response): Promise<Response> {
    try {
      const {
        title,
        description,
        thumbnail,
        categoryIds,
        projectId,
        content,
      } = req.body;
      const userId = req.user?.id;

      const wiki = await db.wiki.create({
        data: {
          title,
          description,
          thumbnail,
          authorId: userId!,
          projectId,
          categories: {
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

      return res.status(201).json(wiki);
    } catch (error) {
      console.error("Create wiki error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateWiki(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        thumbnail,
        categoryIds,
        status,
        content,
      } = req.body;
      const userId = req.user?.id;

      const wiki = await db.wiki.findUnique({
        where: { id },
      });

      if (!wiki) {
        return res.status(404).json({ error: "Wiki not found" });
      }

      if (wiki.authorId !== userId) {
        return res.status(403).json({ error: "Not authorized" });
      }

      // Delete existing content
      await db.content.deleteMany({
        where: { wikiId: id },
      });

      const updatedWiki = await db.wiki.update({
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

      return res.status(200).json(updatedWiki);
    } catch (error) {
      console.error("Update wiki error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteWiki(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const wiki = await db.wiki.findUnique({
        where: { id },
      });

      if (!wiki) {
        return res.status(404).json({ error: "Wiki not found" });
      }

      if (wiki.authorId !== userId) {
        return res.status(403).json({ error: "Not authorized" });
      }

      await db.wiki.delete({
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      console.error("Delete wiki error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
})(); 