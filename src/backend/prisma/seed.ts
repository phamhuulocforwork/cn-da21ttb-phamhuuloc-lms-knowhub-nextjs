import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Abc123123", 10);
  //USER
  await prisma.user.create({
    data: {
      email: "admin@knowhub.com",
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      email: "teacher@knowhub.com",
      name: "Teacher",
      password: hashedPassword,
      role: "TEACHER",
    },
  });

  await prisma.user.create({
    data: {
      email: "student@knowhub.com",
      name: "Student",
      password: hashedPassword,
      role: "STUDENT",
    },
  });
  // CATEGORIES
  const uiuxCategory = await prisma.category.create({
    data: {
      name: "UI/UX Design",
      description: "User Interface and User Experience Design principles and practices",
    },
  });

  const webDevCategory = await prisma.category.create({
    data: {
      name: "Web Development",
      description: "Web development technologies and frameworks",
    },
  });

  // PROJECTS
  const designProject = await prisma.project.create({
    data: {
      title: "Design Learning Path",
      description: "Complete learning path for UI/UX designers",
      thumbnail: "https://placehold.co/400x400",
      status: "PUBLISHED",
      authorId: (await prisma.user.findFirst({ where: { role: "TEACHER" } }))!.id,
      categories: {
        connect: [{ id: uiuxCategory.id }],
      },
    },
  });

  // COURSES
  const uiuxCourse = await prisma.course.create({
    data: {
      title: "Mastering UI/UX Design: A Guide",
      description: "Comprehensive guide to master UI/UX design principles",
      thumbnail: "https://placehold.co/400x400",
      status: "PUBLISHED",
      authorId: (await prisma.user.findFirst({ where: { role: "TEACHER" } }))!.id,
      projectId: designProject.id,
      categories: {
        connect: [{ id: uiuxCategory.id }],
      },
      content: {
        create: [
          {
            type: "TEXT",
            value: "Introduction to UI/UX Design",
            order: 1,
          },
          {
            type: "VIDEO",
            value: "https://example.com/intro-video",
            order: 2,
          },
        ],
      },
    },
  });

  // QUIZ
  const designQuiz = await prisma.quiz.create({
    data: {
      title: "UI/UX Design Principles Quiz",
      description: "Test your knowledge of UI/UX design principles",
      duration: 30,
      status: "PUBLISHED",
      authorId: (await prisma.user.findFirst({ where: { role: "TEACHER" } }))!.id,
      projectId: designProject.id,
      categories: {
        connect: [{ id: uiuxCategory.id }],
      },
      questions: {
        create: [
          {
            type: "MULTIPLE_CHOICE",
            content: "What is the primary goal of UX design?",
            isRequired: true,
            order: 1,
            answers: {
              create: [
                {
                  content: "To make interfaces aesthetically pleasing",
                  isCorrect: false,
                  order: 1,
                },
                {
                  content: "To improve user satisfaction and usability",
                  isCorrect: true,
                  order: 2,
                },
                {
                  content: "To use the latest design trends",
                  isCorrect: false,
                  order: 3,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // COURSE ENROLLMENT
  await prisma.courseEnrollment.create({
    data: {
      userId: (await prisma.user.findFirst({ where: { role: "STUDENT" } }))!.id,
      courseId: uiuxCourse.id,
    },
  });

  // QUIZ ATTEMPT
  const quizAttempt = await prisma.quizAttempt.create({
    data: {
      userId: (await prisma.user.findFirst({ where: { role: "STUDENT" } }))!.id,
      quizId: designQuiz.id,
      submittedAt: new Date(),
      score: 80,
    },
  });

  // QUESTION ATTEMPT
  await prisma.questionAttempt.create({
    data: {
      attemptId: quizAttempt.id,
      questionId: (await prisma.question.findFirst())!.id,
      answer: "To improve user satisfaction and usability",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
