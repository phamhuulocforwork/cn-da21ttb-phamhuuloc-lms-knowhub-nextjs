import { db } from "../../config/db";
import { Request, Response } from "express";

export default new (class UserController {
  async createProject(req: Request, res: Response): Promise<Response> {
    console.log(req.body);
    return res.status(200).json({ message: "Project created" });
  }
})();
