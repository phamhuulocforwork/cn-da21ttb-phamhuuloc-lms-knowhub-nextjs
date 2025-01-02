import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import categoryRoutes from "./category.routes";
import projectRoutes from "./project.routes";
import courseRoutes from "./course.routes";
import quizRoutes from "./quiz.routes";
import wikiRoutes from "./wiki.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/project", projectRoutes);
router.use("/course", courseRoutes);
router.use("/quiz", quizRoutes);
router.use("/wiki", wikiRoutes);

export default router;
