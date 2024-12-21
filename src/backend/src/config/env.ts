import * as z from "zod";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(5000),
});

const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(envParse.error.format(), null, 2)
  );
  throw new Error("Invalid environment variables");
}

export const env = envParse.data;
