import { Request, Response } from "express";
import { db } from "../../config/db";
import { generateToken } from "../../utils/jwt.utils";
import bcrypt from "bcrypt";

export default new (class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const user = await db.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({
          error: "Invalid email or password",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          error: "Invalid email or password",
        });
      }

      const token = generateToken(user.id);

      return res.status(200).json({
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

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUser = await db.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({
          error: "Email already registered",
        });
      }

      //TODO: Send verifacation token email
      const user = await db.user.create({
        data: { name, email, password: hashedPassword },
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
