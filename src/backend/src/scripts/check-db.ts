import { db } from '../config/db';

async function checkDatabaseConnection() {
  try {
    await db.$queryRaw`SELECT 1`;
    console.log("✅ Database connection successful");
    await db.$disconnect();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

checkDatabaseConnection();