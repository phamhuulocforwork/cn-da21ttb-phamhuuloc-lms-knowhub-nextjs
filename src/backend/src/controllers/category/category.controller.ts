import { db } from "../../config/db";
import { Request, Response } from "express";

export default new (class CategoryController {
  async getCategories(req: Request, res: Response): Promise<Response> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = (req.query.search as string) || "";

      const skip = (page - 1) * limit;

      const [categories, total] = await Promise.all([
        db.category.findMany({
          where: {
            OR: [{ name: { contains: search } }],
          },
          skip,
          take: limit,
        }),
        db.category.count({
          where: {
            OR: [{ name: { contains: search } }],
          },
        }),
      ]);

      return res.status(200).json({
        categories,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async createCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description } = req.body;
      const category = await db.category.create({
        data: { name, description },
      });
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const category = await db.category.update({
        where: { id },
        data: { name, description },
      });
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await db.category.delete({
        where: { id },
      });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const category = await db.category.findUnique({
        where: { id },
      });
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
})();
