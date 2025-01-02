import { Router } from "express";
import QuizController from "../controllers/quiz/quiz.controller";
import { authMiddleware, teacherMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/", QuizController.getQuizzes as any);
router.get("/:id", QuizController.getQuiz as any);

// Protected routes
router.use(authMiddleware as any);

// Student routes
router.post("/:id/attempt", QuizController.startQuizAttempt as any);
router.put("/:id/attempt/:attemptId", QuizController.submitQuizAttempt as any);
router.get("/:id/attempts", QuizController.getQuizAttempts as any);

// Teacher routes
router.use(teacherMiddleware as any);
router.post("/", QuizController.createQuiz as any);
router.put("/:id", QuizController.updateQuiz as any);
router.delete("/:id", QuizController.deleteQuiz as any);

export default router;
