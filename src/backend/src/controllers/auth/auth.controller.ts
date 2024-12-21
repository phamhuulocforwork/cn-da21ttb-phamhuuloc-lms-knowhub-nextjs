import { Request, Response } from "express";
import { db } from "../../config/db";
import { generateToken } from "../../utils/jwt.utils";

export default new (class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await db.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({
          error: "Email already registered",
        });
      }

      const user = await db.user.create({
        data: { name, email, password },
      });

      const token = generateToken(user.id);

      return res.status(201).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }
})();
