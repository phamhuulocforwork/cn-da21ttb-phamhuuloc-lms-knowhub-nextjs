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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
