import { Router } from "express";
import ProjectController from "../controllers/project/project.controller";
import { teacherMiddleware, authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.post("/create", teacherMiddleware as any, ProjectController.createProject as any);

export default router;
