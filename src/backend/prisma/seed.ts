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
  await prisma.category.createMany({
    data: [
      {
        name: "UI/UX Design",
        description: "User Interface and User Experience Design principles and practices",
      },
      {
        name: "Frontend Development",
        description: "Building user interfaces with HTML, CSS, JavaScript and modern frameworks",
      },
      {
        name: "Backend Development",
        description: "Server-side programming, APIs, databases and system architecture",
      },
      {
        name: "Mobile Development",
        description: "Creating apps for iOS, Android and cross-platform development",
      },
      {
        name: "DevOps",
        description: "Development operations, CI/CD, cloud infrastructure and deployment",
      },
      {
        name: "Data Science",
        description: "Data analysis, machine learning, statistics and visualization",
      },
      {
        name: "Cybersecurity",
        description: "Network security, cryptography, ethical hacking and security best practices",
      },
      {
        name: "Game Development",
        description: "Game design, programming, graphics and game engines",
      },
      {
        name: "Artificial Intelligence",
        description: "Machine learning, deep learning, neural networks and AI applications",
      },
      {
        name: "Cloud Computing",
        description: "Cloud platforms, services, architecture and deployment",
      },
    ],
  });

  const uiuxCategory = await prisma.category.findFirst({
    where: { name: "UI/UX Design" },
  });

  // PROJECTS
  const designProject = await prisma.project.create({
    data: {
      title: "Design Learning Path",
      description: "Complete learning path for UI/UX designers",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
      status: "PUBLISHED",
      authorId: (await prisma.user.findFirst({ where: { role: "TEACHER" } }))!.id,
      categories: {
        connect: [{ id: uiuxCategory?.id }],
      },
    },
  });

  // COURSES
  const uiuxCourse1 = await prisma.course.create({
    data: {
      title: "Mastering UI/UX Design: A Guide",
      short_description: "Learn essential UI/UX design skills",
      description: "Comprehensive guide to master UI/UX design principles",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c",
      status: "PUBLISHED",
      authorId: (await prisma.user.findFirst({ where: { role: "TEACHER" } }))!.id,
      projectId: designProject.id,
      categories: {
        connect: [{ id: uiuxCategory?.id }],
      },
    },
  });

  const uiuxCourse2 = await prisma.course.create({
    data: {
      title: "User Research and Testing",
      short_description: "Master user research methods",
      description: "Learn effective user research methods and usability testing techniques",
      thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
      status: "PUBLISHED",
      authorId: (await prisma.user.findFirst({ where: { role: "TEACHER" } }))!.id,
      projectId: designProject.id,
      categories: {
        connect: [{ id: uiuxCategory?.id }],
      },
    },
  });

  const uiuxCourse3 = await prisma.course.create({
    data: {
      title: "UI Design Fundamentals",
      short_description: "Core UI design principles",
      description: "Master the core principles of user interface design",
      thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
      status: "PUBLISHED",
      authorId: (await prisma.user.findFirst({ where: { role: "TEACHER" } }))!.id,
      projectId: designProject.id,
      categories: {
        connect: [{ id: uiuxCategory?.id }],
      },
    },
  });

  const uiuxCourse = uiuxCourse1;

  // QUIZ
  const designQuiz = await prisma.quiz.create({
    data: {
      title: "UI/UX Design Principles Quiz",
      short_description: "Test your UI/UX knowledge",
      description: "Test your knowledge of UI/UX design principles",
      thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
      duration: 30,
      status: "PUBLISHED",
      authorId: (await prisma.user.findFirst({ where: { role: "TEACHER" } }))!.id,
      projectId: designProject.id,
      categories: {
        connect: [{ id: uiuxCategory?.id }],
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
