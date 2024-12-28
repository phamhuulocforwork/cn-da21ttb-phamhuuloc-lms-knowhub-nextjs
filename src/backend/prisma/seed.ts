import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Abc123123", 10);

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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
