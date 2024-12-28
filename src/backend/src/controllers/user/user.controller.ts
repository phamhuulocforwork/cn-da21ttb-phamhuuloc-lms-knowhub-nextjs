import { db } from "../../config/db";
import { Request, Response } from "express";

export default new (class UserController {
  async updateUser(req: Request, res: Response): Promise<Response> {
    const { id, name, email, image, role } = req.body;
    const user = await db.user.update({
      where: { id },
      data: { name, email, image, role },
    });
    return res.status(200).json(user);
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
      const users = await db.user.findMany();
      return res.status(200).json(users);
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
