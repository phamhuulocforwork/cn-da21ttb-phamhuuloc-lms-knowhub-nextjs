import { Router } from "express";
import WikiController from "../controllers/wiki/wiki.controller";
import { authMiddleware, teacherMiddleware } from "../middleware/auth.middleware";
const router = Router();

// Public routes
router.get("/", WikiController.getWikis as any);
router.get("/:id", WikiController.getWiki as any);

// Protected routes for teachers
router.use(authMiddleware as any);
router.use(teacherMiddleware as any);
router.post("/", WikiController.createWiki as any);
router.put("/:id", WikiController.updateWiki as any);
router.delete("/:id", WikiController.deleteWiki as any);

export default router; 