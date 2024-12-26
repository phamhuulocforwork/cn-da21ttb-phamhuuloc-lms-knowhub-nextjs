import { Router } from "express";
import AuthController from "../controllers/auth/auth.controller";

const router = Router();

router.post("/login", AuthController.login as any);
router.post("/google", AuthController.googleAuth as any);
router.post("/register", AuthController.register as any);
router.post("/update", AuthController.updateUser as any);
router.post("/delete", AuthController.deleteUser as any);
router.post("/get", AuthController.getUser as any);
router.post("/get-by-email", AuthController.getUserByEmail as any);
router.post("/get-all", AuthController.getUsers as any);

export default router;
