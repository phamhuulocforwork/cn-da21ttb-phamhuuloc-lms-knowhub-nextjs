import { Router } from "express";
import UserController from "../controllers/user/user.controller";
import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";
const router = Router();

// Protected routes
router.get("/me", authMiddleware as any, UserController.getCurrentUser as any);
router.put("/me", authMiddleware as any, UserController.updateUser as any);

// Admin routes
router.use(authMiddleware as any);
router.use(adminMiddleware as any);

router.put("/", UserController.updateUser as any);
router.delete("/:id", UserController.deleteUser as any);
router.get("/:id", UserController.getUser as any);
router.get("/", UserController.getUsers as any);
router.get("/email/:email", UserController.getUserByEmail as any);

export default router;
