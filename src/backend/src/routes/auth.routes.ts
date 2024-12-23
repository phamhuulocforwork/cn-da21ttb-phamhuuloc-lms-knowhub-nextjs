import { Router } from "express";
import AuthController from "../controllers/auth/auth.controller";

const router = Router();

router.post("/login", AuthController.login as any);
router.post("/register", AuthController.register as any);

export default router;
