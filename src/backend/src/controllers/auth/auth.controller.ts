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

      res.cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
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

  async googleAuth(req: Request, res: Response): Promise<Response> {
    try {
      const { email, name, image } = req.body;

      // Find existing user
      let user = await db.user.findUnique({
        where: { email },
      });

      if (!user) {
        // Create new user if doesn't exist
        user = await db.user.create({
          data: {
            email,
            name,
            image,
            password: require("crypto").randomBytes(32).toString("hex"),
            role: "STUDENT", // Default role for Google sign-ups
          },
        });
      }

      const token = generateToken(user.id);

      // Set HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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

  async refreshToken(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.body;

      const user = await db.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

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
})();
