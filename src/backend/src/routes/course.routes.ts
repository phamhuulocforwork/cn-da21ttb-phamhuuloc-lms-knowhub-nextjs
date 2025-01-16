import { authMiddleware, teacherMiddleware } from "../middleware/auth.middleware";
import CourseController from "../controllers/course/course.controller";
import ChapterController from "../controllers/chapter/chapter.controller";
import { Router } from "express";

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

// Chapter routes (nested under course)
router.get("/:courseId/chapters", ChapterController.getChapters as any);
router.post("/:courseId/chapters", ChapterController.createChapter as any);
router.get("/:courseId/chapters/:chapterId", ChapterController.getChapter as any);
router.put("/:courseId/chapters/:chapterId", ChapterController.updateChapter as any);
router.patch(
  "/:courseId/chapters/:chapterId/position",
  ChapterController.updateChapterPosition as any
);
router.delete("/:courseId/chapters/:chapterId", ChapterController.deleteChapter as any);

export default router;
