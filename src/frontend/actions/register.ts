"use server";

import bcrypt from "bcrypt";
import axios from "axios";
import * as z from "zod";
import { RegisterSchema } from "~/schemas";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const register = async ({
  name,
  email,
  password,
}: z.infer<ReturnType<typeof RegisterSchema>>) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await api.post("/api/auth/register", {
    name,
    email,
    password: hashedPassword,
  });
};
