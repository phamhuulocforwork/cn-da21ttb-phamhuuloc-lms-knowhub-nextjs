import { Router } from "express";
import UserController from "../controllers/user/user.controller";

const router = Router();

router.put("/", UserController.updateUser as any);
router.delete("/:id", UserController.deleteUser as any);
router.get("/:id", UserController.getUser as any);
router.get("/email/:email", UserController.getUserByEmail as any);
router.get("/", UserController.getUsers as any);

export default router;
