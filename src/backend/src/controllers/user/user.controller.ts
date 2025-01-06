import { db } from "../../config/db";
import { Request, Response } from "express";
import { generateToken } from "../../utils/jwt.utils";

export default new (class UserController {
  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id, name, email, image, role } = req.body;
      const user = await db.user.update({
        where: { id },
        data: { name, email, image, role },
      });

      const token = generateToken(user.id);

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      // Kiểm tra user tồn tại
      const user = await db.user.findUnique({
        where: { id },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Xóa theo thứ tự từ các bảng con đến bảng cha
      await Promise.all([
        // 1. Xóa QuestionAttempt trước (vì nó phụ thuộc vào QuizAttempt)
        db.questionAttempt.deleteMany({
          where: {
            attempt: {
              userId: id,
            },
          },
        }),

        // 2. Xóa CourseEnrollment và QuizAttempt
        db.courseEnrollment.deleteMany({
          where: { userId: id },
        }),
        db.quizAttempt.deleteMany({
          where: { userId: id },
        }),

        // 3. Xóa Content của Course và Wiki
        db.content.deleteMany({
          where: {
            OR: [{ course: { authorId: id } }],
          },
        }),

        // 4. Cập nhật status các bảng chính
        db.project.updateMany({
          where: { authorId: id },
          data: { status: "DELETED" },
        }),
        db.course.updateMany({
          where: { authorId: id },
          data: { status: "DELETED" },
        }),
        db.quiz.updateMany({
          where: { authorId: id },
          data: { status: "DELETED" },
        }),
      ]);

      // 5. Cuối cùng xóa user
      await db.user.delete({
        where: { id },
      });

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Delete user error:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await db.user.findUnique({ where: { id } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = (req.query.search as string) || "";

      const skip = (page - 1) * limit;

      const [users, total] = await Promise.all([
        db.user.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            image: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
          where: {
            OR: [{ name: { contains: search } }, { email: { contains: search } }],
          },
          skip,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
        db.user.count({
          where: {
            OR: [{ name: { contains: search } }, { email: { contains: search } }],
          },
        }),
      ]);

      return res.status(200).json({
        users,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.params;
      const user = await db.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error("Get user by email error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getProfile(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await db.user.findUnique({
        where: { id: req.user.id },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      console.error("Get current user error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getProfileStats(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const [projectsCount, coursesEnrolled, quizAttempts, averageScore] = await Promise.all([
        db.project.count({ where: { authorId: req.user.id } }),
        db.courseEnrollment.count({ where: { userId: req.user.id } }),
        db.quizAttempt.count({ where: { userId: req.user.id } }),
        db.quizAttempt.aggregate({
          where: { userId: req.user.id },
          _avg: { score: true },
        }),
      ]);

      return res.status(200).json({
        projectsCount,
        coursesEnrolled,
        quizzesAttempted: quizAttempts,
        averageQuizScore: averageScore._avg.score || 0,
      });
    } catch (error) {
      console.error("Get profile stats error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getProfileActivity(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const [enrolledCourses, quizAttempts, createdContent] = await Promise.all([
        db.courseEnrollment.findMany({
          where: { userId: req.user.id },
          take: 5,
          orderBy: { enrolledAt: "desc" },
          include: {
            course: {
              select: {
                id: true,
                title: true,
                thumbnail: true,
                status: true,
              },
            },
          },
        }),
        db.quizAttempt.findMany({
          where: { userId: req.user.id },
          take: 5,
          orderBy: { startedAt: "desc" },
          include: {
            quiz: {
              select: {
                title: true,
              },
            },
          },
        }),
        db.project.findMany({
          where: { authorId: req.user.id },
          take: 5,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            status: true,
            createdAt: true,
          },
        }),
      ]);
      return res.status(200).json({
        enrolledCourses: enrolledCourses.map((e) => e.course),
        quizAttempts: quizAttempts.map((a) => ({
          id: a.id,
          title: a.quiz.title,
          score: a.score,
          submittedAt: a.submittedAt,
        })),
        createdContent,
      });
    } catch (error) {
      console.error("Get profile activity error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
})();
