import { db } from "../../config/db";
import { Request, Response } from "express";
import { generateToken } from "../../utils/jwt.utils";

export default new (class UserController {
  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id, name, email, image, role } = req.body;
      const user = await db.user.update({
        where: { id },
        data: { name, email, image, role },
      });

      const token = generateToken(user.id);

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await db.user.delete({ where: { id } });
    return res.status(200).json(user);
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  }

  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = (req.query.search as string) || "";

      const skip = (page - 1) * limit;

      const [users, total] = await Promise.all([
        db.user.findMany({
          where: {
            OR: [{ name: { contains: search } }, { email: { contains: search } }],
          },
          skip,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
        db.user.count({
          where: {
            OR: [{ name: { contains: search } }, { email: { contains: search } }],
          },
        }),
      ]);

      return res.status(200).json({
        users,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<Response> {
    const { email } = req.params;
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  }
})();
