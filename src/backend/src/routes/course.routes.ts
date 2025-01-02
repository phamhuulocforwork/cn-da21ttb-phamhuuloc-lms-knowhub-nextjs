import { Router } from "express";
import CourseController from "../controllers/course/course.controller";
import { authMiddleware, teacherMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/", CourseController.getCourses as any);
router.get("/:id", CourseController.getCourse as any);

// Protected routes
router.use(authMiddleware as any);

// Student routes
router.post("/:id/enroll", CourseController.enrollCourse as any);
router.delete("/:id/enroll", CourseController.unenrollCourse as any);

// Teacher routes
router.use(teacherMiddleware as any);
router.post("/", CourseController.createCourse as any);
router.put("/:id", CourseController.updateCourse as any);
router.delete("/:id", CourseController.deleteCourse as any);

export default router;
