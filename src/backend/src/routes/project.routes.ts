import { authMiddleware, teacherMiddleware } from "../middleware/auth.middleware";

import ProjectController from "../controllers/project/project.controller";
import { Router } from "express";

const router = Router();

// Public routes
router.get("/", ProjectController.getProjects as any);
router.get("/:id", ProjectController.getProject as any);

// Protected routes
router.use(authMiddleware as any);

// Teacher routes
router.use(teacherMiddleware as any);
router.get("/teacher/my-projects", ProjectController.getMyProjects as any);
router.post("/", ProjectController.createProject as any);
router.put("/:id", ProjectController.updateProject as any);
router.delete("/:id", ProjectController.deleteProject as any);

export default router;
