import { Request, Response } from "express";

import { db } from "../../config/db";

export default new (class QuizController {
  async getQuizzes(req: Request, res: Response): Promise<Response> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = (req.query.search as string) || "";
      const categoryId = req.query.categoryId as string;
      const projectId = req.query.projectId as string;
      const view = (req.query.view as "list" | "gallery") || "list";
      const urgency = req.query.urgency as "asc" | "desc";

      const skip = (page - 1) * limit;

      const where = {
        OR: [{ title: { contains: search } }, { description: { contains: search } }],
        status: "PUBLISHED",
        ...(categoryId && {
          categories: {
            some: { id: categoryId },
          },
        }),
        ...(projectId && { projectId }),
      };

      const [quizzes, total] = await Promise.all([
        db.quiz.findMany({
          where: where as any,
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            categories: true,
            project: {
              select: {
                id: true,
                title: true,
              },
            },
            _count: {
              select: {
                questions: true,
                attempts: true,
              },
            },
          },
          skip,
          take: limit,
          orderBy: urgency ? { endTime: urgency } : { createdAt: "desc" },
        }),
        db.quiz.count({ where: where as any }),
      ]);

      return res.status(200).json({
        quizzes,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          view,
        },
      });
    } catch (error) {
      console.error("Get quizzes error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getQuiz(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      let quiz: any;
      quiz = await db.quiz.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          categories: true,
          project: {
            select: {
              id: true,
              title: true,
            },
          },
          questions: {
            orderBy: { order: "asc" },
            include: {
              answers: {
                orderBy: { order: "asc" },
                // Only include correct answers for author
                ...(userId && {
                  select: {
                    id: true,
                    content: true,
                    order: true,
                    ...(userId === quiz?.authorId && { isCorrect: true }),
                  },
                }),
              },
            },
          },
          _count: {
            select: {
              attempts: true,
            },
          },
        },
      });

      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      // Check if quiz belongs to a project and if user has access
      if (quiz.projectId) {
        const hasAccess = await db.project.findFirst({
          where: {
            id: quiz.projectId,
            OR: [{ authorId: userId }, { quizzes: { some: { attempts: { some: { userId } } } } }],
          },
        });

        if (!hasAccess) {
          return res.status(403).json({ error: "Not authorized" });
        }
      }

      return res.status(200).json(quiz);
    } catch (error) {
      console.error("Get quiz error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async createQuiz(req: Request, res: Response): Promise<Response> {
    try {
      const {
        title,
        description,
        short_description,
        thumbnail,
        duration,
        startTime,
        endTime,
        randomizeAnswers,
        categoryIds,
        projectId,
        questions,
      } = req.body;
      const userId = req.user?.id;

      const quiz = await db.quiz.create({
        data: {
          title,
          short_description,
          description,
          thumbnail,
          duration,
          startTime,
          endTime,
          randomizeAnswers,
          authorId: userId!,
          projectId,
          categories: {
            connect: categoryIds.map((id: string) => ({ id })),
          },
          questions: {
            create: questions.map((q: any, qIndex: number) => ({
              type: q.type,
              content: q.content,
              image: q.image,
              isRequired: q.isRequired,
              points: q.points,
              multipleAnswers: q.multipleAnswers,
              order: qIndex,
              answers: {
                create: q.answers.map((a: any, aIndex: number) => ({
                  content: a.content,
                  isCorrect: a.isCorrect,
                  order: aIndex,
                })),
              },
            })),
          },
        },
        include: {
          categories: true,
          questions: {
            include: {
              answers: true,
            },
          },
        },
      });

      return res.status(201).json(quiz);
    } catch (error) {
      console.error("Create quiz error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateQuiz(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        thumbnail,
        duration,
        startTime,
        endTime,
        randomizeAnswers,
        categoryIds,
        status,
        questions,
      } = req.body;
      const userId = req.user?.id;

      const quiz = await db.quiz.findUnique({
        where: { id },
      });

      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      if (quiz.authorId !== userId) {
        return res.status(403).json({ error: "Not authorized" });
      }

      // Delete existing questions and answers
      await db.answer.deleteMany({
        where: { question: { quizId: id } },
      });
      await db.question.deleteMany({
        where: { quizId: id },
      });

      const updatedQuiz = await db.quiz.update({
        where: { id },
        data: {
          title,
          description,
          thumbnail,
          duration,
          startTime,
          endTime,
          randomizeAnswers,
          status,
          categories: {
            set: [],
            connect: categoryIds.map((id: string) => ({ id })),
          },
          questions: {
            create: questions.map((q: any, qIndex: number) => ({
              type: q.type,
              content: q.content,
              image: q.image,
              isRequired: q.isRequired,
              points: q.points,
              multipleAnswers: q.multipleAnswers,
              order: qIndex,
              answers: {
                create: q.answers.map((a: any, aIndex: number) => ({
                  content: a.content,
                  isCorrect: a.isCorrect,
                  order: aIndex,
                })),
              },
            })),
          },
        },
        include: {
          categories: true,
          questions: {
            include: {
              answers: true,
            },
          },
        },
      });

      return res.status(200).json(updatedQuiz);
    } catch (error) {
      console.error("Update quiz error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteQuiz(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const quiz = await db.quiz.findUnique({
        where: { id },
      });

      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      if (quiz.authorId !== userId) {
        return res.status(403).json({ error: "Not authorized" });
      }

      await db.quiz.delete({
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      console.error("Delete quiz error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async startQuizAttempt(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const quiz = await db.quiz.findUnique({
        where: { id },
        include: {
          questions: {
            include: {
              answers: true,
            },
          },
        },
      });

      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      // Check if quiz is available
      const now = new Date();
      if (quiz.startTime && now < quiz.startTime) {
        return res.status(400).json({ error: "Quiz has not started yet" });
      }
      if (quiz.endTime && now > quiz.endTime) {
        return res.status(400).json({ error: "Quiz has ended" });
      }

      const attempt = await db.quizAttempt.create({
        data: {
          userId: userId!,
          quizId: id,
        },
      });

      return res.status(201).json(attempt);
    } catch (error) {
      console.error("Start quiz attempt error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async submitQuizAttempt(req: Request, res: Response): Promise<Response> {
    try {
      const { id, attemptId } = req.params;
      const { answers } = req.body;
      const userId = req.user?.id;

      const attempt = await db.quizAttempt.findUnique({
        where: {
          id: attemptId,
          userId: userId!,
          quizId: id,
        },
        include: {
          quiz: {
            include: {
              questions: {
                include: {
                  answers: true,
                },
              },
            },
          },
        },
      });

      if (!attempt) {
        return res.status(404).json({ error: "Attempt not found" });
      }

      if (attempt.submittedAt) {
        return res.status(400).json({ error: "Attempt already submitted" });
      }

      // Calculate score
      let score = 0;
      const questionAttempts = [];

      for (const answer of answers) {
        const question = attempt.quiz.questions.find((q) => q.id === answer.questionId);
        if (!question) continue;

        if (question.type === "MULTIPLE_CHOICE") {
          const correctAnswers = question.answers.filter((a) => a.isCorrect).map((a) => a.id);
          const userAnswers = answer.answerId.split(",");

          if (question.multipleAnswers) {
            // All answers must be correct for multiple answer questions
            const isCorrect =
              correctAnswers.length === userAnswers.length &&
              correctAnswers.every((id) => userAnswers.includes(id));
            if (isCorrect) score += question.points;
          } else {
            // Single answer must be correct
            if (correctAnswers.includes(userAnswers[0])) score += question.points;
          }
        }

        questionAttempts.push({
          attemptId,
          questionId: question.id,
          answer: answer.answerId,
        });
      }

      // Update attempt with score and answers
      const updatedAttempt = await db.quizAttempt.update({
        where: { id: attemptId },
        data: {
          submittedAt: new Date(),
          score,
          answers: {
            create: questionAttempts,
          },
        },
        include: {
          answers: true,
        },
      });

      return res.status(200).json(updatedAttempt);
    } catch (error) {
      console.error("Submit quiz attempt error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getQuizAttempts(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const attempts = await db.quizAttempt.findMany({
        where: {
          quizId: id,
          userId: userId!,
        },
        include: {
          answers: true,
        },
        orderBy: {
          startedAt: "desc",
        },
      });

      return res.status(200).json(attempts);
    } catch (error) {
      console.error("Get quiz attempts error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
})();
