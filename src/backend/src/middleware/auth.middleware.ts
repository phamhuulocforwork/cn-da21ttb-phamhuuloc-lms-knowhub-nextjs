import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { db } from "../config/db";
import { User } from "@prisma/client";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log("Request path:", req.path);
    // console.log("Request headers:", req.headers);

    const cookieToken = req.cookies.token;
    const authHeader = req.headers.authorization;
    // console.log("Auth header:", authHeader);

    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
    const token = cookieToken || bearerToken;
    // console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const decoded = verifyToken(token) as { userId: string };
    // console.log("Decoded token:", decoded);

    const user = await db.user.findUnique({
      where: { id: decoded.userId },
    });
    // console.log("Found user:", user?.id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    (req as Request & { user: User }).user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as Request & { user: User }).user;

    if (user?.role !== "ADMIN") {
      return res.status(403).json({ error: "Admin access required" });
    }

    next();
  } catch (error) {
    return res.status(403).json({ error: "Admin access required" });
  }
};

export const teacherMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as Request & { user: User }).user;
    if (user?.role !== "TEACHER") {
      return res.status(403).json({ error: "Teacher access required" });
    }
    next();
  } catch (error) {
    return res.status(403).json({ error: "Teacher access required" });
  }
};
