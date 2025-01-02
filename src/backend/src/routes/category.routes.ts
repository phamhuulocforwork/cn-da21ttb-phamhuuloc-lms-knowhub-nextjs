import { Router } from "express";
import CategoryController from "../controllers/category/category.controller";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware";
const router = Router();

// Public routes
router.get("/", CategoryController.getCategories as any);

// Admin routes
router.use(authMiddleware as any);
router.use(adminMiddleware as any);

router.post("/", CategoryController.createCategory as any);
router.put("/:id", CategoryController.updateCategory as any);
router.delete("/:id", CategoryController.deleteCategory as any);

export default router;
