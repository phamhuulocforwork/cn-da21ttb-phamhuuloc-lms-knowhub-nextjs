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
          image: user.image,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  async googleAuth(req: Request, res: Response): Promise<Response> {
    try {
      const { email, name, image } = req.body;

      let user = await db.user.findUnique({
        where: { email },
      });

      if (!user) {
        user = await db.user.create({
          data: {
            email,
            name,
            image,
            password: require("crypto").randomBytes(32).toString("hex"),
          },
        });
      }

      const token = generateToken(user.id);

      return res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
        token,
      });
    } catch (error) {
      console.error("Google auth error:", error);
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
          image: user.image,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const { id, name, email, image } = req.body;
    const user = await db.user.update({ where: { id }, data: { name, email, image } });
    return res.status(200).json(user);
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    const user = await db.user.delete({ where: { id } });
    return res.status(200).json(user);
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    const user = await db.user.findUnique({ where: { id } });
    return res.status(200).json(user);
  }

  async getUsers(req: Request, res: Response): Promise<Response> {
    const users = await db.user.findMany();
    return res.status(200).json(users);
  }

  async getUserByEmail(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const user = await db.user.findUnique({ where: { email } });
    return res.status(200).json(user);
  }
})();
