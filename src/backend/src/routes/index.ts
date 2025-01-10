import { Router } from "express";
import authRoutes from "./auth.routes";
import categoryRoutes from "./category.routes";
import courseRoutes from "./course.routes";
import projectRoutes from "./project.routes";
import quizRoutes from "./quiz.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/project", projectRoutes);
router.use("/course", courseRoutes);
router.use("/quiz", quizRoutes);

export default router;
