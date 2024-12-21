import { Router } from "express";
import AuthController from "../controllers/auth/auth.controller";

const router = Router();

//@ts-ignore
router.post("/register", AuthController.register);

export default router;
