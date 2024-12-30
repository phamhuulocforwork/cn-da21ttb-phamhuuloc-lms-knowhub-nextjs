import { Router } from "express";
import UserController from "../controllers/user/user.controller";
import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.put("/", authMiddleware as any, adminMiddleware as any, UserController.updateUser as any);
router.delete("/:id", authMiddleware as any, adminMiddleware as any, UserController.deleteUser as any);
router.get("/:id", authMiddleware as any, adminMiddleware as any, UserController.getUser as any);
router.get("/email/:email", authMiddleware as any, adminMiddleware as any, UserController.getUserByEmail as any);
router.get("/", authMiddleware as any, adminMiddleware as any, UserController.getUsers as any);
router.get("/me", authMiddleware as any, UserController.getCurrentUser as any);

export default router;
